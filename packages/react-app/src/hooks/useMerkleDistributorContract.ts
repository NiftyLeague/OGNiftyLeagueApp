import { useContext, useMemo } from 'react';
import { Contract } from 'ethers';
import { NetworkContext } from 'NetworkProvider';
import { getContract } from 'helpers';
import { COMICS_MERKLE_DISTRIBUTOR_ADDRESS, MERKLE_DISTRIBUTOR_ADDRESS } from '../constants';
import COMICS_MERKLE_DISTRIBUTOR_ABI from '../constants/abis/comics-merkle-distributor.json';
import MERKLE_DISTRIBUTOR_ABI from '../constants/abis/merkle-distributor.json';

function useContract(address: string, ABI, withSignerIfPossible = true) {
  const { userProvider, address: account } = useContext(NetworkContext);

  return useMemo(() => {
    if (!address || !ABI || !userProvider) return null;
    try {
      return getContract(address, ABI, userProvider, withSignerIfPossible && account ? account : undefined);
    } catch (error) {
      console.error('Failed to get contract', error);
      return null;
    }
  }, [address, ABI, userProvider, withSignerIfPossible, account]);
}

export default function useMerkleDistributorContract(): Contract | null {
  const { selectedChainId } = useContext(NetworkContext);
  return useContract(
    selectedChainId ? MERKLE_DISTRIBUTOR_ADDRESS[selectedChainId] : undefined,
    MERKLE_DISTRIBUTOR_ABI,
    true,
  );
}

export function useComicsMerkleDistributorContract(): Contract | null {
  const { selectedChainId } = useContext(NetworkContext);
  return useContract(
    selectedChainId ? COMICS_MERKLE_DISTRIBUTOR_ADDRESS[selectedChainId] : undefined,
    COMICS_MERKLE_DISTRIBUTOR_ABI,
    true,
  );
}
