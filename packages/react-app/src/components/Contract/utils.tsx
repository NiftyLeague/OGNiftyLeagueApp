import React from 'react';
import { BigNumber, utils } from 'ethers';
import Address from '../Address';

const tryToDisplay = (thing: null | string | BigNumber | { [key: string]: unknown }): number | string | JSX.Element => {
  if (thing && (thing as BigNumber).toNumber) {
    try {
      return (thing as BigNumber).toNumber();
    } catch (e) {
      return `Ξ${utils.formatUnits(thing as BigNumber, 'ether')}`;
    }
  }
  if (thing && (thing as string).indexOf && (thing as string).indexOf('0x') === 0 && (thing as string).length === 42) {
    return <Address address={thing as string} />;
  }
  return JSON.stringify(thing);
};

export default tryToDisplay;
