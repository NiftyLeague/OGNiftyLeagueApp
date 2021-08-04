import { useState, useEffect } from 'react';
import useContractReader from './useContractReader';
import { NFT_CONTRACT, REMOVED_TRAITS_INTERVAL } from '../constants';

export default function useRemovedTraits(readContracts) {
  const [removedTraits, setRemovedTraits] = useState([]);
  const result = useContractReader(readContracts, NFT_CONTRACT, 'getRemovedTraits', null, REMOVED_TRAITS_INTERVAL);
  useEffect(() => {
    if (result && result.length !== removedTraits.length) setRemovedTraits(result);
  }, [result, removedTraits]);
  return removedTraits.length ? removedTraits : [];
}
