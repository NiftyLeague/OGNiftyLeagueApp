import React from 'react';
import { Link } from 'react-router-dom';
import { useThemeSwitcher } from 'react-css-theme-switcher';
import DoneIcon from '@material-ui/icons/Done';
import { Image } from 'antd';

import NiftySmashersVideo from 'components/NiftySmashersVideo';
import Footer from 'components/Footer';

import SatoshiMove from 'assets/images/roadmap/satoshi_move.gif';
import SatoshiStationary from 'assets/images/roadmap/satoshi_stationary.gif';
import Minting from 'assets/images/roadmap/creation.png';
import Smashers from 'assets/images/roadmap/smash_200.png';
import Desktop from 'assets/images/roadmap/desktop-app_v02.png';
import Leaderboards from 'assets/images/roadmap/leaderboards_v02.png';
import P2E from 'assets/images/roadmap/p2e_v02.png';
import Beta from 'assets/images/roadmap/beta_v02.png';
import Rentals from 'assets/images/roadmap/rentals_v02.png';
import F2P from 'assets/images/roadmap/free2play_v02.png';
import Merch from 'assets/images/roadmap/merch_02.png';
import Comics from 'assets/images/roadmap/comics_v01.png';
import Marketplace from 'assets/images/roadmap/marketplace_v02.png';
import DAO from 'assets/images/roadmap/dao_v02.png';
import Mobile from 'assets/images/roadmap/mobile_v02.png';
import Chat from 'assets/images/roadmap/chat_v02.png';
import NiftyVerse from 'assets/images/roadmap/niftyverse_v02.png';
import Pets from 'assets/images/roadmap/pets_v02.png';
import NiftyRoyale from 'assets/images/roadmap/niftyroyale_v01.png';
import NiftyKart from 'assets/images/roadmap/niftykart_v01.png';
import Gen2 from 'assets/images/roadmap/gen2_v01.png';
import Moon from 'assets/images/roadmap/moon.png';
import ComicP1 from 'assets/images/comics/page1.png';
import ComicP2 from 'assets/images/comics/page2.png';
import ComicP3 from 'assets/images/comics/page3.png';
import ComicP4 from 'assets/images/comics/page4.png';

import './roadmap.css';
import './satoshi-right.css';

const Roadmap = (): JSX.Element => {
  const { currentTheme } = useThemeSwitcher();
  return (
    <div className="space">
      <div className="stars">
        <div className="stars2">
          <img src={SatoshiMove} alt="satoshi moving" className="satoshiMove" />
          <img src={SatoshiStationary} alt="satoshi stationary" className="satoshiStationary" />
          <div className="earth" />
          <h1 className="roadmap-title">Nifty League Moonmap</h1>
          <div className="cat-planet" />
          <div className="animated-star" />
          <div className="animated-star2" />
          <div className="animated-star3" />
          <div className="animated-star4" />
          <div className="animated-star5" />
          <div className="animated-star6" />
          <section id="cd-timeline" className="cd-container">
            <div className="cd-timeline-block fade-in">
              <div className="cd-timeline-checkpoint completed">
                <DoneIcon className="done-icon" />
              </div>
              <div className="cd-timeline-content">
                <img src={Minting} alt="minting" className="timeline-content-img" style={{ top: '-77px' }} />
                <h2>Degen Minting</h2>
                <div className="timeline-content-info">
                  <span className="timeline-content-info-title">
                    <i className="fa fa-certificate" aria-hidden="true" />
                    Mission Accomplished
                  </span>
                  <span className="timeline-content-info-date">
                    <i className="fa fa-calendar-o" aria-hidden="true" />
                    Sept 24th - 30th, 2021
                  </span>
                </div>
                <p className="mb-0">
                  Nifty League{' '}
                  <strong>
                    <Link to="/degens">DEGEN NFTs</Link>
                  </strong>{' '}
                  were brought to life by our community at the end of Sept 2021. The minting process was a one-of-a-kind
                  spectacle that allowed minters the ability to design their own DEGEN using Satoshi's{' '}
                  <strong>
                    <Link to="/mint-o-matic">Mint-O-Matic</Link>
                  </strong>
                  !
                </p>
              </div>
            </div>

            <div className="cd-timeline-block fade-in">
              <div className="cd-timeline-checkpoint completed">
                <DoneIcon className="done-icon" />
              </div>
              <div className="cd-timeline-content">
                <img src={Smashers} alt="smashers alpha" className="timeline-content-img" style={{ top: '-70px' }} />
                <h2>Nifty Smashers Alpha</h2>
                <div className="timeline-content-info">
                  <span className="timeline-content-info-title">
                    <i className="fa fa-certificate" aria-hidden="true" />
                    Mission Accomplished
                  </span>
                  <span className="timeline-content-info-date">
                    <i className="fa fa-calendar-o" aria-hidden="true" />
                    Sept 24th, 2021 - Present
                  </span>
                </div>
                <p>
                  Our NFT launch coincided with the immediate availability of our first of many games,{' '}
                  <strong>
                    <Link to="/games">Nifty Smashers</Link>
                  </strong>
                  .
                </p>
                <NiftySmashersVideo />
              </div>
            </div>

            <div className="cd-timeline-block fade-in">
              <div className="cd-timeline-checkpoint completed">
                <DoneIcon className="done-icon" />
              </div>
              <div className="cd-timeline-content">
                <img src={Desktop} alt="desktop app" className="timeline-content-img" style={{ top: '-100px' }} />
                <h2>Desktop App</h2>
                <div className="timeline-content-info">
                  <span className="timeline-content-info-title">
                    <i className="fa fa-certificate" aria-hidden="true" />
                    Mission Accomplished
                  </span>
                  <span className="timeline-content-info-date">
                    <i className="fa fa-calendar-o" aria-hidden="true" />
                    Dec 2nd, 2021
                  </span>
                </div>
                <p>
                  The{' '}
                  <strong>
                    <Link to="/games">Desktop App</Link>
                  </strong>{' '}
                  is now live for Windows users! <em>(MacOS is right around the corner)</em>
                </p>
                <p className="mb-0">
                  Considering browser limitations with our previous WebGL build, we made a point to focus our immediate
                  efforts on creating a launcher to house all of our games and include Discord integrations. Now that
                  memory limits are not a concern we are free to introduce additional animations, movesets, and other
                  NFT projects - all while significantly improving ping for our users.
                </p>
              </div>
            </div>

            <div className="cd-timeline-block fade-in">
              <div className="cd-timeline-checkpoint completed">
                <DoneIcon className="done-icon" />
              </div>
              <div className="cd-timeline-content">
                <img src={P2E} alt="play-2-earn" className="timeline-content-img" style={{ top: '-80px' }} />
                <h2>Play-2-Earn</h2>
                <p>
                  How cool is it to earn money while playing games you actually enjoy? With the rollout of our P2E
                  system you'll be able to start accumulating{' '}
                  <strong>
                    <Link to="/about#nftl">NFTL</Link>
                  </strong>{' '}
                  through casual matches in{' '}
                  <strong>
                    <Link to="/games">Nifty Smashers</Link>
                  </strong>
                  .
                </p>
                <p className="mb-0">
                  While the largest winnings go to whoever secures 1st place in a match, you'll also earn{' '}
                  <strong>
                    <Link to="/about#nftl">NFTL</Link>
                  </strong>{' '}
                  through points scored as well as winning rounds. Be careful not to fall off the map because there will
                  be penalties deducted from your potential earnings!
                </p>
              </div>
            </div>

            <div className="cd-timeline-block fade-in">
              <div className="cd-timeline-checkpoint" />
              <div className="cd-timeline-content">
                <img src={Leaderboards} alt="leaderboards" className="timeline-content-img" style={{ top: '-110px' }} />
                <h2>Leaderboards</h2>
                <p>
                  Our games are meant to be competitive; what better way to showcase this than a leaderboard with star
                  players like FVSVY at the top? 😏
                </p>
                <p>
                  We'll include game stats for daily, weekly, monthly, and of course all-time leaders for all of our
                  games in the NiftyVerse. Some early honorary DEGENS:
                </p>
                <ul className="content-skills">
                  <li>fvsvy 🌊</li>
                  <li>SEIYA</li>
                  <li>sacx</li>
                  <li>RealDealMcKeel</li>
                  <li>YoungParabolic</li>
                  <li>I_M_I</li>
                  <li>koa.eth</li>
                </ul>
              </div>
            </div>

            <div className="cd-timeline-block fade-in">
              <div className="cd-timeline-checkpoint" />
              <div className="cd-timeline-content">
                <img src={Beta} alt="smasher beta" className="timeline-content-img" style={{ top: '-120px' }} />
                <h2>Nifty Smashers Beta</h2>
                <p className="mb-0">
                  We are implementing a new netcode solution which looks very promising even from an early development
                  stage. Not only will this improve lag considerably, but you can expect some cool features such as
                  broadcasting live games and having replays readily available through our archive.
                </p>
              </div>
            </div>

            <div className="cd-timeline-block fade-in">
              <div className="cd-timeline-checkpoint" />
              <div className="cd-timeline-content">
                <img src={Rentals} alt="rentals" className="timeline-content-img" style={{ top: '-90px' }} />
                <h2>Degen Rentals</h2>
                <p>
                  Our player-base is currently limited to the number of unique{' '}
                  <strong>
                    <Link to="/degens">DEGEN NFT</Link>
                  </strong>{' '}
                  holders. We want to scale our platform as much as possible without devaluing our genesis DEGEN tribes
                  who stand at the heart of our ecosystem.
                </p>
                <p className="mb-0">
                  Rather than inflating the character supply as some projects may do, we are introducing a bespoke
                  rental system allowing DEGEN holders to earn{' '}
                  <strong>
                    <Link to="/about#nftl">NFTL</Link>
                  </strong>{' '}
                  daily through fees. Each DEGEN can be rented indefinitely but the cost for doing so will increase
                  exponentially with each additional rental. This allows the market to decide the price for each DEGEN
                  individually while spreading out the rentals across the board as some equipped with precious items,
                  wearables, or backgrounds will have a higher earn rate through NFTL multipliers.
                </p>
              </div>
            </div>

            <div className="cd-timeline-block fade-in">
              <div className="cd-timeline-checkpoint" />
              <div className="cd-timeline-content">
                <img src={F2P} alt="free-2-play" className="timeline-content-img" style={{ top: '-135px' }} />
                <h2>Free-2-Play</h2>
                <p>
                  If you read the last point you'll know that scaling our platform is a high priority. Part of this
                  process is onboarding new users who may not be able to afford to own or rent a DEGEN.
                </p>
                <p className="mb-0">
                  Our free-2-play option will allow new users to hop in matches using a generic character which allows
                  them to test out each tribe’s special move, but more importantly - grind it out until they have enough{' '}
                  <strong>
                    <Link to="/about#nftl">NFTL</Link>
                  </strong>{' '}
                  to pay for a rental.
                </p>
              </div>
            </div>

            <div className="cd-timeline-block fade-in">
              <div className="cd-timeline-checkpoint" />
              <div className="cd-timeline-content">
                <img src={Merch} alt="merch" className="timeline-content-img" style={{ top: '-80px' }} />
                <h2>Merch</h2>
                <p className="mb-0">
                  We know our community can't wait to showcase their cool DEGENS on the streets! We are excited to
                  unveil our merchandise marketplace including two clothing lines. The first having a strong gaming
                  slant similar to Pokémon, while the other will be focused on a rad streetwear aesthetic.
                </p>
              </div>
            </div>

            <div className="cd-timeline-block fade-in">
              <div className="cd-timeline-checkpoint" />
              <div className="cd-timeline-content">
                <img
                  src={Comics}
                  alt="comics"
                  className="timeline-content-img"
                  style={{ top: '-170px', right: '-80px' }}
                />
                <h2>Comics</h2>
                <p>
                  Our team has been slowly hinting at the upcoming utilities for comics - as you may already be aware
                  you will be able to burn each page for special in-game items that increase your DEGEN'S multiplier...
                  but the fun doesn't stop there!
                </p>
                <p>
                  We previously airdropped our initial 4 comic pages to minters and still have 2 pages remaining for
                  DEGEN holders in early 2022. Word from Satoshi - securing a full collection or 2 is <em>highly</em>{' '}
                  recommended.
                </p>
                <Image.PreviewGroup>
                  <Image className="p-2" width="50%" src={ComicP1} />
                  <Image className="p-2" width="50%" src={ComicP2} />
                  <Image className="p-2" width="50%" src={ComicP3} />
                  <Image className="p-2" width="50%" src={ComicP4} />
                </Image.PreviewGroup>
              </div>
            </div>

            <div className="cd-timeline-block fade-in">
              <div className="cd-timeline-checkpoint" />
              <div className="cd-timeline-content">
                <img src={Marketplace} alt="marketplace" className="timeline-content-img" style={{ top: '-80px' }} />
                <h2>Items Marketplace</h2>
                <p>
                  We are working with the Immutable X team to launch our items marketplace early next year. Offerings
                  will include cool skins, weapons, consumable items, and more to enhance your DEGENS in-game. While
                  some items may be cool cosmetic additions, many will include{' '}
                  <strong>
                    <Link to="/about#nftl">NFTL</Link>
                  </strong>{' '}
                  multipliers for play-2-earn.
                </p>
                <p className="mb-0">
                  Items will be sold via{' '}
                  <strong>
                    <Link to="/about#nftl">NFTL</Link>
                  </strong>{' '}
                  in limited quantities. 70% of all proceeds will be burned while the remainder will be sent to the DAO
                  for its initial revenue stream.
                </p>
              </div>
            </div>

            <div className="cd-timeline-block fade-in">
              <div className="cd-timeline-checkpoint" />
              <div className="cd-timeline-content">
                <img src={DAO} alt="DAO" className="timeline-content-img" style={{ top: '-80px' }} />
                <h2>DAO</h2>
                <p className="mb-0">
                  We will gradually be transferring ownership of the Nifty League to our DAO in order to decentralize
                  the platform and encourage devs to help us build! Our vision is to power rapid growth and development
                  through community contributions, enabling us to build a gaming platform like no other. Simply put,
                  DAOs are the future. We see only one route to becoming the world's leading GameFi platform and that’s
                  by building together. 💜
                </p>
              </div>
            </div>

            <div className="cd-timeline-block fade-in">
              <div className="cd-timeline-checkpoint" />
              <div className="cd-timeline-content">
                <img src={Mobile} alt="mobile" className="timeline-content-img" style={{ top: '-140px' }} />
                <h2>Nifty League Mobile</h2>
                <p className="mb-0">
                  Going forward all of our games will be mobile compatible. With a high concentration of gamers using
                  mobile platforms, we envision this release will be pivotal to the project.
                </p>
              </div>
            </div>

            <div className="cd-timeline-block fade-in">
              <div className="cd-timeline-checkpoint" />
              <div className="cd-timeline-content">
                <img src={Chat} alt="chat" className="timeline-content-img" style={{ top: '-110px' }} />
                <h2>In-Game Chat</h2>
                <p className="mb-0">
                  In preparation for the NiftyVerse we will start by releasing an in-game chat for you to talk or text
                  with DEGEN frens. Being a popular request - there is a chance this may even be introduced earlier in
                  our timeline, so stay tuned!
                </p>
              </div>
            </div>

            <div className="cd-timeline-block fade-in">
              <div className="cd-timeline-checkpoint" />
              <div className="cd-timeline-content">
                <img src={NiftyVerse} alt="NiftyVerse" className="timeline-content-img" style={{ top: '-130px' }} />
                <h2>NiftyVerse</h2>
                <p>
                  Welcome to the NiftyVerse; a world filled with DEGENS and NFT communities alike with a shared vision
                  to have fun and build a thriving gaming community. What makes the NiftyVerse stand apart from other
                  metaverses is our p2e games being the centerpiece. Walk into our arcade room filled with fun
                  mini-games or venture to destinations on the map to jump into our classic titles like Nifty Smashers
                  and Nifty Kart.
                </p>
                <p>
                  The world is centered around a city reminiscent of our popular Sushiswap level in Nifty Smashers. To
                  kick things off we will hold a land sale with premium options in the city as well as cheaper
                  undeveloped land outside the city limits. Acquiring premium land in the city where all the action is
                  comes with the additional benefit of having buildings already in place that you can design however you
                  see fit.
                </p>
                <p>
                  If you're a creative type, don't miss this opportunity - we will have an asset store for you to design
                  assets such as buildings or trees and list them for sale based on your defined limits and pricing. Do
                  you want a cool DEGEN theme park or Cyber Kongz meetup? Build out the NiftyVerse to whatever your
                  heart desires!
                </p>
                <p className="mb-0">
                  Oh... and it's probably worth noting the land and assets will be sold with{' '}
                  <strong>
                    <Link to="/about#nftl">NFTL</Link>
                  </strong>{' '}
                  (a portion of which will be burned) so it might be worth hodling your p2e earnings.
                </p>
              </div>
            </div>

            <div className="cd-timeline-block fade-in">
              <div className="cd-timeline-checkpoint" />
              <div className="cd-timeline-content">
                <img src={Pets} alt="pets" className="timeline-content-img" style={{ top: '-125px' }} />
                <h2>Degen Pets</h2>
                <p>
                  Following our NiftyVerse launch we will introduce cool pets for your DEGENS! A lot of community
                  members have asked us to dust off and bring back Satoshi's{' '}
                  <strong>
                    <Link to="/mint-o-matic">Mint-O-Matic</Link>
                  </strong>
                  , and we couldn't agree more!
                </p>
                <p className="mb-0">
                  DEGEN NFT holders will receive whitelist spots so our community can create pets at their leisure. A
                  public offering will follow for any remaining pets. If you missed the first minting experience be sure
                  to keep this one on your calendar!
                </p>
              </div>
            </div>

            <div className="cd-timeline-block fade-in">
              <div className="cd-timeline-checkpoint" />
              <div className="cd-timeline-content">
                <img src={NiftyRoyale} alt="Nifty Royale" className="timeline-content-img" style={{ top: '-88px' }} />
                <h2>Nifty Royale</h2>
                <p className="mb-0">
                  It's important to note that any subsequent games will be voted upon by the DAO. One of the first games
                  we'd like to introduce is a fun battle royale based in the NiftyVerse.
                </p>
              </div>
            </div>

            <div className="cd-timeline-block fade-in">
              <div className="cd-timeline-checkpoint" />
              <div className="cd-timeline-content">
                <img src={NiftyKart} alt="Nifty Kart" className="timeline-content-img" style={{ top: '-140px' }} />
                <h2>Nifty Kart</h2>
                <p className="mb-0">
                  Old school classics are core to our game offerings as we recognize the power of reliving childhood
                  favorites with a Web3 twist. Own your characters &amp; karts and get ready to race for{' '}
                  <strong>
                    <Link to="/about#nftl">NFTL</Link>
                  </strong>
                  !
                </p>
              </div>
            </div>

            <div className="cd-timeline-block fade-in">
              <div className="cd-timeline-checkpoint" />
              <div className="cd-timeline-content">
                <img src={Gen2} alt="gen 2" className="timeline-content-img" style={{ top: '-105px' }} />
                <h2>Gen2 Degens</h2>
                <p className="mb-0">
                  As our platform grows and demand increases DEGEN rental costs - we may consider a future NFT sale
                  introducing new tribes. Do note that the final decision to go this route will rest with the DAO.
                </p>
              </div>
            </div>
          </section>
          <div className="mars" />
          <div className="animated-star7" />
          <div className="animated-star8" />
          <div className="animated-star9" />
          <img src={Moon} alt="moon" className="moon" />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
