import React, { memo, useCallback, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Unity, { UnityContext } from "react-unity-webgl";
import ModalVideo from "react-modal-video";
import { Typography } from "antd";
import Container from "@material-ui/core/Container";

import Preloader from "components/Preloader";
import SaleProgress from "components/SaleProgress";
import { useEventListener, useNFTPrice, useRemovedTraits } from "hooks";

import CharacterBGImg from "assets/images/backgrounds/character_creator.png";
import VideoBGImg from "assets/images/games/nifty-smashers.png";
import PlayIconImg from "assets/images/play-icon-red.png";
import ApeImg from "assets/gifs/ape.gif";
import AlienImg from "assets/gifs/alien1.gif";
import DogeImg from "assets/gifs/doge.gif";
import HumanImg from "assets/images/characters/human.png";
import CatImg from "assets/gifs/cat1.gif";
import FrogImg from "assets/images/characters/frog.png";
import SatoshiImg from "assets/images/characters/satoshi.png";
import { NFT_CONTRACT } from "../../constants";
import { getMintableTraits } from "./helpers";
import "./home.css";

const { Title } = Typography;

const unityContext = new UnityContext({
  loaderUrl: "characterBuild/0.6.11.loader.js",
  dataUrl: "characterBuild/0.6.11.data",
  frameworkUrl: "characterBuild/0.6.11.framework.js",
  codeUrl: "characterBuild/0.6.11.wasm",
  streamingAssetsUrl: "StreamingAssets",
  companyName: "NiftyLeague",
  productName: "NiftyCharacterCreator",
  productVersion: "0.6.11",
});

window.unityInstance = unityContext;
window.unityInstance.SendMessage = unityContext.send;

const Home = memo(({ address, localProvider, readContracts, setRoute, tx, writeContracts }) => {
  const [isLoaded, setLoaded] = useState(false);
  const [isVideoOpen, setVideoOpen] = useState(false);
  const removedTraitsCallback = useRef();

  const nftPrice = useNFTPrice(readContracts);
  const removedTraits = useRemovedTraits(readContracts);

  useEffect(() => {
    if (removedTraitsCallback.current) {
      const traits = removedTraits ?? [];
      console.log("======== removedTraits ========", traits);
      removedTraitsCallback.current(JSON.stringify(traits));
    }
  }, [removedTraits, removedTraitsCallback.current]);

  // 📟 Listen for broadcast events
  const characterMintEvents = useEventListener(readContracts, NFT_CONTRACT, "CharacterGenerated", localProvider, 1);
  console.log("characterMintEvents", characterMintEvents);

  const startAuthentication = useCallback(
    e => {
      const result = `true,${address},My awesome Username`;
      e.detail.callback(result);
    },
    [address],
  );

  const getRemovedTraits = useCallback(e => (removedTraitsCallback.current = e.detail.callback), []);

  const mintCharacter = useCallback(
    async e => {
      console.log("mintCharacter detail", e, e.detail);
      const { character, head, clothing, accessories, items } = getMintableTraits(e.detail);
      const value = "" + parseFloat(nftPrice) * 10 ** 18;
      tx(writeContracts[NFT_CONTRACT].purchase(character, head, clothing, accessories, items, { value }));
      e.detail.callback("true");
    },
    [writeContracts, tx, nftPrice],
  );

  const onScroll = useCallback(() => {
    const content = document.getElementsByClassName("character-canvas")[0];
    if (content) content.style["pointer-events"] = "none";
  }, []);

  const onMouse = useCallback(() => {
    const content = document.getElementsByClassName("character-canvas")[0];
    if (content) {
      content.style["pointer-events"] = "auto";
      content.style.cursor = "pointer";
    }
  }, []);

  useEffect(() => {
    console.log("window", window.unityInstance);
    unityContext.on("loaded", () => setLoaded(true));
    unityContext.on("error", console.error);
    unityContext.on("canvas", element => console.log("Canvas", element));
    window.addEventListener("StartAuthentication", startAuthentication);
    window.addEventListener("GetRemovedTraits", getRemovedTraits);
    window.addEventListener("SubmitTraits", mintCharacter);
    document.addEventListener("wheel", onScroll, false);
    document.addEventListener("mousemove", onMouse, false);
    return () => {
      unityContext.removeAllEventListeners();
      window.removeEventListener("StartAuthentication", startAuthentication);
      window.removeEventListener("GetRemovedTraits", getRemovedTraits);
      window.removeEventListener("SubmitTraits", mintCharacter);
      document.removeEventListener("wheel", onScroll, false);
      document.removeEventListener("mousemove", onMouse, false);
    };
  }, [mintCharacter, onMouse, onScroll, getRemovedTraits, startAuthentication]);

  return (
    <div style={{ textAlign: "center", overflowX: "hidden" }}>
      <Preloader ready={isLoaded} />
      <div
        style={{
          height: 840,
          backgroundImage: `url(${CharacterBGImg})`,
          backgroundRepeat: "repeat-x",
        }}
      >
        <Unity
          className="character-canvas"
          unityContext={unityContext}
          style={{
            width: 1120,
            height: 840,
            visibility: isLoaded ? "visible" : "hidden",
          }}
        />
      </div>
      <section className="about-page-section">
        <SaleProgress readContracts={readContracts} />
        <Container style={{ paddingTop: 32 }}>
          <div className="row">
            <div className="col-md-6 d-flex align-self-center">
              <div className="about-video">
                <img src={VideoBGImg} alt="Nifty Smashers preview" className="video-preview" />
                <button type="button" onClick={() => setVideoOpen(true)} className="play-video">
                  <img src={PlayIconImg} alt="Play icon" />
                </button>
                <ModalVideo
                  channel="youtube"
                  autoplay
                  isOpen={isVideoOpen}
                  videoId="F8xUzipc1p8"
                  onClose={() => setVideoOpen(false)}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="section-heading">
                <Title level={2} className="title">
                  Welcome to the Nifty League
                </Title>
                <p className="text">
                  Our mission is to create the first ecosystem of mini-games with customizable characters and tradable
                  in-game assets.
                </p>
                <p className="text">
                  Advance your skills to earn awards in our games packed full of nostalgia and designed for those who
                  love to compete.
                </p>
                <Link onClick={() => setRoute("/about")} to="/about" className="moreBtn">
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
      <section className="characters">
        <div className="row left">
          <div className="col-sm-4 text-center d-flex align-items-end">
            <img src={CatImg} alt="Cat Character" className="img-fluid" />
          </div>
          <div className="col-sm-8 text">
            <Title className="short-hr left">Yoko</Title>
            <p>
              Yoko lives in the fast and furious Sushi City, where degens come to thrive. Legend has it Andre Cronje has
              been training these cats to fight for years. Don't forget to stop by{" "}
              <a target="_blank" rel="noopener noreferrer" href="https://sushi.com">
                sushi
              </a>{" "}
              and{" "}
              <a target="_blank" rel="noopener noreferrer" href="https://yearn.finance">
                yearn
              </a>{" "}
              HQ while in town!
            </p>
          </div>
        </div>
        <div className="row right">
          <div className="col-sm-8 text">
            <Title className="short-hr right">Doge</Title>
            <p>
              Doge has finally arrived on The Moon. After getting rugged by Elon he gave up aspirations of Mars and has
              his eyes set on the real prize now, making it to the Citadel.
            </p>
          </div>
          <div className="col-sm-4 text-center d-flex align-items-end">
            <img src={DogeImg} alt="Doge Character" className="img-fluid" />
          </div>
        </div>
        <div className="row left">
          <div className="col-sm-4 text-center d-flex align-items-end">
            <img src={AlienImg} alt="Alien Character" className="img-fluid" />
          </div>
          <div className="col-sm-8 text">
            <Title className="short-hr left">Aurora</Title>
            <p>
              Aurora the Alien DJ has been on a universal tour for the past 300 years. She's quite the celebrity but the
              one remaining stage to complete her tour is at The Citadel.
            </p>
          </div>
        </div>
        <div className="row right">
          <div className="col-sm-8 text">
            <Title className="short-hr right">Meek</Title>
            <p>
              Humans have finally colonized Mars, but it's turned into an dystopian capitalist nightmare and the sand
              worms aren’t helping either. Satoshi’s Island looks a lot less... red.
            </p>
          </div>
          <div className="col-sm-4 text-center d-flex align-items-end">
            <img src={HumanImg} alt="Human Character" className="img-fluid" />
          </div>
        </div>
        <div className="row left">
          <div className="col-sm-4 text-center d-flex align-items-end">
            <img src={ApeImg} alt="Ape Character" className="img-fluid" />
          </div>
          <div className="col-sm-8 text">
            <Title className="short-hr left">Java</Title>
            <p>
              Since humans left for Mars and left rising sea levels behind as a gift, the Ape has inherited Earth and
              let nature run its course, planting banana tress everywhere.
            </p>
          </div>
        </div>
        <div className="row right">
          <div className="col-sm-8 text">
            <Title className="short-hr right">Jeremiah</Title>
            <p>
              After destroying his home planet as a result of a simple misunderstanding, Frog welcomes the invite to
              Nifty League to try and redeem himself.
            </p>
          </div>
          <div className="col-sm-4 text-center d-flex align-items-end">
            <img src={FrogImg} alt="Frog Character" className="img-fluid" />
          </div>
        </div>
        <div className="row left">
          <div className="col-sm-4 text-center d-flex align-items-end">
            <img src={SatoshiImg} alt="Satoshi Character" className="img-fluid" />
          </div>
          <div className="col-sm-8 text">
            <Title className="short-hr left">Satoshi</Title>
            <p>
              Satoshi, the creator of Bitcoin, lives in a utopian crypto paradise castle known as The Citadel, on
              Satoshi's Island.
            </p>
          </div>
        </div>
      </section>
      <footer style={{ padding: 20 }} />
    </div>
  );
});

export default Home;
