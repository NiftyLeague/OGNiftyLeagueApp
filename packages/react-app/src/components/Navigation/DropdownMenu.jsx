import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button, Dropdown, Menu } from 'antd';
import { createFromIconfontCN, TwitterOutlined } from '@ant-design/icons';
import { Menu as MenuIcon, MoreVert } from '@material-ui/icons';
import { NetworkContext } from 'NetworkProvider';
import { DEBUG } from '../../constants';

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2659896_snpn0dgh5n9.js',
});

const DropdownMenu = ({ hideNav, navItems, setRoute }) => {
  const { localProvider, targetNetwork } = useContext(NetworkContext);
  const localConnection = localProvider?.connection && targetNetwork.label === 'localhost';
  const menu = (
    <Menu style={{ padding: 10 }}>
      {hideNav && navItems(setRoute)}
      <Menu.Item key="discord">
        <a target="_blank" rel="noopener noreferrer" href="https://discord.gg/4bmTHYWjhe">
          <IconFont type="icon-discord" />
          Discord
        </a>
      </Menu.Item>
      <Menu.Item key="twitter">
        <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/NiftyLeague">
          <TwitterOutlined />
          Twitter
        </a>
      </Menu.Item>
      {DEBUG && localConnection ? (
        <>
          <Menu.Item key="/NFTL">
            <Link onClick={() => setRoute('/NTFL')} to="/NFTL">
              NFTL Token
            </Link>
          </Menu.Item>
          <Menu.Item key="/NFT">
            <Link onClick={() => setRoute('/NFT')} to="/NFT">
              NFT
            </Link>
          </Menu.Item>
          <Menu.Item key="/storage">
            <Link onClick={() => setRoute('/storage')} to="/storage">
              Storage
            </Link>
          </Menu.Item>
          <Menu.Item key="/merkle-distributor">
            <Link onClick={() => setRoute('/merkle-distributor')} to="/merkle-distributor">
              Merkle Distributor
            </Link>
          </Menu.Item>
          <Menu.Item key="/hints">
            <Link onClick={() => setRoute('/hints')} to="/hints">
              Hints
            </Link>
          </Menu.Item>
          <Menu.Item key="/subgraph">
            <Link onClick={() => setRoute('/subgraph')} to="/subgraph">
              Subgraph
            </Link>
          </Menu.Item>
        </>
      ) : null}
    </Menu>
  );

  const btnStyle = { fontSize: 20, verticalAlign: 'top', margin: 'auto 4px' };

  return (
    <Dropdown key="more" overlay={menu} overlayStyle={{ minWidth: 200, top: 66 }} placement="bottomRight">
      <Button
        style={{
          border: 'none',
          padding: 0,
          backgroundColor: 'transparent',
          margin: hideNav ? 'auto 4px auto 20px' : 'auto 0 auto 4px',
        }}
      >
        {hideNav ? <MenuIcon style={btnStyle} /> : <MoreVert style={btnStyle} />}
      </Button>
    </Dropdown>
  );
};

export default DropdownMenu;
