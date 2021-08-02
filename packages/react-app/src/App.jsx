import React, { useContext, useState } from "react";
import { Switch, Route } from "react-router-dom";
import { NetworkContext } from "NetworkProvider";
import { ScrollToTop } from "./hooks";
import { Contract, Faucet, Navigation, ThemeSwitch } from "./components";
import { About, Character, Characters, Games, Hints, Home, NotFound, Staking, Subgraph, Wallet } from "./views";
import { DEBUG, NFT_CONTRACT, NFTL_CONTRACT } from "./constants";
import "./App.css";

// EXTERNAL CONTRACT EXAMPLE:
// If you want to bring in the mainnet DAI contract it would look like:
// const mainnetDAIContract = useExternalContractLoader(mainnetProvider, DAI_ADDRESS, DAI_ABI);

// Then read your DAI balance like:
// const myMainnetDAIBalance = useContractReader({ DAI: mainnetDAIContract }, "DAI", "balanceOf", [
//   "0x34aA3F359A9D614239015126635CE7732c18fDF3",
// ]);

export default function App({ subgraphUri }) {
  const [route, setRoute] = useState(window.location.pathname);
  const { localProvider, targetNetwork } = useContext(NetworkContext);
  const localConnection = localProvider?.connection && targetNetwork.label === "localhost";

  return (
    <div className="App">
      <Navigation route={route} setRoute={setRoute} />
      {localConnection && <Faucet />}
      <div className="AppBody">
        <ScrollToTop />
        <Switch>
          <Route exact path="/">
            <Home setRoute={setRoute} />
          </Route>
          <Route exact path="/about">
            <About setRoute={setRoute} />
          </Route>
          <Route exact path="/games">
            <Games />
          </Route>
          <Route exact path="/degens">
            <Characters />
          </Route>
          <Route exact path="/degens/:tokenId">
            <Character />
          </Route>
          <Route exact path="/wallet">
            <Wallet />
          </Route>
          <Route exact path="/staking">
            <Staking />
          </Route>
          {DEBUG && localConnection ? (
            <>
              <Route path="/NFTL">
                <Contract name={NFTL_CONTRACT} />
              </Route>
              <Route path="/NFT">
                <Contract name={NFT_CONTRACT} />
              </Route>
              <Route path="/storage">
                <Contract name="AllowedColorsStorage" />
              </Route>
              <Route path="/merkle-distributor">
                <Contract name="MerkleDistributor" />
              </Route>
              <Route path="/hints">
                <Hints />
              </Route>
              <Route path="/subgraph">
                <Subgraph subgraphUri={subgraphUri} />
              </Route>
            </>
          ) : null}
          <Route component={NotFound} />
        </Switch>
      </div>
      <ThemeSwitch />
    </div>
  );
}
