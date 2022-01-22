import React, { memo, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useThemeSwitcher } from 'react-css-theme-switcher';
import { useQuery } from '@apollo/client';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress, Container, Grid, Typography, Paper } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

import { Account } from 'types/api';
import { Character, Owner } from 'types/graph';
import { CharacterCard, ClaimNFTL, Tooltip, WalletConnectPrompt } from 'components';
import useNFTLBalance from 'hooks/useNFTLBalance';
import { NetworkContext } from 'NetworkProvider';
import { CHARACTERS_SUBGRAPH_INTERVAL } from 'constants/index';
import { OWNER_QUERY } from './query';

export const PAGE_SIZE = 8;

const useStyles = makeStyles(theme => ({
  container: { padding: '20px 0' },
  overview: {
    flexGrow: 1,
    marginBottom: 20,
  },
  paper: {
    color: 'white',
    width: '100%',
    height: '100%',
    backgroundColor: '#333c42',
  },
  cardHeader: { paddingBottom: 8 },
  cardBody: { margin: 'auto' },
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

const Overview = memo(
  ({
    displaySingleClaim,
    tokenIndices,
    userNFTLBalance,
  }: {
    displaySingleClaim: boolean;
    tokenIndices: number[];
    userNFTLBalance: number;
  }): JSX.Element => {
    const classes = useStyles();
    const auth = window.localStorage.getItem('authentication-token');
    const [account, setAccount] = useState<Account>();
    const [accError, setAccError] = useState(false);

    useEffect(() => {
      const fetchAccount = async () => {
        if (auth) {
          const result = await fetch('https://odgwhiwhzb.execute-api.us-east-1.amazonaws.com/prod/accounts/account', {
            headers: { authorizationToken: auth },
          })
            .then(res => {
              if (res.status === 404) setAccError(true);
              return res.text();
            })
            .catch(() => {
              setAccError(true);
            });
          if (result) setAccount(JSON.parse(result));
        }
      };
      if (auth) void fetchAccount();
    }, [auth]);

    const gameBal = account?.balance ? `${account.balance} NFTL` : '0.00 NFTL';
    const walletBal = userNFTLBalance.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    return (
      <Grid container className={classes.overview} spacing={2}>
        <Grid item xs={12}>
          <Grid container justifyContent="center" spacing={2}>
            <Grid item xs={3}>
              <Card className={classes.paper}>
                <CardHeader className={classes.cardHeader} title="Total Degens" />
                <CardContent>
                  <Typography variant="body1" component="p">
                    {tokenIndices.length}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={3}>
              <Card className={classes.paper}>
                <CardHeader
                  action={
                    <Tooltip
                      text={
                        <div>
                          Each DEGEN accrues 68.5 NFTL per day for the first 3 years from our mint. This value shows you
                          the cumulative total amongst all of your DEGEN NFTs. There is no time limit to claim these
                          tokens but do note in the event of selling your DEGEN the NFTL will transfer to the new owner.
                        </div>
                      }
                    >
                      <InfoIcon fontSize="inherit" />
                    </Tooltip>
                  }
                  className={classes.cardHeader}
                  title="Daily NFTL Accrued"
                />
                <CardContent>
                  <Typography variant="body1" component="p">
                    <ClaimNFTL tokenIndices={tokenIndices} singleClaim={false} displayTooltip={displaySingleClaim} />
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={3}>
              <Card className={classes.paper}>
                <CardHeader
                  action={
                    <Tooltip
                      text={
                        <div>
                          This balance shows you your gamer account balance which includes any deposits you've made to
                          date along with P2E and rental earnings. You can freely spend these tokens within our ecosytem
                          gasless as we handle transactions such as rentals off-chain. In order to sell these tokens you
                          will need to request a withdrawl below once enabled.
                        </div>
                      }
                    >
                      <InfoIcon fontSize="inherit" />
                    </Tooltip>
                  }
                  className={classes.cardHeader}
                  title="Game Balance"
                />
                <CardContent>
                  <Typography variant="body1" component="p">
                    {accError ? 'Error fetching balance' : gameBal}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={3}>
              <Card className={classes.paper}>
                <CardHeader
                  action={
                    <Tooltip
                      text={
                        <div>
                          This balance tracks any liquid NFTL in your Ethereum wallet which should reflect the values
                          you see in MetaMask or Etherscan.
                        </div>
                      }
                    >
                      <InfoIcon fontSize="inherit" />
                    </Tooltip>
                  }
                  className={classes.cardHeader}
                  title="NFTL in Wallet"
                />
                <CardContent>
                  <Typography variant="body1" component="p">
                    {walletBal} NFTL
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  },
);

const Degens = ({
  characters,
  displaySingleClaim,
  userNFTLBalance,
}: {
  characters: Character[];
  displaySingleClaim: boolean;
  userNFTLBalance: number;
}): JSX.Element => {
  const classes = useStyles();
  const { currentTheme } = useThemeSwitcher();
  const [page, setPage] = useState(1);
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

  return (
    <>
      <Typography variant="h4">Your Degens</Typography>
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
  );
};

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
          <Overview
            displaySingleClaim={displaySingleClaim}
            tokenIndices={tokenIndices}
            userNFTLBalance={userNFTLBalance}
          />
          <Degens characters={characters} displaySingleClaim={displaySingleClaim} userNFTLBalance={userNFTLBalance} />
        </>
      )}
    </Container>
  ) : (
    <WalletConnectPrompt />
  );
};

export default Wallet;
