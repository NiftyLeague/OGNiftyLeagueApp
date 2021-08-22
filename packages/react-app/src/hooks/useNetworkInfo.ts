import { useState, useEffect } from 'react';
import { providers } from 'ethers';
import { Provider } from 'types/web3';

type NetworkInfo = providers.Network | { name: ''; chainId: undefined };

const useNetworkInfo = (provider: Provider | undefined): NetworkInfo => {
  const [network, setNetwork] = useState<NetworkInfo>({ name: '', chainId: undefined });

  useEffect(() => {
    const getNetwork = async () => {
      const result = await provider?.getNetwork();
      if (result) setNetwork(result);
    };
    if (provider) void getNetwork();
  }, [provider]);

  return network;
};

export default useNetworkInfo;
