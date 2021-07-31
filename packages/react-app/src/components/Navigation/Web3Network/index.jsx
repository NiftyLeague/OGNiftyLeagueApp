import React from "react";
import { NETWORK_ICON, NETWORK_LABEL } from "../../../constants/networks";
import NetworkModel from "./NetworkModal";

function Web3Network() {
  const chainId = 1;

  const toggleNetworkModal = () => {};

  if (!chainId) return null;

  return (
    <div
      className="flex items-center rounded bg-dark-900 hover:bg-dark-800 p-0.5 whitespace-nowrap text-sm font-bold cursor-pointer select-none pointer-events-auto"
      onClick={() => toggleNetworkModal()}
    >
      <div className="grid grid-flow-col auto-cols-max items-center rounded-lg bg-dark-1000 text-sm text-secondary py-2 px-3 pointer-events-auto">
        <img
          src={NETWORK_ICON[chainId]}
          alt="Switch Network"
          className="rounded-md mr-2"
          style={{ width: 22, height: 22 }}
        />
        <div className="text-primary">{NETWORK_LABEL[chainId]}</div>
      </div>
      <NetworkModel />
    </div>
  );
}

export default Web3Network;
