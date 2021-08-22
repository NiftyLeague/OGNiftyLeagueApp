import { useContext, useEffect, useState } from 'react';
import { ChainId } from '@sushiswap/sdk';
import { utils } from 'ethers';
import { NetworkContext } from 'NetworkProvider';
import { submitTxWithGasEstimate } from 'helpers/Notifier';
import useMerkleDistributorContract from './useMerkleDistributorContract';
import useSingleCallResult from './useSingleCallResult';
import { DEBUG, MERKLE_ROOT } from '../constants';

const { getAddress, formatEther, isAddress } = utils;

interface UserClaimData {
  index: number;
  amount: string;
  proof: string[];
  flags?: {
    isSOCKS: boolean;
    isLP: boolean;
    isUser: boolean;
  };
}

const CLAIM_PROMISES: { [key: string]: Promise<any | UserClaimData | null> } = {};

// returns the claim for the given address, or null if not valid
function fetchClaim(account: string, chainId: ChainId): Promise<any | UserClaimData | null> {
  if (!isAddress(account)) return Promise.reject(new Error('Invalid address'));
  const key = `${chainId}:${account}`;
  // eslint-disable-next-line no-return-assign
  return (CLAIM_PROMISES[key] =
    CLAIM_PROMISES[key] ??
    fetch(MERKLE_ROOT)
      .then(response => response.json())
      .then((data: { claims: { [address: string]: UserClaimData } }) => {
        const claim: UserClaimData | undefined = data.claims[getAddress(account)] ?? undefined;
        if (!claim) return null;
        return {
          index: claim.index,
          amount: claim.amount,
          proof: claim.proof,
        };
      })
      .catch(error => console.error('Failed to get claim data', error)));
}

// parse distributorContract blob and detect if user has claim data
// null means we know it does not
export function useUserClaimData(): UserClaimData | null | undefined {
  const { selectedChainId, address: account } = useContext(NetworkContext);
  const key = `${selectedChainId as number}:${account}`;
  const [claimInfo, setClaimInfo] = useState<{
    [key: string]: UserClaimData | null;
  }>({});

  useEffect(() => {
    if (!account || !selectedChainId) return;
    void fetchClaim(account, selectedChainId).then((accountClaimInfo: UserClaimData) =>
      setClaimInfo(prevClaimInfo => ({
        ...prevClaimInfo,
        [key]: accountClaimInfo,
      })),
    );
  }, [account, selectedChainId, key]);

  return account && selectedChainId ? claimInfo[key] : undefined;
}

// check if user is in blob and has not yet claimed UNI
export function useUserHasAvailableClaim(userClaimData: UserClaimData | null | undefined): boolean {
  const distributorContract = useMerkleDistributorContract();
  const skipIf = userClaimData?.index === undefined;
  const isClaimedResult = useSingleCallResult(
    // @ts-expect-error ts-migrate(2322) FIXME: Type 'Contract | null' is not assignable to type '... Remove this comment to see the full error message
    { MerkleDistributor: distributorContract },
    'MerkleDistributor',
    'isClaimed',
    [userClaimData?.index],
    null,
    skipIf,
  );
  // user is in blob and contract marks as unclaimed
  return Boolean(userClaimData && isClaimedResult === false);
}

export function useUserUnclaimedAmount(): string {
  const userClaimData = useUserClaimData();
  const canClaim = useUserHasAvailableClaim(userClaimData);
  if (DEBUG) console.log('claimStats:', { canClaim, userClaimData });
  if (!canClaim || !userClaimData) return '0';
  return formatEther(userClaimData.amount);
}

export function useClaimCallback(): { claimCallback: () => Promise<void> } {
  const { selectedChainId, address: account, tx } = useContext(NetworkContext);
  // get claim data for this account
  const claimData = useUserClaimData();
  const distributorContract = useMerkleDistributorContract();

  const claimCallback = async () => {
    if (!claimData || !account || !selectedChainId || !distributorContract) return;
    const args = [claimData.index, account, claimData.amount, claimData.proof];
    await submitTxWithGasEstimate(tx, distributorContract, 'claim', args);
  };

  return { claimCallback };
}
