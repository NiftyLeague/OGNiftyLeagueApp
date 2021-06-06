import React, { useState } from "react";
import Unity, { UnityContext } from "react-unity-webgl";
import { Button, Typography, Table, InputNumber, Form } from "antd";
import { useQuery, gql } from "@apollo/client";
import GraphiQL from "graphiql";
import "graphiql/graphiql.min.css";
import fetch from "isomorphic-fetch";
import { Address } from "../components";
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

export default function Home({ mainnetProvider, subgraphUri, tx, writeContracts }) {
  const { loading, data } = useQuery(CHARACTERS_GQL, { pollInterval: 2500 });
  console.log("data", loading, data);
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

  // Character
  const [tribe, setTribe] = useState(1);
  const [skinColor, setSkinColor] = useState(0);
  const [secondarySkinColor, setSecondarySkinColor] = useState(0);
  const [eyeColor, setEyeColor] = useState(0);
  const [secondaryEyeColor, setSecondaryEyeColor] = useState(0);
  // Head
  const [hair, setHair] = useState(0);
  const [mouth, setMouth] = useState(0);
  const [beard, setBeard] = useState(0);
  const [facemarks, setFacemarks] = useState(0);
  const [misc, setMisc] = useState(0);
  // Clothing
  const [top, setTop] = useState(0);
  const [outerwear, setOuterwear] = useState(0);
  const [print, setPrint] = useState(0);
  const [bottom, setBottom] = useState(0);
  const [footwear, setFootwear] = useState(0);
  const [belt, setBelt] = useState(0);
  // Accessories
  const [hat, setHat] = useState(0);
  const [eyewear, setEyewear] = useState(0);
  const [piercings, setPiercings] = useState(0);
  const [wrists, setWrists] = useState(0);
  const [hands, setHands] = useState(0);
  const [neckwear, setNeckwear] = useState(0);
  // Items
  const [leftItem, setLeftItem] = useState(0);
  const [rightItem, setRightItem] = useState(0);
  const [txCost, setTxCost] = useState(0.05);

  const mintCharacter = () => {
    const character = [tribe, skinColor, secondarySkinColor, eyeColor, secondaryEyeColor];
    const head = [hair, mouth, beard, facemarks, misc];
    const clothing = [top, outerwear, print, bottom, footwear, belt];
    const accessories = [hat, eyewear, piercings, wrists, hands, neckwear];
    const items = [leftItem, rightItem];
    console.log("mintCharacter", character, head, clothing, accessories, items);
    const value = "" + parseFloat(txCost) * 10 ** 18;
    tx(writeContracts.NiftyLeagueCharacter.purchase(character, head, clothing, accessories, items, { value }));
  };

  const unityContext = new UnityContext({
    loaderUrl: "characterBuild/0.3.19.loader.js",
    dataUrl: "characterBuild/0.3.19.data",
    frameworkUrl: "characterBuild/0.3.19.framework.js",
    codeUrl: "characterBuild/0.3.19.wasm",
    streamingAssetsUrl: "streamingassets",
    companyName: "NiftyCompany",
    productName: "NiftyLeague",
    productVersion: "0.3.19",
  });

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ height: 840, backgroundImage: "url(images/creator_background.png)", backgroundRepeat: "repeat-x" }}>
        <Unity
          unityContext={unityContext}
          style={{
            width: 1120,
            height: 840,
            background: "#231F20",
          }}
        />
      </div>
      <div style={{ width: 780, margin: "auto", paddingBottom: 64 }}>
        <Form>
          <Form.Item label="Tribe">
            <InputNumber value={tribe} onChange={setTribe} min={1} max={6} />
          </Form.Item>
          <Form.Item label="Skin Color">
            <InputNumber value={skinColor} onChange={setSkinColor} min={10} max={19} />
          </Form.Item>
          <Form.Item label="Hair">
            <InputNumber value={hair} onChange={setHair} min={35} max={39} />
          </Form.Item>
          <Form.Item label="Mouth">
            <InputNumber value={mouth} onChange={setMouth} min={40} max={44} />
          </Form.Item>
          <Form.Item label="Beard">
            <InputNumber value={beard} onChange={setBeard} min={45} max={49} />
          </Form.Item>
          <Form.Item label="Top">
            <InputNumber value={top} onChange={setTop} min={60} max={64} />
          </Form.Item>
          <Form.Item label="Outerwear">
            <InputNumber value={outerwear} onChange={setOuterwear} min={65} max={69} />
          </Form.Item>
          <Form.Item label="Cost">
            <InputNumber value={txCost} onChange={setTxCost} style={{ width: 185 }} min={0.05} max={1.25} />
          </Form.Item>
          <Form.Item>
            <Button onClick={mintCharacter}>Mint Character</Button>
          </Form.Item>
        </Form>

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
          <GraphiQL fetcher={graphQLFetcher} docExplorerOpen query={CHARACTERS_QUERY} />
        </div>
      </div>
    </div>
  );
}
