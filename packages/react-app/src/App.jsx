import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import { JsonRpcProvider } from "@ethersproject/providers";
import { useUserAddress } from "eth-hooks";
import { formatEther } from "@ethersproject/units";
import { useThemeSwitcher } from "react-css-theme-switcher";
import {
  useExchangePrice,
  useGasPrice,
  useUserProvider,
  useContractLoader,
  useContractReader,
  // useEventListener,
  useBalance,
  ScrollToTop,
  // useExternalContractLoader,
} from "./hooks";
import { Contract, Faucet, Navigation, ThemeSwitch } from "./components";
import { Notifier } from "./helpers";
import { About, Characters, Games, Hints, Home, Staking, Subgraph, NotFound } from "./views";
import { DEBUG, NETWORKS, NFT_CONTRACT, INFURA_ID } from "./constants";
import "./App.css";

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
  const mainnetProvider = scaffoldEthProvider && scaffoldEthProvider._network ? scaffoldEthProvider : mainnetInfura;

  const [injectedProvider, setInjectedProvider] = useState();
  /* 💵 This hook will get the price of ETH from Sushiswap: */
  const price = useExchangePrice(targetNetwork, mainnetProvider, 30000);

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
  const { currentTheme } = useThemeSwitcher();
  const tx = Notifier(userProvider, gasPrice, currentTheme === "dark");

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
  const nftPriceBN = useContractReader(readContracts, NFT_CONTRACT, "getNFTPrice", null, 10000);
  const nftPrice = nftPriceBN && formatEther(nftPriceBN.toString());

  // ☝️ These effects will log your major set up and upcoming transferEvents- and balance changes
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

  // For Master Branch Example
  // const [oldPurposeEvents, setOldPurposeEvents] = useState([]);

  // For Buyer-Lazy-Mint Branch Example
  // const [oldTransferEvents, setOldTransferEvents] = useState([])
  // const [oldBalance, setOldBalance] = useState(0)

  // Use this effect for often changing things like your balance and transfer events or contract-specific effects
  // useEffect(() => {
  //   if (DEBUG) {
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
  // }, []); // For Buyer-Lazy-Mint Branch: balance, transferEvents

  const [route, setRoute] = useState();
  useEffect(() => {
    setRoute(window.location.pathname);
  }, [setRoute]);

  const faucetAvailable = localProvider && localProvider.connection && targetNetwork.name === "localhost";

  return (
    <div className="App">
      <Navigation
        address={address}
        blockExplorer={blockExplorer}
        localChainId={localChainId}
        mainnetProvider={mainnetProvider}
        price={price}
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
              localProvider={localProvider}
              nftPrice={nftPrice}
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
                <Hints
                  address={address}
                  yourLocalBalance={yourLocalBalance}
                  mainnetProvider={mainnetProvider}
                  price={price}
                />
              </Route>
              <Route path="/subgraph">
                <Subgraph
                  mainnetProvider={mainnetProvider}
                  nftPrice={nftPrice}
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
