/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import { useState, useEffect } from 'react';
import { Contract, ContractInterface, Signer } from 'ethers';
import { Provider } from 'types/web3';
import { getProviderAndSigner } from 'helpers';

/*
  when you want to load an existing contract using just the provider, address, and ABI
*/

/*
  ~ What it does? ~

  Enables you to load an existing mainnet DAI contract using the provider, address and abi

  ~ How can I use? ~

  const mainnetDAIContract = useExternalContractLoader(mainnetProvider, DAI_ADDRESS, DAI_ABI)

  ~ Features ~

  - Specify mainnetProvider
  - Specify DAI_ADDRESS and DAI_ABI, you can load/write them using constants.js
*/
export default function useExternalContractLoader(
  providerOrSigner: Provider | Signer | undefined,
  address: string,
  ABI: ContractInterface,
  optionalBytecode: string,
): Contract | undefined {
  const [contract, setContract] = useState<Contract | undefined>();
  useEffect(() => {
    function loadContract() {
      if (typeof providerOrSigner !== 'undefined' && address && ABI) {
        try {
          // we need to check to see if this providerOrSigner has a signer or not
          const { provider, signer } = getProviderAndSigner(providerOrSigner);
          // if no signer is returned we can still use the provider
          let signerOrProvider: Provider | Signer = signer as Signer;
          if (!signer) signerOrProvider = provider as Provider;

          const customContract = new Contract(address, ABI, signerOrProvider);
          // @ts-expect-error ts-migrate(2542) FIXME: Index signature in type 'Contract' only permits re... Remove this comment to see the full error message
          if (optionalBytecode) customContract.bytecode = optionalBytecode;
          setContract(customContract);
        } catch (e) {
          console.log(`ERROR LOADING EXTERNAL CONTRACT AT ${address} (check provider, address, and ABI)!!`, e);
        }
      }
    }
    loadContract();
  }, [providerOrSigner, address, ABI, optionalBytecode]);

  return contract;
}
