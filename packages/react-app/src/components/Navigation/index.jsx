import React, { useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useThemeSwitcher } from "react-css-theme-switcher";
import Web3Modal from "web3modal";
import { Web3Provider } from "@ethersproject/providers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import withWidth, { isWidthDown } from "@material-ui/core/withWidth";
import { Layout, Menu, Typography } from "antd";

import AddNFTL from "./AddNFTL";
import DropdownMenu from "./DropdownMenu";
import WrongNetworkAlert from "./WrongNetworkAlert";
import { INFURA_ID } from "../../constants";
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

const navItems = setRoute => [
  <Menu.Item key="/">
    <Link onClick={() => setRoute("/")} to="/">
      Home
    </Link>
  </Menu.Item>,
  <Menu.Item key="/about">
    <Link onClick={() => setRoute("/about")} to="/about">
      About
    </Link>
  </Menu.Item>,
  <Menu.Item key="/games">
    <Link onClick={() => setRoute("/games")} to="/games">
      Games
    </Link>
  </Menu.Item>,
  <Menu.Item key="/degens">
    <Link onClick={() => setRoute("/degens")} to="/degens">
      Degens
    </Link>
  </Menu.Item>,
  <Menu.Item key="/wallet">
    <Link onClick={() => setRoute("/wallet")} to="/wallet">
      Wallet
    </Link>
  </Menu.Item>,
  <Menu.Item key="/staking">
    <Link onClick={() => setRoute("/staking")} to="/staking">
      Staking
    </Link>
  </Menu.Item>,
];

function Navigation({
  address,
  blockExplorer,
  localChainId,
  mainnetProvider,
  route,
  selectedChainId,
  setInjectedProvider,
  setRoute,
  targetNetwork,
  userProvider,
  width,
  writeContracts,
}) {
  const { currentTheme } = useThemeSwitcher();
  const hideNav = isWidthDown("md", width);
  const mobileView = isWidthDown("sm", width);
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
        <Title level={4} style={{ margin: `auto ${mobileView ? "10px" : "30px"} auto 0` }}>
          <span role="img" aria-label="pixel emoji">
            👾
          </span>{" "}
          Nifty League
        </Title>
        {/* <img width={42} height={50} src={NiftyLeagueLogo} alt="Nifty League logo" /> */}
        {!hideNav && (
          <nav className="navbar-polygon">
            <Menu
              style={{
                textAlign: "center",
                borderBottom: "none",
                backgroundColor: "transparent",
              }}
              className="menu"
              selectedKeys={[route]}
              mode="horizontal"
              defaultSelectedKeys={["/"]}
            >
              {navItems(setRoute)}
            </Menu>
          </nav>
        )}
        <div className="menu-right">
          {!mobileView && writeContracts && <AddNFTL userProvider={userProvider} writeContracts={writeContracts} />}
          <div className="network-label" style={{ padding: mobileView ? "0 5px" : "0 16px" }}>
            {targetNetwork.label}
          </div>
          <Account
            address={address}
            blockExplorer={blockExplorer}
            mobileView={mobileView}
            loadWeb3Modal={loadWeb3Modal}
            logoutOfWeb3Modal={logoutOfWeb3Modal}
            mainnetProvider={mainnetProvider}
            targetNetwork={targetNetwork}
            userProvider={userProvider}
            web3Modal={web3Modal}
          />
          <DropdownMenu key="more" hideNav={hideNav} navItems={navItems} setRoute={setRoute} />
        </div>
        {networkError && <WrongNetworkAlert localChainId={localChainId} selectedChainId={selectedChainId} />}
      </Layout.Header>
    </Layout>
  );
}

export default withWidth()(Navigation);
