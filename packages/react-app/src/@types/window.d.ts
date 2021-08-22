import { providers, Web3Provider } from 'ethers';
import { IUnityInstanceParameters } from 'react-unity-webgl/distribution/interfaces/unity-instance-parameters';
import { UnityContext } from 'react-unity-webgl';
import { Ethereumish } from 'types/web3';

interface BSC {
  bbcSignTx?: (e) => void;
  bnbSign?: (n, i) => void;
  chainId?: string;
  delegate?: (n) => void;
  enable?: () => void;
  isConnected?: () => void;
  on?: (e, n) => void;
  redelegate?: (n) => void;
  request?: (e) => void;
  requestAccounts?: () => void;
  requestAddresses?: () => void;
  send?: (e, n) => void;
  sendAsync?: (e, n) => void;
  switchNetwork?: (e) => void;
  transfer?: (n) => void;
  undelegate?: (n) => void;
}

interface UnityInstance extends UnityContext {
  SendMessage?: (gameObjectName: string, methodName: string, parameter?: string | number | boolean) => void;
}

declare global {
  interface Window {
    BinanceChain?: BSC;
    createUnityInstance: (
      canvasHtmlElement: HTMLCanvasElement,
      parameters: IUnityInstanceParameters,
      onProgress?: (progression: number) => void,
    ) => Promise<UnityInstance>;
    ethereum?: Ethereumish;
    ReactUnityWebGL: {
      canvas: () => {};
      error: () => {};
      loaded: () => {};
      [eventName: string]: () => {};
    };
    unityInstance?: UnityInstance;
    Web3?: { providers?: { HttpProvider?: Web3Provider; IpcProvider?: providers.IpcProvider } };
  }
}
