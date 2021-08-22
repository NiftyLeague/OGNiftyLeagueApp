import React, { useContext } from 'react';
import { Tooltip } from 'antd';
import { NetworkContext } from 'NetworkProvider';
import OpenSeaIcon from 'assets/images/opensea.png';
import { NFT_CONTRACT } from '../constants';

export default function OpenSeaLink({ tokenId }: { tokenId: string | number }): JSX.Element {
  const { readContracts } = useContext(NetworkContext);
  const NFTAddress = readContracts[NFT_CONTRACT] && readContracts[NFT_CONTRACT].address;
  const host =
    process.env.REACT_APP_NETWORK === 'mainnet' ? 'https://opensea.io/assets' : 'https://testnets.opensea.io/assets';
  return (
    <Tooltip title="View in OpenSea">
      <a target="_blank" href={`${host}/${NFTAddress}/${tokenId}`} rel="noopener noreferrer">
        <img src={OpenSeaIcon} alt="opensea icon" style={{ width: 24, height: 24, marginBottom: 3 }} />
      </a>
    </Tooltip>
  );
}
