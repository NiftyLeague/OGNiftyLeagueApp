import React, { createContext, useCallback, useEffect, useState } from 'react';
import { useThemeSwitcher } from 'react-css-theme-switcher';
import { Signer, providers } from 'ethers';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { useUserAddress } from 'eth-hooks';
import { ChainId } from '@sushiswap/sdk';
import Web3Modal from 'web3modal';
import isEmpty from 'lodash/isEmpty';

import { Contracts, Ethereumish, LocalProvider, MainnetProvider, Network, UserProvider } from 'types/web3';
import { Tx } from 'types/notify';
import useNetworkInfo from 'hooks/useNetworkInfo';
import useContractLoader from 'hooks/useContractLoader';
import useUserProvider from 'hooks/useUserProvider';
import Notifier from 'helpers/Notifier';
import { ALCHEMY_ID, DEBUG, ETHERSCAN_KEY, INFURA_ID, NETWORKS } from './constants';

const { getDefaultProvider, Web3Provider } = providers;

if (window.ethereum) (window.ethereum as Ethereumish).autoRefreshOnNetworkChange = false;

// 📡 What chain are your contracts deployed to? (localhost, rinkeby, mainnet)
const targetNetwork = NETWORKS[process.env.REACT_APP_NETWORK as 'localhost' | 'rinkeby' | 'mainnet'];

// 🛰 providers
if (DEBUG) console.log('📡 Connecting to Mainnet Ethereum');
const providerOptions = { infura: INFURA_ID, etherscan: ETHERSCAN_KEY, alchemy: ALCHEMY_ID[ChainId.MAINNET] };
const mainnetProvider = getDefaultProvider(NETWORKS.mainnet.name, providerOptions) as MainnetProvider;

// 🏠 Your local provider is usually pointed at your local blockchain
if (DEBUG) console.log('🏠 Connecting to local provider:', targetNetwork.rpcUrl);
const localProviderOptions = { ...providerOptions, alchemy: ALCHEMY_ID[targetNetwork.chainId] as string | undefined };
const localProvider = getDefaultProvider(
  targetNetwork.name || targetNetwork.rpcUrl,
  localProviderOptions,
) as LocalProvider;

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

const logoutOfWeb3Modal = () => {
  web3Modal.clearCachedProvider();
  setTimeout(() => {
    window.location.reload();
  }, 1);
};

interface Context {
  address: string;
  loadWeb3Modal: () => Promise<void>;
  localChainId?: number;
  localProvider: LocalProvider;
  logoutOfWeb3Modal: () => void;
  mainnetProvider: MainnetProvider;
  readContracts: Contracts;
  selectedChainId?: number;
  signer?: Signer;
  targetNetwork: Network;
  tx: Tx;
  userProvider?: UserProvider;
  validAccount: boolean;
  web3Modal: Web3Modal;
  writeContracts: Contracts;
}

const CONTEXT_INITIAL_STATE: Context = {
  address: '',
  loadWeb3Modal: async () => new Promise(() => null),
  localChainId: undefined,
  localProvider,
  logoutOfWeb3Modal,
  mainnetProvider,
  readContracts: {},
  selectedChainId: undefined,
  signer: undefined,
  targetNetwork,
  tx: async (_tx, _callback) => new Promise(() => null),
  userProvider: undefined,
  validAccount: false,
  web3Modal,
  writeContracts: {},
};

export const NetworkContext = createContext(CONTEXT_INITIAL_STATE);

const NetworkProvider = ({ children }: { children: React.ReactElement | React.ReactElement[] }): JSX.Element => {
  const [injectedProvider, setInjectedProvider] = useState<UserProvider | undefined>(undefined);

  // Use your injected provider from 🦊 Metamask or if you don't have it then instantly generate a 🔥 burner wallet.
  const userProvider = useUserProvider(injectedProvider, localProvider as providers.JsonRpcProvider, targetNetwork);
  // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'Web3Provider | undefined' is not... Remove this comment to see the full error message
  const address = useUserAddress(userProvider);
  const signer = userProvider?.getSigner();

  // You can warn the user if you would like them to be on a specific network
  const { chainId: localChainId } = useNetworkInfo(localProvider);
  const { chainId: selectedChainId } = useNetworkInfo(userProvider);

  // The Notifier wraps transactions and provides notificiations
  const { currentTheme } = useThemeSwitcher();
  // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'Web3Provider | undefined' is not... Remove this comment to see the full error message
  const tx = Notifier(userProvider, targetNetwork, currentTheme === 'dark');

  // Load in your local 📝 contract and read a value from it:
  const readContracts = useContractLoader(localProvider);

  // If you want to make 🔐 write transactions to your contracts, use the userProvider:
  const writeContracts = useContractLoader(userProvider);

  const updateWeb3ModalTheme = useCallback(async () => {
    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message
    await web3Modal.updateTheme(currentTheme);
  }, [currentTheme]);

  const loadWeb3Modal = useCallback(async () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const provider = await web3Modal.connect();
    await updateWeb3ModalTheme();
    setInjectedProvider(new Web3Provider(provider));
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    provider.on('accountsChanged', accounts => {
      if (DEBUG) console.log('web3 accountsChanged:', accounts);
      setInjectedProvider(new Web3Provider(provider));
    });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    provider.on('chainChanged', chainId => {
      if (DEBUG) console.log('web3 chainChanged:', chainId);
      setInjectedProvider(new Web3Provider(provider));
    });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    provider.on('connect', info => {
      if (DEBUG) console.log('web3 info:', info);
    });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    provider.on('disconnect', error => {
      if (DEBUG) console.log('web3 error:', error);
    });
  }, [setInjectedProvider, updateWeb3ModalTheme]);

  useEffect(() => {
    if (web3Modal.cachedProvider) void loadWeb3Modal();
  }, [loadWeb3Modal]);

  useEffect(() => {
    void updateWeb3ModalTheme();
  }, [updateWeb3ModalTheme, currentTheme]);

  useEffect(() => {
    if (
      DEBUG &&
      address &&
      localChainId &&
      localProvider &&
      mainnetProvider &&
      !isEmpty(readContracts) &&
      selectedChainId &&
      targetNetwork &&
      userProvider &&
      !isEmpty(writeContracts)
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
    validAccount: Boolean(web3Modal.cachedProvider),
    web3Modal,
    writeContracts,
  };

  return <NetworkContext.Provider value={context}>{children}</NetworkContext.Provider>;
};

export default NetworkProvider;