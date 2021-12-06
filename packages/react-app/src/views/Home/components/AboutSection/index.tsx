import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { Image, Typography } from 'antd';
import Container from '@material-ui/core/Container';
import { NiftySmashersVideo } from 'components';
import Roadmap from 'assets/images/roadmap/roadmap_v03.png';
import './about.css';

const { Title } = Typography;

const About = memo(() => (
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
            <div className="d-flex justify-content-center">
              <Link to="/about" className="moreBtn">
                Learn More
              </Link>
              <Link to="/roadmap" className="roadmapLink">
                <Image width="140px" src={Roadmap} preview={false} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Container>
  </section>
));

export default About;
