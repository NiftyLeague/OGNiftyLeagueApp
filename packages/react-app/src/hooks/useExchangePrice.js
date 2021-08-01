import { useContext, useState } from "react";
import { WETH, Fetcher, Route } from "@sushiswap/sdk";
import { usePoller } from "eth-hooks";
import { NetworkContext } from "NetworkProvider";
import { DAI as DAI_MAP } from "constants/tokens";

// Only pulls price from Eth mainnet
export default function useExchangePrice(pollTime) {
  const [price, setPrice] = useState(0);
  const { mainnetProvider } = useContext(NetworkContext);
  const targetNetwork = 1;
  const DAI = DAI_MAP[targetNetwork];

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
