import React, { lazy, Suspense, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { providers } from 'ethers';
import { NetworkContext } from 'NetworkProvider';
import { ScrollToTop } from './hooks';
import { Contract, Faucet, Navigation, ThemeSwitch } from './components';
import { ContractAddresses, Disclaimer, PrivacyPolicy, ToS } from './views/SiteLinks';
import { DEBUG, NFT_CONTRACT, NFTL_CONTRACT } from './constants';
import './App.css';

const Character = lazy(() => import('./views/Character'));
const Characters = lazy(() => import('./views/Characters'));
const Rentals = lazy(() => import('./views/Rentals'));
const Games = lazy(() => import('./views/Games'));
const Mint = lazy(() => import('./views/Mint'));
const NotFound = lazy(() => import('./views/NotFound'));
const Subgraph = lazy(() => import('./views/Subgraph'));
const GamerProfile = lazy(() => import('./views/GamerProfile'));
const GameVerification = lazy(() => import('./views/GameVerification'));
const LeaderBoards = lazy(() => import('./views/LeaderBoards'));

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
          <Routes>
            <Route path="/" element={<Games />} />
            <Route path="/mint-o-matic" element={<Mint />} />
            <Route path="/games" element={<Games />} />
            <Route path="/degens" element={<Characters />} />
            <Route path="/degens/:tokenId" element={<Character />} />
            {/* <Route path="/rentals" element={<Rentals />} /> */}
            <Route path="/profile" element={<GamerProfile />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<ToS />} />
            <Route path="/contracts" element={<ContractAddresses />} />
            <Route path="/verification" element={<GameVerification />} />
            <Route path="/leader-boards" element={<LeaderBoards />} />
            {DEBUG ? (
              <>
                <Route path="/NFTL" element={<Contract name={NFTL_CONTRACT} />} />
                <Route path="/NFT" element={<Contract name={NFT_CONTRACT} />} />
                <Route path="/storage" element={<Contract name="AllowedColorsStorage" />} />
                <Route path="/merkle-distributor" element={<Contract name="MerkleDistributor" />} />
                <Route path="/subgraph" element={<Subgraph />} />
              </>
            ) : null}
            <Route element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>
      <ThemeSwitch />
    </div>
  );
}
