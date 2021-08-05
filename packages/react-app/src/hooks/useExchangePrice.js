import { useCallback, useContext, useState } from 'react';
import { ChainId, WETH, Fetcher, Route } from '@sushiswap/sdk';
import { NetworkContext } from 'NetworkProvider';
import { DAI as DAI_MAP } from 'constants/tokens';
import { ETH_EXCHANGE_PRICE_INTERVAL } from '../constants';
import usePoller from './usePoller';

/* 💵 This hook will get the price of ETH from Sushiswap on Mainnet: */
export default function useExchangePrice(pollTime = ETH_EXCHANGE_PRICE_INTERVAL) {
  const [price, setPrice] = useState(0);
  const { mainnetProvider } = useContext(NetworkContext);

  const pollPrice = useCallback(() => {
    async function getPrice() {
      const DAI = DAI_MAP[ChainId.MAINNET];
      const pair = await Fetcher.fetchPairData(DAI, WETH[DAI.chainId], mainnetProvider);
      const route = new Route([pair], WETH[DAI.chainId]);
      const newPrice = parseFloat(route.midPrice.toSignificant(6));
      console.log('newPrice', newPrice);
      if (price !== newPrice) setPrice(newPrice);
    }
    if (mainnetProvider) getPrice();
  }, [mainnetProvider, price]);
  usePoller(pollPrice, pollTime);

  return price;
}
