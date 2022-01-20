import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useThemeSwitcher } from 'react-css-theme-switcher';
import { useQuery } from '@apollo/client';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress, Container, Grid, Typography } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';

import { Owner } from 'types/graph';
import { CharacterCard, ClaimNFTL, WalletConnectPrompt } from 'components';
import useNFTLBalance from 'hooks/useNFTLBalance';
import { NetworkContext } from 'NetworkProvider';
import { CHARACTERS_SUBGRAPH_INTERVAL } from 'constants/index';
import { OWNER_QUERY } from './query';

export const PAGE_SIZE = 8;

const useStyles = makeStyles(theme => ({
  container: { padding: '20px 0' },
  progress: { marginTop: 100 },
  claimContainer: { display: 'flex', alignItems: 'baseline', float: 'right', marginTop: -50 },
  grid: { flexGrow: 1, margin: '8px 0px 8px -8px' },
  [theme.breakpoints.down(840)]: {
    claimContainer: { marginTop: 0, marginRight: 20 },
  },
  pagination: {
    width: '100%',
    paddingTop: 20,
    paddingBottom: 125,
    '& ul': {
      justifyContent: 'center',
    },
  },
  paginationDark: {
    '& button, li > div': {
      color: 'white',
      borderColor: 'white',
    },
  },
}));

const Wallet = (): JSX.Element => {
  const classes = useStyles();
  const { currentTheme } = useThemeSwitcher();
  const { address } = useContext(NetworkContext);
  const userNFTLBalance = useNFTLBalance(address);
  const [page, setPage] = useState(1);
  const { loading, data }: { loading: boolean; data?: { owner: Owner } } = useQuery(OWNER_QUERY, {
    pollInterval: CHARACTERS_SUBGRAPH_INTERVAL,
    variables: { address: address?.toLowerCase() },
    skip: !address,
  });
  const [favs, setFavs] = useState<string[]>([]);

  useEffect(() => {
    const storage = window.localStorage.getItem('FAV_DEGENS');
    setFavs(storage ? storage.split(',') : []);
  }, []);

  const handleToggleFavs = useCallback(
    (v: string) => {
      let newFavs: string[] = [];
      if (favs.includes(v)) newFavs = favs.filter(f => f !== v);
      else newFavs = [...favs, v];
      window.localStorage.setItem('FAV_DEGENS', newFavs.toString());
      setFavs(newFavs);
    },
    [favs],
  );

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
            <>
              <Grid container spacing={2} className={classes.grid}>
                {characters.slice((page - 1) * PAGE_SIZE, (page - 1) * PAGE_SIZE + PAGE_SIZE).map(character => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={character.id}>
                    <CharacterCard
                      character={character}
                      favs={favs}
                      ownerOwned
                      handleToggleFavs={handleToggleFavs}
                      singleClaim={displaySingleClaim}
                      userNFTLBalance={userNFTLBalance}
                    />
                  </Grid>
                ))}
              </Grid>
              {characters.length > PAGE_SIZE ? (
                <Pagination
                  className={clsx(classes.pagination, { [classes.paginationDark]: currentTheme === 'dark' })}
                  color="primary"
                  count={Math.ceil(characters?.length / PAGE_SIZE)}
                  onChange={(_, value) => {
                    setPage(value);
                  }}
                  page={page}
                  size="large"
                  variant="outlined"
                />
              ) : null}
            </>
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
