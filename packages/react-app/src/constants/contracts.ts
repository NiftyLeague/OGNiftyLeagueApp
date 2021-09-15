import { ChainId } from '@sushiswap/sdk';
import { LOCAL_CHAIN_ID } from './networks';

export const NFT_CONTRACT = 'NiftyDegen';

export const NFTL_CONTRACT = 'NFTLToken';

export const MERKLE_DISTRIBUTOR_ADDRESS = {
  [LOCAL_CHAIN_ID]: '0x998abeb3E57409262aE5b751f60747921B33613E',
  [ChainId.MAINNET]: '0x96192Bbeb47F3f97927C18f274bE5B50360b9c61',
  [ChainId.RINKEBY]: '0x9F6a8f8c3511A9d10752930d362D7A29779A6492',
  [ChainId.ROPSTEN]: '0x84d1f7202e0e7dac211617017ca72a2cb5e2b955',
};

export const MERKLE_ROOT = 'https://raw.githubusercontent.com/NiftyLeague/merkle-distributor/master/data/result.json';
