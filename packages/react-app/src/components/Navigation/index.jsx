import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useThemeSwitcher } from "react-css-theme-switcher";
import withWidth, { isWidthDown } from "@material-ui/core/withWidth";
import { Layout, Menu, Typography } from "antd";

import { NetworkContext } from "NetworkProvider";
import AddNFTL from "./AddNFTL";
import DropdownMenu from "./DropdownMenu";
import WrongNetworkAlert from "./WrongNetworkAlert";
import Account from "../Account";
import "./navigation.css";

const { Title } = Typography;

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

function Navigation({ route, setRoute, width }) {
  const { currentTheme } = useThemeSwitcher();
  const hideNav = isWidthDown("md", width);
  const mobileView = isWidthDown("sm", width);
  const darkThemed = currentTheme === "dark";

  const {
    address,
    loadWeb3Modal,
    localChainId,
    logoutOfWeb3Modal,
    mainnetProvider,
    selectedChainId,
    targetNetwork,
    userProvider,
    web3Modal,
  } = useContext(NetworkContext);

  const networkError = localChainId && selectedChainId && localChainId !== selectedChainId;

  return (
    <Layout>
      <Layout.Header
        style={{
          top: 0,
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
        <Link onClick={() => setRoute("/")} to="/" style={{ margin: `auto ${mobileView ? "10px" : "30px"} auto 0` }}>
          <Title level={4} style={{ marginBottom: 0 }}>
            <span role="img" aria-label="pixel emoji">
              👾
            </span>{" "}
            Nifty League
          </Title>
        </Link>
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
          {!mobileView && <AddNFTL />}
          <div className="network-label" style={{ padding: mobileView ? "0 5px" : "0 16px" }}>
            {targetNetwork.label}
          </div>
          <Account
            address={address}
            blockExplorer={targetNetwork.blockExplorer}
            loadWeb3Modal={loadWeb3Modal}
            logoutOfWeb3Modal={logoutOfWeb3Modal}
            mainnetProvider={mainnetProvider}
            mobileView={mobileView}
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
