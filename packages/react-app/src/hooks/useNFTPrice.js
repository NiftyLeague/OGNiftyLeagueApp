import { formatEther } from "@ethersproject/units";
import useContractReader from "./ContractReader";
import { NFT_CONTRACT, NFT_PRICE_INTERVAL } from "../constants";

export default function useNFTPrice(readContracts) {
  const formatter = value => {
    const nftPriceStr = value && value.toString();
    return nftPriceStr && formatEther(nftPriceStr);
  };
  const nftPrice = useContractReader(readContracts, NFT_CONTRACT, "getNFTPrice", null, NFT_PRICE_INTERVAL, formatter);
  return nftPrice;
}
