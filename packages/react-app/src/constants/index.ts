import { ChainId } from "@sushiswap/sdk";
import { fortmatic, injected, lattice, portis, torus, walletconnect, walletlink } from "../connectors";
import { AbstractConnector } from "@web3-react/abstract-connector";
export * from "./networks";
export * from "./tokens";

// MY INFURA_ID, SWAP IN YOURS FROM https://infura.io/dashboard/ethereum
export const INFURA_ID = process.env.REACT_APP_INFURA_PROJECT_ID;

// MY ALCHEMY_ID, SWAP IN YOURS FROM https://dashboard.alchemyapi.io/
export const ALCHEMY_ID = process.env.REACT_APP_ALCHEMY_API;

// MY ETHERSCAN_ID, SWAP IN YOURS FROM https://etherscan.io/myapikey
export const ETHERSCAN_KEY = process.env.REACT_APP_ETHERSCAN_KEY;

// BLOCKNATIVE ID FOR Notify.js:
export const BLOCKNATIVE_DAPPID = process.env.REACT_APP_BLOCKNATIVE_DAPPID;

export const NFT_CONTRACT = "NiftyDegen";
export const NFTL_CONTRACT = "NFTLToken";

export const DEBUG = process.env.NODE_ENV === "development";

// Request polling intervals

export const REMOVED_TRAITS_INTERVAL = DEBUG ? 20000 : 10000;
export const NFT_PRICE_INTERVAL = DEBUG ? 60000 : 20000;
export const TOTAL_SUPPLY_INTERVAL = DEBUG ? 60000 : 30000;
export const NFTL_CLAIMABLE_INTERVAL = DEBUG ? 60000 : 10000;

// TODO: specify merkle distributor for mainnet
export const MERKLE_DISTRIBUTOR_ADDRESS: { [chainId in ChainId]?: string } = {
  [ChainId.MAINNET]: "0xcBE6B83e77cdc011Cc18F6f0Df8444E5783ed982",
  [ChainId.ROPSTEN]: "0x84d1f7202e0e7dac211617017ca72a2cb5e2b955",
};

// TODO: update weekly with new constant
export const MERKLE_ROOT =
  "https://raw.githubusercontent.com/sushiswap/sushi-vesting/master/merkle/week-08/merkle-10959148-11322822.json";

export interface WalletInfo {
  connector?: AbstractConnector;
  name: string;
  iconName: string;
  description: string;
  href: string | null;
  color: string;
  primary?: true;
  mobile?: true;
  mobileOnly?: true;
}

export const SUPPORTED_WALLETS: { [key: string]: WalletInfo } = {
  INJECTED: {
    connector: injected,
    name: "Injected",
    iconName: "arrow-right.svg",
    description: "Injected web3 provider.",
    href: null,
    color: "#010101",
    primary: true,
  },
  METAMASK: {
    connector: injected,
    name: "MetaMask",
    iconName: "metamask.png",
    description: "Easy-to-use browser extension.",
    href: null,
    color: "#E8831D",
  },
  WALLET_CONNECT: {
    connector: walletconnect,
    name: "WalletConnect",
    iconName: "walletConnectIcon.svg",
    description: "Connect to Trust Wallet, Rainbow Wallet and more...",
    href: null,
    color: "#4196FC",
    mobile: true,
  },
  LATTICE: {
    connector: lattice,
    name: "Lattice",
    iconName: "gridPlusWallet.png",
    description: "Connect to GridPlus Wallet.",
    href: null,
    color: "#40a9ff",
    mobile: true,
  },
  WALLET_LINK: {
    connector: walletlink,
    name: "Coinbase Wallet",
    iconName: "coinbaseWalletIcon.svg",
    description: "Use Coinbase Wallet app on mobile device",
    href: null,
    color: "#315CF5",
  },
  COINBASE_LINK: {
    name: "Open in Coinbase Wallet",
    iconName: "coinbaseWalletIcon.svg",
    description: "Open in Coinbase Wallet app.",
    href: "https://go.cb-w.com",
    color: "#315CF5",
    mobile: true,
    mobileOnly: true,
  },
  FORTMATIC: {
    connector: fortmatic,
    name: "Fortmatic",
    iconName: "fortmaticIcon.png",
    description: "Login using Fortmatic hosted wallet",
    href: null,
    color: "#6748FF",
    mobile: true,
  },
  Portis: {
    connector: portis,
    name: "Portis",
    iconName: "portisIcon.png",
    description: "Login using Portis hosted wallet",
    href: null,
    color: "#4A6C9B",
    mobile: true,
  },
  Torus: {
    connector: torus,
    name: "Torus",
    iconName: "torusIcon.png",
    description: "Login using Torus hosted wallet",
    href: null,
    color: "#315CF5",
    mobile: true,
  },
};
