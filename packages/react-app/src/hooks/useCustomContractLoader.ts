/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import { useState, useEffect } from 'react';
import { Contract, Signer } from 'ethers';
import { Provider } from 'types/web3';
import { getProviderAndSigner } from 'helpers';

/*
  when you want to load a local contract's abi but supply a custom address
*/

/*
  ~ What it does? ~

  Enables you to load a local contract with custom address

  ~ How can I use? ~

  const customContract = useCustomContractLoader(localProvider, "YourContract", customAddress)

  ~ Features ~

  - Specify the localProvider
  - Specify the name of the contract, in this case it is "YourContract"
  - Specify the customAddress of your contract
*/

export default function useCustomContractLoader(
  providerOrSigner: Provider | Signer | undefined,
  contractName: string,
  address: string,
): Contract | undefined {
  const [contract, setContract] = useState<Contract | undefined>();
  useEffect(() => {
    function loadContract() {
      if (typeof providerOrSigner !== 'undefined' && contractName && address) {
        try {
          const { provider, signer } = getProviderAndSigner(providerOrSigner);
          // if no signer is returned we can still use the provider
          let signerOrProvider: Provider | Signer = signer as Signer;
          if (!signer) signerOrProvider = provider as Provider;

          const targetNetwork = process.env.REACT_APP_NETWORK as string;
          const customContract = new Contract(
            address,
            require(`../contracts/${targetNetwork}/${contractName}.abi.json`),
            signerOrProvider,
          );
          try {
            // @ts-expect-error ts-migrate(2542) FIXME: Index signature in type 'Contract' only permits re... Remove this comment to see the full error message
            customContract.bytecode = require(`../contracts/${targetNetwork}/${contractName}.bytecode.js`) as string;
          } catch (e) {
            console.log(e);
          }
          setContract(customContract);
        } catch (e) {
          console.log('ERROR LOADING CONTRACTS!!', e);
        }
      }
    }
    loadContract();
  }, [providerOrSigner, contractName, address]);

  return contract;
}
