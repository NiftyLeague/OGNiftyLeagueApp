import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import { Button, Dropdown, Menu } from 'antd';
import { createFromIconfontCN, TwitterOutlined } from '@ant-design/icons';
import { Menu as MenuIcon, MoreVert } from '@material-ui/icons';
import { DEBUG } from '../../constants';

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2659896_snpn0dgh5n9.js',
});

const DropdownMenu = ({ hideNav, navItems }: { hideNav: boolean; navItems: () => void }): JSX.Element => {
  const [visible, setVisible] = useState(false);

  const menu = (
    <Menu style={{ padding: 10 }}>
      {hideNav && navItems()}
      <Menu.Item key="discord">
        <a target="_blank" rel="noopener noreferrer" href="https://discord.gg/4bmTHYWjhe">
          <IconFont type="icon-discord" />
          <span style={{ marginLeft: 8 }}>Discord</span>
        </a>
      </Menu.Item>
      <Menu.Item key="twitter">
        <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/NiftyLeague">
          <TwitterOutlined />
          <span style={{ marginLeft: 8 }}>Twitter</span>
        </a>
      </Menu.Item>
      {DEBUG ? (
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
          <Menu.Item key="/subgraph">
            <Link to="/subgraph">Subgraph</Link>
          </Menu.Item>
        </>
      ) : null}
    </Menu>
  );

  const btnStyle = { fontSize: 20, verticalAlign: 'top', margin: 'auto 4px' };
  const trigger: ('contextMenu' | 'click' | 'hover')[] = isMobile ? ['click'] : ['hover'];

  return (
    <Dropdown
      key="more"
      overlay={menu}
      overlayStyle={{ minWidth: 200, top: 66 }}
      placement="bottomRight"
      trigger={trigger}
      visible={visible}
      onVisibleChange={setVisible}
    >
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
