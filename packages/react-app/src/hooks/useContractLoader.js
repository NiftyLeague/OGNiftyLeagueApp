/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { PROVIDER_NAME } from "../constants";
import EXTERNAL_CONTRACTS from "../constants/externalContracts";

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
  - Example of keeping track of "purpose" variable by loading contracts into readContracts
    and using ContractReader.js hook:
    const purpose = useContractReader(readContracts,"YourContract", "purpose")
  - Example of using setPurpose function from our contract and writing transactions by Transactor.js helper:
    tx( writeContracts.YourContract.setPurpose(newPurpose) )

  config can include:
  - chainId - to hardcode the chainId, irrespective of the providerOrSigner chainId
  - customAddresses: { contractName: 0xCustomAddress } to hardcode the address for a given named contract
  - externalContracts: object with chainIds as keys, with an array of contracts for each
*/

// const targetNetwork = process.env.REACT_APP_NETWORK;

const loadHardhatContract = (networkName, contractName, signer) => {
  const newContract = new ethers.Contract(
    require(`../contracts/${networkName}/${contractName}.address.js`),
    require(`../contracts/${networkName}/${contractName}.abi.js`),
    signer,
  );
  try {
    newContract.bytecode = require(`../contracts/${networkName}/${contractName}.bytecode.js`);
  } catch (e) {
    console.log(e);
  }
  return newContract;
};

export default function useContractLoader(providerOrSigner, config = {}) {
  const [contracts, setContracts] = useState();

  useEffect(() => {
    let active = true;

    async function loadContracts() {
      if (providerOrSigner && typeof providerOrSigner !== "undefined") {
        try {
          // we need to check to see if this providerOrSigner has a signer or not
          let signer;
          let provider;
          let accounts;

          if (providerOrSigner && typeof providerOrSigner.listAccounts === "function") {
            accounts = await providerOrSigner.listAccounts();
          }

          if (ethers.Signer.isSigner(providerOrSigner)) {
            signer = providerOrSigner;
            provider = signer.provider;
          } else if (accounts && accounts.length > 0) {
            signer = providerOrSigner.getSigner();
            provider = providerOrSigner;
          } else {
            signer = providerOrSigner;
            provider = providerOrSigner;
          }

          const { chainId } = await provider.getNetwork();
          const _chainId = config.chainId || chainId;
          const networkName = PROVIDER_NAME[_chainId];

          const contractList = require(`../contracts/${networkName}/contracts.js`);

          const hardhatContracts = contractList.reduce((accumulator, contractName) => {
            accumulator[contractName] = loadHardhatContract(networkName, contractName, signer);
            return accumulator;
          }, {});

          const externalContractList = EXTERNAL_CONTRACTS[_chainId];
          const externalContracts = Object.keys(externalContractList).reduce((accumulator, contractName) => {
            accumulator[contractName] = new ethers.Contract(
              externalContractList[contractName].address,
              externalContractList[contractName].abi,
              signer,
            );
            return accumulator;
          }, {});

          if (active) setContracts({ ...hardhatContracts, ...externalContracts });
        } catch (e) {
          console.log("ERROR LOADING CONTRACTS!!", e);
        }
      }
    }
    loadContracts();

    return () => {
      active = false;
    };
  }, [providerOrSigner, config.chainId]);

  return contracts;
}
