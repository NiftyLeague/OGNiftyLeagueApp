import { formatEther } from "@ethersproject/units";
import useContractReader from "./ContractReader";
import { NFTL_CONTRACT, NFTL_CLAIMABLE_INTERVAL } from "../constants";

export default function useClaimableNFTL(writeContracts, tokenIndices) {
  const formatter = value => {
    const totalAccumulatedStr = value && value.toString();
    return totalAccumulatedStr && formatEther(totalAccumulatedStr);
  };
  const totalAccumulated = useContractReader(
    writeContracts,
    NFTL_CONTRACT,
    "accumulatedMultiCheck",
    [tokenIndices],
    NFTL_CLAIMABLE_INTERVAL,
    formatter,
  );
  return totalAccumulated;
}
