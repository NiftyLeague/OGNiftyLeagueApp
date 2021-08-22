import { useState, useEffect } from 'react';
import { constants } from 'ethers';
import { Provider } from 'types/web3';

/*
  ~ What it does? ~

  Gets address from given ENS name and provider

  ~ How can I use? ~

  const addressFromENS = useResolveName(mainnetProvider, "austingriffith.eth");

  ~ Features ~

  - Specify mainnetProvider
  - Provide ENS name and get address corresponding to given ENS name
*/

const useResolveName = (provider: Provider, ensName: string): string => {
  const [address, setAddress] = useState(constants.AddressZero);

  useEffect(() => {
    const resolveName = async () => {
      await provider.resolveName(ensName).then(resolvedAddress => setAddress(resolvedAddress));
    };
    if (provider) void resolveName;
  }, [provider, ensName]);

  return address;
};

export default useResolveName;
