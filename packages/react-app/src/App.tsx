import React, { lazy, Suspense, useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import { providers } from 'ethers';
import { NetworkContext } from 'NetworkProvider';
import { ScrollToTop } from './hooks';
import { Contract, Faucet, Navigation, ThemeSwitch } from './components';
import { Disclaimer, PrivacyPolicy, ToS } from './views/SiteLinks';
import { DEBUG, NFT_CONTRACT, NFTL_CONTRACT } from './constants';
import './App.css';

const About = lazy(() => import('./views/About'));
const Character = lazy(() => import('./views/Character'));
const Characters = lazy(() => import('./views/Characters'));
const Games = lazy(() => import('./views/Games'));
const Home = lazy(() => import('./views/Home'));
const NotFound = lazy(() => import('./views/NotFound'));
const Subgraph = lazy(() => import('./views/Subgraph'));
const Wallet = lazy(() => import('./views/Wallet'));

// EXTERNAL CONTRACT EXAMPLE:
// If you want to bring in the mainnet DAI contract it would look like:
// const mainnetDAIContract = useExternalContractLoader(mainnetProvider, DAI_ADDRESS, DAI_ABI);

// Then read your DAI balance like:
// const myMainnetDAIBalance = useContractReader({ DAI: mainnetDAIContract }, "DAI", "balanceOf", [
//   "0x34aA3F359A9D614239015126635CE7732c18fDF3",
// ]);

export default function App(): JSX.Element {
  const { localProvider, targetNetwork } = useContext(NetworkContext);
  const localConnection = Boolean(
    targetNetwork.label === 'localhost' && (localProvider as providers.JsonRpcProvider)?.connection,
  );

  return (
    <div className="App">
      <Navigation />
      {localConnection && <Faucet />}
      <div className="AppBody">
        <ScrollToTop />
        <Suspense fallback={<div />}>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/about">
              <About />
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
            <Route exact path="/disclaimer">
              <Disclaimer />
            </Route>
            <Route exact path="/privacy-policy">
              <PrivacyPolicy />
            </Route>
            <Route exact path="/terms-of-service">
              <ToS />
            </Route>
            {DEBUG ? (
              <>
                <Route exact path="/NFTL">
                  <Contract name={NFTL_CONTRACT} />
                </Route>
                <Route exact path="/NFT">
                  <Contract name={NFT_CONTRACT} />
                </Route>
                <Route exact path="/storage">
                  <Contract name="AllowedColorsStorage" />
                </Route>
                <Route exact path="/merkle-distributor">
                  <Contract name="MerkleDistributor" />
                </Route>
                <Route exact path="/subgraph">
                  <Subgraph />
                </Route>
              </>
            ) : null}
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </div>
      <ThemeSwitch />
    </div>
  );
}
