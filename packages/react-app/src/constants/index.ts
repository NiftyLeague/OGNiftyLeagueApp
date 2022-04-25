import { ChainId } from '@sushiswap/sdk';
import { Rental } from 'types/api';

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

export const REMOVED_TRAITS_INTERVAL = DEBUG ? 20000 : 60000;
export const NFT_PRICE_INTERVAL = DEBUG ? 300000 : 60000;
export const TOTAL_SUPPLY_INTERVAL = DEBUG ? 300000 : 60000;
export const ETH_EXCHANGE_PRICE_INTERVAL = DEBUG ? 300000 : 300000;
export const BALANCE_INTERVAL = DEBUG ? 300000 : 10000;
export const READ_CONTRACT_DEFAULT_INTERVAL = 600000; // 10m
export const CHARACTERS_SUBGRAPH_INTERVAL = DEBUG ? 5000 : 60000;
export const CACHED_SUBGRAPH_INTERVAL = DEBUG ? 300000 : 10000;

export const CACHE_URL = `${process.env.REACT_APP_CACHE_SUBGRAPH_URL as string}?network=${
  process.env.REACT_APP_NETWORK as string
}&version=${process.env.REACT_APP_SUBGRAPH_VERSION as string}&characters=false`;

export const SORT_KEYS = [
  {
    display: 'Sort by Price (Highest)',
    key: 'priceHighest',
    isAscending: true,
  },
  {
    display: 'Sort by Price (Lowest)',
    key: 'priceLowest',
    isAscending: false,
  },
  {
    display: 'Sort by Rentals (Highest)',
    key: 'rentalsHighest',
    isAscending: true,
  },
  {
    display: 'Sort by Rentals (Lowest)',
    key: 'rentalsLowest',
    isAscending: false,
  },
  {
    display: 'Sort by Total Multipliers (Highest)',
    key: 'multipliersHighest',
    isAscending: true,
  },
  {
    display: 'Sort by Total Multipliers (Lowest)',
    key: 'multipliersLowest',
    isAscending: false,
  },
  {
    display: 'Sort by Name (Ascending)',
    key: 'nameAscending',
    isAscending: true,
  },
  {
    display: 'Sort by Name (Descending)',
    key: 'nameDescending',
    isAscending: false,
  },
  {
    display: 'Sort by Id (Ascending)',
    key: 'idAscending',
    isAscending: true,
  },
  {
    display: 'Sort by Id (Descending)',
    key: 'idDescending',
    isAscending: false,
  },
  {
    display: 'Sort Randomly',
    key: 'random',
    isAscending: false,
  },
];

export const SORT_FUNCTION = {
  priceHighest: (a: Rental, b: Rental): number => a.price - b.price,
  priceLowest: (a: Rental, b: Rental): number => b.price - a.price,
  rentalsHighest: (a: Rental, b: Rental): number => a.rental_count - b.rental_count,
  rentalsLowest: (a: Rental, b: Rental): number => b.rental_count - a.rental_count,
  multipliersHighest: (a: Rental, b: Rental): number => a.multiplier - b.multiplier,
  multipliersLowest: (a: Rental, b: Rental): number => b.multiplier - a.multiplier,
  nameAscending: (a: Rental, b: Rental): number => {
    return a.name ? a.name.localeCompare(b.name || 'z') : -1;
  },
  nameDescending: (a: Rental, b: Rental): number => {
    return b.name ? b.name.localeCompare(a.name || 'z') : -1;
  },
  idAscending: (a: Rental, b: Rental): number => {
    return parseInt(a.id, 10) - parseInt(b.id, 10);
  },
  idDescending: (a: Rental, b: Rental): number => {
    return parseInt(b.id, 10) - parseInt(a.id, 10);
  },
  random: (): number => 0.5 - Math.random(),
};
