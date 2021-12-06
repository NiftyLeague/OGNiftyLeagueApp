import React from 'react';
import { useThemeSwitcher } from 'react-css-theme-switcher';
import { Image, Typography } from 'antd';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import { Container } from '@material-ui/core';

import Footer from 'components/Footer';
import NiftyLeagueStory from 'assets/gifs/story.gif';
import GamesSketch from 'assets/images/games/games-sketch.png';

import './roadmap.css';

const { Title } = Typography;

const Roadmap = ({ width }: { width: Breakpoint }): JSX.Element => {
  const { currentTheme } = useThemeSwitcher();
  return (
    <div className="space">
      <div className="stars">
        <div className="stars2">
          <div className="earth" />
          <h1 className="title">Nifty League Moonmap</h1>
          <div className="cat-planet" />
          <div className="animated-star" />
          <div className="animated-star2" />
          <div className="animated-star3" />
          <div className="animated-star4" />
          <section id="cd-timeline" className="cd-container">
            <div className="cd-timeline-block fade-in">
              <div className="cd-timeline-img cd-picture" />
              <div className="cd-timeline-content">
                <h2>Degen Minting</h2>
                <div className="timeline-content-info">
                  <span className="timeline-content-info-title">
                    <i className="fa fa-certificate" aria-hidden="true" />
                    Mission Accomplished
                  </span>
                  <span className="timeline-content-info-date">
                    <i className="fa fa-calendar-o" aria-hidden="true" />
                    Sept 24th - 30th 2021
                  </span>
                </div>
                <p>
                  Our DEGEN NFTs were brought to life by our community at the end of Sept 2021. The minting process was
                  a one-of-a-kind spectacle that allowed minters the ability to design their own DEGEN using the
                  Mint-O-Matic! Check out our homepage for a flashback to the past.
                </p>
                {/* <ul className="content-skills">
                  <li>HTML5</li>
                  <li>CSS3</li>
                  <li>JavaScript</li>
                  <li>jQuery</li>
                  <li>Wordpress</li>
                </ul> */}
              </div>
            </div>

            <div className="cd-timeline-block fade-in">
              <div className="cd-timeline-img cd-movie" />
              <div className="cd-timeline-content">
                <h2>Nifty Smashers Online Alpha</h2>
                <div className="timeline-content-info">
                  <span className="timeline-content-info-title">
                    <i className="fa fa-certificate" aria-hidden="true" />
                    Mission Accomplished
                  </span>
                  <span className="timeline-content-info-date">
                    <i className="fa fa-calendar-o" aria-hidden="true" />
                    Sept 24th - Present
                  </span>
                </div>
                <p>
                  Unlike our various competitors, our NFT launch coincided with the immediate availability of our first
                  game Nifty Smashers. Check out our games page to battle it out with your DEGENS!
                </p>
              </div>
            </div>

            <div className="cd-timeline-block fade-in">
              <div className="cd-timeline-img cd-picture" />
              <div className="cd-timeline-content">
                <h2>Desktop App</h2>
                <div className="timeline-content-info">
                  <span className="timeline-content-info-title">
                    <i className="fa fa-certificate" aria-hidden="true" />
                    Mission Accomplished
                  </span>
                  <span className="timeline-content-info-date">
                    <i className="fa fa-calendar-o" aria-hidden="true" />
                    December 2nd 2021
                  </span>
                </div>
                <p>
                  Unlike our various competitors, our NFT launch coincided with the immediate availability of our first
                  game Nifty Smashers.
                </p>
              </div>
            </div>

            <div className="cd-timeline-block fade-in">
              <div className="cd-timeline-img cd-location" />
              <div className="cd-timeline-content">
                <h2>Leaderboards</h2>
                <p>
                  Our games are meant to be competitive. What better way to showcase this than a leaderboard with star
                  players like FVSVY at the top? We'll include game stats for daily, weekly, monthly, and of course all
                  time leaders for all of our games in the NiftyVerse.
                </p>
              </div>
            </div>

            <div className="cd-timeline-block fade-in">
              <div className="cd-timeline-img cd-location" />
              <div className="cd-timeline-content">
                <h2>P2E</h2>
                <p>
                  How cool is it to earn money while playing games you actually enjoy? With the rollout of our P2E
                  system you'll be able to start accumulating NFTL through casual matches in Nifty Smashers. While the
                  largest winnings go to whoever secures 1st place in a match, you'll also earn NFTL through points
                  scored as well as winning rounds. Be careful not to fall off the map because there will be penalties
                  takes out of your winning sum!
                </p>
              </div>
            </div>

            <div className="cd-timeline-block fade-in">
              <div className="cd-timeline-img cd-movie" />
              <div className="cd-timeline-content">
                <h2>Nifty Smashers Beta</h2>
                <p>
                  How cool is it to earn money while playing games you actually enjoy? With the rollout of our P2E
                  system you'll be able to start accumulating NFTL through casual matches in Nifty Smashers. While the
                  largest winnings go to whoever secures 1st place in a match, you'll also earn NFTL through points
                  scored as well as winning rounds. Be careful not to fall off the map because there will be penalties
                  takes out of your winning sum!
                </p>
              </div>
            </div>

            <div className="cd-timeline-block fade-in">
              <div className="cd-timeline-img cd-movie" />
              <div className="cd-timeline-content">
                <h2>Degen Rentals</h2>
                <p>
                  With the current setup our player-base is limited to the number of unique DEGEN holders. We want to
                  scale our platform as much as possible without removing value from our genesis DEGEN NFTs which stand
                  as the heart of our ecosystem.
                </p>
                <p>
                  Rather than inflating the character supply as some projects may do, we are introducing a bespoke
                  rental system allowing holders to earn NFTL daily through fees. Each DEGEN can be rented as many times
                  as people want but the cost for doing so will increase exponentially with each additional rental. This
                  allows for the market to decide the price for each DEGEN individually while spreading out the rentals
                  across the board as some equipped with precious items, wearables, or backgrounds will have a higher
                  earn rate through NFTL multipliers.
                </p>
              </div>
            </div>

            <div className="cd-timeline-block fade-in">
              <div className="cd-timeline-img cd-movie" />
              <div className="cd-timeline-content">
                <h2>Free-2-Play</h2>
                <p>
                  If you read the last point you'll know that scaling our platform is a high priority. Part of this
                  process is onboarding new users who may not have money upfront to play. Our free-2-play option will
                  allow new users to hop in matches using a generic character which allows them to test out each tribes
                  special moves but more importantly - grind it out until they have enough NFTL to pay for a rental.
                </p>
              </div>
            </div>

            <div className="cd-timeline-block fade-in">
              <div className="cd-timeline-img cd-movie" />
              <div className="cd-timeline-content">
                <h2>Merch</h2>
                <p>
                  If you read the last point you'll know that scaling our platform is a high priority. Part of this
                  process is onboarding new users who may not have money upfront to play. Our free-2-play option will
                  allow new users to hop in matches using a generic character which allows them to test out each tribes
                  special moves but more importantly - grind it out until they have enough NFTL to pay for a rental.
                </p>
              </div>
            </div>

            <div className="cd-timeline-block fade-in">
              <div className="cd-timeline-img cd-movie" />
              <div className="cd-timeline-content">
                <h2>Comics</h2>
                <p>
                  Our team has been slowly hinting at the upcoming utilities for comics... As you may already be aware
                  you will be able to burn each page for special in-game items that increase your DEGENS NFTL multiplier
                  but the fun doesn't stop there! With the first 4 pages airdropped to minters we have two more pages
                  coming early 2022 to our holders. Word from Satoshi - securing a full collection or 2 is highly
                  recommended.
                </p>
              </div>
            </div>

            <div className="cd-timeline-block fade-in">
              <div className="cd-timeline-img cd-movie" />
              <div className="cd-timeline-content">
                <h2>Items Marketplace</h2>
                <p>
                  We are working with the Immutable X team to launch our items marketplace early next year. Offerings
                  will include cool skins, weapons, consumable items, and more to enhance your DEGENS in-game. While
                  some items may be cool cosmetic additions, many will include NFTL multipliers for play-2-earn.
                </p>
                <p>
                  Items will be sold via NFTL in limited quantities. 70% of all proceeds will be burned while the
                  remainder is sent to the DAO as its initial revenue stream.
                </p>
              </div>
            </div>

            <div className="cd-timeline-block fade-in">
              <div className="cd-timeline-img cd-movie" />
              <div className="cd-timeline-content">
                <h2>DAO</h2>
                <p>
                  We will gradually be transferring ownership of the Nifty League to our DAO in order to decentralize
                  the platform and encourage devs to help us build! Our vision is power rapid growth and development
                  through community contributions enabling us to build a gaming platform like no other. Simply put, DAOs
                  are the future. We see only one route to becoming the world's leading GameFi platform and that’s by
                  building together. 💜
                </p>
              </div>
            </div>

            <div className="cd-timeline-block fade-in">
              <div className="cd-timeline-img cd-movie" />
              <div className="cd-timeline-content">
                <h2>Nifty League Mobile</h2>
                <p>
                  Going forward all of our games will be mobile compatible. With a high concentration of gamers in this
                  category we envision this release to be pivotal to our platform.
                </p>
              </div>
            </div>

            <div className="cd-timeline-block fade-in">
              <div className="cd-timeline-img cd-movie" />
              <div className="cd-timeline-content">
                <h2>In-Game Chat</h2>
                <p>
                  In preparation for the NiftyVerse we will start by releasing an in-game chat for you to talk or text
                  with degen frens. Being a popular request - there is a chance this may even be introduced earlier in
                  our timeline so stay tuned!
                </p>
              </div>
            </div>

            <div className="cd-timeline-block fade-in">
              <div className="cd-timeline-img cd-movie" />
              <div className="cd-timeline-content">
                <h2>NiftyVerse</h2>
                <p>
                  Welcome to the NiftyVerse... A world filled with degens and NFT communities alike having a common
                  mission to build a thriving gaming community and have fun. What makes the NiftyVerse stand apart from
                  other metaverses is our p2e games being the centerpiece. Walk into our arcade room filled with fun
                  mini-games or venture to destinations on the map to jump into our classic titles like Nifty Smashers
                  or Nifty Kart.
                </p>
                <p>
                  Welcome to the NiftyVerse... A world filled with degens and NFT communities alike having a common
                  mission to build a thriving gaming community and have fun. What makes the NiftyVerse stand apart from
                  other metaverses is our p2e games being the centerpiece. Walk into our arcade room filled with fun
                  mini-games or venture to destinations on the map to jump into our classic titles like Nifty Smashers
                  or Nifty Kart.
                </p>
                <p>
                  Oh.... and it's probably worth noting the land sale and assets will be done with NFTL (a portion of
                  which will be burned) so might be worth hodling your p2e earnings.
                </p>
              </div>
            </div>

            <div className="cd-timeline-block fade-in">
              <div className="cd-timeline-img cd-movie" />
              <div className="cd-timeline-content">
                <h2>Degen Pets</h2>
                <p>
                  Following our NiftyVerse launch we will introduce some cool pets for your DEGENS! A lot of community
                  members have asked to bring back the Mint-O-Matic and trust us we won't disappoint. DEGEN NFT holders
                  will receive whitelist spots so our community can create their pets in peace. A public offering will
                  follow for any remaining pets. If you missed the first minting experience be sure to keep this one on
                  your calendar!
                </p>
              </div>
            </div>

            <div className="cd-timeline-block fade-in">
              <div className="cd-timeline-img cd-movie" />
              <div className="cd-timeline-content">
                <h2>Nifty Royale</h2>
                <p>
                  Following our NiftyVerse launch we will introduce some cool pets for your DEGENS! A lot of community
                  members have asked to bring back the Mint-O-Matic and trust us we won't disappoint. DEGEN NFT holders
                  will receive whitelist spots so our community can create their pets in peace. A public offering will
                  follow for any remaining pets. If you missed the first minting experience be sure to keep this one on
                  your calendar!
                </p>
              </div>
            </div>

            <div className="cd-timeline-block fade-in">
              <div className="cd-timeline-img cd-movie" />
              <div className="cd-timeline-content">
                <h2>Nifty Kart</h2>
                <p>
                  Old school classics are core to our game offerings as we recognize the power of reliving childhood
                  favorites with a Web3 twist. Own your characters & karts and get ready to race for NFTL.
                </p>
              </div>
            </div>

            <div className="cd-timeline-block fade-in">
              <div className="cd-timeline-img cd-movie" />
              <div className="cd-timeline-content">
                <h2>Gen2 Degens</h2>
                <p>
                  Old school classics are core to our game offerings as we recognize the power of reliving childhood
                  favorites with a Web3 twist. Own your characters & karts and get ready to race for NFTL.
                </p>
              </div>
            </div>
          </section>
          <div className="mars" />
          <div className="animated-star5" />
          <div className="moon" />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default withWidth()(Roadmap);
