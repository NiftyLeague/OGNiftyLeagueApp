import { useState, useEffect } from 'react';
import { utils } from 'ethers';
import usePolledFetch from './usePolledFetch';
import { CACHE_URL, CACHED_SUBGRAPH_INTERVAL, DEBUG } from '../constants';

interface Response {
  data: {
    id: string;
    nftPrice: string;
    removedTraits: [number];
    totalSupply: string;
  };
}

interface DataFormatted {
  id?: string;
  nftPrice?: string;
  removedTraits?: [number];
  totalSupply?: number;
}

export default function useCachedSubgraph(): DataFormatted {
  const [dataFormatted, setData] = useState<DataFormatted>({
    id: undefined,
    nftPrice: undefined,
    removedTraits: undefined,
    totalSupply: undefined,
  });
  const contractState = usePolledFetch<Response>(CACHE_URL, CACHED_SUBGRAPH_INTERVAL);

  useEffect(() => {
    if (contractState.error && DEBUG) {
      console.error('Cached Subgraph Error:', contractState.error);
    } else if (contractState.data?.data) {
      const { data } = contractState.data;
      setData({ ...data, nftPrice: utils.formatEther(data.nftPrice), totalSupply: parseInt(data.totalSupply, 10) });
    }
  }, [contractState]);

  return dataFormatted;
}
