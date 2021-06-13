import React, { useState, useEffect, useCallback } from "react";
import Unity, { UnityContext } from "react-unity-webgl";
import { Typography, Table, Progress } from "antd";
import { useQuery, gql } from "@apollo/client";
import GraphiQL from "graphiql";
import "graphiql/graphiql.min.css";
import fetch from "isomorphic-fetch";
import { Address } from "../components";
import CharacterBGImg from "../assets/backgrounds/character_creator.png";
import "antd/dist/antd.css";

const CHARACTERS_QUERY = `
  {
    characters {
      id
      owner {
        id
        address
      }
      traits
      name
      createdAt
      transactionHash
    }
    owners {
      id
      address
      createdAt
      characters {
        id
        traits
      }
      characterCount
    }
  }
  `;

const CHARACTERS_GQL = gql(CHARACTERS_QUERY);

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
    // eslint-disable-next-line prefer-destructuring
    p[c[0].replace(" ", "")] = c[1];
    return p;
  }, {});
}

export default function Home({ nftPrice, mainnetProvider, subgraphUri, tx, writeContracts }) {
  // const { loading, data } = useQuery(CHARACTERS_GQL, { pollInterval: 5000 });
  const loading = true;
  const data = {};
  console.log("data", loading, data);
  console.log("writeContracts", writeContracts);
  function graphQLFetcher(graphQLParams) {
    return fetch(subgraphUri, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(graphQLParams),
    }).then(response => response.json());
  }

  const purposeColumns = [
    {
      title: "Token Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "owner",
      key: "owner",
      render: ({ owner }) => <Address address={owner.id} ensProvider={mainnetProvider} fontSize={16} />,
    },
    {
      title: "Traits",
      key: "traits",
      dataIndex: "traits",
      render: traits => traits.split(","),
    },
  ];

  const [isLoaded, setLoaded] = useState(false);
  const [progression, setProgression] = useState(0);

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
      tx(writeContracts.NiftyLeagueCharacter.purchase(character, head, clothing, accessories, items, { value }));
    },
    [writeContracts, tx, nftPrice],
  );

  useEffect(() => {
    unityContext.on("progress", p => setProgression(parseInt(p * 100, 10)));
    unityContext.on("loaded", () => setLoaded(true));
    unityContext.on("error", console.error);
    unityContext.on("canvas", element => console.log("Canvas", element));
    window.addEventListener("SubmitTraitMap", mintCharacter);
    return () => {
      window.removeEventListener("SubmitTraitMap", mintCharacter);
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
          unityContext={unityContext}
          style={{
            width: 1120,
            height: 840,
            visibility: ready ? "visible" : "hidden",
            cursor: "pointer",
          }}
        />
      </div>
      <div style={{ width: 780, margin: "auto", padding: 64 }}>
        {data ? (
          <Table dataSource={data.characters} columns={purposeColumns} rowKey="id" />
        ) : (
          <Typography>
            {loading ? (
              "Loading..."
            ) : (
              <div style={{ marginTop: 8, padding: 8 }}>Warning: Have you deployed your subgraph yet?</div>
            )}
          </Typography>
        )}
        <div style={{ margin: 32, height: 400, border: "1px solid #888888", textAlign: "left" }}>
          {/* <GraphiQL fetcher={graphQLFetcher} docExplorerOpen query={CHARACTERS_QUERY} /> */}
        </div>
      </div>
    </div>
  );
}
