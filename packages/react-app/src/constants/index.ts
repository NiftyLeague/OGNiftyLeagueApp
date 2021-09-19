import { ChainId } from '@sushiswap/sdk';

export * from './characters';
export * from './contracts';
export * from './networks';
export * from './tokens';

export const DEPLOYER_ADDRESS = process.env.REACT_APP_DEPLOYER_ADDRESS as string;

// MY ALCHEMY_ID, SWAP IN YOURS FROM https://dashboard.alchemyapi.io/
export const ALCHEMY_ID: { [key in ChainId]?: string } = {
  [ChainId.MAINNET]: process.env.REACT_APP_ALCHEMY_MAINNET_API as string,
  [ChainId.RINKEBY]: process.env.REACT_APP_ALCHEMY_RINKEBY_API as string,
};

export const SUBGRAPH_URI = `${process.env.REACT_APP_SUBGRAPH_URI as string}${
  process.env.REACT_APP_SUBGRAPH_VERSION as string
}`;

export const IPNS_URL = `${process.env.REACT_APP_IPFS_GATEWAY as string}/ipns/${
  process.env.REACT_APP_IPNS_ID as string
}`;

export const DEBUG = process.env.NODE_ENV === 'development' || process.env.REACT_APP_DEBUG === 'true';

// Request polling intervals

export const REMOVED_TRAITS_INTERVAL = DEBUG ? 20000 : 10000;
export const NFT_PRICE_INTERVAL = DEBUG ? 300000 : 60000;
export const TOTAL_SUPPLY_INTERVAL = DEBUG ? 300000 : 60000;
export const ETH_EXCHANGE_PRICE_INTERVAL = DEBUG ? 300000 : 300000;
export const BALANCE_INTERVAL = DEBUG ? 300000 : 60000;
export const READ_CONTRACT_DEFAULT_INTERVAL = 600000; // 10m
export const CHARACTERS_SUBGRAPH_INTERVAL = DEBUG ? 5000 : 20000;
export const CACHED_SUBGRAPH_INTERVAL = DEBUG ? 300000 : 10000;

// July 31, 2021 at 9:50 PM GMT
export const AXS_AIRDROP_TIMESTAMP = 1627768200;

export const CACHE_URL = `https://odgwhiwhzb.execute-api.us-east-1.amazonaws.com/prod/info?network=${
  process.env.REACT_APP_NETWORK as string
}&version=${process.env.REACT_APP_SUBGRAPH_VERSION as string}&characters=false`;
