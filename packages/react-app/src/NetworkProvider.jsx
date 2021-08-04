import React, { createContext, useCallback, useEffect, useState } from 'react';
import { useThemeSwitcher } from 'react-css-theme-switcher';
import { providers } from 'ethers';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { useUserAddress } from 'eth-hooks';
import Web3Modal from 'web3modal';

import { useContractLoader, useUserProvider, useNetworkInfo } from 'hooks';
import Notifier from 'helpers/Notifier';
import { ALCHEMY_ID, DEBUG, ETHERSCAN_KEY, INFURA_ID, NETWORKS } from './constants';

const { getDefaultProvider, Web3Provider } = providers;

const CONTEXT_INITIAL_STATE = {
  address: '',
  faucetAvailable: false,
  loadWeb3Modal: () => {},
  localChainId: null,
  localProvider: null,
  logoutOfWeb3Modal: () => {},
  mainnetProvider: null,
  readContracts: {},
  selectedChainId: null,
  signer: {},
  targetNetwork: {
    blockExplorer: '',
    chainId: null,
    label: '',
    name: '',
    rpcUrl: '',
  },
  tx: () => {},
  userProvider: null,
  validAccount: false,
  web3Modal: {},
  writeContracts: {},
};

export const NetworkContext = createContext(CONTEXT_INITIAL_STATE);

if (window.ethereum) window.ethereum.autoRefreshOnNetworkChange = false;

// 📡 What chain are your contracts deployed to? (localhost, rinkeby, mainnet)
const targetNetwork = NETWORKS[process.env.REACT_APP_NETWORK];

// 🛰 providers
if (DEBUG) console.log('📡 Connecting to Mainnet Ethereum');
const providerOptions = { infura: INFURA_ID, etherscan: ETHERSCAN_KEY, alchemy: ALCHEMY_ID };
const mainnetProvider = navigator.onLine ? getDefaultProvider(NETWORKS.mainnet.name, providerOptions) : null;

// 🏠 Your local provider is usually pointed at your local blockchain
if (DEBUG) console.log('🏠 Connecting to local provider:', targetNetwork.rpcUrl);
const localProvider = getDefaultProvider(targetNetwork.name, providerOptions);

/*
  Web3 modal helps us "connect" external wallets:
*/
const web3Modal = new Web3Modal({
  cacheProvider: true,
  theme: 'dark',
  providerOptions: {
    injected: {
      package: null,
    },
    walletconnect: {
      package: WalletConnectProvider, // required
      options: {
        infuraId: INFURA_ID,
      },
    },
  },
});

const logoutOfWeb3Modal = async () => {
  await web3Modal.clearCachedProvider();
  setTimeout(() => {
    window.location.reload();
  }, 1);
};

const NetworkProvider = ({ children }) => {
  const [injectedProvider, setInjectedProvider] = useState(null);

  // Use your injected provider from 🦊 Metamask or if you don't have it then instantly generate a 🔥 burner wallet.
  const userProvider = useUserProvider(injectedProvider, localProvider);
  const address = useUserAddress(userProvider);
  const signer = userProvider?.getSigner();

  // You can warn the user if you would like them to be on a specific network
  const { chainId: localChainId } = useNetworkInfo(localProvider);
  const { chainId: selectedChainId } = useNetworkInfo(userProvider);

  // The Notifier wraps transactions and provides notificiations
  const { currentTheme } = useThemeSwitcher();
  const tx = Notifier(userProvider, targetNetwork, currentTheme === 'dark');

  // Load in your local 📝 contract and read a value from it:
  const readContracts = useContractLoader(localProvider);

  // If you want to make 🔐 write transactions to your contracts, use the userProvider:
  const writeContracts = useContractLoader(userProvider);

  const updateWeb3ModalTheme = useCallback(async () => {
    await web3Modal.updateTheme(currentTheme);
  }, [currentTheme]);

  const loadWeb3Modal = useCallback(async () => {
    const provider = await web3Modal.connect();
    updateWeb3ModalTheme();
    setInjectedProvider(new Web3Provider(provider));
    provider.on('accountsChanged', accounts => {
      if (DEBUG) console.log('web3 accounts', accounts);
    });
    provider.on('chainChanged', chainId => {
      if (DEBUG) console.log('web3 chainId', chainId);
      setTimeout(() => {
        window.location.reload();
      }, 1);
    });
    provider.on('connect', info => {
      if (DEBUG) console.log('web3 info', info);
    });
    provider.on('disconnect', error => {
      if (DEBUG) console.log('web3 error', error);
    });
  }, [setInjectedProvider, updateWeb3ModalTheme]);

  useEffect(() => {
    if (web3Modal.cachedProvider) loadWeb3Modal();
  }, [loadWeb3Modal]);

  useEffect(() => {
    updateWeb3ModalTheme();
  }, [updateWeb3ModalTheme, currentTheme]);

  useEffect(() => {
    if (
      DEBUG &&
      address &&
      localChainId &&
      localProvider &&
      mainnetProvider &&
      readContracts &&
      selectedChainId &&
      targetNetwork &&
      userProvider &&
      writeContracts
    ) {
      console.log('_________________ 🏗 Nifty League _________________');
      console.log('🌎 mainnetProvider', mainnetProvider);
      console.log('📡 userProvider', userProvider);
      console.log('📡 localProvider', localProvider);
      console.log('🏠 localChainId', localChainId);
      console.log('🕵🏻‍♂️ selectedChainId:', selectedChainId);
      console.log('🔭 targetNetwork:', targetNetwork);
      console.log('👩‍💼 user address:', address);
      console.log('📝 readContracts', readContracts);
      console.log('🔐 writeContracts', writeContracts);
    }
  }, [address, localChainId, readContracts, selectedChainId, userProvider, writeContracts]);

  const context = {
    address,
    loadWeb3Modal,
    localChainId,
    localProvider,
    logoutOfWeb3Modal,
    mainnetProvider,
    readContracts,
    selectedChainId,
    signer,
    targetNetwork,
    tx,
    userProvider,
    validAccount: web3Modal.cachedProvider,
    web3Modal,
    writeContracts,
  };

  return <NetworkContext.Provider value={context}>{children}</NetworkContext.Provider>;
};

export default NetworkProvider;
