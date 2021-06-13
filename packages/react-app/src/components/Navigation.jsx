/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Alert, Button, Dropdown, Layout, Menu, Typography } from "antd";
import { MoreVert } from "@material-ui/icons";
import Web3Modal from "web3modal";
import { Web3Provider } from "@ethersproject/providers";
import WalletConnectProvider from "@walletconnect/web3-provider";

import Account from "./Account";
import { DEBUG, INFURA_ID, NETWORK } from "../constants";

const { Title } = Typography;

/*
  Web3 modal helps us "connect" external wallets:
*/
const web3Modal = new Web3Modal({
  // network: "mainnet", // optional
  cacheProvider: true, // optional
  providerOptions: {
    walletconnect: {
      package: WalletConnectProvider, // required
      options: {
        infuraId: INFURA_ID,
      },
    },
  },
});

const logoutOfWeb3Modal = async () => {
  await web3Modal.clearCachedProvider();
  setTimeout(() => {
    window.location.reload();
  }, 1);
};

const DropdownMenu = ({ setRoute }) => {
  const menu = (
    <Menu>
      <Menu.Item key="/NFTL">
        <Link onClick={() => setRoute("/NTFL")} to="/NFTL">
          NFTL Token
        </Link>
      </Menu.Item>
      <Menu.Item key="/NFTs">
        <Link onClick={() => setRoute("/NFTs")} to="/NFTs">
          NFTs
        </Link>
      </Menu.Item>
      <Menu.Item key="/hints">
        <Link onClick={() => setRoute("/hints")} to="/hints">
          Hints
        </Link>
      </Menu.Item>
      <Menu.Item key="/subgraph">
        <Link onClick={() => setRoute("/subgraph")} to="/subgraph">
          Subgraph
        </Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown key="more" overlay={menu}>
      <Button style={{ border: "none", padding: 0, backgroundColor: "transparent", margin: "auto 0" }}>
        <MoreVert style={{ fontSize: 20, verticalAlign: "top" }} />
      </Button>
    </Dropdown>
  );
};

function Navigation({
  address,
  blockExplorer,
  localChainId,
  localProvider,
  mainnetProvider,
  price,
  route,
  selectedChainId,
  setInjectedProvider,
  setRoute,
  targetNetwork,
  userProvider,
}) {
  const loadWeb3Modal = useCallback(async () => {
    const provider = await web3Modal.connect();
    setInjectedProvider(new Web3Provider(provider));
  }, [setInjectedProvider]);

  useEffect(() => {
    if (web3Modal.cachedProvider) loadWeb3Modal();
  }, [loadWeb3Modal]);

  const networkDisplay =
    localChainId && selectedChainId && localChainId !== selectedChainId ? (
      <div
        style={{
          zIndex: 2,
          position: "absolute",
          right: 0,
          top: 60,
          padding: 16,
        }}
      >
        <Alert
          message="⚠️ Wrong Network"
          description={
            <div>
              You have <b>{NETWORK(selectedChainId).name}</b> selected and you need to be on{" "}
              <b>{NETWORK(localChainId).name}</b>.
            </div>
          }
          type="error"
          closable={false}
        />
      </div>
    ) : (
      <div style={{ color: targetNetwork.color, marginLeft: "auto", padding: "0 16px" }}>{targetNetwork.name}</div>
    );

  return (
    <Layout theme="light">
      <Layout.Header
        style={{
          position: "fixed",
          zIndex: 2,
          width: "100%",
          display: "flex",
          padding: "0 20px",
        }}
      >
        <Title level={4} style={{ margin: "auto 30px auto 0" }}>
          👾 Nifty League
        </Title>
        <Menu style={{ textAlign: "center" }} selectedKeys={[route]} mode="horizontal" defaultSelectedKeys={["/"]}>
          <Menu.Item key="/">
            <Link onClick={() => setRoute("/")} to="/">
              Home
            </Link>
          </Menu.Item>
          <Menu.Item key="/about">
            <Link onClick={() => setRoute("/about")} to="/about">
              About
            </Link>
          </Menu.Item>
          <Menu.Item key="/characters">
            <Link onClick={() => setRoute("/characters")} to="/characters">
              Characters
            </Link>
          </Menu.Item>
          <Menu.Item key="/games">
            <Link onClick={() => setRoute("/games")} to="/games">
              Games
            </Link>
          </Menu.Item>
          <Menu.Item key="/staking">
            <Link onClick={() => setRoute("/staking")} to="/staking">
              Staking
            </Link>
          </Menu.Item>
        </Menu>
        {networkDisplay}
        <Account
          address={address}
          localProvider={localProvider}
          userProvider={userProvider}
          mainnetProvider={mainnetProvider}
          price={price}
          web3Modal={web3Modal}
          loadWeb3Modal={loadWeb3Modal}
          logoutOfWeb3Modal={logoutOfWeb3Modal}
          blockExplorer={blockExplorer}
        />
        {DEBUG && <DropdownMenu key="more" setRoute={setRoute} />}
      </Layout.Header>
    </Layout>
  );
}

export default Navigation;
