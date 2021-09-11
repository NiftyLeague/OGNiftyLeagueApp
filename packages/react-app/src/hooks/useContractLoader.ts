/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import { useState, useEffect } from 'react';
import { Contract, Signer } from 'ethers';
import { Contracts, NetworkName, Provider } from 'types/web3';
import { getProviderAndSigner } from 'helpers';
import { NETWORK_NAME, SUPPORTED_CHAIN_IDS } from '../constants';
import EXTERNAL_CONTRACTS from '../constants/externalContracts';

/*
  ~ What it does? ~

  Loads your local contracts and gives options to read values from contracts
  or write transactions into them

  ~ How can I use? ~

  const readContracts = useContractLoader(localProvider) // or
  const writeContracts = useContractLoader(userProvider)

  ~ Features ~

  - localProvider enables reading values from contracts
  - userProvider enables writing transactions into contracts
  - Example of using setPurpose function from our contract and writing transactions by Transactor.js helper:
    await tx( writeContracts.YourContract.setPurpose(newPurpose) )

  config can include:
  - chainId - to hardcode the chainId, irrespective of the providerOrSigner chainId
*/

const loadHardhatContract = (networkName: NetworkName, contractName: string, signer: Signer | Provider) => {
  const newContract = new Contract(
    require(`../contracts/${networkName}/${contractName}.address.js`),
    require(`../contracts/${networkName}/${contractName}.abi.json`),
    signer,
  );
  try {
    // @ts-expect-error ts-migrate(2542) FIXME: Index signature in type 'Contract' only permits re... Remove this comment to see the full error message
    newContract.bytecode = require(`../contracts/${networkName}/${contractName}.bytecode.js`) as string;
  } catch (e) {
    console.log(e);
  }
  return newContract;
};

interface Config {
  chainId?: number;
}

export default function useContractLoader(
  providerOrSigner: Provider | Signer | undefined,
  config: Config = {},
): Contracts {
  const [contracts, setContracts] = useState<Contracts>({});

  useEffect(() => {
    let active = true;
    async function loadContracts() {
      if (providerOrSigner && typeof providerOrSigner !== 'undefined') {
        try {
          // we need to check to see if this providerOrSigner has a signer or not
          const { provider, signer } = getProviderAndSigner(providerOrSigner);
          // if no signer is returned we can still use the provider
          let signerOrProvider: Provider | Signer = signer as Signer;
          if (!signer) signerOrProvider = provider as Provider;

          const { chainId } = await (provider as Provider).getNetwork();
          const _chainId = config.chainId || chainId;
          if (!SUPPORTED_CHAIN_IDS.includes(_chainId)) return;
          const networkName = NETWORK_NAME[_chainId];
          const contractList = require(`../contracts/${networkName}/contracts.js`) as string[];
          const hardhatContracts = contractList.reduce((accumulator, contractName) => {
            accumulator[contractName] = loadHardhatContract(networkName, contractName, signerOrProvider);
            return accumulator;
          }, {});
          const externalContractList = EXTERNAL_CONTRACTS[_chainId];
          const externalContracts = Object.keys(externalContractList).reduce((accumulator, contractName) => {
            accumulator[contractName] = new Contract(
              externalContractList[contractName].address,
              externalContractList[contractName].abi,
              signerOrProvider,
            );
            return accumulator;
          }, {});
          if (active) setContracts({ ...hardhatContracts, ...externalContracts });
        } catch (e) {
          console.log('ERROR LOADING CONTRACTS!!', e);
        }
      }
    }
    void loadContracts();
    return () => {
      active = false;
    };
  }, [providerOrSigner, config.chainId]);

  return contracts;
}
