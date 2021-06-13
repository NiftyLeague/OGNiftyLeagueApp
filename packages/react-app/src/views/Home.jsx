import React, { useState, useEffect, useCallback } from "react";
import Unity, { UnityContext } from "react-unity-webgl";
import { Progress } from "antd";
import "graphiql/graphiql.min.css";
import { NFT_CONTRACT } from "../constants";
import { useEventListener } from "../hooks";
import CharacterBGImg from "../assets/backgrounds/character_creator.png";
import "antd/dist/antd.css";

const unityContext = new UnityContext({
  loaderUrl: "characterBuild/0.3.20.loader.js",
  dataUrl: "characterBuild/0.3.20.data",
  frameworkUrl: "characterBuild/0.3.20.framework.js",
  codeUrl: "characterBuild/0.3.20.wasm",
  streamingAssetsUrl: "streamingassets",
  companyName: "NiftyCompany",
  productName: "NiftyLeague",
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

export default function Home({ nftPrice, localProvider, readContracts, tx, writeContracts }) {
  const [isLoaded, setLoaded] = useState(false);
  const [progression, setProgression] = useState(0);

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
  }, [mintCharacter, progression]);

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
      <div style={{ width: 780, margin: "auto", padding: 64 }} />
    </div>
  );
}
