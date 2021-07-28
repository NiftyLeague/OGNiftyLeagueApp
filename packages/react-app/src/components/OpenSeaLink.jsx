import React, { useContext } from "react";
import { Tooltip } from "antd";
import OpenSeaIcon from "assets/images/opensea.png";
import { NetworkContext } from "NetworkProvider";
import { NFT_CONTRACT } from "../constants";

export default function OpenSeaLink({ tokenId }) {
  const { readContracts } = useContext(NetworkContext);
  const NFTAddress = readContracts && readContracts[NFT_CONTRACT].address;
  const host =
    process.env.REACT_APP_NETWORK === "mainnet" ? "https://opensea.io/assets" : "https://testnets.opensea.io/assets";
  return (
    <Tooltip title="View in OpenSea">
      <a target="_blank" href={`${host}/${NFTAddress}/${tokenId}`} rel="noopener noreferrer">
        <img src={OpenSeaIcon} alt="opensea icon" style={{ width: 24, height: 24 }} />
      </a>
    </Tooltip>
  );
}