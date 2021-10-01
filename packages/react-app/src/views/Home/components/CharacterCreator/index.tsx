import React, { memo, useCallback, useContext, useEffect, useState, useRef } from 'react';
import Unity, { UnityContext } from 'react-unity-webgl';
import { isMobileOnly, isSafari, withOrientationChange } from 'react-device-detect';
import { BigNumber } from 'ethers';
import MetaMaskOnboarding from '@metamask/onboarding';

import { useCachedSubgraph, useRemovedTraits } from 'hooks';
import { submitTxWithGasEstimate } from 'helpers/Notifier';
import { NotifyCallback } from 'types/notify';
import { NetworkContext } from 'NetworkProvider';
import CharacterBGImg from 'assets/images/backgrounds/character-creator-repeat.png';
import CharacterDarkBGImg from 'assets/images/backgrounds/character-creator-repeat-dark.png';
import { DEBUG, DEPLOYER_ADDRESS, NFT_CONTRACT, NETWORK_NAME } from '../../../../constants';
// import CurrentPrice from './CurrentPrice';
import MetaMaskOnboard from './MetaMaskOnboard';
import MetaMaskPrompt from './MetaMaskPrompt';
import SaleLocked from './SaleLocked';
import { getMintableTraits, TraitArray } from './helpers';

const baseUrl = isMobileOnly
  ? (process.env.REACT_APP_UNITY_MOBILE_CREATOR_BASE_URL as string)
  : (process.env.REACT_APP_UNITY_CREATOR_BASE_URL as string);
const buildVersion = isMobileOnly
  ? (process.env.REACT_APP_UNITY_MOBILE_CREATOR_BASE_VERSION as string)
  : (process.env.REACT_APP_UNITY_CREATOR_BASE_VERSION as string);

const creatorContext = new UnityContext({
  loaderUrl: `${baseUrl}/Build/${buildVersion}.loader.js`,
  dataUrl: `${baseUrl}/Build/${buildVersion}.data.br`,
  frameworkUrl: `${baseUrl}/Build/${buildVersion}.framework.js.br`,
  codeUrl: `${baseUrl}/Build/${buildVersion}.wasm.br`,
  streamingAssetsUrl: `${baseUrl}/StreamingAssets`,
  companyName: 'NiftyLeague',
  productName: 'NiftyCreator',
  productVersion: buildVersion,
});

const getMobileSize = (isPortrait: boolean) => {
  const { innerWidth } = window;
  const width = innerWidth > 0 ? innerWidth : window.screen.width;
  let height = width;
  if (!isPortrait) {
    height = width / 1.333333;
  }
  return { width, height };
};

const getBrowserGameSize = () => {
  const { innerWidth, innerHeight } = window;
  const scale = 1.333333;
  const percent = 93;
  let height = Math.floor((innerHeight * percent) / 100);
  let width = height * scale;
  if (width > innerWidth) {
    width = innerWidth;
    height = innerWidth / scale;
  }
  return { width, height };
};

const WIDTH_SCALE = 280;
const HEIGHT_SCALE = 210;
let DEFAULT_WIDTH = WIDTH_SCALE * 3;
let DEFAULT_HEIGHT = HEIGHT_SCALE * 3;

if (isMobileOnly) {
  const { width, height } = getMobileSize(true);
  DEFAULT_WIDTH = width;
  DEFAULT_HEIGHT = height;
} else {
  const { width, height } = getBrowserGameSize();
  DEFAULT_WIDTH = width;
  DEFAULT_HEIGHT = height;
}

const RemovedTraits = ({ callback, refreshKey }: { callback: (string) => void; refreshKey: number }) => {
  const { readContracts } = useContext(NetworkContext);
  const removedTraits = useRemovedTraits(readContracts);

  useEffect(() => {
    if (DEBUG) console.log('Removed Traits:', removedTraits);
    callback(JSON.stringify(removedTraits));
  }, [callback, removedTraits, refreshKey]);

  return null;
};

interface CharacterCreatorContainerProps {
  isLoaded: boolean;
  // eslint-disable-next-line react/require-default-props
  isPortrait?: boolean;
  setLoaded: (boolean) => void;
  setProgress: (number) => void;
}
interface CharacterCreatorProps extends CharacterCreatorContainerProps {
  onMintCharacter: (e: MintEvent) => Promise<void> | void;
  unityContext: UnityContext;
}

type MintEvent = CustomEvent<{ callback: (reset: string) => void; traits: TraitArray }>;

const CharacterCreator = memo(
  ({ isLoaded, isPortrait, onMintCharacter, setLoaded, setProgress, unityContext }: CharacterCreatorProps) => {
    const { targetNetwork } = useContext(NetworkContext);
    const removedTraitsCallback = useRef<null | ((removedTraits: string) => void)>();
    const [width, setWidth] = useState(DEFAULT_WIDTH);
    const [height, setHeight] = useState(DEFAULT_HEIGHT);
    const [refreshKey, setRefreshKey] = useState(0);
    const [isMinting, setIsMinting] = useState(false);

    const getRemovedTraits = useCallback((e: CustomEvent<{ callback: (removedTraits: string) => void }>) => {
      removedTraitsCallback.current = e.detail.callback;
      setRefreshKey(Math.random() + 1);
    }, []);

    useEffect(() => {
      if (isMobileOnly && isLoaded && unityContext?.send) {
        unityContext.send('CharacterCreatorLevel', 'UI_SetPortrait', isPortrait ? 'true' : 'false');
        const safeIsPortrait = isPortrait ?? true;
        const { width: newWidth, height: newHeight } = getMobileSize(safeIsPortrait);
        setWidth(newWidth);
        setHeight(newHeight);
      }
    }, [isPortrait, isLoaded, unityContext]);

    const reportWindowSize = useCallback(
      (e: UIEvent) => {
        if (isMobileOnly) {
          const safeIsPortrait = isPortrait ?? true;
          const { width: newWidth, height: newHeight } = getMobileSize(safeIsPortrait);
          setWidth(newWidth);
          setHeight(newHeight);
        } else {
          const { width: newWidth, height: newHeight } = getBrowserGameSize();
          setWidth(newWidth);
          setHeight(newHeight);
        }
      },
      [isPortrait],
    );

    const getConfiguration = useCallback(
      (e: CustomEvent<{ callback: (network: string) => void }>) => {
        const networkName = NETWORK_NAME[targetNetwork.chainId];
        const version = process.env.REACT_APP_SUBGRAPH_VERSION ?? '';
        setTimeout(() => e.detail.callback(`${networkName},${version}`), 1000);
      },
      [targetNetwork.chainId],
    );

    const toggleIsMinting = useCallback((e: CustomEvent<boolean>) => {
      setIsMinting(e.detail);
    }, []);

    const onScroll = useCallback(() => {
      const content = Array.from(
        document.getElementsByClassName('character-canvas') as HTMLCollectionOf<HTMLElement>,
      )[0];
      if (content) content.style['pointer-events'] = 'none';
    }, []);

    const onMouse = useCallback(() => {
      const content = Array.from(
        document.getElementsByClassName('character-canvas') as HTMLCollectionOf<HTMLElement>,
      )[0];
      if (content) {
        content.style['pointer-events'] = 'auto';
        content.style.cursor = 'pointer';
      }
    }, []);

    useEffect(() => {
      if (unityContext) {
        unityContext.on('canvas', () => {
          setWidth(DEFAULT_WIDTH);
          setHeight(DEFAULT_HEIGHT);
          setTimeout(() => {
            if (isMobileOnly && unityContext?.send)
              unityContext.send('CharacterCreatorLevel', 'UI_SetPortrait', isPortrait ? 'true' : 'false');
          }, 2000);
        });
        unityContext.on('loaded', () => setLoaded(true));
        unityContext.on('error', console.error);
        unityContext.on('progress', p => setProgress(p * 100));
        window.addEventListener('resize', reportWindowSize);
        window.addEventListener('GetConfiguration', getConfiguration);
        window.addEventListener('GetRemovedTraits', getRemovedTraits);
        window.addEventListener('OnMintEffectToggle', toggleIsMinting);
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        window.addEventListener('SubmitTraits', onMintCharacter);
        document.addEventListener('wheel', onScroll, false);
        document.addEventListener('mousemove', onMouse, false);
      }
      return () => {
        if (window.unityInstance) window.unityInstance.removeAllEventListeners();
        if (unityContext) unityContext.removeAllEventListeners();
        window.removeEventListener('resize', reportWindowSize);
        window.removeEventListener('GetConfiguration', getConfiguration);
        window.removeEventListener('GetRemovedTraits', getRemovedTraits);
        window.removeEventListener('OnMintEffectToggle', toggleIsMinting);
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        window.removeEventListener('SubmitTraits', onMintCharacter);
        document.removeEventListener('wheel', onScroll, false);
        document.removeEventListener('mousemove', onMouse, false);
      };
    }, [
      getConfiguration,
      getRemovedTraits,
      isPortrait,
      onMintCharacter,
      onMouse,
      onScroll,
      reportWindowSize,
      setLoaded,
      setProgress,
      toggleIsMinting,
      unityContext,
    ]);

    return (
      <>
        <div
          className="pixelated"
          style={{
            backgroundSize: height / 21,
            backgroundImage: `url(${isMinting ? CharacterDarkBGImg : CharacterBGImg})`,
            backgroundRepeat: 'repeat-x',
          }}
        >
          <Unity
            className="character-canvas"
            unityContext={unityContext}
            style={{
              width,
              height,
              visibility: isLoaded ? 'visible' : 'hidden',
            }}
          />
        </div>
        {removedTraitsCallback.current && refreshKey ? (
          <RemovedTraits callback={removedTraitsCallback.current} refreshKey={refreshKey} />
        ) : null}
      </>
    );
  },
);

const CharacterCreatorContainer = memo(
  ({ isLoaded, isPortrait, setLoaded, setProgress }: CharacterCreatorContainerProps) => {
    const { address, loadWeb3Modal, tx, writeContracts } = useContext(NetworkContext);
    const { nftPrice, totalSupply } = useCachedSubgraph();
    const [saleLocked, setSaleLocked] = useState(false);
    const [onboardUser, setOnboardUser] = useState(false);
    const [promptMetaMask, setPromptMetaMask] = useState(false);

    useEffect(() => {
      const count = totalSupply ?? 0;
      if ((count < 3 && address !== DEPLOYER_ADDRESS) || count >= 9900) {
        setSaleLocked(true);
      } else {
        setSaleLocked(false);
      }
    }, [totalSupply, address]);

    useEffect(() => {
      window.unityInstance = creatorContext;
      // eslint-disable-next-line @typescript-eslint/unbound-method
      window.unityInstance.SendMessage = creatorContext.send;
    }, []);

    const stashMintState = useCallback(
      (e: MintEvent) => {
        setTimeout(() => e.detail.callback('false'), 1000);
        if (!saleLocked) {
          if (MetaMaskOnboarding.isMetaMaskInstalled()) {
            void loadWeb3Modal();
          } else {
            setOnboardUser(true);
          }
        }
      },
      [loadWeb3Modal, saleLocked],
    );

    const mintCharacter = useCallback(
      async (e: MintEvent) => {
        const { character, head, clothing, accessories, items } = getMintableTraits(e.detail);
        const nftContract = writeContracts[NFT_CONTRACT];
        const args = [character, head, clothing, accessories, items];
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        const value = (await nftContract.getNFTPrice()) as BigNumber;
        const minimumGas = BigNumber.from('250000');
        if (isSafari) setPromptMetaMask(true);
        if (isMobileOnly || isSafari) {
          setTimeout(() => {
            e.detail.callback('true');
            setPromptMetaMask(false);
          }, 4000);
        }
        const txCallback: NotifyCallback = mintTx => {
          if (mintTx.status === 'pending') e.detail.callback('true');
        };
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const res = await submitTxWithGasEstimate(tx, nftContract, 'purchase', args, { value }, minimumGas, txCallback);
        if (!res) e.detail.callback('false');
      },
      [writeContracts, tx],
    );

    return (
      <>
        {window.unityInstance && (
          <CharacterCreator
            isLoaded={isLoaded}
            isPortrait={isPortrait}
            onMintCharacter={writeContracts[NFT_CONTRACT] && !saleLocked ? mintCharacter : stashMintState}
            setLoaded={setLoaded}
            setProgress={setProgress}
            unityContext={creatorContext}
          />
        )}
        {/* <CurrentPrice nftPrice={nftPrice} isLoaded={isLoaded} totalSupply={totalSupply ?? 0} /> */}
        <SaleLocked totalSupply={totalSupply ?? 0} saleLocked={saleLocked} />
        <MetaMaskOnboard open={onboardUser} />
        <MetaMaskPrompt open={promptMetaMask} />
      </>
    );
  },
);

export default withOrientationChange(CharacterCreatorContainer);
