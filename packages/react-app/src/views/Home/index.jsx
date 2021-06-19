import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import Unity, { UnityContext } from "react-unity-webgl";
import ModalVideo from "react-modal-video";
import { Progress, Typography } from "antd";
import { NFT_CONTRACT } from "../../constants";
import { useEventListener } from "../../hooks";
import CharacterBGImg from "../../assets/images/backgrounds/character_creator.png";
import VideoBGImg from "../../assets/images/games/nifty-smashers.png";
import PlayIconImg from "../../assets/images/play-icon-red.png";
import ApeImg from "../../assets/gifs/ape.gif";
import AlienImg from "../../assets/gifs/alien1.gif";
import DogeImg from "../../assets/gifs/doge.gif";
import HumanImg from "../../assets/images/characters/human.png";
import CatImg from "../../assets/gifs/cat1.gif";
import FrogImg from "../../assets/images/characters/frog.png";
import SatoshiImg from "../../assets/images/characters/satoshi.png";
import "./home.css";

const { Title } = Typography;

const unityContext = new UnityContext({
  loaderUrl: "characterBuild/0.3.20.loader.js",
  dataUrl: "characterBuild/0.3.20.data",
  frameworkUrl: "characterBuild/0.3.20.framework.js",
  codeUrl: "characterBuild/0.3.20.wasm",
  streamingAssetsUrl: "streamingassets",
  companyName: "NiftyLeague",
  productName: "NiftyCharacterCreator",
  productVersion: "0.3.20",
});

window.ctx = unityContext;

function objectify(array) {
  return array.reduce((p, c) => {
    // eslint-disable-next-line prefer-destructuring, no-param-reassign
    p[c[0].replace(" ", "")] = c[1];
    return p;
  }, {});
}

export default function Home({ nftPrice, localProvider, readContracts, setRoute, tx, writeContracts }) {
  const [isLoaded, setLoaded] = useState(false);
  const [progression, setProgression] = useState(0);
  const [isVideoOpen, setVideoOpen] = useState(false);

  // 📟 Listen for broadcast events
  const characterMintEvents = useEventListener(readContracts, NFT_CONTRACT, "CharacterGenerated", localProvider, 1);
  console.log("characterMintEvents", characterMintEvents);

  const mintCharacter = useCallback(
    async e => {
      console.log("mintCharacter detail", e, e.detail);
      const traits = objectify(e.detail);
      const {
        Tribe,
        SkinColor,
        FurColor,
        EyeColor,
        PupilColor,
        Hair,
        Mouth,
        Beard,
        Facemark,
        Misc,
        Top,
        Outerwear,
        Print,
        Bottom,
        Footwear,
        Belt,
        Hat,
        Eyewear,
        Piercing,
        Wrist,
        Hand,
        Neckwear,
        LeftHand,
        RightHand,
      } = traits;
      const character = [Tribe, SkinColor, FurColor, EyeColor, PupilColor];
      const head = [Hair, Mouth, Beard, Facemark, Misc];
      const clothing = [Top, Outerwear, Print, Bottom, Footwear, Belt];
      const accessories = [Hat, Eyewear, Piercing, Wrist, Hand, Neckwear];
      const items = [LeftHand, RightHand];
      const value = "" + parseFloat(nftPrice) * 10 ** 18;
      tx(writeContracts[NFT_CONTRACT].purchase(character, head, clothing, accessories, items, { value }));
    },
    [writeContracts, tx, nftPrice],
  );

  const onScroll = () => {
    const content = document.getElementsByClassName("character-canvas")[0];
    if (content) content.style["pointer-events"] = "none";
  };

  const onMouse = () => {
    const content = document.getElementsByClassName("character-canvas")[0];
    if (content) {
      content.style["pointer-events"] = "auto";
      content.style.cursor = "pointer";
    }
  };

  useEffect(() => {
    unityContext.on("progress", p => setProgression(parseInt(p * 100, 10)));
    unityContext.on("loaded", () => setLoaded(true));
    unityContext.on("error", console.error);
    unityContext.on("canvas", element => console.log("Canvas", element));
    window.addEventListener("SubmitTraitMap", mintCharacter);
    document.addEventListener("wheel", onScroll, false);
    document.addEventListener("mousemove", onMouse, false);
    return () => {
      window.removeEventListener("SubmitTraitMap", mintCharacter);
      document.removeEventListener("wheel", onScroll, false);
      document.removeEventListener("mousemove", onMouse, false);
      unityContext.removeAllEventListeners();
    };
  }, [mintCharacter]);

  const ready = isLoaded && progression === 100;

  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          height: 840,
          backgroundImage: `url(${CharacterBGImg})`,
          backgroundRepeat: "repeat-x",
        }}
      >
        {!ready && (
          <div style={{ position: "absolute", top: 360, width: "100%", fontSize: "50px !important" }}>
            <div style={{ fontWeight: "bold" }}>Loading character creator...</div>
            <Progress
              type="circle"
              strokeColor={{
                "0%": "#108ee9",
                "100%": "#87d068",
              }}
              percent={progression}
              key={progression}
            />
          </div>
        )}
        <Unity
          className="character-canvas"
          unityContext={unityContext}
          style={{
            width: 1120,
            height: 840,
            visibility: ready ? "visible" : "hidden",
          }}
        />
      </div>
      <section className="about-page-section">
        <div className="container">
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
        </div>
      </section>
      <section className="characters">
        <div className="row left">
          <div className="col-sm-4 text-center d-flex align-items-end">
            <img src={CatImg} alt="Cat Character" className="img-fluid" />
          </div>
          <div className="col-sm-8 text">
            <Title>Yoko</Title>
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
            <Title>Doge</Title>
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
            <Title>Aurora</Title>
            <p>
              Aurora the Alien DJ has been on a universal tour for the past 300 years. She's quite the celebrity but the
              one remaining stage to complete her tour is at The Citadel.
            </p>
          </div>
        </div>
        <div className="row right">
          <div className="col-sm-8 text">
            <Title>Meek</Title>
            <p>
              Humans have finally colonized Mars, but it’s turned into a commercial nightmare up there and the sand
              worms aren’t helping either. The Citadel looks a lot less... red.
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
            <Title>Java</Title>
            <p>
              Since the humans left for Mars, apes let Earth become overrun by nature once again taking great pride in
              de-evolution and renaturing.
            </p>
          </div>
        </div>
        <div className="row right">
          <div className="col-sm-8 text">
            <Title>Pepe</Title>
            <p>
              After destroying Earth as a result of a simple misunderstanding, Frog welcomes the invite to The Citadel
              to try and make amends.
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
            <Title>Satoshi</Title>
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
}
