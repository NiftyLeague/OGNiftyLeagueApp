import { useCallback } from 'react';
import { utils } from 'ethers';
import { Contracts } from 'types/web3';
import useContractReader from './useContractReader';
import { NFTL_CONTRACT } from '../constants';

export default function useClaimableNFTL(
  writeContracts: Contracts,
  tokenIndices: number[],
  refreshKey: string | number,
): number {
  const formatter = useCallback((value: BigInt) => {
    const totalAccumulatedStr = value && value.toString();
    return totalAccumulatedStr && utils.formatEther(totalAccumulatedStr);
  }, []);
  const totalAccumulated = useContractReader(
    writeContracts,
    NFTL_CONTRACT,
    'accumulatedMultiCheck',
    [tokenIndices],
    undefined,
    formatter,
    refreshKey,
  ) as string;
  return parseFloat(totalAccumulated);
}
