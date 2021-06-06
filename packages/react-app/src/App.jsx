/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useCallback, useEffect, useState } from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { JsonRpcProvider, Web3Provider } from "@ethersproject/providers";
import { Menu, Alert } from "antd";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { useUserAddress } from "eth-hooks";
import { formatEther } from "@ethersproject/units";
import {
  useExchangePrice,
  useGasPrice,
  useUserProvider,
  useContractLoader,
  // eslint-disable-next-line no-unused-vars
  useContractReader,
  // useEventListener,
  useBalance,
  // useExternalContractLoader,
} from "./hooks";
import { Header, Account, Faucet, Contract, ThemeSwitch } from "./components";
import { Notifier } from "./helpers";
import { Hints, ExampleUI, Subgraph, Home } from "./views";
import { INFURA_ID, NETWORK, NETWORKS } from "./constants";
import "./App.css";
/*
    Welcome to 🏗 scaffold-eth !

    Code:
    https://github.com/austintgriffith/scaffold-eth

    Support:
    https://t.me/joinchat/KByvmRe5wkR-8F_zz6AjpA
    or DM @austingriffith on twitter or telegram

    You should get your own Infura.io ID and put it in `constants.js`
    (this is your connection to the main Ethereum network for ENS etc.)


    🌏 EXTERNAL CONTRACTS:
    You can also bring in contract artifacts in `constants.js`
    (and then use the `useExternalContractLoader()` hook!)
*/

/// 📡 What chain are your contracts deployed to?
const targetNetwork = NETWORKS[process.env.REACT_APP_NETWORK]; // <------- select your target frontend network (localhost, rinkeby, xdai, mainnet)

const DEBUG = process.env.NODE_ENV === "development";

// 🛰 providers
if (DEBUG) console.log("📡 Connecting to Mainnet Ethereum");
// const mainnetProvider = getDefaultProvider("mainnet", { infura: INFURA_ID, etherscan: ETHERSCAN_KEY, quorum: 1 });
// const mainnetProvider = new InfuraProvider("mainnet",INFURA_ID);
//
// attempt to connect to our own scaffold eth rpc and if that fails fall back to infura...
const scaffoldEthProvider = new JsonRpcProvider("https://rpc.scaffoldeth.io:48544");
const mainnetInfura = new JsonRpcProvider("https://mainnet.infura.io/v3/" + INFURA_ID);
// ( ⚠️ Getting "failed to meet quorum" errors? Check your INFURA_I

// 🏠 Your local provider is usually pointed at your local blockchain
const localProviderUrl = targetNetwork.rpcUrl;
if (DEBUG) console.log("🏠 Connecting to provider:", localProviderUrl);
const localProvider = new JsonRpcProvider(localProviderUrl);

// 🔭 block explorer URL
const { blockExplorer } = targetNetwork;

/*
  Web3 modal helps us "connect" external wallets:
*/
const web3Modal = new Web3Modal({
  // network: "mainnet", // optional
  cacheProvider: true, // optional
  providerOptions: {
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

function App({ subgraphUri }) {
  const mainnetProvider = scaffoldEthProvider && scaffoldEthProvider._network ? scaffoldEthProvider : mainnetInfura;

  const [injectedProvider, setInjectedProvider] = useState();
  /* 💵 This hook will get the price of ETH from 🦄 Uniswap: */
  const price = useExchangePrice(targetNetwork, mainnetProvider);

  /* 🔥 This hook will get the price of Gas from ⛽️ EtherGasStation */
  const gasPrice = useGasPrice(targetNetwork, "fast");
  // Use your injected provider from 🦊 Metamask or if you don't have it then instantly generate a 🔥 burner wallet.
  const userProvider = useUserProvider(injectedProvider, localProvider);
  const address = useUserAddress(userProvider);

  // You can warn the user if you would like them to be on a specific network
  const localChainId = localProvider && localProvider._network && localProvider._network.chainId;
  const selectedChainId = userProvider && userProvider._network && userProvider._network.chainId;

  // For more hooks, check out 🔗eth-hooks at: https://www.npmjs.com/package/eth-hooks

  // The Notifier wraps transactions and provides notificiations
  const tx = Notifier(userProvider, gasPrice);

  // 🏗 scaffold-eth is full of handy hooks like this one to get your balance:
  const yourLocalBalance = useBalance(localProvider, address);

  // Just plug in different 🛰 providers to get your balance on different chains:
  const yourMainnetBalance = useBalance(mainnetProvider, address);

  // Load in your local 📝 contract and read a value from it:
  const readContracts = useContractLoader(localProvider);

  // If you want to make 🔐 write transactions to your contracts, use the userProvider:
  const writeContracts = useContractLoader(userProvider);

  // EXTERNAL CONTRACT EXAMPLE:
  //
  // If you want to bring in the mainnet DAI contract it would look like:
  // const mainnetDAIContract = useExternalContractLoader(mainnetProvider, DAI_ADDRESS, DAI_ABI);

  // Then read your DAI balance like:
  // const myMainnetDAIBalance = useContractReader({ DAI: mainnetDAIContract }, "DAI", "balanceOf", [
  //   "0x34aA3F359A9D614239015126635CE7732c18fDF3",
  // ]);

  // keep track of a variable from the contract in the local React state:
  // const purpose = useContractReader(readContracts, "YourContract", "purpose");

  // 📟 Listen for broadcast events
  // const setPurposeEvents = useEventListener(readContracts, "YourContract", "SetPurpose", localProvider, 1);

  //
  // ☝️ These effects will log your major set up and upcoming transferEvents- and balance changes
  //
  useEffect(() => {
    if (
      DEBUG &&
      mainnetProvider &&
      address &&
      selectedChainId &&
      yourLocalBalance &&
      yourMainnetBalance &&
      readContracts &&
      writeContracts
    ) {
      console.log("_________________ 🏗 scaffold-eth _________________");
      console.log("🌎 mainnetProvider", mainnetProvider);
      console.log("🏠 localChainId", localChainId);
      console.log("👩‍💼 selected address:", address);
      console.log("🕵🏻‍♂️ selectedChainId:", selectedChainId);
      console.log("💵 yourLocalBalance", yourLocalBalance ? formatEther(yourLocalBalance) : "...");
      console.log("💵 yourMainnetBalance", yourMainnetBalance ? formatEther(yourMainnetBalance) : "...");
      console.log("📝 readContracts", readContracts);
      console.log("🔐 writeContracts", writeContracts);
    }
  }, [
    address,
    localChainId,
    mainnetProvider,
    readContracts,
    selectedChainId,
    writeContracts,
    yourLocalBalance,
    yourMainnetBalance,
  ]);

  // const [oldMainnetBalance, setOldMainnetDAIBalance] = useState(0);

  // For Master Branch Example
  // const [oldPurposeEvents, setOldPurposeEvents] = useState([]);

  // For Buyer-Lazy-Mint Branch Example
  // const [oldTransferEvents, setOldTransferEvents] = useState([])
  // const [oldBalance, setOldBalance] = useState(0)

  // Use this effect for often changing things like your balance and transfer events or contract-specific effects
  // useEffect(() => {
  //   if (DEBUG) {
  //     if (myMainnetDAIBalance && !myMainnetDAIBalance.eq(oldMainnetBalance)) {
  //       console.log("🥇 myMainnetDAIBalance:", myMainnetDAIBalance);
  //       setOldMainnetDAIBalance(myMainnetDAIBalance);
  //     }

  //     // For Buyer-Lazy-Mint Branch Example
  //     if(transferEvents && oldTransferEvents !== transferEvents){
  //      console.log("📟 Transfer events:", transferEvents)
  //      setOldTransferEvents(transferEvents)
  //     }
  //     if(balance && !balance.eq(oldBalance)){
  //      console.log("🤗 balance:", balance)
  //      setOldBalance(balance)
  //     }

  //     // For Master Branch Example
  //     if (setPurposeEvents && setPurposeEvents !== oldPurposeEvents) {
  //       console.log("📟 SetPurpose events:", setPurposeEvents);
  //       setOldPurposeEvents(setPurposeEvents);
  //     }
  //   }
  // }, [myMainnetDAIBalance]); // For Buyer-Lazy-Mint Branch: balance, transferEvents

  const networkDisplay =
    localChainId && selectedChainId && localChainId !== selectedChainId ? (
      <div
        style={{
          zIndex: 2,
          position: "absolute",
          right: 0,
          top: 60,
          padding: 16,
        }}
      >
        <Alert
          message="⚠️ Wrong Network"
          description={
            <div>
              You have <b>{NETWORK(selectedChainId).name}</b> selected and you need to be on{" "}
              <b>{NETWORK(localChainId).name}</b>.
            </div>
          }
          type="error"
          closable={false}
        />
      </div>
    ) : (
      <div
        style={{
          zIndex: -1,
          position: "absolute",
          right: 154,
          top: 28,
          padding: 16,
          color: targetNetwork.color,
        }}
      >
        {targetNetwork.name}
      </div>
    );

  const loadWeb3Modal = useCallback(async () => {
    const provider = await web3Modal.connect();
    setInjectedProvider(new Web3Provider(provider));
  }, [setInjectedProvider]);

  useEffect(() => {
    if (web3Modal.cachedProvider) loadWeb3Modal();
  }, [loadWeb3Modal]);

  const [route, setRoute] = useState();
  useEffect(() => {
    setRoute(window.location.pathname);
  }, [setRoute]);

  const faucetAvailable = localProvider && localProvider.connection && targetNetwork.name === "localhost";

  return (
    <div className="App">
      <Header />
      {networkDisplay}
      <BrowserRouter>
        <Menu style={{ textAlign: "center" }} selectedKeys={[route]} mode="horizontal">
          <Menu.Item key="/">
            <Link onClick={() => setRoute("/")} to="/">
              Home
            </Link>
          </Menu.Item>
          <Menu.Item key="/NFTL">
            <Link onClick={() => setRoute("/NTFL")} to="/NFTL">
              NFTL Token
            </Link>
          </Menu.Item>
          <Menu.Item key="/NFTs">
            <Link onClick={() => setRoute("/NFTs")} to="/NFTs">
              NFTs
            </Link>
          </Menu.Item>
          <Menu.Item key="/hints">
            <Link onClick={() => setRoute("/hints")} to="/hints">
              Hints
            </Link>
          </Menu.Item>
          <Menu.Item key="/example">
            <Link onClick={() => setRoute("/example")} to="/example">
              Example UI
            </Link>
          </Menu.Item>
          <Menu.Item key="/subgraph">
            <Link onClick={() => setRoute("/subgraph")} to="/subgraph">
              Subgraph
            </Link>
          </Menu.Item>
        </Menu>

        <Switch>
          <Route exact path="/">
            <Home subgraphUri={subgraphUri} tx={tx} writeContracts={writeContracts} mainnetProvider={mainnetProvider} />
          </Route>
          <Route path="/NFTL">
            <Contract
              name="NFTLToken"
              signer={userProvider.getSigner()}
              provider={localProvider}
              address={address}
              blockExplorer={blockExplorer}
            />
          </Route>
          <Route path="/NFTs">
            <Contract
              name="NiftyLeagueCharacter"
              signer={userProvider.getSigner()}
              provider={localProvider}
              address={address}
              blockExplorer={blockExplorer}
            />
          </Route>
          <Route path="/hints">
            <Hints
              address={address}
              yourLocalBalance={yourLocalBalance}
              mainnetProvider={mainnetProvider}
              price={price}
            />
          </Route>
          <Route path="/example">
            <ExampleUI
              address={address}
              userProvider={userProvider}
              mainnetProvider={mainnetProvider}
              localProvider={localProvider}
              yourLocalBalance={yourLocalBalance}
              price={price}
              tx={tx}
              writeContracts={writeContracts}
              readContracts={readContracts}
              // purpose={purpose}
              // setPurposeEvents={setPurposeEvents}
            />
          </Route>
          <Route path="/subgraph">
            <Subgraph
              subgraphUri={subgraphUri}
              tx={tx}
              writeContracts={writeContracts}
              mainnetProvider={mainnetProvider}
            />
          </Route>
        </Switch>
      </BrowserRouter>

      <ThemeSwitch />

      {/* 👨‍💼 Your account is in the top right with a wallet at connect options */}
      <div
        style={{
          position: "fixed",
          textAlign: "right",
          right: 0,
          top: 0,
          padding: 10,
        }}
      >
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
      </div>

      {/* if the local provider has a signer, let's show the faucet: */}
      {faucetAvailable && (
        <div
          style={{
            position: "fixed",
            textAlign: "left",
            left: 0,
            bottom: 20,
            padding: 10,
          }}
        >
          <Faucet localProvider={localProvider} price={price} ensProvider={mainnetProvider} />
        </div>
      )}
    </div>
  );
}

// eslint-disable-next-line no-unused-expressions
window.ethereum &&
  // eslint-disable-next-line no-unused-vars
  window.ethereum.on("chainChanged", chainId => {
    setTimeout(() => {
      window.location.reload();
    }, 1);
  });

export default App;
