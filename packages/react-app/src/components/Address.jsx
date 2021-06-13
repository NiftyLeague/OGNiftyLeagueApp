import React from "react";
import Blockies from "react-blockies";
import { useThemeSwitcher } from "react-css-theme-switcher";
import { Typography, Skeleton } from "antd";
import { useLookupAddress } from "../hooks";
import { DEBUG } from "../constants";

/*
  ~ What it does? ~

  Displays an address with a blockie image and option to copy address

  ~ How can I use? ~

  <Address
    address={address}
    ensProvider={mainnetProvider}
    blockExplorer={blockExplorer}
    fontSize={fontSize}
  />

  ~ Features ~

  - Provide ensProvider={mainnetProvider} and your address will be replaced by ENS name
              (ex. "0xa870" => "user.eth")
  - Provide blockExplorer={blockExplorer}, click on address and get the link
              (ex. by default "https://etherscan.io/" or for xdai "https://blockscout.com/poa/xdai/")
  - Provide fontSize={fontSize} to change the size of address text
*/

const { Text } = Typography;

const blockExplorerLink = (address, blockExplorer) =>
  `${blockExplorer || "https://etherscan.io/"}${"address/"}${address}`;

export default function Address(props) {
  const { address, blockExplorer, ensProvider, fontSize, size } = props;

  const ens = useLookupAddress(ensProvider, address);

  const { currentTheme } = useThemeSwitcher();

  if (!address) {
    return (
      <span>
        <Skeleton avatar paragraph={{ rows: 1 }} />
      </span>
    );
  }

  let displayAddress = address.substr(0, 6);

  if (ens && ens.indexOf("0x") < 0) {
    displayAddress = ens;
  } else if (size === "short") {
    displayAddress += "..." + address.substr(-4);
  } else if (size === "long") {
    displayAddress = address;
  }

  const etherscanLink = blockExplorerLink(address, blockExplorer);

  return (
    <>
      <div
        style={{
          borderRadius: "50%",
          overflow: "hidden",
          width: 20,
          height: 20,
          margin: "auto 0",
        }}
      >
        <Blockies seed={address.toLowerCase()} size={5} className="blockies" />
      </div>
      <span style={{ verticalAlign: "middle", paddingLeft: 5, fontSize: fontSize || 20 }}>
        <Text copyable={DEBUG && { text: address }}>
          <a
            style={{ color: currentTheme === "light" ? "#222222" : "#ddd" }}
            target="_blank"
            href={etherscanLink}
            rel="noopener noreferrer"
          >
            {displayAddress}
          </a>
        </Text>
      </span>
    </>
  );
}
