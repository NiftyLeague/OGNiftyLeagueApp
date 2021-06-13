/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import { JsonRpcProvider } from "@ethersproject/providers";
// eslint-disable-next-line no-unused-vars
import { BigNumber } from "ethers";
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
import { Contract, Faucet, Navigation, ThemeSwitch } from "./components";
import { Notifier } from "./helpers";
import { About, Characters, Games, Hints, Home, Staking, Subgraph } from "./views";
import { DEBUG, NETWORKS, NFT_CONTRACT, INFURA_ID } from "./constants";
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

// 📡 What chain are your contracts deployed to?
// select your target frontend network (localhost, rinkeby, mainnet)
const targetNetwork = NETWORKS[process.env.REACT_APP_NETWORK];

// 🛰 providers
if (DEBUG) console.log("📡 Connecting to Mainnet Ethereum");
// const mainnetProvider = getDefaultProvider("mainnet", { infura: INFURA_ID, etherscan: ETHERSCAN_KEY, quorum: 1 });
// const mainnetProvider = new InfuraProvider("mainnet",INFURA_ID);
//
// attempt to connect to our own scaffold eth rpc and if that fails fall back to infura...
const scaffoldEthProvider = new JsonRpcProvider("https://rpc.scaffoldeth.io:48544");
const mainnetInfura = new JsonRpcProvider("https://mainnet.infura.io/v3/" + INFURA_ID);
// ( ⚠️ Getting "failed to meet quorum" errors? Check your INFURA_ID

// 🏠 Your local provider is usually pointed at your local blockchain
const localProviderUrl = targetNetwork.rpcUrl;
if (DEBUG) console.log("🏠 Connecting to provider:", localProviderUrl);
const localProvider = new JsonRpcProvider(localProviderUrl);

// 🔭 block explorer URL
const { blockExplorer } = targetNetwork;

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
  // const nftPriceBN = useContractReader(readContracts, NFT_CONTRACT, "getNFTPrice", null, 5000);
  // const nftPrice = nftPriceBN && formatEther(nftPriceBN.toString());
  const nftPrice = 0.05;
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

  const [route, setRoute] = useState();
  useEffect(() => {
    setRoute(window.location.pathname);
  }, [setRoute]);

  const faucetAvailable = localProvider && localProvider.connection && targetNetwork.name === "localhost";

  return (
    <div className="App">
      {/* <AppBar /> */}
      <Navigation
        address={address}
        blockExplorer={blockExplorer}
        localChainId={localChainId}
        localProvider={localProvider}
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
        <Switch>
          <Route exact path="/">
            <Home
              nftPrice={nftPrice}
              mainnetProvider={mainnetProvider}
              subgraphUri={subgraphUri}
              tx={tx}
              writeContracts={writeContracts}
            />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/characters">
            <Characters />
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
              <Route path="/NFTs">
                <Contract
                  name={NFT_CONTRACT}
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
                  subgraphUri={subgraphUri}
                  tx={tx}
                  writeContracts={writeContracts}
                  mainnetProvider={mainnetProvider}
                />
              </Route>
            </>
          )}
        </Switch>
      </div>

      <ThemeSwitch />

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
