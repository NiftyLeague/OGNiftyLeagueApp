import { ChainId } from "@sushiswap/sdk";
import React from "react";
import { useActiveWeb3React } from "../../../hooks/useActiveWeb3React";
import { NETWORK_ICON, NETWORK_LABEL } from "../../../constants/networks";
import { useModalOpen, useNetworkModalToggle } from "../../../state/application/hooks";
import { ApplicationModal } from "../../../state/application/actions";
import Modal from "../Modal";
import ModalHeader from "./ModalHeader";

const PARAMS = {
  [ChainId.MAINNET]: {
    chainId: "0x1",
    chainName: "Ethereum",
    nativeCurrency: {
      name: "Ethereum",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://mainnet.infura.io/v3"],
    blockExplorerUrls: ["https://etherscan.com"],
  },
  [ChainId.FANTOM]: {
    chainId: "0xfa",
    chainName: "Fantom",
    nativeCurrency: {
      name: "Fantom",
      symbol: "FTM",
      decimals: 18,
    },
    rpcUrls: ["https://rpcapi.fantom.network"],
    blockExplorerUrls: ["https://ftmscan.com"],
  },
  [ChainId.BSC]: {
    chainId: "0x38",
    chainName: "Binance Smart Chain",
    nativeCurrency: {
      name: "Binance Coin",
      symbol: "BNB",
      decimals: 18,
    },
    rpcUrls: ["https://bsc-dataseed.binance.org"],
    blockExplorerUrls: ["https://bscscan.com"],
  },
  [ChainId.MATIC]: {
    chainId: "0x89",
    chainName: "Matic",
    nativeCurrency: {
      name: "Matic",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: [
      // 'https://matic-mainnet.chainstacklabs.com/'
      "https://rpc-mainnet.maticvigil.com",
    ],
    blockExplorerUrls: ["https://explorer-mainnet.maticvigil.com"],
  },
  [ChainId.AVALANCHE]: {
    chainId: "0xA86A",
    chainName: "Avalanche",
    nativeCurrency: {
      name: "Avalanche Token",
      symbol: "AVAX",
      decimals: 18,
    },
    rpcUrls: ["https://api.avax.network/ext/bc/C/rpc"],
    blockExplorerUrls: ["https://explorer.avax.network"],
  },
};

export default function NetworkModal() {
  const { chainId, library, account } = useActiveWeb3React();
  const networkModalOpen = useModalOpen(ApplicationModal.NETWORK);
  const toggleNetworkModal = useNetworkModalToggle();

  if (!chainId) return null;

  return (
    <Modal isOpen={networkModalOpen} onDismiss={toggleNetworkModal}>
      <ModalHeader onClose={toggleNetworkModal} title="Select a Network" />
      <div className="text-lg text-primary mb-6">
        You are currently browsing <span className="font-bold text-pink">SUSHI</span>
        <br /> on the <span className="font-bold text-blue">{NETWORK_LABEL[chainId]}</span> network
      </div>

      <div className="flex flex-col space-y-5 overflow-y-auto">
        {[ChainId.MAINNET, ChainId.FANTOM, ChainId.BSC, ChainId.MATIC, ChainId.AVALANCHE].map((key, i) => {
          if (chainId === key) {
            return (
              <button type="button" key={i} className="bg-gradient-to-r from-blue to-pink w-full rounded p-px">
                <div className="flex items-center h-full w-full bg-dark-1000 rounded p-3">
                  <img src={NETWORK_ICON[key]} alt="Switch Network" className="rounded-md mr-3 w-8 h-8" />
                  <div className="text-primary font-bold">{NETWORK_LABEL[key]}</div>
                </div>
              </button>
            );
          }
          return (
            <button
              type="button"
              key={i}
              onClick={() => {
                toggleNetworkModal();
                const params = PARAMS[key];
                if (library) library.send("wallet_addEthereumChain", [params, account]);
              }}
              className="flex items-center bg-dark-800 hover:bg-dark-700 w-full rounded p-3 cursor-pointer"
            >
              <img src={NETWORK_ICON[key]} alt="Switch Network" className="rounded-md mr-2 w-8 h-8" />
              <div className="text-primary font-bold">{NETWORK_LABEL[key]}</div>
            </button>
          );
        })}
      </div>
    </Modal>
  );
}
