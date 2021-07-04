import React from "react";
import { Alert } from "antd";
import { NETWORK } from "../../constants";

const WrongNetworkAlert = ({ localChainId, selectedChainId }) => (
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
        <div>
          You have <b>{NETWORK(selectedChainId).name}</b> selected and you need to be on{" "}
          <b>{NETWORK(localChainId).name}</b>.
        </div>
      }
      type="error"
      closable={false}
    />
  </div>
);

export default WrongNetworkAlert;
