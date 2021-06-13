import { ChainId } from "@sushiswap/sdk";
import { AddressZero } from "@ethersproject/constants";
import { BigNumber } from "@ethersproject/bignumber";
import { Contract } from "@ethersproject/contracts";
import { ethers } from "ethers";
import { getAddress } from "@ethersproject/address";

export { default as Notifier } from "./Notifier";
export { default as classNames } from "./classNames";

/**
 * Returns true if the string value is zero in hex
 * @param hexNumberString
 */
export function isZero(hexNumberString) {
  return /^0x0*$/.test(hexNumberString);
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
  avalanche: (chainName, data, type) => {
    const prefix = `https://cchain.explorer.avax${chainName ? `-${chainName}` : ""}.network`;
    switch (type) {
      case "transaction":
        return `${prefix}/tx/${data}`;
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
  [ChainId.AVALANCHE]: {
    chainName: "",
    builder: builders.avalanche,
  },
  [ChainId.FUJI]: {
    chainName: "test",
    builder: builders.avalanche,
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
