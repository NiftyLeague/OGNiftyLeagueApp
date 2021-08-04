import { useMemo } from "react";
import { providers } from "ethers";
import BurnerProvider from "burner-provider";
import { INFURA_ID, DEBUG } from "../constants";

/*
  ~ What it does? ~

  Gets user provider

  ~ How can I use? ~

  const userProvider = useUserProvider(injectedProvider, localProvider);

  ~ Features ~

  - Specify the injected provider from Metamask
  - Specify the local provider
  - Usage examples:
    const address = useUserAddress(userProvider);
    const tx = Notifier(userProvider, targetNetwork)
*/

const useUserProvider = (injectedProvider, localProvider) =>
  useMemo(() => {
    if (injectedProvider) {
      if (DEBUG) console.log("🦊 Using injected provider");
      return injectedProvider;
    }
    if (!localProvider) return undefined;

    const burnerConfig = {};

    if (window.location.pathname?.indexOf("/pk") >= 0) {
      const incomingPK = window.location.hash.replace("#", "");
      let rawPK;
      if (incomingPK.length === 64 || incomingPK.length === 66) {
        if (DEBUG) console.log("🔑 Incoming Private Key...");
        rawPK = incomingPK;
        burnerConfig.privateKey = rawPK;
        window.history.pushState({}, "", "/");
        const currentPrivateKey = window.localStorage.getItem("metaPrivateKey");
        if (currentPrivateKey && currentPrivateKey !== rawPK) {
          window.localStorage.setItem("metaPrivateKey_backup" + Date.now(), currentPrivateKey);
        }
        window.localStorage.setItem("metaPrivateKey", rawPK);
      }
    }

    if (localProvider.connection && localProvider.connection.url) {
      burnerConfig.rpcUrl = localProvider.connection.url;
      return new providers.Web3Provider(new BurnerProvider(burnerConfig));
    }
    const networkName = localProvider._network?.name;
    burnerConfig.rpcUrl = `https://${networkName || "mainnet"}.infura.io/v3/${INFURA_ID}`;
    return new providers.Web3Provider(new BurnerProvider(burnerConfig));
  }, [injectedProvider, localProvider]);

export default useUserProvider;