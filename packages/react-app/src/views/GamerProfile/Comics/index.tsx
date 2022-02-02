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
import { Character, Owner, TraitMaps } from 'types/graph';
import { Tooltip, WalletConnectPrompt } from 'components';
import { NetworkContext } from 'NetworkProvider';
import {
  COMICS_TRIBES_QUERY,
  COMICS_COMMON_QUERY,
  COMICS_RARE_QUERY,
  COMICS_META_QUERY,
  COMICS_LEGENDARY_QUERY,
} from './query';

const SNAPSHOT_BLOCK = 14115835;

const useStyles = makeStyles(theme => ({
  container: { padding: '20px 0' },
  progress: { marginTop: 100 },
}));

const Comics = (): JSX.Element => {
  const classes = useStyles();
  const { address } = useContext(NetworkContext);
  const { loading: tribesLoading, data: tribesData }: { loading: boolean; data?: { owners: Owner[] } } = useQuery(
    COMICS_TRIBES_QUERY,
    {
      variables: { block: SNAPSHOT_BLOCK },
      skip: !address,
    },
  );
  const { loading: commonLoading, data: commonData }: { loading: boolean; data?: TraitMaps } = useQuery(
    COMICS_COMMON_QUERY,
    {
      variables: { block: SNAPSHOT_BLOCK, lastId: '1' },
      skip: !address,
    },
  );
  const { loading: rareLoading, data: rareData }: { loading: boolean; data?: TraitMaps } = useQuery(COMICS_RARE_QUERY, {
    variables: { block: SNAPSHOT_BLOCK },
    skip: !address,
  });
  const { loading: metaLoading, data: metaData }: { loading: boolean; data?: TraitMaps } = useQuery(COMICS_META_QUERY, {
    variables: { block: SNAPSHOT_BLOCK },
    skip: !address,
  });
  const { loading: legendaryLoading, data: legendaryData }: { loading: boolean; data?: TraitMaps } = useQuery(
    COMICS_LEGENDARY_QUERY,
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
  console.log('meta', metaData);
  console.log('legendary', legendaryData);
  console.log('rare', rareData);
  console.log('commonData', commonData);

  return address ? (
    <Container className={classes.container}>
      {tribesLoading || rareLoading || metaLoading || legendaryLoading ? (
        <CircularProgress size={100} className={classes.progress} />
      ) : (
        <>
          <div>Total Commons: </div>
          <div>Total Rares: {rareData?.traitMaps?.length}</div>
          <div>Total Metas: {metaData?.traitMaps?.length}</div>
          <div>Total Legendaries: {legendaryData?.traitMaps?.length}</div>
          <div>Total Tribe Sets: {totalTribeSets}</div>
        </>
      )}
    </Container>
  ) : (
    <WalletConnectPrompt />
  );
};

export default Comics;
