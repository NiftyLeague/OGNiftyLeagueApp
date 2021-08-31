import React from 'react';
import { Link } from 'react-router-dom';
import { useThemeSwitcher } from 'react-css-theme-switcher';
import { Image, Typography } from 'antd';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
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
import NiftyRacersSketch from 'assets/images/games/nifty-racers-sketch.png';
import TokenDistributionLight from 'assets/images/nftl-distribution-light.png';
import TokenDistributionDark from 'assets/images/nftl-distribution-dark.png';
import NFTL from 'assets/images/NFTL.png';
import Ape from 'assets/images/characters/ape.png';
import Human from 'assets/images/characters/human.png';
import Doge from 'assets/images/characters/doge.png';
import Frog from 'assets/images/characters/frog.png';
import Cat from 'assets/images/characters/cat.png';
import Alien from 'assets/images/characters/alien.png';

const { Title } = Typography;

const About = ({ width }: { width: Breakpoint }): JSX.Element => {
  const { currentTheme } = useThemeSwitcher();
  const sushiswapLPLink = 'https://sushi.com';
  return (
    <Container style={{ textAlign: 'left', padding: '40px' }}>
      <Title level={2}>
        About Nifty League{' '}
        <span role="img" aria-label="joystick emoji">
          🕹️
        </span>
      </Title>
      <p>
        Welcome to the Nifty League! Our mission is to create an interactive and community governed NFT gaming platform.
        Nifty League prides itself on being one of the first platforms offering competitive games utilizing customizable
        characters and tradable in-game assets.
      </p>
      <div className="d-flex justify-content-around align-items-center">
        <Image width="40%" src={FrogInvite} preview={false} />
        <Image width="42%" src={Baseball} preview={false} />
      </div>
      <br />
      <p>
        Users design, mint, and play as their personal character(s) to compete and earn awards within our community
        including our ecosystem's token, <strong>NFTL</strong>. Purchasing an Ethereum character not only provides you
        with <strong>NFTL</strong> tokens, but unlocks multiplayer modes amongst our games giving you admission to
        public tournaments. We strive to make our games highly competitive and packed full of nostalgia from retro
        interactive games. Upon launch we’ll release our first game{' '}
        <strong>
          <Link to="/games">Nifty Smashers</Link>
        </strong>
        ; an NFT brawler to battle it out with your friends and the crypto community! Going forward we have several game
        options that we’ll develop based on the communities input.
      </p>
      <Title level={3}>Nifty DAO</Title>
      <p>
        We will gradually be transfering over ownership of the Nifty League to our DAO in order to decentralize the
        platform and encourage devs to help us build! <strong>NFTL</strong> is our native governance token which
        provides voting rights amongst other utilities you can read about <a href="about#nftl">below</a>. Our treasury
        assets are held within a Polygon gnosis multi-sig wallet which will be used to handle distributions to future
        project contributors as well as for tournaments or other activities. We are actively looking for notable members
        of our community to join our DAO board of members and help control the multi-sig wallet so get in touch if you
        think you would be a good fit!
      </p>
      <Title level={2}>Characters</Title>
      <Title level={3}>Overview</Title>
      <p>
        There will be a max supply of <strong>10,000</strong> genesis <strong>DEGENS</strong> minted on Ethereum
        mainnet, <strong>9,950</strong> of which are hand-created by members of our community based on the available
        traits and accessories. The initial 5 slots are set for our developers to freely mint their personal characters
        to join in our games. As soon as the 5th <strong>DEGEN</strong> is minted the sale will officially start! The
        remaining <strong>45</strong> spots are set aside to mint special <strong>DEGENS</strong> that will be given
        away for free as future community incentives from the <strong>Nifty DAO</strong>!
      </p>
      <Title level={3}>Future Character Sales</Title>
      <p>
        As our platform continues to grow, we'll aim for partnerships with other popular NFT projects to increase the
        player capacity for our games which are only available to <strong>DEGEN</strong> holders (...if you're reading
        this BAYC{' '}
        <span role="img" aria-label="heart emoji">
          💜
        </span>
        ). Another option is to monitor demand and make a decision whether to do an additional launch on another EVM
        compatible chain like Polygon or Avalanche to onboard new users and enable cross-chain gaming. If so,{' '}
        <strong>50%</strong> of all proceeds from future character sales will be sent to the <strong>Nifty DAO</strong>.
        It is important to note that the unique trait combinations from our genesis <strong>DEGENS</strong> will never
        be mintable again and the <strong>Nifty DAO</strong> will have the option to decide if any new characters should
        be listed as gen 2 with completely different tribes all together. While all NFTs will have the chance to earn
        daily rewards by playing our games and contributing to the community, only Ethereum NFT holders will earn daily{' '}
        <strong>NFTL</strong> tokens for the first <strong>3 years</strong> as described in our token emissions{' '}
        <a href="about#emissions">below</a>.
      </p>
      <Title level={3}>
        Tribes <img src={Ape} alt="ape" width={32} />
        <img src={Human} alt="human" width={32} />
        <img src={Doge} alt="Doge" width={32} />
        <img src={Frog} alt="Frog" width={32} />
        <img src={Cat} alt="Cat" width={34} style={{ marginTop: -2 }} />
        <img src={Alien} alt="Alien" width={32} />
      </Title>
      <p>
        The first step in designing your own <strong>DEGEN</strong> is deciding on one of the many tribes available such
        as frogs, apes, or aliens. This decision not only affects available character traits or accessories, but
        determines certain in-game mechanics and special moves. During the sale, you can check our{' '}
        <Link to="/degens">degens page</Link> to browse through minted <strong>DEGENS</strong> to determine which tribes
        are rarer than others. Players will naturally gravitate towards certain characters based on their personal
        preferences as gameplay and special moves may be quite different between them for certain games. You’ll be able
        to select which of your characters to play with before each game so no harm in having one of each tribe!
      </p>
      <div className="d-flex justify-content-around align-items-center">
        <Image.PreviewGroup>
          <Image width="30%" src={CatSketch} />
          <Image width="29%" src={AlienSketch} />
          <Image width="30%" src={DogeSketch} />
        </Image.PreviewGroup>
      </div>
      <br />
      <Title level={3}>
        Character Traits/Accessories{' '}
        <span role="img" aria-label="crown emoji">
          👑
        </span>
      </Title>
      <p>
        Put on your creative hat to design the perfect <strong>DEGEN</strong>. There are a total of{' '}
        <strong>1023</strong> traits and <strong>21</strong> selectable options after selecting a tribe making nearly
        endless potential combinations. Character traits will be randomly removed from the set of available traits as
        more characters are created making it difficult to know which options will end up rarest. In addition, NFT
        backgrounds will be randomly assigned upon minting which either results in a common background or one of three
        special options: <strong>Rare</strong>, <strong>Meta</strong>, or <strong>Legendary</strong>. We look forward to
        seeing what creative characters you design and will not be shy in sharing some of our favorites!
      </p>
      <Title level={2}>
        Games{' '}
        <span role="img" aria-label="controller emoji">
          🎮
        </span>
      </Title>
      <Title level={3}>
        Daily Rewards <img src={NFTL} alt="NFTL logo" width={24} />
      </Title>
      <p>
        The more you play the more chances to earn <strong>NFTL</strong> tokens! More details will be announced as we
        define our emission model for each new game. As part of this we plan on implementing a progression system in the
        future to level up your characters and gain more rewards for your XP. This is something we want to take slowly
        so we can be sure to define the best rewards system for our platform and mitigate issues with bots attempting to
        game the system.
      </p>
      <p>
        We'll also frequently reward users for staying active within our community so be sure to join our{' '}
        <strong>
          <a target="_blank" rel="noopener noreferrer" href="https://discord.gg/4bmTHYWjhe">
            Discord
          </a>
        </strong>{' '}
        to get access to random <strong>NFTL</strong> tips! We are always watching and keeping track of users providing
        the most value to our community ;). Help us onboard new members by answering questions and you just might find
        even more tips coming your way!
      </p>
      <Title level={3}>
        Tournaments{' '}
        <span role="img" aria-label="trophy emoji">
          🏆
        </span>
      </Title>
      <p>
        Join in on the fun in weekly or monthly tournaments! All tournaments may be incentivized by rewards from our
        community treasury fund at the <strong>Nifty DAO's</strong> discretion via token voting. Some tournament
        champions may even walk away with some special edition Key to the Citadel{' '}
        <span role="img" aria-label="key emoji">
          🗝️
        </span>{' '}
        NFTs... For any other activities you'd like to see implemented, reach out to our team!
      </p>
      <Title level={3}>
        Nifty Smashers{' '}
        <span role="img" aria-label="boxing glove emoji">
          🥊
        </span>
      </Title>
      <p>
        Get ready to brawl! The beta version of{' '}
        <strong>
          <Link to="/games">Nifty Smashers</Link>
        </strong>{' '}
        will be available at launch including local and online multiplayer modes!
      </p>
      <p>
        Battle it out amongst the community and get as many bat bonks{' '}
        <span role="img" aria-label="baguette emoji">
          🥖
        </span>{' '}
        in on your friends as you can! <strong>Nifty Smashers</strong> takes inspirations from the classic game of Smash
        Bros where the objective is to knock your opponents off the map to score points. In order to play you'll need a{' '}
        <strong>DEGEN</strong> to select for battle. From the game lobby you'll be able to select from any of the{' '}
        <strong>DEGENs</strong> in your wallet to show off your cool creations! Each tribe has a different special move
        so think carefully while selecting which tribe to mint. As noted, this is only a beta release of our initial
        game so lag and issues with pesky bots is expected. Our plan is to continue development on this game to
        introduce more features such as additional combo moves and a progression system. Hop in our{' '}
        <strong>
          <a target="_blank" rel="noopener noreferrer" href="https://discord.gg/4bmTHYWjhe">
            Discord
          </a>
        </strong>{' '}
        to provide feedback and ideas on how we can bring <strong>Nifty Smashers</strong> to the next level!
      </p>
      <div className="col-md-8 col-lg-6 d-flex align-self-center">
        <NiftySmashersVideo />
      </div>
      <br />
      <Title level={3}>
        Future Game Ideas{' '}
        <span role="img" aria-label="light bulb emoji">
          💡
        </span>
      </Title>
      <p>
        We heard you like metaverses? We do too. We have several ideas in store to introduce once we get{' '}
        <strong>
          <Link to="/games">Nifty Smashers</Link>
        </strong>{' '}
        to the level we want it to be. Stay tuned in our{' '}
        <strong>
          <a target="_blank" rel="noopener noreferrer" href="https://discord.gg/4bmTHYWjhe">
            Discord
          </a>
        </strong>{' '}
        for more details…{' '}
        <span role="img" aria-label="devil emoji">
          😈
        </span>
      </p>
      <div className="d-flex justify-content-around align-items-center flex-wrap">
        <Image.PreviewGroup>
          <Image width={isWidthDown('md', width, false) ? '49%' : '24%'} src={TennisSketch} />
          <Image width={isWidthDown('md', width, false) ? '49%' : '24%'} src={NiftyRacersSketch} />
          <Image width={isWidthDown('md', width, false) ? '49%' : '24%'} src={GamesSketch} />
          <Image width={isWidthDown('md', width, false) ? '49%' : '24%'} src={SmashSketch} />
        </Image.PreviewGroup>
      </div>
      <br />
      <Title level={3}>
        Community Developers{' '}
        <span role="img" aria-label="technologist emoji">
          🧑‍💻
        </span>
      </Title>
      <p>
        Our goal is to expand this platform with as many fun and exciting games as possible and that is only possible
        with the help of our community. We welcome developers to create games utilizing our characters which if selected
        will go live on our platform and in return you will be rewarded from the <strong>Nifty DAO</strong> for your
        contributions. Get creative and send us your ideas! If the game is up to our standards we’d love to share it
        with the rest of the community.
      </p>
      <span id="nftl" />
      <Title level={2}>
        NFTL Token <img src={NFTL} alt="NFTL logo" width={32} style={{ marginTop: -4 }} />
      </Title>
      <Title level={3}>Overview</Title>
      <p>
        <strong>NFTL</strong> acts as a way to decentralize our ecosystem through making important decisions on the
        direction of Nifty League via the <strong>Nifty DAO</strong>. The sale of our characters will coincide with the
        initial distribution of our ecosystem’s native currency and governance token <strong>NFTL</strong>.{' '}
        <strong>NFTL</strong> serves a dual purpose of giving users voting rights on upcoming games and tournaments as
        well as being used for expenses platform-wide. For now, this only includes naming characters, but may be
        expanded to be used for purchasing additional in-game items, collectibles or even potential future characters.
        Any <strong>NFTL</strong> used for naming characters is immediately burnt or removed from circulation. If and
        when additional in-game items are introduced, <strong>90%</strong> of all proceeds will be given to the{' '}
        <strong>Nifty DAO</strong> with the remaining <strong>10%</strong> paid to our team.
      </p>
      <Title level={3}>Distribution (First Year)</Title>
      <p>
        There is no max supply set for now but we expect around <strong>1 Billion NFTL</strong> to be distributed over
        the next year following the allocations set below:
      </p>
      <Image
        preview={false}
        src={currentTheme === 'dark' ? TokenDistributionDark : TokenDistributionLight}
        width={isWidthDown('sm', width) ? '100%' : '75%'}
      />
      <Title level={3}>
        Airdrop{' '}
        <span role="img" aria-label="present emoji">
          🎁
        </span>
      </Title>
      <p>
        We’re excited to announce that as part of our launch we will be air-dropping a total of{' '}
        <strong>104M NFTL</strong> to all <strong>Ethereum Mainnet AXS</strong> token holders from our snapshot taken at{' '}
        <strong>
          <a target="_blank" rel="noopener noreferrer" href="https://etherscan.io/block/13095547">
            Block #13095547
          </a>
        </strong>{' '}
        on <strong>August 25th, 2021 4:28 PM +UTC</strong>. Each address holding <strong>AXS</strong> at the time of the
        snapshot will be eligible to claim <strong>4000 NFTL</strong> from our website as soon as we go live. Eligible
        recipients will see a claim button on our navbar. <br />
        <strong>Note: Any tokens unclaimed after 2 months will be sent to the Nifty DAO</strong>.
      </p>
      <Title level={3}>Marketing</Title>
      <p>
        Every project needs some quality memes! Within the first weeks we will be awarding <strong>1M NFTL</strong> to
        our community members who come up with the best memes or Discord stickers. Further details will be announced in
        the{' '}
        <strong>
          <a target="_blank" rel="noopener noreferrer" href="https://discord.gg/4bmTHYWjhe">
            Nifty League Discord
          </a>
        </strong>
        . We will also be randomly tipping Discord users a total of <strong>10.4M NFTL</strong> over the first few
        weeks. As noted earlier, these tips will remain available for active Discord members going forward but the rate
        is expected to be much lower.
      </p>
      <Title level={3}>Initial Supply</Title>
      <span id="emissions" />
      <p>
        In addition to the airdrop and marketing expenses, <strong>79.6M</strong> tokens in total will be minted and
        claimable along with the purchase of <strong>DEGEN</strong> NFTs. <strong>100M</strong> will go to a team
        development fund which will be time-locked for <strong>6 months</strong> following launch.{' '}
        <strong>125M NFTL</strong> will be minted and transferred to our community-controlled treasury under the{' '}
        <strong>Nifty DAO</strong> for initial funding and future community incentives such as tournament rewards or
        giveaways. This brings the initial supply to <strong>420M</strong> with daily emissions for all genesis NFT
        owners starting immediately after each character sale.
      </p>
      <Title level={3}>Emissions</Title>
      <p>
        <strong>250M NFTL</strong> will be distributed annually over the first <strong>3 years</strong> to all genesis{' '}
        <strong>DEGEN</strong> NFT owners. There is no need to stake your NFT, just sit back and watch your{' '}
        <strong>NFTL</strong> accumulate daily which you can claim on our website at any time on the{' '}
        <Link to="/wallet">wallet page</Link>.
      </p>
      <p>
        Any remaining future emissions will either be for daily in-game rewards or funding for the{' '}
        <strong>Nifty DAO</strong>. We will grant the <strong>Nifty DAO</strong> to mint up to{' '}
        <strong>330M NFTL</strong> over the first year after we get a minimum of <strong>10 signers</strong> controlling
        the multi-sig wallet. We see most of these tokens going to community contributors as well as being used for
        competition rewards but ultimately the DAO will make the decision when time comes.
      </p>
      <Title level={2}>Future Developments</Title>
      <p>
        Along with additional games, we have several ideas in store to continue to grow our platform. As a forewarning,
        this is by no means a promise to deliver on features mentioned hereafter if our focuses turn towards other
        aspects of Nifty League’s ecosystem. For now, one of our main goals is to launch or partner with an NFT
        marketplace allowing you to collect re-usable NFTs such as cars or special weapons for our games. These smart
        contracts would extend the ERC-1155 Ethereum multi-token standard to create non-fungible items with a set limit
        on availability for each. As a bonus for playing our games, we would like to award items purchasable here to
        players who can then sell them or use them in-game. Another option we are considering is awarding time-released
        NFTs such as treasure chests which you can burn to open the collectible inside. Last but not least, rentable
        characters?? Let's see what the DAO decides!
      </p>
    </Container>
  );
};

export default withWidth()(About);
