import React from 'react';
import { useThemeSwitcher } from 'react-css-theme-switcher';
import { Button } from 'antd';
import Web3Modal from 'web3modal';
import { Provider, MainnetProvider } from 'types/web3';
import Address from './Address';
import Balance from './Balance';

/*
  ~ What it does? ~

  Displays an Address, Balance, and Wallet as one Account component,
  also allows users to log in to existing accounts and log out

  ~ How can I use? ~

  <Account
    address={address}
    localProvider={localProvider}
    userProvider={userProvider}
    mainnetProvider={mainnetProvider}
    price={price}
    web3Modal={web3Modal}
    loadWeb3Modal={loadWeb3Modal}
    logoutOfWeb3Modal={logoutOfWeb3Modal}
    blockExplorer={blockExplorer}
  />

  ~ Features ~

  - Provide address={address} and get balance corresponding to the given address
  - Provide userProvider={userProvider} to access balance on local network
  - Provide userProvider={userProvider} to display a wallet
  - Provide mainnetProvider={mainnetProvider} and your address will be replaced by ENS name
              (ex. "0xa870" => "user.eth")
  - Provide targetNetwork={targetNetwork} ex: localhost, mainnet
  - Provide web3Modal={web3Modal}, loadWeb3Modal={loadWeb3Modal}, logoutOfWeb3Modal={logoutOfWeb3Modal}
              to be able to log in/log out to/from existing accounts
  - Provide blockExplorer={blockExplorer}, click on address and get the link
              (ex. by default "https://etherscan.io/" or for xdai "https://blockscout.com/poa/xdai/")
*/

interface AccountsProps {
  address: string;
  blockExplorer: string;
  mobileView?: boolean;
  loadWeb3Modal?: () => Promise<void>;
  logoutOfWeb3Modal?: () => void;
  mainnetProvider: MainnetProvider;
  userProvider?: Provider;
  web3Modal?: Web3Modal;
}

export default function Account({
  address,
  blockExplorer,
  mobileView,
  loadWeb3Modal,
  logoutOfWeb3Modal,
  mainnetProvider,
  userProvider,
  web3Modal,
}: AccountsProps): JSX.Element {
  const { currentTheme } = useThemeSwitcher();
  const modalButtons: JSX.Element[] = [];
  if (web3Modal) {
    const btnStyles = {
      marginLeft: 8,
      borderColor: '#6f6c6c',
    };
    if (web3Modal.cachedProvider) {
      modalButtons.push(
        <Button
          key="logoutbutton"
          style={{ ...btnStyles, background: 'transparent', color: currentTheme === 'dark' ? '#fff' : 'black' }}
          shape="round"
          size="large"
          onClick={logoutOfWeb3Modal}
        >
          logout
        </Button>,
      );
    } else {
      modalButtons.push(
        <Button
          key="loginbutton"
          style={{
            ...btnStyles,
            background: '-webkit-linear-gradient(89deg, #620edf 0%, #5e72eb 100%)',
            color: '#fff',
          }}
          shape="round"
          size="large"
          onClick={loadWeb3Modal}
        >
          connect
        </Button>,
      );
    }
  }

  return (
    <div style={{ display: 'flex', flexWrap: 'nowrap', alignItems: 'center' }}>
      {address && (
        <Address
          address={address}
          ensProvider={mainnetProvider}
          mobileView={mobileView}
          blockExplorer={blockExplorer}
        />
      )}
      {!mobileView && address && userProvider ? <Balance address={address} provider={userProvider} /> : null}
      {modalButtons}
    </div>
  );
}

Account.defaultProps = {
  loadWeb3Modal: undefined,
  logoutOfWeb3Modal: undefined,
  mobileView: false,
  userProvider: undefined,
  web3Modal: undefined,
};
