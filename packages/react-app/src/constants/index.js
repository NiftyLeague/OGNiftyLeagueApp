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

export const IPNS_URL = `${process.env.REACT_APP_IPFS_GATEWAY}/ipns/${process.env.REACT_APP_IPNS_ID}`;

export const NFT_CONTRACT = "NiftyDegen";
export const NFTL_CONTRACT = "NFTLToken";

export const DEBUG = process.env.NODE_ENV === "development";

// Request polling intervals

export const REMOVED_TRAITS_INTERVAL = DEBUG ? 20000 : 10000;
export const NFT_PRICE_INTERVAL = DEBUG ? 60000 : 20000;
export const TOTAL_SUPPLY_INTERVAL = DEBUG ? 60000 : 30000;
export const NFTL_CLAIMABLE_INTERVAL = DEBUG ? 60000 : 10000;
