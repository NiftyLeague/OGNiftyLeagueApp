/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useContext, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { parseEther } from "@ethersproject/units";
import { Button, Input, Table, Typography } from "antd";
import GraphiQL from "graphiql";
import "graphiql/graphiql.min.css";
import fetch from "isomorphic-fetch";

import { NetworkContext } from "NetworkProvider";
import { useNFTPrice } from "hooks";
import { Address } from "components";
import { NFT_CONTRACT } from "../constants";

const highlight = {
  marginLeft: 4,
  marginRight: 8,
  padding: 4,
  borderRadius: 4,
  fontWeight: "bolder",
};

const CHARACTERS_QUERY = `
  {
    characters (orderBy: createdAt) {
      id
      owner {
        id
        address
      }
      traits {
        tribe
        skinColor
        furColor
        eyeColor
        pupilColor
        hair
        mouth
        beard
        facemark
        misc
        top
        outerwear
        print
        bottom
        footwear
        belt
        hat
        eyewear
        piercings
        wrists
        hands
        neckwear
        leftItem
        rightItem
      }
      name
      nameHistory
      createdAt
      transactionHash
    }
    owners {
      id
      address
      createdAt
      characterCount
      characters {
        id
      }
    }
  }
  `;

const CHARACTERS_GQL = gql(CHARACTERS_QUERY);

function Subgraph({ subgraphUri }) {
  const { mainnetProvider, readContracts, tx, writeContracts } = useContext(NetworkContext);
  const { loading, data } = useQuery(CHARACTERS_GQL, { pollInterval: 5000 });
  const nftPrice = useNFTPrice(readContracts);

  function graphQLFetcher(graphQLParams) {
    return fetch(subgraphUri, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(graphQLParams),
    }).then(response => response.json());
  }

  const columns = [
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
      render: traits =>
        Object.entries(traits)
          .map(([key, value]) => (key !== "__typename" ? `${key}: ${value} \n` : ""))
          .toString(),
    },
  ];

  const [character, setCharacter] = useState([1, 0, 0, 0, 0]);
  const [head, setHead] = useState([0, 0, 0, 0, 0]);
  const [clothing, setClothing] = useState([0, 0, 0, 0, 0, 0]);
  const [accessories, setAccessories] = useState([0, 0, 0, 0, 0, 0]);
  const [items, setItems] = useState([0, 0]);

  return (
    <>
      <div style={{ margin: "auto", marginTop: 32 }}>
        You will find that parsing/tracking events with the{" "}
        <span className="highlight" style={highlight}>
          useEventListener
        </span>{" "}
        hook becomes a chore for every new project.
      </div>
      <div style={{ margin: "auto", marginTop: 32 }}>
        Instead, you can use{" "}
        <a href="https://thegraph.com/docs/introduction" target="_blank" rel="noopener noreferrer">
          The Graph
        </a>{" "}
        with 🏗 scaffold-eth (
        <a href="https://youtu.be/T5ylzOTkn-Q" target="_blank" rel="noopener noreferrer">
          learn more
        </a>
        ):
      </div>

      <div style={{ margin: 32 }}>
        <span style={{ marginRight: 8 }}>🚮</span>
        Clean up previous data:
        <span className="highlight" style={highlight}>
          yarn clean-graph-node
        </span>
      </div>

      <div style={{ margin: 32 }}>
        <span style={{ marginRight: 8 }}>📡</span>
        Spin up a local graph node by running
        <span className="highlight" style={highlight}>
          yarn graph-run-node
        </span>
        <span style={{ marginLeft: 4 }}>
          {" "}
          (requires{" "}
          <a href="https://www.docker.com/products/docker-desktop" target="_blank" rel="noopener noreferrer">
            {" "}
            Docker
          </a>
          ){" "}
        </span>
      </div>

      <div style={{ margin: 32 }}>
        <span style={{ marginRight: 8 }}>📝</span>
        Create your <b>local subgraph</b> by running
        <span className="highlight" style={highlight}>
          yarn graph-create-local
        </span>
        (only required once!)
      </div>

      <div style={{ margin: 32 }}>
        <span style={{ marginRight: 8 }}>🚢</span>
        Deploy your <b>local subgraph</b> by running
        <span className="highlight" style={highlight}>
          yarn graph-ship-local
        </span>
      </div>

      <div style={{ margin: 32 }}>
        <span style={{ marginRight: 8 }}>🖍️</span>
        Edit your <b>local subgraph</b> in
        <span className="highlight" style={highlight}>
          packages/subgraph/src
        </span>
        (learn more about subgraph definition{" "}
        <a href="https://thegraph.com/docs/define-a-subgraph" target="_blank" rel="noopener noreferrer">
          here
        </a>
        )
      </div>

      <div style={{ margin: 32 }}>
        <span style={{ marginRight: 8 }}>🤩</span>
        Deploy your <b>contracts and your subgraph</b> in one go by running
        <span className="highlight" style={highlight}>
          yarn deploy-and-graph
        </span>
      </div>

      <div style={{ width: 780, margin: "auto", paddingBottom: 64 }}>
        <div style={{ margin: 32, textAlign: "left" }}>
          Character: <Input onChange={({ target: { value } }) => setCharacter(value)} />
          Head: <Input onChange={({ target: { value } }) => setHead(value)} />
          Clothing: <Input onChange={({ target: { value } }) => setClothing(value)} />
          Accessories: <Input onChange={({ target: { value } }) => setAccessories(value)} />
          Items: <Input onChange={({ target: { value } }) => setItems(value)} />
          <Button
            style={{ marginTop: 10 }}
            onClick={() => {
              const value = parseEther(nftPrice);
              tx(writeContracts[NFT_CONTRACT].purchase(character, head, clothing, accessories, items, { value }));
            }}
          >
            Mint Character
          </Button>
        </div>

        {data ? (
          <Table dataSource={data.characters} columns={columns} rowKey="id" />
        ) : (
          <Typography>
            {loading ? (
              "Loading..."
            ) : (
              <div style={{ padding: 8 }}>Warning: 🤔 Have you deployed your subgraph yet?</div>
            )}
          </Typography>
        )}

        <div style={{ margin: 32, height: 400, border: "1px solid #888888", textAlign: "left" }}>
          <GraphiQL fetcher={graphQLFetcher} docExplorerOpen query={CHARACTERS_QUERY} />
        </div>
      </div>
    </>
  );
}

export default Subgraph;
