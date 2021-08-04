import { useState, useEffect } from 'react';

const useNetworkInfo = provider => {
  const [network, setNetwork] = useState({});

  useEffect(() => {
    const getNetwork = async () => {
      const result = await provider.getNetwork();
      setNetwork(result);
    };
    if (provider) getNetwork();
  }, [provider]);

  return network;
};

export default useNetworkInfo;
