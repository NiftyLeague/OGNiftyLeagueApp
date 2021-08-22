import { ChainId } from '@sushiswap/sdk';
import DAI_ABI from './abis/dai.json';
import MERKLE_ABI from './abis/merkle-distributor.json';
import { MERKLE_DISTRIBUTOR_ADDRESS } from './contracts';
import { LOCAL_CHAIN_ID } from './networks';

const EXTERNAL_CONTRACTS: { [chainId: number]: { [contractName: string]: { address: string; abi: any[] } } } = {
  [LOCAL_CHAIN_ID]: {
    MerkleDistributor: {
      address: MERKLE_DISTRIBUTOR_ADDRESS[LOCAL_CHAIN_ID],
      abi: MERKLE_ABI,
    },
  },
  [ChainId.MAINNET]: {
    DAI: {
      address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
      abi: DAI_ABI,
    },
    MerkleDistributor: {
      address: MERKLE_DISTRIBUTOR_ADDRESS[ChainId.MAINNET],
      abi: MERKLE_ABI,
    },
  },
  [ChainId.ROPSTEN]: {
    MerkleDistributor: {
      address: MERKLE_DISTRIBUTOR_ADDRESS[ChainId.ROPSTEN],
      abi: MERKLE_ABI,
    },
  },
  [ChainId.RINKEBY]: {
    MerkleDistributor: {
      address: MERKLE_DISTRIBUTOR_ADDRESS[ChainId.RINKEBY],
      abi: MERKLE_ABI,
    },
  },
};

export default EXTERNAL_CONTRACTS;
