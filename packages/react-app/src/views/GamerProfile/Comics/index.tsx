import React, { useContext } from 'react';
import { Card, CardActions, CardContent, Container, Typography } from '@mui/material';
import { Image } from 'antd';

import { ComicsClaim, WalletConnectPrompt } from 'components';
import { useIsWidthDown } from 'hooks/useWidth';
import { NetworkContext } from 'NetworkProvider';
import Snapshot from 'assets/gifs/snapshot.gif';
import ComicP1 from 'assets/images/comics/page1.png';
import ComicP2 from 'assets/images/comics/page2.png';
import ComicP3 from 'assets/images/comics/page3.png';
import ComicP4 from 'assets/images/comics/page4.png';
import ComicP5 from 'assets/images/comics/page5.png';
import ComicP6 from 'assets/images/comics/page6.png';
import Machine from 'assets/images/comics/machine.png';

import snapshot from './snapshot.json';

import './index.css';

const Comics = (): JSX.Element => {
  const { address } = useContext(NetworkContext);
  const mobileView = useIsWidthDown('sm');
  const mdView = useIsWidthDown('md');
  const claim = snapshot.find(owner => owner.address === address.toLowerCase()) || { p5: 0, p6: 0 };

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
        <div className="degens-row degens-row-4">
          <div className="degen pixelated v604_329" />
          <div className="degen pixelated v604_327" />
          <div className="degen pixelated v604_331" />
          <div className="degen pixelated v604_326" />
          <div className="degen pixelated v604_328" />
          <div className="degen pixelated v604_333" />
          <div className="degen pixelated v604_330" />
          <div className="degen pixelated v604_339" />
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
                Comic 5 &amp; 6 Claim Check
              </Typography>
              <CardContent className="d-flex">
                <Image width="1042px" src={Snapshot} preview={false} />
                <div className="text-left ml-3">
                  <div className="comics-content-info">
                    <span className="comics-content-info-title">
                      <strong>Page 5 earned:</strong> {claim.p5}
                    </span>
                    <span className="comics-content-info-date">
                      <strong>Page 6 earned:</strong> {claim.p6}
                    </span>
                  </div>
                  <Typography variant="body2" component="p" className="mb-2">
                    The snapshot for comics 5 &amp; 6 was taken at{' '}
                    <a
                      style={{ fontSize: 'inherit' }}
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://etherscan.io/block/141158351"
                    >
                      block #141158351
                    </a>
                  </Typography>
                  <Typography variant="body2" component="p">
                    There will be a total of 9900 #5 comic pages awarded to each DEGEN holder at the time of the
                    snapshot. Comic page #6 total comes to 1200 with 1x rewarded to collectors holding a full tribe set
                    of 6 DEGENS, 1x for each meta DEGEN, 2x for each legendary DEGEN, and the remaining raffled to
                    common/rare holders.
                  </Typography>
                  {(claim.p5 > 0 || claim.p6 > 0) && (
                    <CardActions className="my-auto">
                      <ComicsClaim />
                    </CardActions>
                  )}
                </div>
              </CardContent>
            </Card>
            {mobileView ? null : (
              <div className="mx-2 my-auto">
                <Image width="272px" src={Machine} preview={false} />
              </div>
            )}
          </div>
          <Image.PreviewGroup>
            <Image className="p-2" width={mdView ? '50%' : '33%'} src={ComicP1} />
            <Image className="p-2" width={mdView ? '50%' : '33%'} src={ComicP2} />
            <Image className="p-2" width={mdView ? '50%' : '33%'} src={ComicP3} />
            <Image className="p-2" width={mdView ? '50%' : '33%'} src={ComicP4} />
            <Image className="p-2" width={mdView ? '50%' : '33%'} src={ComicP5} />
            <Image className="p-2" width={mdView ? '50%' : '33%'} src={ComicP6} />
          </Image.PreviewGroup>
        </Container>
      </div>
    </div>
  ) : (
    <WalletConnectPrompt />
  );
};

export default Comics;
