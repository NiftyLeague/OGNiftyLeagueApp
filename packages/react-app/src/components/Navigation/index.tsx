import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useThemeSwitcher } from 'react-css-theme-switcher';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import { Layout, Menu } from 'antd';

import { NetworkContext } from 'NetworkProvider';
import LogoPurple from 'assets/images/nl_logo.png';
import LogoWhite from 'assets/images/nl_logo_white.png';
import Account from '../Account';
import AddNFTL from './AddNFTL';
import Airdrop from './Airdrop';
import DropdownMenu from './DropdownMenu';
import WrongNetworkAlert from './WrongNetworkAlert';
import './navigation.css';

const navItems = () => [
  <Menu.Item key="/">
    <Link to="/">Home</Link>
  </Menu.Item>,
  <Menu.Item key="/about">
    <Link to="/about">About</Link>
  </Menu.Item>,
  <Menu.Item key="/games">
    <Link to="/games">Games</Link>
  </Menu.Item>,
  <Menu.Item key="/degens">
    <Link to="/degens">Degens</Link>
  </Menu.Item>,
  <Menu.Item key="/wallet">
    <Link to="/wallet">Wallet</Link>
  </Menu.Item>,
];

function Navigation({ width }: { width: Breakpoint }): JSX.Element {
  const { pathname } = useLocation();
  const { currentTheme } = useThemeSwitcher();
  const hideNav = isWidthDown('md', width);
  const mobileView = isWidthDown('sm', width);
  const darkThemed = currentTheme === 'dark';

  const { address, loadWeb3Modal, logoutOfWeb3Modal, mainnetProvider, targetNetwork, userProvider, web3Modal } =
    useContext(NetworkContext);

  return (
    <Layout>
      <Layout.Header
        style={{
          top: 0,
          position: 'fixed',
          zIndex: 100,
          width: '100%',
          display: 'flex',
          padding: '0 20px',
          ...(darkThemed
            ? { borderBottom: '1px solid rgb(66, 66, 66)', background: '#212121' }
            : { background: '#c1ccdd' }),
        }}
      >
        <Link to="/" style={{ margin: `auto ${mobileView ? '10px' : '20px'} auto 0` }}>
          <img
            src={darkThemed ? LogoWhite : LogoPurple}
            alt="Nifty League logo"
            style={{ width: 50, marginBottom: 3 }}
          />
        </Link>
        {!hideNav && (
          <nav className="navbar-polygon">
            <Menu
              style={{
                textAlign: 'center',
                borderBottom: 'none',
                backgroundColor: 'transparent',
              }}
              className="menu"
              selectedKeys={[pathname]}
              mode="horizontal"
              defaultSelectedKeys={['/']}
            >
              {navItems()}
            </Menu>
          </nav>
        )}
        <div className="menu-right">
          {/* <Airdrop /> */}
          <AddNFTL />
          <div className="network-label" style={{ padding: mobileView ? '0 5px' : '0 16px' }}>
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
          <DropdownMenu key="more" hideNav={hideNav} navItems={navItems} />
        </div>
        <WrongNetworkAlert />
      </Layout.Header>
    </Layout>
  );
}

export default withWidth()(Navigation);
