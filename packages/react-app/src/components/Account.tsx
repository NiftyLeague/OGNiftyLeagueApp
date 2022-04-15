import React from 'react';
import { Link } from 'react-router-dom';
import { Theme } from '@mui/material/styles';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import Paper from '@mui/material/Paper';
import { useThemeSwitcher } from 'react-css-theme-switcher';
import { Button } from 'antd';
import Web3Modal from 'web3modal';
import { Provider, MainnetProvider, Web3ModalCallbacks } from 'types/web3';
import Address from './Address';
import Balance from './Balance';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'nowrap',
      height: 46,
      lineHeight: '46px',
      borderWidth: 1.5,
      borderRadius: '.625rem',
      borderColor: '#333c42',
      backgroundColor: 'inherit',
      cursor: 'pointer',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      '&:hover': { borderColor: 'rgb(111, 108, 108)' },
    },
    address: {
      borderRadius: '.5rem',
      background: '-webkit-linear-gradient(89deg, #620edf 0%, #5e72eb 100%)',
      display: 'flex',
      flexWrap: 'nowrap',
      padding: '2px 8px',
    },
  }),
);

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
  loadWeb3Modal?: (callbacks?: Web3ModalCallbacks) => Promise<void>;
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
  const classes = useStyles();
  const modalButtons: JSX.Element[] = [];
  if (web3Modal) {
    if (web3Modal.cachedProvider) {
      modalButtons.push(
        <Button
          key="logoutbutton"
          style={{
            marginLeft: 8,
            borderColor: '#333c42',
            background: 'transparent',
            color: currentTheme === 'dark' ? '#fff' : 'black',
          }}
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
            borderColor: '#6f6c6c',
            background: '-webkit-linear-gradient(89deg, #620edf 0%, #5e72eb 100%)',
            color: '#fff',
          }}
          shape="round"
          size="large"
          onClick={() => {
            if (loadWeb3Modal) {
              void loadWeb3Modal();
            }
          }}
        >
          connect
        </Button>,
      );
    }
  }

  return (
    <div style={{ display: 'flex', flexWrap: 'nowrap', alignItems: 'center' }}>
      {address && (
        <Link to="/profile">
          <Paper variant="outlined" classes={{ root: classes.root }}>
            {userProvider ? <Balance address={address} provider={userProvider} ignoreConversion /> : null}
            <div className={classes.address}>
              <Address
                address={address}
                ensProvider={mainnetProvider}
                mobileView={mobileView}
                blockExplorer={blockExplorer}
              />
            </div>
          </Paper>
        </Link>
      )}
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
