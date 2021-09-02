import React, { memo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Typography } from 'antd';
import Container from '@material-ui/core/Container';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import { Footer, NiftySmashersVideo, Preloader, SaleProgress } from 'components';

import ApeImg from 'assets/gifs/java.gif';
import AlienImg from 'assets/gifs/aurora.gif';
import DogeImg from 'assets/gifs/doge.gif';
import HumanImg from 'assets/gifs/finney.gif';
import CatImg from 'assets/gifs/yoko.gif';
import FrogImg from 'assets/gifs/cribbit.gif';
import SatoshiImg from 'assets/gifs/satoshi.gif';
import CharacterCreator from './components/CharacterCreator';
import './home.css';

const { Title } = Typography;

const ParallaxCharacter = ({
  className,
  direction,
  title,
  image,
  text,
}: {
  className?: string;
  direction: string;
  title: string;
  image: string;
  text: string | JSX.Element;
}): JSX.Element => (
  <div className="parallax-row pixelated">
    <Container className={`parallax-child-section ${direction}`}>
      <div className="col-sm-8 text-container">
        <Title className="title-hr">{title}</Title>
        <p>{text}</p>
      </div>
      <div className="col-sm-4 image-container">
        <img className={className} src={image} alt={`${title} Character`} />
      </div>
    </Container>
  </div>
);

ParallaxCharacter.defaultProps = { className: undefined };

const Home = memo(({ width }: { width: Breakpoint }) => {
  const [isLoaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const smallScreen = isWidthDown('xs', width);
  return (
    <div style={{ textAlign: 'center', overflowX: 'hidden' }}>
      <Preloader ready={isLoaded} progress={progress} />
      <CharacterCreator isLoaded={isLoaded} setLoaded={setLoaded} setProgress={setProgress} />
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
      <section className="characters">
        <ParallaxCharacter
          className="extra-margin"
          direction="left"
          title="Yoko"
          image={CatImg}
          text={
            <>
              Yoko lives in the fast and furious Sushi City, where <strong>DEGENS</strong> come to thrive. Legend has it
              Andre Cronje has been training these cats to fight for years. Don't forget to stop by{' '}
              <a target="_blank" rel="noopener noreferrer" href="https://sushi.com">
                sushi
              </a>{' '}
              and{' '}
              <a target="_blank" rel="noopener noreferrer" href="https://yearn.finance">
                yearn
              </a>{' '}
              HQ while you're in town!
            </>
          }
        />
        <ParallaxCharacter
          direction="right"
          title="Doge"
          image={DogeImg}
          text="Doge has finally landed on The Moon! After getting rugged by Elon, Doge gave up aspirations of Mars and has his
          eyes set on the real prize now... making it to The Citadel."
        />
        <ParallaxCharacter
          direction="left"
          title="Aurora"
          image={AlienImg}
          text="Aurora has been on a Universal DJ Tour for the past 300 years. She's quite the celebrity but has
          yet to perform on Satoshi's Island. The only problem is she needs a key to The Citadel first."
        />
        <ParallaxCharacter
          direction="right"
          title="Finney"
          image={HumanImg}
          text={
            <>
              Humans have finally colonized Mars, but it's turned into a dystopian capitalist nightmare (the sand worms
              aren’t helping either). Satoshi’s Island looks a lot less... <em>red</em>.
            </>
          }
        />
        <ParallaxCharacter
          direction="left"
          title="Java"
          image={ApeImg}
          text="Since humans escaped for Mars and left behind rising sea levels as a gift, the Apes have inherited Earth and
          let nature run its course, planting banana tress everywhere in sight."
        />
        <ParallaxCharacter
          direction="right"
          title="Cribbit"
          image={FrogImg}
          text="After destroying his home planet as a result of widespread nuclear-powered crypto mining, Cribbit jumped at an invite to 
          the Nifty League invite to try and redeem himself."
        />
        <ParallaxCharacter
          direction="left"
          title="Satoshi"
          image={SatoshiImg}
          text="Satoshi, the creator of Bitcoin, lives in a utopian crypto paradise castle known as The Citadel on
          Satoshi's Island. Who knew Satoshi collected NFTs as well?"
        />
      </section>
      <Footer />
    </div>
  );
});

export default withWidth()(Home);
