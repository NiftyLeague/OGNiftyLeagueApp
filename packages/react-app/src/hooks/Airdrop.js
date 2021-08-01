import { useContext, useEffect, useState } from "react";
import { getAddress, isAddress } from "@ethersproject/address";
import { formatEther } from "@ethersproject/units";
import { NetworkContext } from "NetworkProvider";
import { calculateGasMargin } from "helpers";
import useMerkleDistributorContract from "./useMerkleDistributorContract";
import useSingleCallResult from "./useSingleCallResult";
import { DEBUG, MERKLE_ROOT } from "../constants";

const CLAIM_PROMISES = {};

// returns the claim for the given address, or null if not valid
function fetchClaim(account, chainId) {
  if (!isAddress(account)) return Promise.reject(new Error("Invalid address"));
  const key = `${chainId}:${account}`;
  // eslint-disable-next-line no-return-assign
  return (CLAIM_PROMISES[key] =
    CLAIM_PROMISES[key] ??
    fetch(MERKLE_ROOT)
      .then(response => response.json())
      .then(data => {
        const claim = data.claims[getAddress(account)] ?? undefined;
        if (!claim) return null;
        return {
          index: claim.index,
          amount: claim.amount,
          proof: claim.proof,
        };
      })
      .catch(error => console.error("Failed to get claim data", error)));
}

// parse distributorContract blob and detect if user has claim data
// null means we know it does not
export function useUserClaimData() {
  const { selectedChainId, address: account } = useContext(NetworkContext);
  const key = `${selectedChainId}:${account}`;
  const [claimInfo, setClaimInfo] = useState({});

  useEffect(() => {
    if (!account || !selectedChainId) return;
    fetchClaim(account, selectedChainId).then(accountClaimInfo =>
      setClaimInfo(prevClaimInfo => ({
        ...prevClaimInfo,
        [key]: accountClaimInfo,
      })),
    );
  }, [account, selectedChainId, key]);

  return account && selectedChainId ? claimInfo[key] : undefined;
}

// check if user is in blob and has not yet claimed UNI
export function useUserHasAvailableClaim(userClaimData) {
  const distributorContract = useMerkleDistributorContract();
  const skipIf = userClaimData?.index === undefined;
  const isClaimedResult = useSingleCallResult(
    { MerkleDistributor: distributorContract },
    "MerkleDistributor",
    "isClaimed",
    [userClaimData?.index],
    null,
    skipIf,
  );
  // user is in blob and contract marks as unclaimed
  return Boolean(userClaimData && isClaimedResult === false);
}

export function useUserUnclaimedAmount() {
  const userClaimData = useUserClaimData();
  const canClaim = useUserHasAvailableClaim(userClaimData);
  if (DEBUG) console.log("claimStats:", { canClaim, userClaimData });
  if (!canClaim || !userClaimData) return 0;
  return formatEther(userClaimData.amount);
}

export function useClaimCallback() {
  const { selectedChainId, address: account, tx } = useContext(NetworkContext);
  // get claim data for this account
  const claimData = useUserClaimData();
  const distributorContract = useMerkleDistributorContract();

  const claimCallback = async function () {
    if (!claimData || !account || !selectedChainId || !distributorContract) return;

    const args = [claimData.index, account, claimData.amount, claimData.proof];

    // eslint-disable-next-line consistent-return
    return distributorContract.estimateGas.claim(...args, {}).then(estimatedGasLimit => {
      return tx(
        distributorContract.claim(...args, {
          value: null,
          gasLimit: calculateGasMargin(estimatedGasLimit),
        }),
      );
    });
  };

  return { claimCallback };
}
