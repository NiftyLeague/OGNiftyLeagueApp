import { ChainId } from "@sushiswap/sdk";
import { FortmaticConnector } from "./Fortmatic";
import { InjectedConnector } from "@web3-react/injected-connector";
import { LatticeConnector } from "@web3-react/lattice-connector";
import { NetworkConnector } from "./NetworkConnector";
import { PortisConnector } from "@web3-react/portis-connector";
import { TorusConnector } from "@web3-react/torus-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import { Web3Provider } from "@ethersproject/providers";
import { RPC } from "../constants/networks";

export const network = new NetworkConnector({
  defaultChainId: 1,
  urls: RPC,
});

let networkLibrary: Web3Provider | undefined;
export function getNetworkLibrary(): Web3Provider {
  return (networkLibrary = networkLibrary ?? new Web3Provider(network.provider as any));
}

export const injected = new InjectedConnector({
  supportedChainIds: [
    1, // mainnet
    3, // ropsten
    4, // rinkeby
    5, // goreli
    42, // kovan
    250, // fantom
    4002, // fantom testnet
    137, // matic
    80001, // matic testnet
    56, // binance smart chain
    97, // binance smart chain testnet
    43114, // avalanche
    43113, // fuji
  ],
});

// mainnet only
export const walletconnect = new WalletConnectConnector({
  rpc: {
    [ChainId.MAINNET]: RPC[ChainId.MAINNET],
  },
  bridge: "https://bridge.walletconnect.org",
  qrcode: true,
  pollingInterval: 15000,
});

// mainnet only
export const lattice = new LatticeConnector({
  chainId: 1,
  url: RPC[ChainId.MAINNET],
  appName: "SushiSwap",
});

// mainnet only
export const fortmatic = new FortmaticConnector({
  apiKey: process.env.REACT_APP_FORTMATIC_API_KEY ?? "",
  chainId: 1,
});

// mainnet only
export const portis = new PortisConnector({
  dAppId: process.env.REACT_APP_PORTIS_ID ?? "",
  networks: [1],
});

// mainnet only
export const walletlink = new WalletLinkConnector({
  url: RPC[ChainId.MAINNET],
  appName: "SushiSwap",
  appLogoUrl: "https://raw.githubusercontent.com/sushiswap/art/master/sushi/logo-256x256.png",
});

// mainnet only
export const torus = new TorusConnector({
  chainId: 1,
});
