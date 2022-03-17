import { ChainId } from '@sushiswap/sdk';
import { LOCAL_CHAIN_ID } from './networks';

export const NFT_CONTRACT = 'NiftyDegen';

export const NFTL_CONTRACT = 'NFTLToken';

export const MERKLE_DISTRIBUTOR_ADDRESS = {
  [LOCAL_CHAIN_ID]: '0x998abeb3E57409262aE5b751f60747921B33613E',
  [ChainId.MAINNET]: '0x921c673a4d2f6a429551c0726316c1ad07571db5',
  [ChainId.RINKEBY]: '0xFeB2f45A3817EF9156a6c771FfC90098d3DFe003',
  [ChainId.ROPSTEN]: '0x84d1f7202e0e7dac211617017ca72a2cb5e2b955',
};

export const MERKLE_ROOT = 'https://raw.githubusercontent.com/NiftyLeague/merkle-distributor/master/data/result.json';

export const COMICS_MERKLE_DISTRIBUTOR_ADDRESS = {
  [LOCAL_CHAIN_ID]: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
  [ChainId.MAINNET]: '0x038FbfE31A113952C15C688Df5b025959f589ad7',
  [ChainId.RINKEBY]: '0x5DCcEEd8E10a3EE1aF095B248ad66E8F33875045',
};

export const COMICS_MERKLE_ROOT =
  'https://raw.githubusercontent.com/NiftyLeague/merkle-distributor-comics56/main/data/result.json';
