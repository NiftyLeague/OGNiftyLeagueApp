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
import { Tooltip, WalletConnectPrompt } from 'components';
import { NetworkContext } from 'NetworkProvider';
import { COMICS_TRIBES_QUERY } from './query';

const SNAPSHOT_BLOCK = 14112400;

const useStyles = makeStyles(theme => ({
  container: { padding: '20px 0' },
  progress: { marginTop: 100 },
}));

const Comics = (): JSX.Element => {
  const classes = useStyles();
  const { address } = useContext(NetworkContext);
  const { loading, data: tribesData }: { loading: boolean; data?: { owners: Owner[] } } = useQuery(
    COMICS_TRIBES_QUERY,
    {
      variables: { block: SNAPSHOT_BLOCK },
      skip: !address,
    },
  );

  const tribeSets = useMemo(() => {
    const ownersTribeCounts = tribesData?.owners?.map(owner => {
      // Ape, Human, Doge, Frog, Cat, Alien
      const tribesCount = [0, 0, 0, 0, 0, 0];
      owner.characters.forEach(char => {
        tribesCount[char.traits.tribe - 1] += 1;
      });
      return { address: owner.address, tribeSets: Math.min(...tribesCount) };
    });
    return ownersTribeCounts?.filter(owner => owner.tribeSets > 0);
  }, [tribesData]);

  const totalTribeSets = useMemo(() => {
    let sum = 0;
    tribeSets?.forEach(owner => {
      sum += owner.tribeSets;
    });
    return sum;
  }, [tribeSets]);

  console.log('tribesData', tribesData);
  console.log('Tribe Sets', tribeSets);

  return address ? (
    <Container className={classes.container}>
      {loading ? (
        <CircularProgress size={100} className={classes.progress} />
      ) : (
        <>
          <div>Total Metas: </div>
          <div>Total Legendaries: </div>
          <div>Total Commons/Rares: </div>
          <div>Total Tribe Sets: {totalTribeSets}</div>
        </>
      )}
    </Container>
  ) : (
    <WalletConnectPrompt />
  );
};

export default Comics;
