import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { Typography } from 'antd';
import Container from '@material-ui/core/Container';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import { NiftySmashersVideo, SaleProgress } from 'components';
import './about.css';

const { Title } = Typography;

const About = memo(({ width }: { width: Breakpoint }) => {
  const smallScreen = isWidthDown('xs', width);
  return (
    <section className="about-page-section">
      <Container>
        <SaleProgress className="alert" smallScreen={smallScreen} />
        <div className="row" style={{ paddingTop: 32 }}>
          <div className="col-md-6 d-flex align-self-center">
            <NiftySmashersVideo />
          </div>
          <div className="col-md-6">
            <div className="section-heading">
              <Title level={2} className="title">
                Welcome to the Nifty League
              </Title>
              <p className="text">
                Our mission is to create an interactive and community-governed NFT gaming platform.{' '}
                <em>Nifty League</em> prides itself on being one of the first platforms offering competitive games
                utilizing customizable characters and tradable in-game assets.
              </p>
              <p className="text">
                Advance your gaming skills and join our community to earn daily <em>NFTL</em> rewards from the{' '}
                <em>Nifty DAO</em>!
              </p>
              <Link to="/about" className="moreBtn">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
});

export default withWidth()(About);
