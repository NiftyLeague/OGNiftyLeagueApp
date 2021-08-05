import React from 'react';
import { Link } from 'react-router-dom';
import { useThemeSwitcher } from 'react-css-theme-switcher';
import { Image, Typography } from 'antd';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import { Container } from '@material-ui/core';

import NiftySmashersVideo from 'components/NiftySmashersVideo';
import FrogInvite from 'assets/images/games/frog-invite.png';
import Baseball from 'assets/images/games/baseball.png';
import AlienSketch from 'assets/gifs/alien-sketch.gif';
import DogeSketch from 'assets/gifs/doge-sketch.gif';
import CatSketch from 'assets/gifs/cat-sketch.gif';
import GamesSketch from 'assets/images/games/games-sketch.png';
import TennisSketch from 'assets/images/games/tennis-sketch.png';
import SmashSketch from 'assets/images/games/smash-sketch.png';
import TokenDistribution from 'assets/images/token-distribution.png';
import TokenDistributionDark from 'assets/images/token-distribution-dark.png';

const { Title } = Typography;

const About = ({ width }) => {
  const { currentTheme } = useThemeSwitcher();
  const sushiswapLPLink = 'https://sushi.com';
  return (
    <Container style={{ textAlign: 'left', padding: '40px' }}>
      <Title level={2}>About Nifty League</Title>
      <p>
        Welcome to the Nifty League! Our mission is to create the top multi-chain gaming platform with customizable
        characters and tradable in-game assets.
      </p>
      <div className="d-flex justify-content-around align-items-center">
        <Image width="40%" src={FrogInvite} />
        <Image width="42%" src={Baseball} />
      </div>
      <br />
      <p>
        Users design, mint, and play as their personal character(s) to compete and earn awards within our community
        including our ecosystem's token, <strong>NFTL</strong>. Purchasing an Ethereum character not only provides you
        with <strong>NFTL</strong> tokens, but unlocks multiplayer modes amongst our games and gives you admission to
        public tournaments. We strive to make our games highly competitive and packed full of nostalgia from retro
        interactive games. Upon launch we’ll release our first game{' '}
        <strong>
          <Link to="/games">Nifty Smashers</Link>
        </strong>
        ; an NFT brawler to battle it out with your friends and the crypto community! Going forward we have several game
        options that we’ll develop based on community votes.
      </p>
      <Title level={2}>Characters</Title>
      <Title level={3}>Overview</Title>
      <p>
        There will be a max supply of <strong>10,000</strong> genesis <strong>DEGENS</strong> minted on Ethereum
        mainnet, <strong>9,900</strong> of which are hand-created by members of our community based on the available
        traits and accessories. The remaining <strong>100</strong> spots are set aside for our team to mint special{' '}
        <strong>DEGENS</strong> that will be given away for free as future community incentives! As our platform
        continues to grow, we plan on launching cross-chain including <strong>BSC</strong> and <strong>FTM</strong> to
        allow users to battle other communities. <strong>25%</strong> of all proceeds from future platform character
        sales will be used to buy back our <strong>NFTL</strong> token and distributed to Ethereum NFT holders at the
        time of collecting. While all NFTs will have the chance to earn daily rewards by playing our games and
        contributing to the community, only Ethereum NFT holders will earn daily <strong>NFTL</strong> tokens for the
        first year as described in our token emissions <a href="#emissions">below</a>.
      </p>
      <Title level={3}>Character Classes</Title>
      <p>
        The first step in designing your own <strong>DEGEN</strong> is deciding on one of the many character classes
        available such as frogs, apes, or aliens. This decision not only affects available character traits or
        accessories, but determines certain in-game mechanics and special moves. During the sale, you can check our{' '}
        <Link to="/degens">characters page</Link> to browse already minted <strong>DEGENS</strong> to help determine
        which classes are rarer than others. Players will naturally gravitate towards certain characters based on their
        personal preferences as gameplay and special moves may be quite different between them for certain games. You’ll
        be able to select which of your characters to play with before each game so no harm in having one of each class!
      </p>
      <div className="d-flex justify-content-around align-items-center">
        <Image width="30%" src={CatSketch} />
        <Image width="29%" src={AlienSketch} />
        <Image width="30%" src={DogeSketch} />
      </div>
      <br />
      <Title level={3}>Character Traits/Accessories</Title>
      <p>
        Put on your creative hat to design the perfect <strong>DEGEN</strong>. There are a total of <strong>___</strong>{' '}
        traits making <strong>___</strong> potential possibilities. Character traits will be randomly removed from the
        set of available traits as more characters are created making it hard to know which options will end up rarest.
        In addition, NFT backgrounds will be randomly assigned upon minting which either results in generic or one of
        three special "holographic" like character cards. We look forward to seeing what creative characters you design
        and will not be shy in sharing some of our favorites!
      </p>
      <Title level={2}>Games</Title>
      <Title level={3}>Daily Rewards</Title>
      <p>
        The more you play the more chances to earn <strong>NFTL</strong> tokens!
      </p>
      <Title level={3}>Tournaments</Title>
      <p>
        Join in on the fun in monthly tournaments which will be incentivized by rewards from our community treasury fund
        at the communities discretion. If a specific tournament has any buy-in fee it will go to the treasury where we
        can buy back our NFTs on OpenSea to give out as awards in addition to <strong>NFTL</strong> tokens.
      </p>
      <Title level={3}>Nifty Smashers</Title>
      <p>Battle it out amongst the community in this fun brawler available at launch!</p>
      <p>Game description...</p>
      <div className="col-md-8 col-lg-6 d-flex align-self-center">
        <NiftySmashersVideo />
      </div>
      <br />
      <Title level={3}>Future Game Ideas</Title>
      <p>
        More details to come…{' '}
        <span role="img" aria-label="devil emoji">
          😈
        </span>
      </p>
      <div className="d-flex justify-content-around align-items-center">
        <Image width="30%" src={TennisSketch} />
        <Image width="30%" src={GamesSketch} />
        <Image width="30%" src={SmashSketch} />
      </div>
      <br />
      <Title level={3}>Community Developers</Title>
      <p>
        Our goal is to expand this platform with as many fun and exciting games as possible and that is only possible
        with the help of our community. We welcome developers to create games utilizing our characters which if selected
        will go live on our platform and hand off full rights to any monetization aspect within the game to you. Get
        creative and send us your ideas! If the game is up to our standards we’d love to share it with the rest of the
        community.
      </p>
      <span id="nftl" />
      <Title level={2}>NFTL Token</Title>
      <Title level={3}>Overview</Title>
      <p>
        The sale of our characters will coincide with the initial distribution of our ecosystem’s native currency and
        governance token <strong>NFTL</strong>. <strong>NFTL</strong> serves a dual purpose of giving users voting
        rights on upcoming games and tournaments as well as being used for expenses platform-wide. This includes naming
        characters, incentivized tournament buy-ins, and purchases within our upcoming NFT store where players can buy
        additional in-game items and collectibles. Any <strong>NFTL</strong> used for naming characters along with{' '}
        <strong>90%</strong> of all NFT store proceeds will be burnt to help offset inflation. The Remaining{' '}
        <strong>10%</strong> will go to our team to cover development expenses.
      </p>
      <Title level={3}>Distribution</Title>
      <p>
        There is no max supply set for now but we expect around <strong>1.5 Billion NFTL</strong> to be distributed over
        the next year following the allocations set below:
      </p>
      <Image
        width={isWidthDown('sm', width) ? '100%' : '75%'}
        src={currentTheme === 'dark' ? TokenDistributionDark : TokenDistribution}
      />
      <Title level={3}>Airdrop</Title>
      <p>
        We’re excited to announce that as part of our launch we will be air-dropping a total of{' '}
        <strong>80M NFTL</strong> to all <strong>AXS</strong> token holders from our snapshot taken on{' '}
        <strong>July 31st, 2021 at 9:50 PM GMT</strong>. Each address holding <strong>AXS</strong> at the time of the
        snapshot will be eligible to claim <strong>5000 NFTL</strong> from our website as soon as we go live. Eligible
        recipients can check their balance on the top-right corner of our website and claim. Any tokens unclaimed after{' '}
        <strong>1 month</strong> will be sent to our community reserve.
      </p>
      <Title level={3}>Meme Contest</Title>
      <p>
        Every project needs some quality memes! Within the first weeks we will be awarding <strong>10M NFTL</strong> to
        our community members who come up with the best memes. Further details will be announced in our{' '}
        <strong>
          <a target="_blank" rel="noopener noreferrer" href="https://discord.gg/4bmTHYWjhe">
            Discord
          </a>
        </strong>
        .
      </p>
      <Title level={3}>Initial Supply</Title>
      <span id="emissions" />
      <p>
        In addition to the airdrop and meme contest, <strong>50M</strong> tokens will be minted and claimable along with
        the purchase of each NFT. <strong>100M</strong> will go to a development fund which will be combined with a
        portion of the ETH received from the genesis character sale and locked in our{' '}
        <strong>
          <a target="_blank" rel="noopener noreferrer" href={sushiswapLPLink}>
            SushiSwap
          </a>
        </strong>{' '}
        liquidity pool for <strong>6 months</strong> following launch. <strong>180M NFTL</strong> will be minted and
        transferred to our community-controlled treasury for future incentives such as tournament rewards or giveaways.
        This brings the initial supply to around <strong>420M</strong> with an incentivized <strong>NFTL/ETH</strong>{' '}
        <strong>
          <a target="_blank" rel="noopener noreferrer" href={sushiswapLPLink}>
            SushiSwap
          </a>
        </strong>{' '}
        liquidity pool and daily emissions for all genesis NFT owners starting shortly after the character sale.
      </p>
      <Title level={3}>First-Year Emissions</Title>
      <p>
        <strong>250M NFTL</strong> will be distributed daily over <strong>1 year</strong> to all genesis{' '}
        <strong>DEGEN</strong> NFT owners. There is no need to stake your NFT, just sit back and watch your{' '}
        <strong>NFTL</strong> accumulate which you can claim on our website at any time on the{' '}
        <Link to="/wallet">wallet page</Link>. In order to support liquidity, we will also continuously emit{' '}
        <strong>NFTL</strong> to incentivize liquidity mining on{' '}
        <strong>
          <a target="_blank" rel="noopener noreferrer" href={sushiswapLPLink}>
            SushiSwap
          </a>
        </strong>{' '}
        following the launch. We expect this to come to around <strong>410M NFTL</strong> over the first year which is
        also our target for daily in-game token rewards.
      </p>
      <Title level={3}>Future Emissions</Title>
      <p>
        We will continue to incentivize our{' '}
        <strong>
          <a target="_blank" rel="noopener noreferrer" href={sushiswapLPLink}>
            SushiSwap
          </a>
        </strong>{' '}
        liquidity pool in addition to rewarding daily tokens for playing our games but the emission rate will drop
        around <strong>50%</strong> after the first year to <strong>200M</strong> annually for each.
      </p>
      <Title level={2}>Future Developments</Title>
      <p>
        Along with additional games, we have several ideas in store to continue to grow our platform and help fund
        expansion. As a forewarning, this is by no means a promise to deliver on features mentioned hereafter if our
        focuses turn towards other aspects of Nifty League’s ecosystem. For now, one of our main goals is to launch an
        NFT marketplace allowing you to collect re-usable NFTs such as cars or special weapons for our games. These
        smart contracts would extend the ERC-1155 Ethereum multi-token standard to create non-fungible items with a set
        limit on availability for each. As a bonus for playing our games, we would like to award items purchasable here
        to players who can then sell them or use them in-game. Another option we are considering is awarding
        time-released NFTs such as treasure chests which you can burn to open the collectible inside. Last but not
        least, rentable characters??
      </p>
    </Container>
  );
};

export default withWidth()(About);
