import { useCallback } from 'react';
import { utils } from 'ethers';
import useContractReader from './useContractReader';
import { NFTL_CONTRACT } from '../constants';

export default function useClaimableNFTL(writeContracts, tokenIndices, refreshKey) {
  const formatter = useCallback(value => {
    const totalAccumulatedStr = value && value.toString();
    return totalAccumulatedStr && utils.formatEther(totalAccumulatedStr);
  }, []);
  const totalAccumulated = useContractReader(
    writeContracts,
    NFTL_CONTRACT,
    'accumulatedMultiCheck',
    [tokenIndices],
    null,
    formatter,
    refreshKey,
  );
  return totalAccumulated;
}
