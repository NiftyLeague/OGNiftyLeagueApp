import React from "react";
import { Link } from "react-router-dom";
import { Button, Dropdown, Menu } from "antd";
import { MoreVert } from "@material-ui/icons";
import { DEBUG } from "../../constants";

const DropdownMenu = ({ hideNav, navItems, setRoute }) => {
  const menu = (
    <Menu>
      {hideNav && navItems(setRoute)}
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
          <Menu.Item key="/storage">
            <Link onClick={() => setRoute("/storage")} to="/storage">
              Storage
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

export default DropdownMenu;
