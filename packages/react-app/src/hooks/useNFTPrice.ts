import { useCallback } from 'react';
import { BigNumber, utils } from 'ethers';
import { Contracts } from 'types/web3';
import useContractReader from './useContractReader';
import { NFT_CONTRACT, NFT_PRICE_INTERVAL } from '../constants';

export default function useNFTPrice(readContracts: Contracts): string {
  const formatter = useCallback((value: BigNumber) => {
    const nftPriceStr = value && value.toString();
    return nftPriceStr && utils.formatEther(nftPriceStr);
  }, []);
  const nftPrice = useContractReader(
    readContracts,
    NFT_CONTRACT,
    'getNFTPrice',
    undefined,
    NFT_PRICE_INTERVAL,
    formatter,
  ) as string;
  return nftPrice;
}
