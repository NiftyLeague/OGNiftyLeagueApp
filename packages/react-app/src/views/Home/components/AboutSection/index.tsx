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
  return (
    <section className="about-page-section">
      <Container>
        <div className="row">
          <div className="col-md-6 d-flex align-self-center">
            <NiftySmashersVideo />
          </div>
          <div className="col-md-6">
            <div className="section-heading">
              <Title level={2} className="title">
                Welcome to the Nifty League
              </Title>
              <p className="text">
                Our mission is to create a leading <em>NFT</em> gaming platform through community governance and
                development. <em>Nifty League</em> prides itself on being one of the first <em>GameFi</em> platforms
                offering interactive <em>play-to-earn</em> games with customizable characters.
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
