import { useMemo } from "react";
import useContractReader from "./ContractReader";
import { NFT_CONTRACT, REMOVED_TRAITS_INTERVAL } from "../constants";

export default function useRemovedTraits(readContracts) {
  const result = useContractReader(readContracts, NFT_CONTRACT, "getRemovedTraits", null, REMOVED_TRAITS_INTERVAL);
  const removedTraits = useMemo(() => result || [], [result?.length]);
  return removedTraits;
}
