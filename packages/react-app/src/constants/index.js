export * from './characters';
export * from './contracts';
export * from './networks';
export * from './tokens';

// MY INFURA_ID, SWAP IN YOURS FROM https://infura.io/dashboard/ethereum
export const INFURA_ID = process.env.REACT_APP_INFURA_PROJECT_ID;

// MY ALCHEMY_ID, SWAP IN YOURS FROM https://dashboard.alchemyapi.io/
export const ALCHEMY_ID = process.env.REACT_APP_ALCHEMY_API;

// MY ETHERSCAN_ID, SWAP IN YOURS FROM https://etherscan.io/myapikey
export const ETHERSCAN_KEY = process.env.REACT_APP_ETHERSCAN_KEY;

// BLOCKNATIVE ID FOR Notify.js:
export const BLOCKNATIVE_DAPPID = process.env.REACT_APP_BLOCKNATIVE_DAPPID;

export const SUBGRAPH_URI = `${process.env.REACT_APP_SUBGRAPH_URI}${process.env.REACT_APP_SUBGRAPH_VERSION}`;

export const IPNS_URL = `${process.env.REACT_APP_IPFS_GATEWAY}/ipns/${process.env.REACT_APP_IPNS_ID}`;

export const DEBUG = process.env.NODE_ENV === 'development' || process.env.REACT_APP_DEBUG;

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

export const CACHE_URL = `https://odgwhiwhzb.execute-api.us-east-1.amazonaws.com/prod/info?network=${process.env.REACT_APP_NETWORK}&version=0.0.5&characters=false`;
