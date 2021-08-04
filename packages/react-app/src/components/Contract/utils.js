import React from 'react';
import { utils } from 'ethers';
import Address from '../Address';

const tryToDisplay = thing => {
  if (thing && thing.toNumber) {
    try {
      return thing.toNumber();
    } catch (e) {
      return 'Ξ' + utils.formatUnits(thing, 'ether');
    }
  }
  if (thing && thing.indexOf && thing.indexOf('0x') === 0 && thing.length === 42) {
    return <Address address={thing} fontSize={22} />;
  }
  return JSON.stringify(thing);
};

export default tryToDisplay;
