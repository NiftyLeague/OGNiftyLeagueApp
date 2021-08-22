import { useState, useEffect } from 'react';
import { Contracts } from 'types/web3';
import useContractReader from './useContractReader';
import { NFT_CONTRACT, REMOVED_TRAITS_INTERVAL } from '../constants';

export default function useRemovedTraits(readContracts: Contracts): number[] {
  const [removedTraits, setRemovedTraits] = useState<number[]>([]);
  const result = useContractReader(
    readContracts,
    NFT_CONTRACT,
    'getRemovedTraits',
    undefined,
    REMOVED_TRAITS_INTERVAL,
  ) as number[];
  useEffect(() => {
    if (result && result.length !== removedTraits.length) setRemovedTraits(result);
  }, [result, removedTraits]);
  return removedTraits.length ? removedTraits : [];
}
