import { ChainId } from "@sushiswap/sdk";

import Arbitrum from "../assets/networks/arbitrum-network.jpg";
import Avalanche from "../assets/networks/avalanche-network.jpg";
import Bsc from "../assets/networks/bsc-network.jpg";
import Fantom from "../assets/networks/fantom-network.jpg";
import Goerli from "../assets/networks/goerli-network.jpg";
import Kovan from "../assets/networks/kovan-network.jpg";
import Mainnet from "../assets/networks/mainnet-network.jpg";
import Matic from "../assets/networks/matic-network.jpg";
import Polygon from "../assets/networks/polygon-network.jpg";
import Rinkeby from "../assets/networks/rinkeby-network.jpg";
import Ropsten from "../assets/networks/ropsten-network.jpg";

export const NETWORK_ICON = {
  [ChainId.MAINNET]: Mainnet,
  [ChainId.ROPSTEN]: Ropsten,
  [ChainId.RINKEBY]: Rinkeby,
  [ChainId.GÖRLI]: Goerli,
  [ChainId.KOVAN]: Kovan,
  [ChainId.FANTOM]: Fantom,
  [ChainId.FANTOM_TESTNET]: Fantom,
  [ChainId.BSC]: Bsc,
  [ChainId.BSC_TESTNET]: Bsc,
  [ChainId.MATIC]: Polygon,
  [ChainId.MATIC_TESTNET]: Matic,
  [ChainId.ARBITRUM]: Arbitrum,
  [ChainId.AVALANCHE]: Avalanche,
  [ChainId.FUJI]: Avalanche,
};

export const NETWORK_LABEL = {
  [ChainId.MAINNET]: "Ethereum",
  [ChainId.RINKEBY]: "Rinkeby",
  [ChainId.ROPSTEN]: "Ropsten",
  [ChainId.GÖRLI]: "Görli",
  [ChainId.KOVAN]: "Kovan",
  [ChainId.FANTOM]: "Fantom",
  [ChainId.FANTOM_TESTNET]: "Fantom Testnet",
  [ChainId.MATIC]: "Polygon (Matic)",
  [ChainId.MATIC_TESTNET]: "Matic Testnet",
  [ChainId.BSC]: "BSC",
  [ChainId.BSC_TESTNET]: "BSC Testnet",
  [ChainId.AVALANCHE]: "Avalanche",
  [ChainId.FUJI]: "Fuji",
};
