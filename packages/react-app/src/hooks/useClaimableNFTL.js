import { utils } from 'ethers';
import useContractReader from './useContractReader';
import { NFTL_CONTRACT, NFTL_CLAIMABLE_INTERVAL } from '../constants';

export default function useClaimableNFTL(writeContracts, tokenIndices) {
  const formatter = value => {
    const totalAccumulatedStr = value && value.toString();
    return totalAccumulatedStr && utils.formatEther(totalAccumulatedStr);
  };
  const totalAccumulated = useContractReader(
    writeContracts,
    NFTL_CONTRACT,
    'accumulatedMultiCheck',
    [tokenIndices],
    NFTL_CLAIMABLE_INTERVAL,
    formatter,
  );
  return totalAccumulated;
}
