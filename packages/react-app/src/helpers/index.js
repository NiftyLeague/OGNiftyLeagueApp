import { AddressZero } from "@ethersproject/constants";
import { BigNumber } from "@ethersproject/bignumber";
import { Contract } from "@ethersproject/contracts";
import { ethers } from "ethers";
import { getAddress } from "@ethersproject/address";

export { default as Notifier } from "./Notifier";
export * from "./dateTime";
export * from "./ipfs";

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
export function getSigner(provider, account) {
  return provider.getSigner(account).connectUnchecked();
}

// account is optional
export function getProviderOrSigner(provider, account) {
  return account ? getSigner(provider, account) : provider;
}

export function getContract(address, ABI, provider, account) {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }
  return new Contract(address, ABI, getProviderOrSigner(provider, account));
}
