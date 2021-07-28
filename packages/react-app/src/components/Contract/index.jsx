import React, { useContext, useMemo, useState } from "react";
import { Card } from "antd";
import { useContractLoader, useContractExistsAtAddress } from "hooks";
import { NetworkContext } from "NetworkProvider";
import Account from "../Account";
import DisplayVariable from "./DisplayVariable";
import FunctionForm from "./FunctionForm";

const noContractDisplay = (
  <div>
    Loading...{" "}
    <div style={{ padding: 32 }}>
      You need to run{" "}
      <span className="highlight" style={{ marginLeft: 4, padding: 4, borderRadius: 4, fontWeight: "bolder" }}>
        yarn chain
      </span>{" "}
      and{" "}
      <span className="highlight" style={{ marginLeft: 4, padding: 4, borderRadius: 4, fontWeight: "bolder" }}>
        yarn deploy
      </span>{" "}
      to see your contract here.
    </div>
    <div style={{ padding: 32 }}>
      <span style={{ marginRight: 4 }} role="img" aria-label="warning">
        ☢️
      </span>
      Warning: You might need to run
      <span className="highlight" style={{ marginLeft: 4, padding: 4, borderRadius: 4, fontWeight: "bolder" }}>
        yarn deploy
      </span>{" "}
      <i>again</i> after the frontend comes up!
    </div>
  </div>
);

const isQueryable = fn => (fn.stateMutability === "view" || fn.stateMutability === "pure") && fn.inputs.length === 0;

export default function Contract({ name, show }) {
  const { localProvider, signer, targetNetwork } = useContext(NetworkContext);
  const contracts = useContractLoader(localProvider);
  const contract = contracts ? contracts[name] : "";

  const address = contract ? contract.address : "";
  const contractIsDeployed = useContractExistsAtAddress(localProvider, address);

  const displayedContractFunctions = useMemo(
    () =>
      contract
        ? Object.values(contract.interface.functions).filter(
            fn => fn.type === "function" && !(show && show.indexOf(fn.name) < 0),
          )
        : [],
    [contract, show],
  );

  const [refreshRequired, triggerRefresh] = useState(false);
  const contractDisplay = displayedContractFunctions.map(fn => {
    if (isQueryable(fn)) {
      // If there are no inputs, just display return value
      return (
        <DisplayVariable
          key={fn.name}
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
        key={"FF" + fn.name}
        contractFunction={
          fn.stateMutability === "view" || fn.stateMutability === "pure"
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
    <div style={{ margin: "auto", width: "70vw" }}>
      <Card
        title={
          <div>
            {name}
            <div style={{ float: "right" }}>
              <Account
                address={address}
                localProvider={localProvider}
                injectedProvider={localProvider}
                mainnetProvider={localProvider}
                blockExplorer={targetNetwork.blockExplorer}
              />
            </div>
          </div>
        }
        size="large"
        style={{ marginTop: 25, width: "100%" }}
        loading={contractDisplay && contractDisplay.length <= 0}
      >
        {contractIsDeployed ? contractDisplay : noContractDisplay}
      </Card>
    </div>
  );
}
