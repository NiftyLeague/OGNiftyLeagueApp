import React, { useContext, useMemo, useState } from 'react';
import { Card } from 'antd';
import { utils } from 'ethers';
import { useContractLoader, useContractExistsAtAddress } from 'hooks';
import { NetworkContext } from 'NetworkProvider';
import Account from '../Account';
import DisplayVariable from './DisplayVariable';
import FunctionForm from './FunctionForm';

const noContractDisplay = (
  <div>
    Loading...{' '}
    <div style={{ padding: 32 }}>
      You need to run{' '}
      <span className="highlight" style={{ marginLeft: 4, padding: 4, borderRadius: 4, fontWeight: 'bolder' }}>
        yarn chain
      </span>{' '}
      and{' '}
      <span className="highlight" style={{ marginLeft: 4, padding: 4, borderRadius: 4, fontWeight: 'bolder' }}>
        yarn deploy
      </span>{' '}
      to see your contract here.
    </div>
    <div style={{ padding: 32 }}>
      <span style={{ marginRight: 4 }} role="img" aria-label="warning">
        ☢️
      </span>
      Warning: You might need to run
      <span className="highlight" style={{ marginLeft: 4, padding: 4, borderRadius: 4, fontWeight: 'bolder' }}>
        yarn deploy
      </span>{' '}
      <i>again</i> after the frontend comes up!
    </div>
  </div>
);

const isQueryable = (fn: utils.FunctionFragment) =>
  (fn.stateMutability === 'view' || fn.stateMutability === 'pure') && fn.inputs.length === 0;

export default function Contract({ name, show }: { name: string; show?: string[] }): JSX.Element {
  const { localProvider, mainnetProvider, signer, targetNetwork } = useContext(NetworkContext);
  const contracts = useContractLoader(localProvider);
  const contract = contracts ? contracts[name] : undefined;
  const address = contract ? contract.address : '';
  const contractIsDeployed = useContractExistsAtAddress(localProvider, address);

  const displayedContractFunctions = useMemo(
    () =>
      contract
        ? Object.values(contract.interface.functions).filter(
            fn => fn.type === 'function' && !(show && show.indexOf(fn.name) < 0),
          )
        : [],
    [contract, show],
  );

  const [refreshRequired, triggerRefresh] = useState(false);
  const contractDisplay =
    contract &&
    signer &&
    displayedContractFunctions.map(fn => {
      if (isQueryable(fn)) {
        // If there are no inputs, just display return value
        return (
          <DisplayVariable
            key={fn.name}
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            contractFunction={contract[fn.name]}
            functionInfo={fn}
            refreshRequired={refreshRequired}
            triggerRefresh={triggerRefresh}
          />
        );
      }
      // If there are inputs, display a form to allow users to provide these
      return (
        <FunctionForm
          key={`FF${fn.name}`}
          contractFunction={
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            fn.stateMutability === 'view' || fn.stateMutability === 'pure'
              ? contract[fn.name]
              : contract.connect(signer)[fn.name]
          }
          functionInfo={fn}
          provider={localProvider}
          targetNetwork={targetNetwork}
          triggerRefresh={triggerRefresh}
        />
      );
    });

  return (
    <div style={{ margin: 'auto', width: '70vw' }}>
      <Card
        title={
          <div>
            {name}
            <div style={{ float: 'right' }}>
              <Account
                address={address}
                userProvider={localProvider}
                mainnetProvider={mainnetProvider}
                blockExplorer={targetNetwork.blockExplorer}
              />
            </div>
          </div>
        }
        size="default"
        style={{ marginTop: 25, width: '100%' }}
        loading={contractDisplay && contractDisplay.length <= 0}
      >
        {contractIsDeployed ? contractDisplay : noContractDisplay}
      </Card>
    </div>
  );
}

Contract.defaultProps = {
  show: undefined,
};
