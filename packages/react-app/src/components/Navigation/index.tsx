import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useThemeSwitcher } from 'react-css-theme-switcher';
import { Layout, Menu } from 'antd';
import { createFromIconfontCN, TwitterOutlined } from '@ant-design/icons';

import { NetworkContext } from 'NetworkProvider';
import { useIsWidthDown } from 'hooks/useWidth';
import LogoPurple from 'assets/images/nl_logo.png';
import LogoWhite from 'assets/images/nl_logo_white.png';
import Account from '../Account';
import AddNFTL from './AddNFTL';
import Airdrop from './Airdrop';
import DropdownMenu from './DropdownMenu';
import WrongNetworkAlert from './WrongNetworkAlert';
import './navigation.css';

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2659896_snpn0dgh5n9.js',
});

const navItems = () => [
  <Menu.Item key="/">
    <Link to="/">Games</Link>
  </Menu.Item>,
  <Menu.Item key="/degens">
    <Link to="/degens">DEGENs</Link>
  </Menu.Item>,
  <Menu.Item key="/rentals" disabled>
    <Link to="/rentals">Rentals (coming soon!)</Link>
  </Menu.Item>,
  <Menu.Item key="/profile">
    <Link to="/profile">Profile</Link>
  </Menu.Item>,
];

function Navigation(): JSX.Element {
  const { pathname } = useLocation();
  const { currentTheme } = useThemeSwitcher();
  const hideNav = useIsWidthDown('lg');
  const mobileView = useIsWidthDown('sm');
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
        <a href="https://niftyleague.com" style={{ margin: `auto ${mobileView ? '10px' : '20px'} auto 0` }}>
          <img
            src={darkThemed ? LogoWhite : LogoPurple}
            alt="Nifty League logo"
            style={{ width: 50, marginBottom: 3 }}
          />
        </a>
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
          <Airdrop />
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

export default Navigation;
