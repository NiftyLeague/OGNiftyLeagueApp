import React from "react";
import { Link } from "react-router-dom";
import { Image, Typography } from "antd";
import { Container } from "@material-ui/core";
import { useThemeSwitcher } from "react-css-theme-switcher";
import TokenDistribution from "../assets/images/token-distribution.png";
import TokenDistributionDark from "../assets/images/token-distribution-dark.png";

const { Title } = Typography;

export default function ({ setRoute }) {
  const { currentTheme } = useThemeSwitcher();
  return (
    <Container style={{ textAlign: "left", padding: "40px" }}>
      <Title level={2}>About Nifty League</Title>
      <p>
        Welcome to the Nifty League! Our mission is to create the first ecosystem of mini-games with customizable
        characters and tradable in-game assets. Users can mint and play as their personal character(s) to compete and
        earn awards within our community including our ecosystem's token, <strong>NFTL</strong>. Purchasing a character
        not only provides you with <strong>NFTL</strong> tokens but unlocks multiplayer modes amongst our games and
        gives you admission to public tournaments. We strive to make our games highly competitive and packed full of
        nostalgia from retro interactive games. Upon launch we’ll release our first game{" "}
        <strong>
          <Link onClick={() => setRoute("/games")} to="/games">
            NiftySmashers
          </Link>
        </strong>
        , an NFT brawler to battle it out with your friends and the crypto community! Going forward we have several game
        options that we’ll develop based on community votes.
      </p>
      <Title level={2}>Characters</Title>
      <Title level={3}>Overview</Title>
      <p>
        There will be a max supply of <strong>5000</strong> original characters minted on Ethereum mainnet,{" "}
        <strong>4900</strong> of which are hand-selected by members of our community based on the available traits and
        accessories. The remaining <strong>100</strong> spots are set aside for our team to mint special characters that
        will be given away for free as future community incentives! Going forward as our platform grows, we plan on
        launching cross-chain including BSC and FTM to allow users to battle other communities. <strong>50%</strong> of
        all proceeds from future platform character sales will be used to buy back our token and distributed to Ethereum
        NFT holders at the time of collecting.
      </p>
      <Title level={3}>Character Classes</Title>
      <p>
        The first step in designing your own character is deciding on one of the many character classes available such
        as frogs, apes, or aliens. This decision not only affects available character traits or accessories, but
        determines certain in-game mechanics and special moves. During the sale, it will be unknown how much of each
        class is generated which may lead to certain classes being rarer than others. Players will naturally gravitate
        towards certain characters based on their personal preferences as gameplay and special moves may be quite
        different between them for certain games. You’ll be able to select which of your characters to play with before
        each game so no harm in having one of each class!
      </p>
      <Title level={3}>Character Traits/Accessories</Title>
      <p>
        Put on your creative hat to design the perfect <strong>"NFT NAME"</strong>. There are a total of{" "}
        <strong>___</strong> traits making <strong>___</strong> potential possibilities. Character traits will be
        randomly removed from the set of available traits as more characters are created making it impossible to know
        which options will end up rarest. We look forward to seeing what creative characters you design and will not be
        shy in sharing some of our favorites!
      </p>
      <Title level={2}>Games</Title>
      <Title level={3}>Tournaments</Title>
      <p>
        Join in on the fun in monthly tournaments which can be incentivized by rewards from our community treasury fund
        at the communities discretion. If a specific tournament has any buy-in fee it will go to the treasury where we
        can buy back our NFTs on OpenSea to give out as awards in addition to <strong>NFTL</strong> tokens.
      </p>
      <Title level={3}>Frog Smashers</Title>
      <p>Battle it out amongst the community in this fun brawler available at launch! ...</p>
      <Title level={3}>Future Game Ideas</Title>
      <p>More details to come… 😈</p>
      <Title level={3}>Community Developers</Title>
      <p>
        Our goal is to expand this ecosystem with as many fun and exciting games as possible and that is only possible
        with the help of our community. We welcome developers to create games utilizing our characters which if selected
        will go live on our platform and hand off full rights to any monetization aspect within the game to you. Get
        creative and send us your ideas! If the game is up to our standards we’d love to share it with the rest of the
        community.
      </p>
      <Title level={2}>NFTL Token</Title>
      <Title level={3}>Overview</Title>
      <p>
        The sale of our characters will coincide with the initial distribution of our ecosystem’s native currency and
        governance token <strong>NFTL</strong>. <strong>NFTL</strong> serves a dual purpose of giving users voting
        rights on upcoming games and tournaments as well as being used for incentivized tournament buy-ins and our
        future NFT store for additional in-game collectibles. There is a max supply of <strong>1 Billion</strong> to be
        distributed in full over the next <strong>5 years</strong> following the allocations set below.
      </p>
      <Title level={3}>Distribution</Title>
      <Image width={600} src={currentTheme === "dark" ? TokenDistributionDark : TokenDistribution} />
      <Title level={3}>Airdrop</Title>
      <p>
        We’re excited to announce that as part of our launch we will be air-dropping a total of{" "}
        <strong>100M NFTL</strong> to all <strong>MUSE</strong> or
        <strong>NFTX</strong> holders from our snapshot taken on <strong>July 1st, 2021</strong>. Each address holding
        one or the other will be eligible to claim an equal amount from our website as soon as we go live. Eligible
        recipients can check their balance on the top-right corner of our website and claim. Any tokens unclaimed after{" "}
        <strong>1 month</strong> will be sent to our reserve for the community to decide what to do with the funds.
      </p>
      <Title level={3}>Initial Supply</Title>
      <p>
        In addition to the <strong>100M</strong> airdropped, <strong>25M</strong> tokens will be minted and claimable
        along with the purchase of each NFT. This includes the <strong>100</strong> special characters we set aside and
        will distribute along with the <strong>NFTL</strong> tokens. This brings the initial supply to around{" "}
        <strong>125M</strong> with an incentivized <strong>NFTL/ETH</strong>{" "}
        <a target="_blank" rel="noopener noreferrer" href="https://sushi.com">
          SushiSwap
        </a>{" "}
        liquidity pool and daily emissions for all NFT owners starting shortly after the character sale.
      </p>
      <Title level={3}>Emissions</Title>
      <p>
        <strong>25%</strong> of the supply will be distributed daily over <strong>5 years</strong> to all{" "}
        <strong>"NFT NAME"</strong> owners. There is no need to stake your NFT, just sit back and watch your NFTL
        accumulate which you can claim on our website at any time. In order to bootstrap our project and create a
        tradable market, we will also emit <strong>25%</strong> of the supply to incentivize initial liquidity mining on{" "}
        <a target="_blank" rel="noopener noreferrer" href="https://sushi.com">
          SushiSwap
        </a>{" "}
        for <strong>5 months</strong> following launch.
      </p>
      <Title level={3}>Reserves</Title>
      <p>
        <strong>25%</strong> of the supply will be minted and transferred to our community controlled treasury for
        future incentives such as tournament rewards or giveaways. <strong>10%</strong> will go to a development fund
        which is locked for <strong>6 months</strong> following launch and will be used to continue work throughout the
        ecosystem.
      </p>
      <Title level={3}>Marketing</Title>
      <p>
        Every project needs some quality memes! We will be awarding <strong>25M NFTL</strong> to our community members
        who come up with the best memes. Further details will be announced at a later date.
      </p>
      <Title level={2}>Future Developments</Title>
      <p>
        Along with additional games, we have several ideas in store to continue to grow our ecosystem and help fund
        expansion. As a forewarning, this is by no means a promise to deliver on features mentioned hereafter if our
        focuses turn towards other aspects of NiftyLeague’s ecosystem. For now, one of our main goals is to launch an
        NFT marketplace allowing you to collect re-usable NFTs such as cars or special weapons for our games. These
        smart contracts would extend the ERC-1155 Ethereum multi-token standard to create non-fungible items with a set
        limit on the amount available for each. As a bonus, we would like to award items to players who can then freely
        trade them or use them in-game. Another option we are considering is awarding time-released NFTs such as
        treasure chests which you can burn to open the collectible inside.
      </p>
    </Container>
  );
}
