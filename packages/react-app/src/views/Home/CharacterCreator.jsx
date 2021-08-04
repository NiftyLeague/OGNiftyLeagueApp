import React, { memo, useCallback, useContext, useEffect, useState, useRef } from 'react';
import Unity, { UnityContext } from 'react-unity-webgl';
import { isMobileOnly, withOrientationChange } from 'react-device-detect';
import { utils } from 'ethers';
import { useNFTPrice, useRemovedTraits } from 'hooks';
import { submitTxWithGasEstimate } from 'helpers/Notifier';
import { NetworkContext } from 'NetworkProvider';
import CharacterBGImg from 'assets/images/backgrounds/character_creator.png';
import CurrentPrice from './CurrentPrice';
import { DEBUG, NFT_CONTRACT } from '../../constants';
import { getMintableTraits } from './helpers';
import './home.css';

const unityContext = new UnityContext({
  loaderUrl: 'characterBuild/c1.0.1.loader.js',
  dataUrl: 'characterBuild/c1.0.1.data',
  frameworkUrl: 'characterBuild/c1.0.1.framework.js',
  codeUrl: 'characterBuild/c1.0.1.wasm',
  streamingAssetsUrl: 'StreamingAssets',
  companyName: 'NiftyLeague',
  productName: 'NiftyCharacterCreator',
  productVersion: 'c1.0.1',
});

window.unityInstance = unityContext;
window.unityInstance.SendMessage = unityContext.send;

const WIDTH_SCALE = 280;
const HEIGHT_SCALE = 210;

let DEFAULT_WIDTH = WIDTH_SCALE * 4;
let DEFAULT_HEIGHT = HEIGHT_SCALE * 4;

const getWindowRatio = e => {
  const { innerWidth } = e.currentTarget;
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

window.onload = e => {
  if (isMobileOnly) {
    const { innerWidth } = e.currentTarget;
    DEFAULT_WIDTH = innerWidth > 0 ? innerWidth : window.screen.width;
    DEFAULT_HEIGHT = DEFAULT_WIDTH;
  } else {
    const ratio = getWindowRatio(e);
    if (ratio >= 3) {
      DEFAULT_WIDTH = WIDTH_SCALE * ratio;
      DEFAULT_HEIGHT = HEIGHT_SCALE * ratio;
    } else {
      const { innerWidth } = e.currentTarget;
      DEFAULT_WIDTH = innerWidth * 0.95;
      DEFAULT_HEIGHT = innerWidth * 0.7125;
    }
  }
};

const CharacterCreator = memo(({ isLoaded, isPortrait, setLoaded }) => {
  const { address, readContracts, tx, writeContracts } = useContext(NetworkContext);
  const removedTraitsCallback = useRef();
  const [refreshKey, setRefreshKey] = useState(0);
  const [width, setWidth] = useState(DEFAULT_WIDTH);
  const [height, setHeight] = useState(DEFAULT_HEIGHT);

  const nftPrice = useNFTPrice(readContracts);
  const removedTraits = useRemovedTraits(readContracts);

  useEffect(() => {
    if (removedTraitsCallback.current) {
      if (DEBUG) console.log('======== removedTraits ========', JSON.stringify(removedTraits));
      removedTraitsCallback.current(JSON.stringify(removedTraits));
    }
  }, [removedTraits, refreshKey]);

  const getRemovedTraits = useCallback(e => {
    removedTraitsCallback.current = e.detail.callback;
    setRefreshKey(Math.random());
  }, []);

  useEffect(() => {
    if (isMobileOnly && isLoaded) {
      window.unityInstance.SendMessage('CharacterCreatorLevel', 'UI_SetPortrait', isPortrait ? 'true' : 'false');
    }
  }, [isPortrait, isLoaded]);

  const reportWindowSize = useCallback(e => {
    if (isMobileOnly) {
      const { innerWidth } = e.currentTarget;
      const size = innerWidth > 0 ? innerWidth : window.screen.width;
      setWidth(size);
      setHeight(size);
    } else {
      const ratio = getWindowRatio(e);
      if (ratio >= 3) {
        setWidth(ratio * WIDTH_SCALE);
        setHeight(ratio * HEIGHT_SCALE);
      } else {
        const { innerWidth } = e.currentTarget;
        setWidth(innerWidth * 0.95);
        setHeight(innerWidth * 0.7125);
      }
    }
  }, []);

  const startAuthentication = useCallback(
    e => {
      const result = `true,${address},Vitalik`;
      if (DEBUG) console.log('Authenticating:', result);
      e.detail.callback(result);
    },
    [address],
  );

  const mintCharacter = useCallback(
    async e => {
      const { character, head, clothing, accessories, items } = getMintableTraits(e.detail);
      const value = utils.parseEther(nftPrice);
      const args = [character, head, clothing, accessories, items];
      const nftContract = writeContracts[NFT_CONTRACT];
      submitTxWithGasEstimate(tx, nftContract, 'purchase', args, { value });
      setTimeout(() => e.detail.callback('true'), 4000);
    },
    [writeContracts, tx, nftPrice],
  );

  const onScroll = useCallback(() => {
    const content = document.getElementsByClassName('character-canvas')[0];
    if (content) content.style['pointer-events'] = 'none';
  }, []);

  const onMouse = useCallback(() => {
    const content = document.getElementsByClassName('character-canvas')[0];
    if (content) {
      content.style['pointer-events'] = 'auto';
      content.style.cursor = 'pointer';
    }
  }, []);

  useEffect(() => {
    window.unityInstance.on('canvas', () => {
      setWidth(DEFAULT_WIDTH);
      setHeight(DEFAULT_HEIGHT);
      setTimeout(() => {
        if (isMobileOnly)
          window.unityInstance.SendMessage('CharacterCreatorLevel', 'UI_SetPortrait', isPortrait ? 'true' : 'false');
      }, 2000);
    });
    window.unityInstance.on('loaded', () => setLoaded(true));
    window.unityInstance.on('error', console.error);
    window.addEventListener('resize', reportWindowSize);
    window.addEventListener('StartAuthentication', startAuthentication);
    window.addEventListener('GetRemovedTraits', getRemovedTraits);
    window.addEventListener('SubmitTraits', mintCharacter);
    document.addEventListener('wheel', onScroll, false);
    document.addEventListener('mousemove', onMouse, false);
    return () => {
      window.unityInstance.removeAllEventListeners();
      window.removeEventListener('resize', reportWindowSize);
      window.removeEventListener('StartAuthentication', startAuthentication);
      window.removeEventListener('GetRemovedTraits', getRemovedTraits);
      window.removeEventListener('SubmitTraits', mintCharacter);
      document.removeEventListener('wheel', onScroll, false);
      document.removeEventListener('mousemove', onMouse, false);
    };
  }, [
    getRemovedTraits,
    isPortrait,
    mintCharacter,
    onMouse,
    onScroll,
    reportWindowSize,
    setLoaded,
    startAuthentication,
  ]);

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
          unityContext={window.unityInstance}
          style={{
            width,
            height,
            visibility: isLoaded ? 'visible' : 'hidden',
          }}
        />
      </div>
      <CurrentPrice nftPrice={nftPrice} isLoaded={isLoaded} />
    </>
  );
});

export default withOrientationChange(CharacterCreator);
