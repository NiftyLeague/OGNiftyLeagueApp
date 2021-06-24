import React, { useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useThemeSwitcher } from "react-css-theme-switcher";
import { Alert, Button, Dropdown, Layout, Menu, Typography } from "antd";
import { MoreVert } from "@material-ui/icons";
import Web3Modal from "web3modal";
import { Web3Provider } from "@ethersproject/providers";
import WalletConnectProvider from "@walletconnect/web3-provider";

import { DEBUG, INFURA_ID, NETWORK } from "../../constants";
import Account from "../Account";
// import NiftyLeagueLogo from "../../assets/images/nifty-league-logo-full.png";
import "./navigation.css";

const { Title } = Typography;

/*
  Web3 modal helps us "connect" external wallets:
*/
const web3Modal = new Web3Modal({
  cacheProvider: true,
  theme: "dark",
  providerOptions: {
    injected: {
      package: null,
    },
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
      {/* TODO: Add Discord, GitHub, Docs links */}
      {DEBUG && (
        <>
          <Menu.Item key="/NFTL">
            <Link onClick={() => setRoute("/NTFL")} to="/NFTL">
              NFTL Token
            </Link>
          </Menu.Item>
          <Menu.Item key="/NFT">
            <Link onClick={() => setRoute("/NFT")} to="/NFT">
              NFT
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
        </>
      )}
    </Menu>
  );

  return (
    <Dropdown key="more" overlay={menu}>
      <Button style={{ border: "none", padding: 0, backgroundColor: "transparent", margin: "auto 0 auto 5px" }}>
        <MoreVert style={{ fontSize: 20, verticalAlign: "top" }} />
      </Button>
    </Dropdown>
  );
};

const WrongNetworkAlert = ({ localChainId, selectedChainId }) => (
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
);

function Navigation({
  address,
  blockExplorer,
  localChainId,
  mainnetProvider,
  price,
  route,
  selectedChainId,
  setInjectedProvider,
  setRoute,
  targetNetwork,
  userProvider,
}) {
  const { currentTheme } = useThemeSwitcher();
  const darkThemed = currentTheme === "dark";
  const networkError = localChainId && selectedChainId && localChainId !== selectedChainId;

  const loadWeb3Modal = useCallback(async () => {
    const provider = await web3Modal.connect();
    setInjectedProvider(new Web3Provider(provider));
    provider.on("accountsChanged", accounts => {
      console.log(accounts);
    });
    provider.on("chainChanged", chainId => {
      console.log(chainId);
    });
    provider.on("connect", info => {
      console.log(info);
    });
    provider.on("disconnect", error => {
      console.log(error);
    });
  }, [setInjectedProvider]);

  useEffect(() => {
    if (web3Modal.cachedProvider) loadWeb3Modal();
  }, [loadWeb3Modal]);

  const updateWeb3ModalTheme = useCallback(async () => {
    await web3Modal.updateTheme(currentTheme);
  }, [currentTheme]);

  useEffect(() => {
    updateWeb3ModalTheme();
  }, [updateWeb3ModalTheme]);

  return (
    <Layout>
      <Layout.Header
        style={{
          position: "fixed",
          zIndex: 100,
          width: "100%",
          display: "flex",
          padding: "0 20px",
          ...(darkThemed
            ? {
                borderBottom: "1px solid rgb(66, 66, 66)",
                background: "#212121",
              }
            : {
                background: "#c1ccdd",
              }),
        }}
      >
        <Title level={4} style={{ margin: "auto 30px auto 0" }}>
          <span role="img" aria-label="pixel emoji">
            👾
          </span>{" "}
          Nifty League
        </Title>
        {/* <img width={42} height={50} src={NiftyLeagueLogo} alt="Nifty League logo" /> */}
        <nav className="navbar-polygon">
          <Menu
            style={{
              textAlign: "center",
              borderBottom: "none",
              backgroundColor: "transparent",
            }}
            selectedKeys={[route]}
            mode="horizontal"
            defaultSelectedKeys={["/"]}
          >
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
        </nav>
        <div style={{ color: "#666666", marginLeft: "auto", padding: "0 16px", fontSize: 16 }}>
          {targetNetwork.name}
        </div>
        <Account
          address={address}
          blockExplorer={blockExplorer}
          loadWeb3Modal={loadWeb3Modal}
          logoutOfWeb3Modal={logoutOfWeb3Modal}
          mainnetProvider={mainnetProvider}
          price={price}
          userProvider={userProvider}
          web3Modal={web3Modal}
        />
        <DropdownMenu key="more" setRoute={setRoute} />
        {networkError && <WrongNetworkAlert localChainId={localChainId} selectedChainId={selectedChainId} />}
      </Layout.Header>
    </Layout>
  );
}

export default Navigation;
