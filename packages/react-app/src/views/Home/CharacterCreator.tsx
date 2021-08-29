import React, { memo, useCallback, useContext, useEffect, useState, useRef } from 'react';
import Unity, { UnityContext } from 'react-unity-webgl';
import { isMobileOnly, withOrientationChange } from 'react-device-detect';
import { BigNumber } from 'ethers';
import { Alert } from 'antd';
import { useCachedSubgraph, useRemovedTraits } from 'hooks';
import { submitTxWithGasEstimate } from 'helpers/Notifier';
import { NetworkContext } from 'NetworkProvider';
import CharacterBGImg from 'assets/images/backgrounds/character_creator.png';
import CurrentPrice from './CurrentPrice';
import { DEBUG, DEPLOYER_ADDRESS, NFT_CONTRACT, NETWORK_NAME } from '../../constants';
import { getMintableTraits, TraitArray } from './helpers';
import './home.css';

const baseUrl = process.env.REACT_APP_UNITY_CREATOR_BASE_URL as string;
const buildVersion = process.env.REACT_APP_UNITY_CREATOR_BASE_VERSION as string;

const unityContext = new UnityContext({
  loaderUrl: `${baseUrl}/Build/${buildVersion}.loader.js`,
  dataUrl: `${baseUrl}/Build/${buildVersion}.data.br`,
  frameworkUrl: `${baseUrl}/Build/${buildVersion}.framework.js.br`,
  codeUrl: `${baseUrl}/Build/${buildVersion}.wasm.br`,
  streamingAssetsUrl: `${baseUrl}/StreamingAssets`,
  companyName: 'NiftyLeague',
  productName: 'NiftyCreator',
  productVersion: buildVersion,
});

window.unityInstance = unityContext;
// eslint-disable-next-line @typescript-eslint/unbound-method
window.unityInstance.SendMessage = unityContext.send;

const WIDTH_SCALE = 280;
const HEIGHT_SCALE = 210;

let DEFAULT_WIDTH = WIDTH_SCALE * 4;
let DEFAULT_HEIGHT = HEIGHT_SCALE * 4;

const getWindowRatio = (e: Event) => {
  const { innerWidth } = e.currentTarget as Window;
  let ratio = 4;
  if (innerWidth < WIDTH_SCALE * 2) {
    ratio = 1;
  } else if (innerWidth < WIDTH_SCALE * 3) {
    ratio = 2;
  } else if (innerWidth < WIDTH_SCALE * 4) {
    ratio = 3;
  }
  return ratio;
};

window.onload = (e: Event) => {
  if (isMobileOnly) {
    const { innerWidth } = e.currentTarget as Window;
    DEFAULT_WIDTH = innerWidth > 0 ? innerWidth : window.screen.width;
    DEFAULT_HEIGHT = DEFAULT_WIDTH;
  } else {
    const ratio = getWindowRatio(e);
    if (ratio >= 3) {
      DEFAULT_WIDTH = WIDTH_SCALE * ratio;
      DEFAULT_HEIGHT = HEIGHT_SCALE * ratio;
    } else {
      const { innerWidth } = e.currentTarget as Window;
      DEFAULT_WIDTH = innerWidth * 0.95;
      DEFAULT_HEIGHT = innerWidth * 0.7125;
    }
  }
};

const SaleLocked = ({ totalSupply, saleLocked }: { totalSupply: number; saleLocked: boolean }): JSX.Element | null => {
  return saleLocked ? (
    <div
      style={{
        zIndex: 2,
        position: 'absolute',
        right: 0,
        top: 60,
        padding: 16,
      }}
    >
      <Alert
        message={totalSupply < 5 ? '⚠️ The sale has not started yet' : '✅ ALL DEGENS HAVE SOLD OUT!'}
        description={
          totalSupply < 5 ? (
            <div>We will officially launch as soon as the 5th NFT is minted!</div>
          ) : (
            <div>Thank you all for the support!</div>
          )
        }
        type="warning"
        closable
      />
    </div>
  ) : null;
};

const RemovedTraits = ({ callback, refreshKey }: { callback: (string) => void; refreshKey: number }) => {
  const { readContracts } = useContext(NetworkContext);
  const removedTraits = useRemovedTraits(readContracts);

  useEffect(() => {
    if (DEBUG) console.log('Removed Traits:', removedTraits);
    callback(JSON.stringify(removedTraits));
  }, [callback, removedTraits, refreshKey]);

  return null;
};

interface CharacterCreatorProps {
  isLoaded: boolean;
  // eslint-disable-next-line react/require-default-props
  isPortrait?: boolean;
  setLoaded: (boolean) => void;
}

type MintEvent = CustomEvent<{ callback: (reset: string) => void; traits: TraitArray }>;

const CharacterCreator = memo(({ isLoaded, isPortrait, setLoaded }: CharacterCreatorProps) => {
  const { address, targetNetwork, tx, writeContracts } = useContext(NetworkContext);
  const removedTraitsCallback = useRef<null | ((removedTraits: string) => void)>();
  const { nftPrice, totalSupply } = useCachedSubgraph();
  const [refreshKey, setRefreshKey] = useState(0);
  const [width, setWidth] = useState(DEFAULT_WIDTH);
  const [height, setHeight] = useState(DEFAULT_HEIGHT);
  const [saleLocked, setSaleLocked] = useState(false);

  useEffect(() => {
    const count = totalSupply ?? 0;
    if ((count < 5 && address !== DEPLOYER_ADDRESS) || count >= 9955) {
      setSaleLocked(true);
    } else {
      setSaleLocked(false);
    }
  }, [totalSupply, address]);

  const getRemovedTraits = useCallback((e: CustomEvent<{ callback: (removedTraits: string) => void }>) => {
    removedTraitsCallback.current = e.detail.callback;
    setRefreshKey(Math.random() + 1);
  }, []);

  useEffect(() => {
    if (isMobileOnly && isLoaded && window.unityInstance?.SendMessage) {
      window.unityInstance.SendMessage('CharacterCreatorLevel', 'UI_SetPortrait', isPortrait ? 'true' : 'false');
    }
  }, [isPortrait, isLoaded]);

  const reportWindowSize = useCallback((e: UIEvent) => {
    if (isMobileOnly) {
      const { innerWidth } = e.currentTarget as Window;
      const size = innerWidth && innerWidth > 0 ? innerWidth : window.screen.width;
      setWidth(size);
      setHeight(size);
    } else {
      const ratio = getWindowRatio(e);
      if (ratio >= 3) {
        setWidth(ratio * WIDTH_SCALE);
        setHeight(ratio * HEIGHT_SCALE);
      } else {
        const { innerWidth } = e.currentTarget as Window;
        setWidth(innerWidth * 0.95);
        setHeight(innerWidth * 0.7125);
      }
    }
  }, []);

  const getConfiguration = useCallback(
    (e: CustomEvent<{ callback: (network: string) => void }>) => {
      const networkName = NETWORK_NAME[targetNetwork.chainId];
      const version = process.env.REACT_APP_SUBGRAPH_VERSION;
      setTimeout(() => e.detail.callback(`${networkName},${version ?? ''}`), 1000);
    },
    [targetNetwork.chainId],
  );

  const stashMintState = useCallback((e: MintEvent) => {
    // TODO: handle connect to MetaMask
    setTimeout(() => e.detail.callback('false'), 1000);
  }, []);

  const mintCharacter = useCallback(
    async (e: MintEvent) => {
      const { character, head, clothing, accessories, items } = getMintableTraits(e.detail);
      const nftContract = writeContracts[NFT_CONTRACT];
      const args = [character, head, clothing, accessories, items];
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      const value = (await nftContract.getNFTPrice()) as BigNumber;
      const extraGasNeeded = true;
      void submitTxWithGasEstimate(tx, nftContract, 'purchase', args, { value }, extraGasNeeded);
      setTimeout(() => e.detail.callback('true'), 4000);
    },
    [writeContracts, tx],
  );

  const onMintCharacter = useCallback(
    (e: MintEvent) => {
      if (writeContracts[NFT_CONTRACT] && !saleLocked) {
        // userProvider connected and contracts initialized
        void mintCharacter(e);
      } else {
        stashMintState(e);
      }
    },
    [mintCharacter, stashMintState, writeContracts, saleLocked],
  );

  const onScroll = useCallback(() => {
    const content = Array.from(document.getElementsByClassName('character-canvas') as HTMLCollectionOf<HTMLElement>)[0];
    if (content) content.style['pointer-events'] = 'none';
  }, []);

  const onMouse = useCallback(() => {
    const content = Array.from(document.getElementsByClassName('character-canvas') as HTMLCollectionOf<HTMLElement>)[0];
    if (content) {
      content.style['pointer-events'] = 'auto';
      content.style.cursor = 'pointer';
    }
  }, []);

  useEffect(() => {
    if (window.unityInstance) {
      window.unityInstance.on('canvas', () => {
        setWidth(DEFAULT_WIDTH);
        setHeight(DEFAULT_HEIGHT);
        setTimeout(() => {
          if (isMobileOnly && window.unityInstance?.SendMessage)
            window.unityInstance.SendMessage('CharacterCreatorLevel', 'UI_SetPortrait', isPortrait ? 'true' : 'false');
        }, 2000);
      });
      window.unityInstance.on('loaded', () => setLoaded(true));
      window.unityInstance.on('error', console.error);
    }
    window.addEventListener('resize', reportWindowSize);
    window.addEventListener('GetConfiguration', getConfiguration);
    window.addEventListener('GetRemovedTraits', getRemovedTraits);
    window.addEventListener('SubmitTraits', onMintCharacter);
    document.addEventListener('wheel', onScroll, false);
    document.addEventListener('mousemove', onMouse, false);
    return () => {
      if (window.unityInstance) window.unityInstance.removeAllEventListeners();
      window.removeEventListener('resize', reportWindowSize);
      window.removeEventListener('GetConfiguration', getConfiguration);
      window.removeEventListener('GetRemovedTraits', getRemovedTraits);
      window.removeEventListener('SubmitTraits', onMintCharacter);
      document.removeEventListener('wheel', onScroll, false);
      document.removeEventListener('mousemove', onMouse, false);
    };
  }, [getConfiguration, getRemovedTraits, isPortrait, onMintCharacter, onMouse, onScroll, reportWindowSize, setLoaded]);

  return (
    <>
      <div
        style={{
          backgroundSize: height / 21,
          backgroundImage: `url(${CharacterBGImg})`,
          backgroundRepeat: 'repeat-x',
        }}
      >
        <Unity
          className="character-canvas"
          unityContext={window.unityInstance as UnityContext}
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
      <CurrentPrice nftPrice={nftPrice} isLoaded={isLoaded} totalSupply={totalSupply ?? 0} />
      <SaleLocked totalSupply={totalSupply ?? 0} saleLocked={saleLocked} />
    </>
  );
});

export default withOrientationChange(CharacterCreator);
