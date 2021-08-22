import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { providers } from 'ethers';
import { Button, Dropdown, Menu } from 'antd';
import { createFromIconfontCN, TwitterOutlined } from '@ant-design/icons';
import { Menu as MenuIcon, MoreVert } from '@material-ui/icons';
import { NetworkContext } from 'NetworkProvider';
import { DEBUG } from '../../constants';

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2659896_snpn0dgh5n9.js',
});

const DropdownMenu = ({ hideNav, navItems }: { hideNav: boolean; navItems: () => void }): JSX.Element => {
  const { localProvider, targetNetwork } = useContext(NetworkContext);
  const localConnection = Boolean(
    targetNetwork.label === 'localhost' && (localProvider as providers.JsonRpcProvider)?.connection,
  );
  const menu = (
    <Menu style={{ padding: 10 }}>
      {hideNav && navItems()}
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
            <Link to="/NFTL">NFTL Token</Link>
          </Menu.Item>
          <Menu.Item key="/NFT">
            <Link to="/NFT">NFT</Link>
          </Menu.Item>
          <Menu.Item key="/storage">
            <Link to="/storage">Storage</Link>
          </Menu.Item>
          <Menu.Item key="/merkle-distributor">
            <Link to="/merkle-distributor">Merkle Distributor</Link>
          </Menu.Item>
          <Menu.Item key="/hints">
            <Link to="/hints">Hints</Link>
          </Menu.Item>
          <Menu.Item key="/subgraph">
            <Link to="/subgraph">Subgraph</Link>
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
