import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import { getDefaultProvider } from "@ethersproject/providers";
import { useUserAddress } from "eth-hooks";
import { useThemeSwitcher } from "react-css-theme-switcher";
import { ScrollToTop, useContractLoader, useGasPrice, useUserProvider } from "./hooks";
import { Contract, Faucet, Navigation, ThemeSwitch } from "./components";
import { Notifier } from "./helpers";
import { About, Characters, Games, Hints, Home, NotFound, Staking, Subgraph, Wallet } from "./views";
import { ALCHEMY_ID, DEBUG, ETHERSCAN_KEY, INFURA_ID, NETWORKS, NFT_CONTRACT } from "./constants";
import "./App.css";

// For more hooks, check out 🔗eth-hooks at: https://www.npmjs.com/package/eth-hooks

// 📡 What chain are your contracts deployed to? (localhost, rinkeby, mainnet)
const targetNetwork = NETWORKS[process.env.REACT_APP_NETWORK];

// 🛰 providers
if (DEBUG) console.log("📡 Connecting to Mainnet Ethereum");
const providerOptions = { infura: INFURA_ID, etherscan: ETHERSCAN_KEY };
const mainnetProvider = getDefaultProvider(NETWORKS.mainnet.name, { ...providerOptions, alchemy: ALCHEMY_ID });

// 🏠 Your local provider is usually pointed at your local blockchain
if (DEBUG) console.log("🏠 Connecting to provider:", targetNetwork.rpcUrl);
const localProvider = getDefaultProvider(targetNetwork.name, providerOptions);

// 🔭 block explorer URL
const { blockExplorer } = targetNetwork;

function App({ subgraphUri }) {
  const [route, setRoute] = useState(window.location.pathname);
  const [injectedProvider, setInjectedProvider] = useState();

  // Use your injected provider from 🦊 Metamask or if you don't have it then instantly generate a 🔥 burner wallet.
  const userProvider = useUserProvider(injectedProvider, localProvider);
  const address = useUserAddress(userProvider);
  const validAccount = userProvider?.provider?.isMetaMask;

  // You can warn the user if you would like them to be on a specific network
  const localChainId = localProvider?._network?.chainId;
  const selectedChainId = userProvider?._network?.chainId;
  const faucetAvailable = localProvider?.connection && targetNetwork.label === "localhost";

  /* 🔥 This hook will get the price of Gas from ⛽️ EtherGasStation */
  const gasPrice = useGasPrice(targetNetwork, "fast");

  // The Notifier wraps transactions and provides notificiations
  const { currentTheme } = useThemeSwitcher();
  const tx = Notifier(userProvider, gasPrice, currentTheme === "dark");

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
      console.log("📝 readContracts", readContracts);
      console.log("🔐 writeContracts", writeContracts);
    }
  }, [address, localChainId, readContracts, selectedChainId, userProvider, writeContracts]);

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
              readContracts={readContracts}
              setRoute={setRoute}
              tx={tx}
              writeContracts={writeContracts}
            />
          </Route>
          <Route exact path="/about">
            <About setRoute={setRoute} />
          </Route>
          <Route exact path="/games">
            <Games address={address} validAccount={validAccount} />
          </Route>
          <Route exact path="/degens">
            <Characters readContracts={readContracts} />
          </Route>
          <Route exact path="/wallet">
            <Wallet validAccount={validAccount} />
          </Route>
          <Route exact path="/staking">
            <Staking validAccount={validAccount} />
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
                  name="AllowedTraitsStorage"
                  signer={userProvider.getSigner()}
                  provider={localProvider}
                  address={address}
                  blockExplorer={blockExplorer}
                />
              </Route>
              <Route path="/hints">
                <Hints address={address} mainnetProvider={mainnetProvider} />
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
