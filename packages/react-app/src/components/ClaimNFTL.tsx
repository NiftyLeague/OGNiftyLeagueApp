import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Button } from 'antd';
import makeStyles from '@mui/styles/makeStyles';
import { useClaimableNFTL } from 'hooks';
import { NetworkContext } from 'NetworkProvider';
import Tooltip from './Tooltip';
import { DEBUG, NFTL_CONTRACT } from '../constants';

const useStyles = makeStyles(theme => ({
  claimContainer: { margin: 'auto' },
}));

const ClaimNFTL = ({
  tokenIndices,
  singleClaim,
  displayTooltip,
}: {
  tokenIndices: number[];
  singleClaim?: boolean;
  displayTooltip?: boolean;
}): JSX.Element | null => {
  const classes = useStyles();
  const { tx, writeContracts } = useContext(NetworkContext);
  const [mockAccumulated, setMockAccumulated] = useState(0);
  const [refreshKey, setRefreshKey] = useState(0);
  const totalAccumulated = useClaimableNFTL(writeContracts, tokenIndices, refreshKey);

  useEffect(() => {
    if (totalAccumulated) setMockAccumulated(totalAccumulated);
  }, [totalAccumulated]);

  const handleClaimNFTL = useCallback(async () => {
    if (DEBUG) console.log('claim', tokenIndices, totalAccumulated);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    await tx(writeContracts[NFTL_CONTRACT].claim(tokenIndices));
    setMockAccumulated(0);
    setTimeout(() => setRefreshKey(Math.random() + 1), 5000);
  }, [tokenIndices, totalAccumulated, tx, writeContracts]);

  const btnStyles = {
    verticalAlign: 'top',
    background: '-webkit-linear-gradient(89deg, #620edf 0%, #5e72eb 100%)',
    color: '#fff',
    borderColor: '#6f6c6c',
  };

  if (!mockAccumulated) return singleClaim ? null : <>0.00 NFTL</>;

  const amountParsed = mockAccumulated.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return singleClaim ? (
    <>
      {mockAccumulated > 0.0 && writeContracts[NFTL_CONTRACT] && (
        <Tooltip text={`${amountParsed} claimable for this DEGEN`}>
          <Button style={{ ...btnStyles, padding: '0 16px' }} shape="round" size="large" onClick={handleClaimNFTL}>
            Claim
          </Button>
        </Tooltip>
      )}
    </>
  ) : (
    <div className={classes.claimContainer}>
      <div>{amountParsed} NFTL Claimable</div>
      {mockAccumulated > 0.0 && writeContracts[NFTL_CONTRACT] && (
        <Tooltip
          text={`Claims for all owned DEGENS.${
            displayTooltip ? ' If you own a lot you can save gas claiming individually below!' : ''
          }`}
        >
          <Button style={{ ...btnStyles, marginTop: 6 }} shape="round" size="large" onClick={handleClaimNFTL}>
            Claim
          </Button>
        </Tooltip>
      )}
    </div>
  );
};

ClaimNFTL.defaultProps = { singleClaim: false, displayTooltip: false };

export default ClaimNFTL;
