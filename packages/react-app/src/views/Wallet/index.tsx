import React, { useContext, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress, Container, Grid, Typography } from '@material-ui/core';

import { Owner } from 'types/graph';
import { CharacterCard, ClaimNFTL, WalletConnectPrompt } from 'components';
import useNFTLBalance from 'hooks/useNFTLBalance';
import { NetworkContext } from 'NetworkProvider';
import { CHARACTERS_SUBGRAPH_INTERVAL } from '../../constants';
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

const Wallet = (): JSX.Element => {
  const classes = useStyles();
  const { address } = useContext(NetworkContext);
  const userNFTLBalance = useNFTLBalance(address);
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

  const displaySingleClaim = tokenIndices?.length > 10;

  return address ? (
    <Container className={classes.container}>
      {loading ? (
        <CircularProgress size={100} className={classes.progress} />
      ) : (
        <>
          <Typography variant="h4">Your Degens</Typography>
          <ClaimNFTL tokenIndices={tokenIndices} singleClaim={false} displayTooltip={displaySingleClaim} />
          {characters.length ? (
            <Grid container spacing={2} className={classes.grid}>
              {characters.map(character => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={character.id}>
                  <CharacterCard
                    character={character}
                    ownerOwned
                    singleClaim={displaySingleClaim}
                    userNFTLBalance={userNFTLBalance}
                  />
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
