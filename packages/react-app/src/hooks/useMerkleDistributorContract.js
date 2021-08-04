import { useContext, useMemo } from 'react';
import { NetworkContext } from 'NetworkProvider';
import { getContract } from 'helpers';
import { MERKLE_DISTRIBUTOR_ADDRESS } from '../constants';
import MERKLE_DISTRIBUTOR_ABI from '../constants/abis/merkle-distributor.json';

function useContract(address, ABI, withSignerIfPossible = true) {
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

export default function useMerkleDistributorContract() {
  const { selectedChainId } = useContext(NetworkContext);
  return useContract(
    selectedChainId ? MERKLE_DISTRIBUTOR_ADDRESS[selectedChainId] : undefined,
    MERKLE_DISTRIBUTOR_ABI,
    true,
  );
}
