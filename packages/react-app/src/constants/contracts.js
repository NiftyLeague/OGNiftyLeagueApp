import { ChainId } from "@sushiswap/sdk";
import { LOCAL_CHAIN_ID } from "./networks";
// import { Interface } from "@ethersproject/abi";
// import { abi as STAKING_REWARDS_ABI } from "@uniswap/liquidity-staker/build/StakingRewards.json";
// import { abi as STAKING_REWARDS_FACTORY_ABI } from "@uniswap/liquidity-staker/build/StakingRewardsFactory.json";

export const NFT_CONTRACT = "NiftyDegen";

export const NFTL_CONTRACT = "NFTLToken";

// export const STAKING_REWARDS_INTERFACE = new Interface(STAKING_REWARDS_ABI);

// export const STAKING_REWARDS_FACTORY_INTERFACE = new Interface(STAKING_REWARDS_FACTORY_ABI);

export const TIMELOCK_ADDRESS = "0x1a9C8182C09F50C8318d769245beA52c32BE35BC";

export const MERKLE_DISTRIBUTOR_ADDRESS = {
  [LOCAL_CHAIN_ID]: "0x998abeb3E57409262aE5b751f60747921B33613E",
  [ChainId.MAINNET]: "0xcBE6B83e77cdc011Cc18F6f0Df8444E5783ed982",
  [ChainId.RINKEBY]: "0x4181E2Ba0c9A29e1058Beb525465411B962514C5",
  [ChainId.ROPSTEN]: "0x84d1f7202e0e7dac211617017ca72a2cb5e2b955",
};

export const MERKLE_ROOT = "https://raw.githubusercontent.com/NiftyLeague/merkle-distributor/master/data/result.json";

export const MASTERCHEF_V2_ADDRESS = {
  [LOCAL_CHAIN_ID]: "0xEF0881eC094552b2e128Cf945EF17a6752B4Ec5d",
  [ChainId.MAINNET]: "0xEF0881eC094552b2e128Cf945EF17a6752B4Ec5d",
  [ChainId.RINKEBY]: "0xEF0881eC094552b2e128Cf945EF17a6752B4Ec5d",
  [ChainId.ROPSTEN]: "0xEF0881eC094552b2e128Cf945EF17a6752B4Ec5d",
};
