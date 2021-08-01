import { useState, useEffect } from "react";

const useNetworkInfo = provider => {
  const [network, setNetwork] = useState({});

  useEffect(() => {
    const getNetwork = async provider => {
      const result = await provider.getNetwork();
      setNetwork(result);
    };
    if (provider) void getNetwork(provider);
  }, [provider]);

  return network;
};

export default useNetworkInfo;
