import React, { memo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Typography } from 'antd';
import Container from '@material-ui/core/Container';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import { NiftySmashersVideo, Preloader, SaleProgress } from 'components';

import ApeImg from 'assets/gifs/ape.gif';
import AlienImg from 'assets/gifs/alien1.gif';
import DogeImg from 'assets/gifs/doge.gif';
import HumanImg from 'assets/images/characters/human-ex.png';
import CatImg from 'assets/gifs/cat1.gif';
import FrogImg from 'assets/images/characters/frog-ex.png';
import SatoshiImg from 'assets/images/characters/satoshi.png';
import CharacterCreator from './components/CharacterCreator';
import './home.css';

const { Title } = Typography;

const ParallaxCharacter = ({
  direction,
  title,
  image,
  text,
}: {
  direction: string;
  title: string;
  image: string;
  text: string | JSX.Element;
}): JSX.Element => (
  <div className="parallax-row">
    <Container className={`parallax-child-section ${direction}`}>
      <div className="col-sm-8 text-container">
        <Title className="title-hr">{title}</Title>
        <p>{text}</p>
      </div>
      <div className="col-sm-4 image-container">
        <img src={image} alt={`${title} Character`} />
      </div>
    </Container>
  </div>
);

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
                  Our mission is to create an interactive and community governed NFT gaming platform. Nifty League
                  prides itself on being one of the first platforms offering competitive games utilizing customizable
                  characters and tradable in-game assets.
                </p>
                <p className="text">
                  Advance your gaming skills and join our community to earn daily NFTL rewards from the Nifty DAO!
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
          direction="left"
          title="Yoko"
          image={CatImg}
          text={
            <>
              Yoko lives in the fast and furious Sushi City, where degens come to thrive. Legend has it Andre Cronje has
              been training these cats to fight for years. Don't forget to stop by{' '}
              <a target="_blank" rel="noopener noreferrer" href="https://sushi.com">
                sushi
              </a>{' '}
              and{' '}
              <a target="_blank" rel="noopener noreferrer" href="https://yearn.finance">
                yearn
              </a>{' '}
              HQ while in town!
            </>
          }
        />
        <ParallaxCharacter
          direction="right"
          title="Doge"
          image={DogeImg}
          text="Doge has finally landed on The Moon! After getting rugged by Elon, Doge gave up aspirations of Mars and has his
          eyes set on the real prize now... making it to the Citadel."
        />
        <ParallaxCharacter
          direction="left"
          title="Aurora"
          image={AlienImg}
          text="Aurora has been on a universal DJ tour for the past 300 years. She's quite the celebrity but has
          yet to perform on Satoshi's Island. Only problem is she need a key to the Citadel first."
        />
        <ParallaxCharacter
          direction="right"
          title="Finney"
          image={HumanImg}
          text="Humans have finally colonized Mars, but it's turned into an dystopian capitalist nightmare and the sand
          worms aren’t helping either. Satoshi’s Island looks a lot less... red."
        />
        <ParallaxCharacter
          direction="left"
          title="Java"
          image={ApeImg}
          text="Since humans escaped for Mars and left rising sea levels behind as a gift, the Apes have inherited Earth and
          let nature run its course, planting banana tress everywhere in sight."
        />
        <ParallaxCharacter
          direction="right"
          title="Cribbit"
          image={FrogImg}
          text="After destroying his home planet as a result of widespread nuclear-powered crypto mining, Cribbit welcomes 
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
      <footer style={{ padding: 30 }} />
    </div>
  );
});

export default withWidth()(Home);
