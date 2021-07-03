import { useMemo } from "react";
import { formatEther } from "@ethersproject/units";
import useContractReader from "./ContractReader";
import { NFT_CONTRACT, NFT_PRICE_INTERVAL } from "../constants";

export default function useNFTPrice(readContracts) {
  const nftPriceBN = useContractReader(readContracts, NFT_CONTRACT, "getNFTPrice", null, NFT_PRICE_INTERVAL);
  const nftPriceStr = nftPriceBN && nftPriceBN.toString();
  const nftPrice = useMemo(() => nftPriceStr && formatEther(nftPriceStr), [nftPriceStr]);
  return nftPrice;
}
