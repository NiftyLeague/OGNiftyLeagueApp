import { BigNumber, ethers, providers } from 'ethers';

export type MainnetProvider = providers.InfuraProvider | providers.EtherscanProvider | providers.AlchemyProvider;

export type LocalProvider = providers.JsonRpcProvider | MainnetProvider;

export type UserProvider = providers.Web3Provider;

export type Provider = LocalProvider | UserProvider | providers.Provider;

export interface Ethereumish {
  autoRefreshOnNetworkChange?: boolean;
  chainId?: string;
  enable?: () => Promise<any>;
  isMetaMask?: boolean;
  isStatus?: boolean;
  networkVersion?: string;
  on?: (...args: any[]) => void;
  removeListener?: (...args: any[]) => void;
  request?: (request: { method: string; params?: Array<any> }) => Promise<any>;
  selectedAddress?: string;
  send?: (request: { method: string; params?: Array<any> }, callback: (error: any, response: any) => void) => void;
  sendAsync?: (request: { method: string; params?: Array<any> }, callback: (error: any, response: any) => void) => void;
}

export interface Contracts {
  [contractName: string]: ethers.Contract;
}

export type NetworkName = 'localhost' | 'mainnet' | 'ropsten' | 'rinkeby' | 'goerli' | 'kovan' | 'matic' | 'maticmum';

export interface Network {
  blockExplorer: string;
  chainId: number;
  faucet?: string;
  gasPrice?: BigNumber;
  label: string;
  name?: NetworkName;
  rpcUrl: string;
}

export interface GasStationResponse {
  fast: number;
  fastest: number;
  safeLow: number;
  average: number;
  block_time: number;
  blockNum: number;
  speed: number;
  safeLowWait: number;
  avgWait: number;
  fastWait: number;
  fastestWait: number;
  gasPriceRange: { [range: string]: number };
}
