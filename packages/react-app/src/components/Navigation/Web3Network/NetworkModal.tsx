/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ChainId } from '@sushiswap/sdk';
import React, { useState } from 'react';
import { UserProvider } from 'types/web3';
import { NETWORK_ICON, NETWORK_LABEL } from '../../../constants/networks';
import Modal from './Modal';
import ModalHeader from './ModalHeader';

const PARAMS = {
  [ChainId.MAINNET]: {
    chainId: '0x1',
    chainName: 'Ethereum',
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: ['https://mainnet.infura.io/v3'],
    blockExplorerUrls: ['https://etherscan.com'],
  },
  [ChainId.FANTOM]: {
    chainId: '0xfa',
    chainName: 'Fantom',
    nativeCurrency: {
      name: 'Fantom',
      symbol: 'FTM',
      decimals: 18,
    },
    rpcUrls: ['https://rpcapi.fantom.network'],
    blockExplorerUrls: ['https://ftmscan.com'],
  },
  [ChainId.BSC]: {
    chainId: '0x38',
    chainName: 'Binance Smart Chain',
    nativeCurrency: {
      name: 'Binance Coin',
      symbol: 'BNB',
      decimals: 18,
    },
    rpcUrls: ['https://bsc-dataseed.binance.org'],
    blockExplorerUrls: ['https://bscscan.com'],
  },
  [ChainId.MATIC]: {
    chainId: '0x89',
    chainName: 'Matic',
    nativeCurrency: {
      name: 'Matic',
      symbol: 'MATIC',
      decimals: 18,
    },
    rpcUrls: [
      // 'https://matic-mainnet.chainstacklabs.com/'
      'https://rpc-mainnet.maticvigil.com',
    ],
    blockExplorerUrls: ['https://explorer-mainnet.maticvigil.com'],
  },
  [ChainId.AVALANCHE]: {
    chainId: '0xA86A',
    chainName: 'Avalanche',
    nativeCurrency: {
      name: 'Avalanche Token',
      symbol: 'AVAX',
      decimals: 18,
    },
    rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
    blockExplorerUrls: ['https://explorer.avax.network'],
  },
};

export default function NetworkModal(): JSX.Element | null {
  const { chainId, library, account }: { chainId: number; library?: UserProvider; account: string } = {
    chainId: 1,
    account: '',
  };
  const [networkModalOpen, toggleNetworkModal] = useState(false);

  if (!chainId) return null;

  return (
    <Modal isOpen={networkModalOpen} onDismiss={() => toggleNetworkModal(false)}>
      {/* @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'undefined... Remove this comment to see the full error message */}
      <ModalHeader onClose={() => toggleNetworkModal(false)} title="Select a Network" />
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
                toggleNetworkModal(false);
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                const params = PARAMS[key];
                if (library) void library.send('wallet_addEthereumChain', [params, account]);
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
