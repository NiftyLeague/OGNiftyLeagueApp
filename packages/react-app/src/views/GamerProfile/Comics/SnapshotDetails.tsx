import React, { memo, useContext, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import { Owner, TraitMaps } from 'types/graph';
import { NetworkContext } from 'NetworkProvider';
import { COMICS_TRIBES_QUERY, COMICS_RARE_QUERY, COMICS_META_QUERY, COMICS_LEGENDARY_QUERY } from './query';

const SNAPSHOT_BLOCK = 14115835;

const useStyles = makeStyles(theme => ({
  progress: { marginTop: 100 },
}));

const SnapshotDetails = memo((): JSX.Element => {
  const classes = useStyles();
  const { address } = useContext(NetworkContext);
  const { loading: tribesLoading, data: tribesData }: { loading: boolean; data?: { owners: Owner[] } } = useQuery(
    COMICS_TRIBES_QUERY,
    {
      variables: { block: SNAPSHOT_BLOCK },
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

  return tribesLoading || rareLoading || metaLoading || legendaryLoading ? (
    <CircularProgress size={100} className={classes.progress} />
  ) : (
    <>
      <div>Total Rares: {rareData?.traitMaps?.length}</div>
      <div>Total Metas: {metaData?.traitMaps?.length}</div>
      <div>Total Legendaries: {legendaryData?.traitMaps?.length}</div>
      <div>Total Tribe Sets: {totalTribeSets}</div>
    </>
  );
});

export default SnapshotDetails;
