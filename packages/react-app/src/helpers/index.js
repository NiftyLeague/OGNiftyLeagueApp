import { ChainId, ETHER, JSBI, Percent, ROUTER_ADDRESS, Token } from "@sushiswap/sdk";

import { AddressZero } from "@ethersproject/constants";
import { BigNumber } from "@ethersproject/bignumber";
import { Contract } from "@ethersproject/contracts";
import { abi as IUniswapV2Router02ABI } from "@uniswap/v2-periphery/build/IUniswapV2Router02.json";
import Numeral from "numeral";
import { ethers } from "ethers";
import { getAddress } from "@ethersproject/address";
import Fraction from "../entities/Fraction";

export { default as Notifier } from "./Notifier";
export { default as classNames } from "./classNames";

export const formatFromBalance = (value, decimals = 18) => {
  if (value) {
    return Fraction.from(BigNumber.from(value), BigNumber.from(10).pow(decimals)).toString();
  } else {
    return "";
  }
};
export const formatToBalance = (value, decimals = 18) => {
  if (value) {
    return { value: ethers.utils.parseUnits(Number(value).toFixed(decimals), decimals), decimals };
  } else {
    return { value: BigNumber.from(0), decimals };
  }
};

/**
 * Returns true if the string value is zero in hex
 * @param hexNumberString
 */
export function isZero(hexNumberString) {
  return /^0x0*$/.test(hexNumberString);
}

export function isWETH(value) {
  if (value.toLowerCase() === "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2") {
    return "ETH";
  }
  return value;
}

export const formatBalance = (value, decimals = 18, maxFraction = 0) => {
  const formatted = ethers.utils.formatUnits(value, decimals);
  if (maxFraction > 0) {
    const split = formatted.split(".");
    if (split.length > 1) {
      return split[0] + "." + split[1].substr(0, maxFraction);
    }
  }
  return formatted;
};

export const parseBalance = (value, decimals = 18) => {
  return ethers.utils.parseUnits(value || "0", decimals);
};

export const isEmptyValue = text =>
  ethers.BigNumber.isBigNumber(text)
    ? ethers.BigNumber.from(text).isZero()
    : text === "" || text.replace(/0/g, "").replace(/\./, "") === "";

// returns the checksummed address if the address is valid, otherwise returns false
export function isAddress(value) {
  try {
    return getAddress(value);
  } catch {
    return false;
  }
}
export function isAddressString(value) {
  try {
    return getAddress(value);
  } catch {
    return "";
  }
}

// Vision Formatting
export const toK = num => {
  return Numeral(num).format("0.[00]a");
};

// using a currency library here in case we want to add more in future
const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
});

export const formattedNum = (number, usd = false) => {
  if (Number.isNaN(number) || number === "" || number === undefined) {
    return usd ? "$0.00" : "0";
  }
  const num = parseFloat(number);

  if (num > 500000000) {
    return (usd ? "$" : "") + toK(num.toFixed(0));
  }

  if (num === 0) {
    if (usd) {
      return "$0.00";
    }
    return "0";
  }

  if (num < 0.0001 && num > 0) {
    return usd ? "< $0.0001" : "< 0.0001";
  }

  if (num > 1000) {
    return usd
      ? "$" + Number(parseFloat(String(num)).toFixed(0)).toLocaleString()
      : "" + Number(parseFloat(String(num)).toFixed(0)).toLocaleString();
  }

  if (usd) {
    if (num < 0.1) {
      return "$" + Number(parseFloat(String(num)).toFixed(4));
    } else {
      const usdString = priceFormatter.format(num);
      return "$" + usdString.slice(1, usdString.length);
    }
  }

  return parseFloat(String(num)).toPrecision(4);
};

export function gradientColor(percent) {
  percent = parseFloat(percent);
  if (percent < 100 && percent >= 90) {
    return "#ff3a31";
  }
  if (percent < 90 && percent >= 80) {
    return "#f85815";
  }
  if (percent < 80 && percent >= 70) {
    return "#ed7000";
  }
  if (percent < 70 && percent >= 60) {
    return "#de8400";
  }
  if (percent < 60 && percent >= 50) {
    return "#ce9700";
  }
  if (percent < 50 && percent >= 40) {
    return "#bba700";
  }
  if (percent < 40 && percent >= 30) {
    return "#a6b500";
  }
  if (percent < 30 && percent >= 20) {
    return "#8fc21b";
  }
  if (percent < 20 && percent >= 10) {
    return "#73ce42";
  }
  if (percent < 10 && percent >= 0) {
    return "#4ed864";
  }
  if (percent === 0) {
    return "#4ed864";
  }
  return "#ff3a31";
}

export function gradientColorAsc(percent) {
  percent = parseFloat(percent);
  if (percent < 10 && percent >= 0) {
    return "#ff3a31";
  }
  if (percent < 20 && percent >= 10) {
    return "#f85815";
  }
  if (percent < 30 && percent >= 20) {
    return "#ed7000";
  }
  if (percent < 40 && percent >= 30) {
    return "#de8400";
  }
  if (percent < 50 && percent >= 40) {
    return "#ce9700";
  }
  if (percent < 60 && percent >= 50) {
    return "#bba700";
  }
  if (percent < 70 && percent >= 60) {
    return "#a6b500";
  }
  if (percent < 80 && percent >= 70) {
    return "#8fc21b";
  }
  if (percent < 90 && percent >= 80) {
    return "#73ce42";
  }
  if (percent < 100 && percent >= 90) {
    return "#4ed864";
  }
  if (percent >= 100) {
    return "#4ed864";
  }
  return "#ff3a31";
}

export function formattedPercent(percentString) {
  const percent = parseFloat(percentString);
  if (!percent || percent === 0) {
    return "0%";
  }
  if (percent < 0.0001 && percent > 0) {
    return "< 0.0001%";
  }
  if (percent < 0 && percent > -0.0001) {
    return "< 0.0001%";
  }
  const fixedPercent = percent.toFixed(2);
  if (fixedPercent === "0.00") {
    return "0%";
  }
  if (Number(fixedPercent) > 0) {
    if (Number(fixedPercent) > 100) {
      return `${percent?.toFixed(0).toLocaleString()}%`;
    } else {
      return `${fixedPercent}%`;
    }
  } else {
    return `${fixedPercent}%`;
  }
}

// Multichain Explorer
const builders = {
  etherscan: (chainName, data, type) => {
    const prefix = `https://${chainName ? `${chainName}.` : ""}etherscan.io`;
    switch (type) {
      case "transaction":
        return `${prefix}/tx/${data}`;
      default:
        return `${prefix}/${type}/${data}`;
    }
  },

  fantom: (chainName, data, type) => {
    const prefix = "https://ftmscan.com";
    switch (type) {
      case "transaction":
        return `${prefix}/tx/${data}`;
      default:
        return `${prefix}/${type}/${data}`;
    }
  },

  xdai: (chainName, data, type) => {
    const prefix = `https://blockscout.com/poa/xdai`;
    switch (type) {
      case "transaction":
        return `${prefix}/tx/${data}`;
      case "token":
        return `${prefix}/tokens/${data}`;
      default:
        return `${prefix}/${type}/${data}`;
    }
  },

  bscscan: (chainName, data, type) => {
    const prefix = `https://${chainName ? `${chainName}.` : ""}bscscan.com`;
    switch (type) {
      case "transaction":
        return `${prefix}/tx/${data}`;
      default:
        return `${prefix}/${type}/${data}`;
    }
  },

  matic: (chainName, data, type) => {
    const prefix = `https://explorer-${chainName}.maticvigil.com`;
    switch (type) {
      case "transaction":
        return `${prefix}/tx/${data}`;
      case "token":
        return `${prefix}/tokens/${data}`;
      default:
        return `${prefix}/${type}/${data}`;
    }
  },

  // token is not yet supported for arbitrum
  arbitrum: (chainName, data, type) => {
    const prefix = `https://explorer.offchainlabs.com/#`;
    switch (type) {
      case "transaction":
        return `${prefix}/tx/${data}`;
      case "token":
        return prefix;
      default:
        return `${prefix}/${type}/${data}`;
    }
  },
  moonbase: (chainName, data, type) => {
    const prefix = "https://moonbeam-explorer.netlify.app";
    switch (type) {
      case "transaction":
        return `${prefix}/tx/${data}`;
      case "address":
        return `${prefix}/address/${data}`;
      default:
        return `${prefix}/${type}/${data}`;
    }
  },

  avalanche: (chainName, data, type) => {
    const prefix = `https://cchain.explorer.avax${chainName ? `-${chainName}` : ""}.network`;
    switch (type) {
      case "transaction":
        return `${prefix}/tx/${data}`;
      default:
        return `${prefix}/${type}/${data}`;
    }
  },

  heco: (chainName = "", data, type) => {
    const prefix = `https://${chainName ? `${chainName}.` : ""}hecoinfo.com`;
    switch (type) {
      case "transaction":
        return `${prefix}/tx/${data}`;
      default:
        return `${prefix}/${type}/${data}`;
    }
  },

  harmony: (chainName = "", data, type) => {
    const prefix = "https://explorer.harmony.one/#";
    switch (type) {
      case "transaction":
        return `${prefix}/tx/${data}`;
      default:
        return `${prefix}/${type}/${data}`;
    }
  },

  harmonyTestnet: (chainName = "", data, type) => {
    const prefix = "https://explorer.pops.one/#";
    switch (type) {
      case "transaction":
        return `${prefix}/tx/${data}`;
      default:
        return `${prefix}/${type}/${data}`;
    }
  },
  okex: (chainName = "", data, type) => {
    const prefix = "https://www.oklink.com/okexchain";
    switch (type) {
      case "transaction":
        return `${prefix}/tx/${data}`;
      case "token":
        return `${prefix}/tokenAddr/${data}`;
      default:
        return `${prefix}/${type}/${data}`;
    }
  },
  okexTestnet: (chainName = "", data, type) => {
    const prefix = "https://www.oklink.com/okexchain-test";
    switch (type) {
      case "transaction":
        return `${prefix}/tx/${data}`;
      case "token":
        return `${prefix}/tokenAddr/${data}`;
      default:
        return `${prefix}/${type}/${data}`;
    }
  },
};

const chains = {
  [ChainId.MAINNET]: {
    chainName: "",
    builder: builders.etherscan,
  },
  [ChainId.ROPSTEN]: {
    chainName: "ropsten",
    builder: builders.etherscan,
  },
  [ChainId.RINKEBY]: {
    chainName: "rinkeby",
    builder: builders.etherscan,
  },
  [ChainId.GÖRLI]: {
    chainName: "goerli",
    builder: builders.etherscan,
  },
  [ChainId.KOVAN]: {
    chainName: "kovan",
    builder: builders.etherscan,
  },
  [ChainId.MATIC]: {
    chainName: "mainnet",
    builder: builders.matic,
  },
  [ChainId.MATIC_TESTNET]: {
    chainName: "mumbai",
    builder: builders.matic,
  },
  [ChainId.FANTOM]: {
    chainName: "",
    builder: builders.fantom,
  },
  [ChainId.FANTOM_TESTNET]: {
    chainName: "testnet",
    builder: builders.fantom,
  },
  [ChainId.XDAI]: {
    chainName: "xdai",
    builder: builders.xdai,
  },
  [ChainId.BSC]: {
    chainName: "",
    builder: builders.bscscan,
  },
  [ChainId.BSC_TESTNET]: {
    chainName: "testnet",
    builder: builders.bscscan,
  },
  [ChainId.ARBITRUM]: {
    chainName: "arbitrum",
    builder: builders.arbitrum,
  },
  [ChainId.MOONBASE]: {
    chainName: "",
    builder: builders.moonbase,
  },
  [ChainId.AVALANCHE]: {
    chainName: "",
    builder: builders.avalanche,
  },
  [ChainId.FUJI]: {
    chainName: "test",
    builder: builders.avalanche,
  },
  [ChainId.HECO]: {
    chainName: "",
    builder: builders.heco,
  },
  [ChainId.HECO_TESTNET]: {
    chainName: "testnet",
    builder: builders.heco,
  },
  [ChainId.HARMONY]: {
    chainName: "",
    builder: builders.harmony,
  },
  [ChainId.HARMONY_TESTNET]: {
    chainName: "",
    builder: builders.harmonyTestnet,
  },
  [ChainId.OKEX]: {
    chainName: "",
    builder: builders.okex,
  },
  [ChainId.OKEX_TESTNET]: {
    chainName: "",
    builder: builders.okexTestnet,
  },
};

export function getExplorerLink(chainId, data, type) {
  const chain = chains[chainId];
  return chain.builder(chain.chainName, data, type);
}

// shorten the checksummed version of the input address to have 0x + 4 characters at start and end
export function shortenAddress(address, chars = 4) {
  const parsed = isAddress(address);
  if (!parsed) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }
  return `${parsed.substring(0, chars + 2)}...${parsed.substring(42 - chars)}`;
}

// add 10%
export function calculateGasMargin(value) {
  return value.mul(BigNumber.from(10000).add(BigNumber.from(1000))).div(BigNumber.from(10000));
}

// converts a basis points value to a sdk percent
export function basisPointsToPercent(num) {
  return new Percent(JSBI.BigInt(num), JSBI.BigInt(10000));
}

export function calculateSlippageAmount(value, slippage) {
  if (slippage < 0 || slippage > 10000) {
    throw Error(`Unexpected slippage value: ${slippage}`);
  }
  return [
    JSBI.divide(JSBI.multiply(value.raw, JSBI.BigInt(10000 - slippage)), JSBI.BigInt(10000)),
    JSBI.divide(JSBI.multiply(value.raw, JSBI.BigInt(10000 + slippage)), JSBI.BigInt(10000)),
  ];
}

// account is not optional
export function getSigner(library, account) {
  return library.getSigner(account).connectUnchecked();
}

// account is optional
export function getProviderOrSigner(library, account) {
  return account ? getSigner(library, account) : library;
}

// account is optional
export function getContract(address, ABI, library, account) {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }

  return new Contract(address, ABI, getProviderOrSigner(library, account));
}

export function getRouterAddress(chainId) {
  if (!chainId) {
    throw Error(`Undefined 'chainId' parameter '${chainId}'.`);
  }
  return ROUTER_ADDRESS[chainId];
}

// account is optional
export function getRouterContract(chainId, library, account) {
  return getContract(getRouterAddress(chainId), IUniswapV2Router02ABI, library, account);
}

export function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}

export function isTokenOnList(defaultTokens, currency) {
  if (currency === ETHER) return true;
  return Boolean(currency instanceof Token && defaultTokens[currency.chainId]?.[currency.address]);
}
