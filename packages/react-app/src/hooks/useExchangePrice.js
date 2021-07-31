import { useState } from "react";
import { WETH, Fetcher, Route } from "@sushiswap/sdk";
import { usePoller } from "eth-hooks";
import { DAI } from "constants/tokens";

export default function useExchangePrice(targetNetwork, mainnetProvider, pollTime) {
  const [price, setPrice] = useState(0);

  const pollPrice = () => {
    async function getPrice() {
      if (!mainnetProvider) return;
      const pair = await Fetcher.fetchPairData(DAI, WETH[DAI.chainId], mainnetProvider);
      const route = new Route([pair], WETH[DAI.chainId]);
      setPrice(parseFloat(route.midPrice.toSignificant(6)));
    }
    getPrice();
  };
  usePoller(pollPrice, pollTime || 9777);

  return price;
}
