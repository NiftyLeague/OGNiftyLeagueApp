import React, { useContext } from "react";
import { Alert } from "antd";
import { NetworkContext } from "NetworkProvider";
import { NETWORK, SUPPORTED_CHAIN_IDS } from "../../constants";

const WrongNetworkAlert = () => {
  const { localChainId, selectedChainId } = useContext(NetworkContext);
  const unsupportedNetwork = selectedChainId && !SUPPORTED_CHAIN_IDS.includes(selectedChainId);
  const networkError = unsupportedNetwork || (localChainId && selectedChainId && localChainId !== selectedChainId);
  return networkError ? (
    <div
      style={{
        zIndex: 2,
        position: "absolute",
        right: 0,
        top: 60,
        padding: 16,
      }}
    >
      <Alert
        message="⚠️ Wrong Network"
        description={
          unsupportedNetwork ? (
            <div>Selected network is not supported.</div>
          ) : (
            <div>
              You have <b>{NETWORK(selectedChainId).name}</b> selected and you need to be on{" "}
              <b>{NETWORK(localChainId).name}</b>.
            </div>
          )
        }
        type="error"
        closable={false}
      />
    </div>
  ) : null;
};

export default WrongNetworkAlert;
