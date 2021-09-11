import { ChainId } from '@sushiswap/sdk';
import { BigNumber } from 'ethers';
import { Network, NetworkName } from 'types/web3';

import Avalanche from '../assets/images/networks/avalanche-network.jpg';
import Bsc from '../assets/images/networks/bsc-network.jpg';
import Fantom from '../assets/images/networks/fantom-network.jpg';
import Goerli from '../assets/images/networks/goerli-network.jpg';
import Kovan from '../assets/images/networks/kovan-network.jpg';
import Mainnet from '../assets/images/networks/mainnet-network.jpg';
import Matic from '../assets/images/networks/matic-network.jpg';
import Polygon from '../assets/images/networks/polygon-network.jpg';
import Rinkeby from '../assets/images/networks/rinkeby-network.jpg';
import Ropsten from '../assets/images/networks/ropsten-network.jpg';
import Arbitrum from '../assets/images/networks/arbitrum-network.jpg';

export const NetworkContextName = 'NETWORK';

export const LOCAL_CHAIN_ID = 31337;

export const NETWORK_ICON = {
  [ChainId.MAINNET]: Mainnet,
  [ChainId.ROPSTEN]: Ropsten,
  [ChainId.RINKEBY]: Rinkeby,
  [ChainId.GÖRLI]: Goerli,
  [ChainId.KOVAN]: Kovan,
  [ChainId.FANTOM]: Fantom,
  [ChainId.FANTOM_TESTNET]: Fantom,
  [ChainId.BSC]: Bsc,
  [ChainId.BSC_TESTNET]: Bsc,
  [ChainId.MATIC]: Polygon,
  [ChainId.MATIC_TESTNET]: Matic,
  [ChainId.AVALANCHE]: Avalanche,
  [ChainId.AVALANCHE_TESTNET]: Avalanche,
  [ChainId.ARBITRUM]: Arbitrum,
};

export const NETWORK_LABEL = {
  [LOCAL_CHAIN_ID]: 'localhost',
  [ChainId.MAINNET]: 'Ethereum',
  [ChainId.ROPSTEN]: 'Ropsten',
  [ChainId.RINKEBY]: 'Rinkeby',
  [ChainId.GÖRLI]: 'Görli',
  [ChainId.KOVAN]: 'Kovan',
  [ChainId.FANTOM]: 'Fantom',
  [ChainId.FANTOM_TESTNET]: 'Fantom Testnet',
  [ChainId.MATIC]: 'Polygon (Matic)',
  [ChainId.MATIC_TESTNET]: 'Matic Testnet',
  [ChainId.BSC]: 'BSC',
  [ChainId.BSC_TESTNET]: 'BSC Testnet',
  [ChainId.AVALANCHE]: 'Avalanche',
  [ChainId.AVALANCHE_TESTNET]: 'Avalanche Testnet',
  [ChainId.ARBITRUM]: 'Arbitrum',
};

// needs to match hardhat settings otherwise use rpcUrl for our localProvider initialization
export const NETWORK_NAME: { [chainId: number]: NetworkName } = {
  [LOCAL_CHAIN_ID]: 'localhost',
  [ChainId.MAINNET]: 'mainnet',
  [ChainId.ROPSTEN]: 'ropsten',
  [ChainId.RINKEBY]: 'rinkeby',
  [ChainId.GÖRLI]: 'goerli',
  [ChainId.KOVAN]: 'kovan',
  [ChainId.MATIC]: 'matic',
  [ChainId.MATIC_TESTNET]: 'maticmum',
};

export const RPC = {
  [ChainId.MAINNET]: `https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_PROJECT_ID as string}`,
  [ChainId.ROPSTEN]: `https://ropsten.infura.io/v3/${process.env.REACT_APP_INFURA_PROJECT_ID as string}`,
  [ChainId.RINKEBY]: `https://rinkeby.infura.io/v3/${process.env.REACT_APP_INFURA_PROJECT_ID as string}`,
  [ChainId.GÖRLI]: `https://goerli.infura.io/v3/${process.env.REACT_APP_INFURA_PROJECT_ID as string}`,
  [ChainId.KOVAN]: `https://kovan.infura.io/v3/${process.env.REACT_APP_INFURA_PROJECT_ID as string}`,
  [ChainId.FANTOM]: 'https://rpcapi.fantom.network',
  [ChainId.FANTOM_TESTNET]: 'https://rpc.testnet.fantom.network',
  [ChainId.MATIC]: 'https://rpc-mainnet.maticvigil.com',
  [ChainId.MATIC_TESTNET]: 'https://rpc-mumbai.matic.today',
  [ChainId.BSC]: 'https://bsc-dataseed.binance.org/',
  [ChainId.BSC_TESTNET]: 'https://data-seed-prebsc-2-s3.binance.org:8545',
  [ChainId.AVALANCHE]: 'https://api.avax.network/ext/bc/C/rpc',
  [ChainId.AVALANCHE_TESTNET]: 'https://api.avax-test.network/ext/bc/C/rpc',
};

export const NETWORKS: { [network: string]: Network } = {
  localhost: {
    blockExplorer: '',
    chainId: LOCAL_CHAIN_ID,
    label: NETWORK_LABEL[LOCAL_CHAIN_ID],
    rpcUrl: `http://${window.location.hostname}:8545`,
  },
  mainnet: {
    blockExplorer: 'https://etherscan.io/',
    chainId: ChainId.MAINNET,
    label: NETWORK_LABEL[ChainId.MAINNET],
    name: NETWORK_NAME[ChainId.MAINNET],
    rpcUrl: RPC[ChainId.MAINNET],
  },
  ropsten: {
    blockExplorer: 'https://ropsten.etherscan.io/',
    chainId: ChainId.ROPSTEN,
    faucet: 'https://faucet.ropsten.be/',
    label: NETWORK_LABEL[ChainId.ROPSTEN],
    name: NETWORK_NAME[ChainId.ROPSTEN],
    rpcUrl: RPC[ChainId.ROPSTEN],
  },
  rinkeby: {
    blockExplorer: 'https://rinkeby.etherscan.io/',
    chainId: ChainId.RINKEBY,
    faucet: 'https://faucet.rinkeby.io/',
    label: NETWORK_LABEL[ChainId.RINKEBY],
    name: NETWORK_NAME[ChainId.RINKEBY],
    rpcUrl: RPC[ChainId.RINKEBY],
  },
  goerli: {
    blockExplorer: 'https://goerli.etherscan.io/',
    chainId: ChainId.GÖRLI,
    faucet: 'https://goerli-faucet.slock.it/',
    label: NETWORK_LABEL[ChainId.GÖRLI],
    name: NETWORK_NAME[ChainId.GÖRLI],
    rpcUrl: RPC[ChainId.GÖRLI],
  },
  kovan: {
    blockExplorer: 'https://kovan.etherscan.io/',
    chainId: ChainId.KOVAN,
    faucet: 'https://gitter.im/kovan-testnet/faucet',
    label: NETWORK_LABEL[ChainId.KOVAN],
    name: NETWORK_NAME[ChainId.KOVAN],
    rpcUrl: RPC[ChainId.KOVAN],
  },
  fantom: {
    blockExplorer: 'https://ftmscan.com/',
    chainId: ChainId.FANTOM,
    label: NETWORK_LABEL[ChainId.FANTOM],
    rpcUrl: RPC[ChainId.FANTOM],
  },
  fantomTestnet: {
    blockExplorer: 'https://testnet.ftmscan.com/',
    chainId: ChainId.FANTOM_TESTNET,
    faucet: 'https://faucet.fantom.network/',
    label: NETWORK_LABEL[ChainId.FANTOM_TESTNET],
    rpcUrl: RPC[ChainId.FANTOM_TESTNET],
  },
  matic: {
    blockExplorer: 'https://explorer-mainnet.maticvigil.com/',
    chainId: ChainId.MATIC,
    gasPrice: BigNumber.from(1000000000),
    label: NETWORK_LABEL[ChainId.MATIC],
    name: NETWORK_NAME[ChainId.MATIC],
    rpcUrl: RPC[ChainId.MATIC],
  },
  mumbai: {
    blockExplorer: 'https://mumbai-explorer.matic.today/',
    chainId: ChainId.MATIC_TESTNET,
    faucet: 'https://faucet.matic.network/',
    gasPrice: BigNumber.from(1000000000),
    label: NETWORK_LABEL[ChainId.MATIC_TESTNET],
    name: NETWORK_NAME[ChainId.MATIC_TESTNET],
    rpcUrl: RPC[ChainId.MATIC_TESTNET],
  },
  bsc: {
    blockExplorer: 'https://bscscan.com/',
    chainId: ChainId.BSC,
    label: NETWORK_LABEL[ChainId.BSC],
    rpcUrl: RPC[ChainId.BSC],
  },
  bscTestnet: {
    blockExplorer: 'https://testnet.bscscan.com/',
    chainId: ChainId.BSC_TESTNET,
    faucet: 'https://faucet.ropsten.be/',
    label: NETWORK_LABEL[ChainId.BSC_TESTNET],
    rpcUrl: RPC[ChainId.BSC_TESTNET],
  },
  avalanche: {
    blockExplorer: 'https://explorer.avax.network/',
    chainId: ChainId.AVALANCHE,
    label: NETWORK_LABEL[ChainId.AVALANCHE],
    rpcUrl: RPC[ChainId.AVALANCHE],
  },
  avalancheTestnet: {
    blockExplorer: 'https://cchain.explorer.avax-test.network/',
    chainId: ChainId.AVALANCHE_TESTNET,
    faucet: 'https://faucet.avax-test.network/',
    label: NETWORK_LABEL[ChainId.AVALANCHE_TESTNET],
    rpcUrl: RPC[ChainId.AVALANCHE_TESTNET],
  },
};

export const NETWORK = (chainId: number): Network => {
  return (
    Object.values(NETWORKS).find(n => n.chainId === chainId) || { blockExplorer: '', chainId: 1, label: '', rpcUrl: '' }
  );
};

export const SUPPORTED_CHAIN_IDS: number[] = [
  LOCAL_CHAIN_ID,
  ChainId.MAINNET,
  ChainId.RINKEBY,
  ChainId.ROPSTEN,
  // ChainId.GÖRLI,
  // ChainId.KOVAN,
  // ChainId.FANTOM,
  // ChainId.FANTOM_TESTNET,
  // ChainId.BSC,
  // ChainId.BSC_TESTNET,
];

export const VALID_NOTIFY_NETWORKS: number[] = [
  ChainId.MAINNET,
  ChainId.ROPSTEN,
  ChainId.RINKEBY,
  ChainId.GÖRLI,
  ChainId.KOVAN,
  ChainId.BSC,
  ChainId.XDAI,
];
