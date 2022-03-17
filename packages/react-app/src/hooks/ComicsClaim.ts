import { useContext, useEffect, useState } from 'react';
import { ChainId } from '@sushiswap/sdk';
import { BigNumber, utils } from 'ethers';
import { NetworkContext } from 'NetworkProvider';
import { submitTxWithGasEstimate } from 'helpers/Notifier';
import { useComicsMerkleDistributorContract } from './useMerkleDistributorContract';
import useSingleCallResult from './useSingleCallResult';
import { DEBUG, COMICS_MERKLE_ROOT } from '../constants';

const { getAddress, formatEther, isAddress } = utils;

interface UserClaimData {
  index: number;
  amount0: string;
  amount1: string;
  proof: string[];
}

const CLAIM_PROMISES: { [key: string]: Promise<any | UserClaimData | null> } = {};

// returns the claim for the given address, or null if not valid
function fetchClaim(account: string, chainId: ChainId): Promise<any | UserClaimData | null> {
  if (!isAddress(account)) return Promise.reject(new Error('Invalid address'));
  const key = `${chainId}:${account}`;
  // eslint-disable-next-line no-return-assign
  return (CLAIM_PROMISES[key] =
    CLAIM_PROMISES[key] ??
    fetch(COMICS_MERKLE_ROOT)
      .then(response => response.json())
      .then((data: { claims: { [address: string]: UserClaimData } }) => {
        const claim: UserClaimData | undefined = data.claims[getAddress(account)] ?? undefined;
        if (!claim) return null;
        return {
          index: claim.index,
          amount0: claim.amount0,
          amount1: claim.amount1,
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

// check if user is in blob and has not yet claimed comics
export function useUserHasAvailableClaim(userClaimData: UserClaimData | null | undefined): boolean {
  const distributorContract = useComicsMerkleDistributorContract();
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

export type ClaimResult = { p5: number; p6: number };

export function useUserUnclaimedAmount(): ClaimResult {
  const userClaimData = useUserClaimData();
  const canClaim = useUserHasAvailableClaim(userClaimData);
  if (DEBUG) console.log('claimStats:', { canClaim, userClaimData });
  if (!canClaim || !userClaimData) return { p5: 0, p6: 0 };
  return { p5: BigNumber.from(userClaimData.amount0).toNumber(), p6: BigNumber.from(userClaimData.amount1).toNumber() };
}

export function useClaimCallback(): { claimCallback: () => Promise<void> } {
  const { selectedChainId, address: account, tx } = useContext(NetworkContext);
  // get claim data for this account
  const claimData = useUserClaimData();
  const distributorContract = useComicsMerkleDistributorContract();

  const claimCallback = async () => {
    if (!claimData || !account || !selectedChainId || !distributorContract) return;
    const args = [claimData.index, account, claimData.amount0, claimData.amount1, claimData.proof];
    await submitTxWithGasEstimate(tx, distributorContract, 'claim', args);
  };

  return { claimCallback };
}
