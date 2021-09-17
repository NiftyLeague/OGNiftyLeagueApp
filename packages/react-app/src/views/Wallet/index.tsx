import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Button } from 'antd';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress, Container, Grid, Typography } from '@material-ui/core';

import { Owner } from 'types/graph';
import { CharacterCard, WalletConnectPrompt } from 'components';
import { useClaimableNFTL } from 'hooks';
import { NetworkContext } from 'NetworkProvider';
import { DEBUG, NFTL_CONTRACT, CHARACTERS_SUBGRAPH_INTERVAL } from '../../constants';
import { OWNER_QUERY } from './query';

const useStyles = makeStyles(theme => ({
  container: { padding: '40px 0' },
  progress: { marginTop: 100 },
  claimContainer: { display: 'flex', alignItems: 'baseline', float: 'right', marginTop: -50 },
  grid: { flexGrow: 1, margin: '8px 0px 8px -8px' },
  [theme.breakpoints.down(840)]: {
    claimContainer: { marginTop: 0, marginRight: 20 },
  },
}));

const ClaimNFTL = ({ tokenIndices }) => {
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
    marginLeft: 8,
    marginTop: 16,
    background: '-webkit-linear-gradient(89deg, #620edf 0%, #5e72eb 100%)',
    color: '#fff',
    borderColor: '#6f6c6c',
  };

  return mockAccumulated ? (
    <div className={classes.claimContainer}>
      {mockAccumulated.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}{' '}
      NFTL Claimable
      {mockAccumulated > 0.0 && writeContracts[NFTL_CONTRACT] && (
        <Button style={btnStyles} shape="round" size="large" onClick={handleClaimNFTL}>
          Claim
        </Button>
      )}
    </div>
  ) : null;
};

const Wallet = (): JSX.Element => {
  const classes = useStyles();
  const { address } = useContext(NetworkContext);
  const { loading, data }: { loading: boolean; data?: { owner: Owner } } = useQuery(OWNER_QUERY, {
    pollInterval: CHARACTERS_SUBGRAPH_INTERVAL,
    variables: { address: address?.toLowerCase() },
    skip: !address,
  });

  const characters = useMemo(() => {
    const characterList = data?.owner?.characters ? [...data.owner.characters] : [];
    return characterList.sort((a, b) => parseInt(a.id, 10) - parseInt(b.id, 10));
  }, [data]);

  const tokenIndices = useMemo(() => {
    return characters.map(char => parseInt(char.id, 10));
  }, [characters]);

  return address ? (
    <Container className={classes.container}>
      {loading ? (
        <CircularProgress size={100} className={classes.progress} />
      ) : (
        <>
          <Typography variant="h4">Your Degens</Typography>
          <ClaimNFTL tokenIndices={tokenIndices} />
          {characters.length ? (
            <Grid container spacing={2} className={classes.grid}>
              {characters.map(character => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={character.id}>
                  <CharacterCard character={character} ownerOwned />
                </Grid>
              ))}
            </Grid>
          ) : (
            <div style={{ padding: '60px 20px' }}>
              No Degens found. Please check your address or go mint if you haven't done so already!
            </div>
          )}
        </>
      )}
    </Container>
  ) : (
    <WalletConnectPrompt />
  );
};

export default Wallet;
