import React, { memo, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useThemeSwitcher } from 'react-css-theme-switcher';
import { useQuery } from '@apollo/client';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  Container,
  Grid,
  Paper,
  Typography,
} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import { Image } from 'antd';

import { Account } from 'types/api';
import { Character, Owner, TraitMaps } from 'types/graph';
import { Tooltip, WalletConnectPrompt } from 'components';
import { NetworkContext } from 'NetworkProvider';
import Snapshot from 'assets/gifs/snapshot.gif';
import ComicP1 from 'assets/images/comics/page1.png';
import ComicP2 from 'assets/images/comics/page2.png';
import ComicP3 from 'assets/images/comics/page3.png';
import ComicP4 from 'assets/images/comics/page4.png';
import Machine from 'assets/images/comics/machine.png';
import { COMICS_TRIBES_QUERY, COMICS_RARE_QUERY, COMICS_META_QUERY, COMICS_LEGENDARY_QUERY } from './query';

import './index.css';

const SNAPSHOT_BLOCK = 14115835;

const useStyles = makeStyles(theme => ({
  progress: { marginTop: 100 },
  paper: {
    height: 300,
    width: 300,
  },
}));

const SnapshotDetails = (): JSX.Element => {
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
};

const Comics = ({ width }: { width: Breakpoint }): JSX.Element => {
  const classes = useStyles();
  const { address } = useContext(NetworkContext);

  return address ? (
    <div className="comics-container">
      <div className="container-degens">
        <div className="degens-row degens-row-1">
          <div className="degen pixelated v604_326" />
          <div className="degen pixelated v604_327" />
          <div className="degen pixelated v604_328" />
          <div className="degen pixelated v604_329" />
          <div className="degen pixelated v604_330" />
          <div className="degen pixelated v604_331" />
          <div className="degen pixelated v604_332" />
          <div className="degen pixelated v604_333" />
        </div>
        <div className="degens-row degens-row-2">
          <div className="degen pixelated v604_338" />
          <div className="degen pixelated v604_339" />
          <div className="degen pixelated v604_340" />
          <div className="degen pixelated v604_341" />
          <div className="degen pixelated v604_342" />
          <div className="degen pixelated v604_343" />
          <div className="degen pixelated v604_344" />
          <div className="degen pixelated v604_345" />
        </div>
        <div className="degens-row degens-row-3">
          <div className="degen pixelated v604_350" />
          <div className="degen pixelated v604_351" />
          <div className="degen pixelated v604_352" />
          <div className="degen pixelated v604_353" />
          <div className="degen pixelated v604_354" />
          <div className="degen pixelated v604_355" />
          <div className="degen pixelated v604_356" />
          <div className="degen pixelated v604_357" />
        </div>
      </div>
      <div className="overlay-dark" />
      <div className="overlay-gradient-top" />
      <div className="overlay-gradient-bottom" />
      <div className="content-container">
        <Container>
          <div className="d-flex">
            <Card className="d-flex flex-column m-2 claim-card">
              <Typography variant="h5" component="h2">
                Comic Page 5 &amp; 6 Claim Check
              </Typography>
              <CardContent className="d-flex">
                <Image width="720px" src={Snapshot} preview={false} />
                <div className="text-left ml-3">
                  <Typography className="mb-2">
                    The snapshot for unreleased comics pages 5 &amp; 6 was taken at{' '}
                    <a target="_blank" rel="noopener noreferrer" href="https://etherscan.io/block/141158351">
                      block #141158351
                    </a>
                  </Typography>
                  <Typography variant="body2" component="p">
                    There will be a total of 9900 #5 comic pages given to each DEGEN holder at the time of the snapshot.
                    Comic page #6 total comes to 1200 with 1x rewarded to collectors holding a full tribe set of 6
                    DEGENS, 1x for each meta DEGEN, 2x for each legendary DEGEN, and the remaining raffled to
                    common/rare holders.
                  </Typography>
                </div>
              </CardContent>
              <CardActions className="my-auto">
                <Button fullWidth color="primary" size="small" variant="contained" className="mx-2">
                  Check winnings
                </Button>
              </CardActions>
            </Card>
            {isWidthDown('sm', width) ? null : (
              <div className="m-2">
                <Image width="290px" src={Machine} preview={false} />
              </div>
            )}
          </div>
          <Image.PreviewGroup>
            <Image className="p-2" width={isWidthDown('md', width, false) ? '50%' : '25%'} src={ComicP1} />
            <Image className="p-2" width={isWidthDown('md', width, false) ? '50%' : '25%'} src={ComicP2} />
            <Image className="p-2" width={isWidthDown('md', width, false) ? '50%' : '25%'} src={ComicP3} />
            <Image className="p-2" width={isWidthDown('md', width, false) ? '50%' : '25%'} src={ComicP4} />
          </Image.PreviewGroup>
        </Container>
      </div>
    </div>
  ) : (
    <WalletConnectPrompt />
  );
};

export default withWidth()(Comics);
