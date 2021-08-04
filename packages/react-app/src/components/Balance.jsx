import React, { useState } from 'react';
import { utils } from 'ethers';
import { usePoller } from 'eth-hooks';
import { useExchangePrice } from 'hooks';
import { ETH_EXCHANGE_PRICE_INTERVAL } from '../constants';

/*
  ~ What it does? ~

  Displays a balance of given address in ether & dollar

  ~ How can I use? ~

  <Balance
    address={address}
    provider={userProvider}
  />

  ~ If you already have the balance as a bignumber ~
  <Balance
    balance={balance}
  />

  ~ Features ~

  - Provide address={address} and get balance corresponding to given address
  - Provide provider={userProvider} to access balance on mainnet or any other network (ex. localProvider)
*/

export default function Balance({ address, balance: bal, dollarMultiplier, pollTime, provider, value }) {
  const [dollarMode, setDollarMode] = useState(false);
  const [balance, setBalance] = useState();
  /* 💵 This hook will get the price of ETH from Sushiswap: */
  const price = useExchangePrice(ETH_EXCHANGE_PRICE_INTERVAL);

  const getBalance = async () => {
    if (address && provider) {
      try {
        const newBalance = await provider.getBalance(address);
        setBalance(newBalance);
      } catch (e) {
        console.log(e);
      }
    }
  };

  usePoller(() => {
    getBalance();
  }, pollTime || 4999);

  let floatBalance = parseFloat('0.00');

  let usingBalance = balance;

  if (typeof bal !== 'undefined') {
    usingBalance = bal;
  }
  if (typeof value !== 'undefined') {
    usingBalance = value;
  }

  if (usingBalance) {
    const etherBalance = utils.formatEther(usingBalance);
    parseFloat(etherBalance).toFixed(2);
    floatBalance = parseFloat(etherBalance);
  }

  let displayBalance = floatBalance.toFixed(3);

  const setPrice = price || dollarMultiplier;

  if (setPrice && dollarMode) {
    displayBalance = '$' + (floatBalance * setPrice).toFixed(2);
  } else {
    displayBalance = `${displayBalance} ETH`;
  }

  return (
    <span
      style={{
        verticalAlign: 'middle',
        padding: 8,
        cursor: 'pointer',
        fontSize: 18,
      }}
      onClick={() => {
        setDollarMode(!dollarMode);
      }}
    >
      {displayBalance}
    </span>
  );
}
