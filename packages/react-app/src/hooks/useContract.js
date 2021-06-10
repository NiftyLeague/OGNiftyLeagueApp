import { useMemo } from "react";
import { ChainId } from "@sushiswap/sdk";

import { abi as MERKLE_DISTRIBUTOR_ABI } from "@uniswap/merkle-distributor/build/MerkleDistributor.json";
import { getContract } from "../helpers";
import { MERKLE_DISTRIBUTOR_ADDRESS } from "../constants";
import { MULTICALL_ABI, MULTICALL_NETWORKS } from "../constants/multicall";
import { useActiveWeb3React } from "./useActiveWeb3React";
import ENS_ABI from "../constants/abis/ens-registrar.json";
import ENS_PUBLIC_RESOLVER_ABI from "../constants/abis/ens-public-resolver.json";
import MASTERCHEFV2_ABI from "../constants/abis/masterchefv2.json";

// returns null on errors
export function useContract(address, ABI, withSignerIfPossible = true) {
  const { library, account } = useActiveWeb3React();

  return useMemo(() => {
    if (!address || !ABI || !library) return null;
    try {
      return getContract(address, ABI, library, withSignerIfPossible && account ? account : undefined);
    } catch (error) {
      console.error("Failed to get contract", error);
      return null;
    }
  }, [address, ABI, library, withSignerIfPossible, account]);
}

export function useENSRegistrarContract(withSignerIfPossible) {
  const { chainId } = useActiveWeb3React();
  let address;
  if (chainId) {
    switch (chainId) {
      case ChainId.MAINNET:
      case ChainId.GÖRLI:
      case ChainId.ROPSTEN:
      case ChainId.RINKEBY:
        address = "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e";
        break;
    }
  }
  return useContract(address, ENS_ABI, withSignerIfPossible);
}

export function useENSResolverContract(address, withSignerIfPossible) {
  return useContract(address, ENS_PUBLIC_RESOLVER_ABI, withSignerIfPossible);
}

export function useMerkleDistributorContract() {
  const { chainId } = useActiveWeb3React();
  return useContract(chainId ? MERKLE_DISTRIBUTOR_ADDRESS[chainId] : undefined, MERKLE_DISTRIBUTOR_ABI, true);
}

export function useMulticallContract() {
  const { chainId } = useActiveWeb3React();
  return useContract(chainId && MULTICALL_NETWORKS[chainId], MULTICALL_ABI, false);
}

export function useMasterChefV2Contract(withSignerIfPossible) {
  const { chainId } = useActiveWeb3React();
  let address;
  if (chainId) {
    switch (chainId) {
      case ChainId.MAINNET:
        address = "0xEF0881eC094552b2e128Cf945EF17a6752B4Ec5d";
        break;
    }
  }
  return useContract(address, MASTERCHEFV2_ABI, withSignerIfPossible);
}
