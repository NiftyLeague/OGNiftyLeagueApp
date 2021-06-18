import React from "react";
import { Image, Typography } from "antd";
import TokenDistribution from "../assets/images/token-distribution.png";

const { Title } = Typography;

export default function () {
  return (
    <section style={{ textAlign: "left", padding: 40 }}>
      <Title level={2}>About Nifty League</Title>
      <p>
        Welcome to the Nifty League! Our mission is to create the first ecosystem of mini-games with customizable
        characters and tradable in-game assets. Users can mint and play as their personal character(s) to compete and
        earn awards within our community including our ecosystem's token, NFTL. Purchasing a character not only provides
        you with NFTL tokens but unlocks multiplayer modes amongst our games and gives you admission to public
        tournaments. We strive to make our games highly competitive and packed full of nostalgia from retro interactive
        games. Upon launch we’ll release our first game NiftySmashers, an NFT brawler to battle it out with your friends
        and the crypto community! Going forward we have several game options that we’ll develop based on community
        votes.
      </p>
      <Title level={2}>Characters</Title>
      <Title level={3}>Overview</Title>
      <p>
        There will be a max supply of 5000 original characters minted on Ethereum mainnet, 4900 of which are
        hand-selected by members of our community based on the available traits and accessories. The remaining 100 spots
        are set aside for our team to mint special characters that will be given away for free as future community
        incentives! Going forward as our platform grows, we plan on launching cross-chain including BSC and FTM to allow
        users to battle other communities. 50% of all proceeds from future platform character sales will be used to buy
        back our token and distributed to Ethereum NFT holders at the time of collecting.
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
        Put on your creative hat to design the perfect "NFT NAME". There are a total of ___ traits making ___ potential
        possibilities. Character traits will be randomly removed from the set of available traits as more characters are
        created making it impossible to know which options will end up rarest. We look forward to seeing what creative
        characters you design and will not be shy in sharing some of our favorites!
      </p>
      <Title level={2}>Games</Title>
      <Title level={3}>Tournaments</Title>
      <p>
        Join in on the fun in monthly tournaments which can be incentivized by rewards from our community treasury fund
        at the communities discretion. If a specific tournament has any buy-in fee it will go to the treasury where we
        can buy back our NFTs on OpenSea to give out as awards in addition to NFTL tokens.
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
        governance token NFTL. NFTL serves a dual purpose of giving users voting rights on upcoming games and
        tournaments as well as being used for incentivized tournament buy-ins and our future NFT store for additional
        in-game collectibles. There is a max supply of 1 Billion to be distributed in full over the next 5 years
        following the allocations set below.
      </p>
      <Title level={3}>Distribution</Title>
      <Image width="50%" src={TokenDistribution} />
      <Title level={3}>Airdrop</Title>
      <p>
        We’re excited to announce that as part of our launch we will be air-dropping a total of 100M NFTL to all MUSE or
        NFTX holders from our snapshot taken on July 1st, 2021. Each address holding one or the other will be eligible
        to claim an equal amount from our website as soon as we go live. Eligible recipients can check their balance on
        the top-right corner of our website and claim. Any tokens unclaimed after 1 month will be sent to our reserve
        for the community to decide what to do with the funds.
      </p>
      <Title level={3}>Initial Supply</Title>
      <p>
        In addition to the 100M airdropped, 25M tokens will be minted and claimable along with the purchase of each NFT.
        This includes the 100 special characters we set aside and will distribute along with the NFTL tokens. This
        brings the initial supply to around 125M with an incentivized NFTL/ETH SushiSwap liquidity pool and daily
        emissions for all NFT owners starting shortly after the character sale.
      </p>
      <Title level={3}>Emissions</Title>
      <p>
        25% of the supply will be distributed daily over 5 years to all "NFT NAME" owners. There is no need to stake
        your NFT, just sit back and watch your NFTL accumulate which you can claim on our website at any time. In order
        to bootstrap our project and create a tradable market, we will also emit 25% of the supply to incentivize
        initial liquidity mining on SushiSwap for 5 months following launch.
      </p>
      <Title level={3}>Reserves</Title>
      <p>
        25% of the supply will be minted and transferred to our community controlled treasury for future incentives such
        as tournament rewards or giveaways. 10% will go to a development fund which is locked for 6 months following
        launch and will be used to continue work throughout the ecosystem.
      </p>
      <Title level={3}>Marketing</Title>
      <p>
        Every project needs some quality memes! We will be awarding 25M NFTL to our community members who come up with
        the best memes. Further details will be announced at a later date.
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
    </section>
  );
}
