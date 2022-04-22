import React from 'react';
import Blockies from 'react-blockies';
import { useThemeSwitcher } from 'react-css-theme-switcher';
import { Typography, Skeleton } from 'antd';
import { MainnetProvider } from 'types/web3';
import { useLookupAddress } from 'eth-hooks/dapps/ens';
import { TEthersProvider } from 'eth-hooks/models/providerTypes';

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
*/

const { Text } = Typography;

const blockExplorerLink = (address: string, blockExplorer?: string) =>
  `${blockExplorer || 'https://etherscan.io/'}${'address/'}${address}`;

interface AddressProps {
  address: string;
  blockExplorer?: string;
  copyable?: boolean;
  ensProvider?: MainnetProvider;
  mobileView?: boolean;
  size?: 'short' | 'long';
}

export default function Address({
  address,
  blockExplorer,
  copyable,
  ensProvider,
  mobileView,
  size,
}: AddressProps): JSX.Element {
  const ens = useLookupAddress(ensProvider as TEthersProvider, address);
  const { currentTheme } = useThemeSwitcher();

  if (!address) {
    return (
      <span>
        <Skeleton avatar paragraph={{ rows: 1 }} />
      </span>
    );
  }

  let displayAddress = address.substr(0, 6);

  if (ens && ens.indexOf('0x') < 0) {
    displayAddress = ens;
  } else if (size === 'short') {
    displayAddress += `...${address.substr(-4)}`;
  } else if (size === 'long') {
    displayAddress = address;
  }

  const etherscanLink = blockExplorerLink(address, blockExplorer);

  return (
    <>
      {!mobileView && (
        <div
          style={{
            borderRadius: '50%',
            overflow: 'hidden',
            width: 20,
            height: 20,
            margin: 'auto 0',
          }}
        >
          <Blockies seed={address.toLowerCase()} size={5} className="blockies" />
        </div>
      )}
      <span style={{ verticalAlign: 'middle', paddingLeft: 5, height: 'inherit', marginTop: '-3px' }}>
        {copyable ? (
          <Text copyable={{ text: address }} className="address-box">
            <a
              style={{ color: currentTheme === 'light' ? '#222222' : '#ddd' }}
              target="_blank"
              href={etherscanLink}
              rel="noopener noreferrer"
            >
              {displayAddress}
            </a>
          </Text>
        ) : (
          <Text style={{ color: currentTheme === 'light' ? '#222222' : '#ddd' }}>{displayAddress}</Text>
        )}
      </span>
    </>
  );
}

Address.defaultProps = {
  blockExplorer: '',
  copyable: false,
  ensProvider: undefined,
  mobileView: false,
  size: undefined,
};
