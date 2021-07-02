import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import { JsonRpcProvider } from "@ethersproject/providers";
import { useUserAddress } from "eth-hooks";
import { useThemeSwitcher } from "react-css-theme-switcher";
import { ScrollToTop, useBalance, useContractLoader, useGasPrice, useUserProvider } from "./hooks";
import { Contract, Faucet, Navigation, ThemeSwitch } from "./components";
import { Notifier } from "./helpers";
import { About, Characters, Games, Hints, Home, Staking, Subgraph, NotFound } from "./views";
import { DEBUG, NETWORKS, NFT_CONTRACT, INFURA_ID } from "./constants";
import "./App.css";

// For more hooks, check out 🔗eth-hooks at: https://www.npmjs.com/package/eth-hooks

// 📡 What chain are your contracts deployed to? (localhost, rinkeby, mainnet)
const targetNetwork = NETWORKS[process.env.REACT_APP_NETWORK];

// 🛰 providers
if (DEBUG) console.log("📡 Connecting to Mainnet Ethereum");
// attempt to connect to our own scaffold eth rpc and if that fails fall back to infura...
const scaffoldEthProvider = new JsonRpcProvider("https://rpc.scaffoldeth.io:48544");
const mainnetInfura = new JsonRpcProvider("https://mainnet.infura.io/v3/" + INFURA_ID);

// 🏠 Your local provider is usually pointed at your local blockchain
const localProviderUrl = targetNetwork.rpcUrl;
if (DEBUG) console.log("🏠 Connecting to provider:", localProviderUrl);
const localProvider = new JsonRpcProvider(localProviderUrl);

// 🔭 block explorer URL
const { blockExplorer } = targetNetwork;

function App({ subgraphUri }) {
  const [route, setRoute] = useState(window.location.pathname);
  const [injectedProvider, setInjectedProvider] = useState();
  const mainnetProvider = scaffoldEthProvider && scaffoldEthProvider._network ? scaffoldEthProvider : mainnetInfura;

  // Use your injected provider from 🦊 Metamask or if you don't have it then instantly generate a 🔥 burner wallet.
  const userProvider = useUserProvider(injectedProvider, localProvider);
  const address = useUserAddress(userProvider);

  // You can warn the user if you would like them to be on a specific network
  const localChainId = localProvider && localProvider._network && localProvider._network.chainId;
  const selectedChainId = userProvider && userProvider._network && userProvider._network.chainId;
  const faucetAvailable = localProvider && localProvider.connection && targetNetwork.name === "localhost";

  /* 🔥 This hook will get the price of Gas from ⛽️ EtherGasStation */
  const gasPrice = useGasPrice(targetNetwork, "fast");

  // The Notifier wraps transactions and provides notificiations
  const { currentTheme } = useThemeSwitcher();
  const tx = Notifier(userProvider, gasPrice, currentTheme === "dark");

  // Just plug in different 🛰 providers to get your balance on different chains:
  const yourLocalBalance = useBalance(localProvider, address);
  const yourMainnetBalance = useBalance(mainnetProvider, address);

  // Load in your local 📝 contract and read a value from it:
  const readContracts = useContractLoader(localProvider);

  // If you want to make 🔐 write transactions to your contracts, use the userProvider:
  const writeContracts = useContractLoader(userProvider);

  // EXTERNAL CONTRACT EXAMPLE:
  // If you want to bring in the mainnet DAI contract it would look like:
  // const mainnetDAIContract = useExternalContractLoader(mainnetProvider, DAI_ADDRESS, DAI_ABI);

  // Then read your DAI balance like:
  // const myMainnetDAIBalance = useContractReader({ DAI: mainnetDAIContract }, "DAI", "balanceOf", [
  //   "0x34aA3F359A9D614239015126635CE7732c18fDF3",
  // ]);

  useEffect(() => {
    if (
      DEBUG &&
      mainnetProvider &&
      userProvider &&
      localProvider &&
      localChainId &&
      selectedChainId &&
      address &&
      yourLocalBalance &&
      yourMainnetBalance &&
      readContracts &&
      writeContracts
    ) {
      console.log("_________________ 🏗 Nifty League _________________");
      console.log("🌎 mainnetProvider", mainnetProvider);
      console.log("📡 userProvider", userProvider);
      console.log("📡 localProvider", localProvider);
      console.log("🏠 localChainId", localChainId);
      console.log("🕵🏻‍♂️ selectedChainId:", selectedChainId);
      console.log("👩‍💼 user address:", address);
      console.log("💵 yourLocalBalance", yourLocalBalance);
      console.log("💵 yourMainnetBalance", yourMainnetBalance);
      console.log("📝 readContracts", readContracts);
      console.log("🔐 writeContracts", writeContracts);
    }
  }, [
    address,
    localChainId,
    localProvider,
    mainnetProvider,
    readContracts,
    selectedChainId,
    userProvider,
    writeContracts,
    yourLocalBalance,
    yourMainnetBalance,
  ]);

  return (
    <div className="App">
      <Navigation
        address={address}
        blockExplorer={blockExplorer}
        localChainId={localChainId}
        mainnetProvider={mainnetProvider}
        route={route}
        selectedChainId={selectedChainId}
        setInjectedProvider={setInjectedProvider}
        setRoute={setRoute}
        targetNetwork={targetNetwork}
        userProvider={userProvider}
      />
      <div className="AppBody">
        <ScrollToTop />
        <Switch>
          <Route exact path="/">
            <Home
              address={address}
              localProvider={localProvider}
              readContracts={readContracts}
              setRoute={setRoute}
              tx={tx}
              writeContracts={writeContracts}
            />
          </Route>
          <Route exact path="/about">
            <About setRoute={setRoute} />
          </Route>
          <Route exact path="/characters">
            <Characters readContracts={readContracts} />
          </Route>
          <Route exact path="/games">
            <Games />
          </Route>
          <Route exact path="/staking">
            <Staking />
          </Route>
          {DEBUG && (
            <>
              <Route path="/NFTL">
                <Contract
                  name="NFTLToken"
                  signer={userProvider.getSigner()}
                  provider={localProvider}
                  address={address}
                  blockExplorer={blockExplorer}
                />
              </Route>
              <Route path="/NFT">
                <Contract
                  name={NFT_CONTRACT}
                  signer={userProvider.getSigner()}
                  provider={localProvider}
                  address={address}
                  blockExplorer={blockExplorer}
                />
              </Route>
              <Route path="/storage">
                <Contract
                  name={"AllowedTraitsStorage"}
                  signer={userProvider.getSigner()}
                  provider={localProvider}
                  address={address}
                  blockExplorer={blockExplorer}
                />
              </Route>
              <Route path="/hints">
                <Hints address={address} yourLocalBalance={yourLocalBalance} mainnetProvider={mainnetProvider} />
              </Route>
              <Route path="/subgraph">
                <Subgraph
                  mainnetProvider={mainnetProvider}
                  readContracts={readContracts}
                  subgraphUri={subgraphUri}
                  tx={tx}
                  writeContracts={writeContracts}
                />
              </Route>
            </>
          )}
          <Route component={NotFound} />
        </Switch>
      </div>

      <ThemeSwitch />

      {/* if the local provider has a signer, let's show the faucet: */}
      {faucetAvailable && (
        <div
          style={{
            position: "fixed",
            top: 65,
            right: 0,
            padding: 10,
          }}
        >
          <Faucet
            localProvider={localProvider}
            mainnetProvider={mainnetProvider}
            targetNetwork={targetNetwork}
            ensProvider={mainnetProvider}
          />
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
