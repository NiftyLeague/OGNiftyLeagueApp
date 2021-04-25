import React, { useState } from "react";
import { formatEther } from "@ethersproject/units";
import { usePoller } from "eth-hooks";

/*
  ~ What it does? ~

  Displays a balance of given address in ether & dollar

  ~ How can I use? ~

  <Balance
    address={address}
    provider={mainnetProvider}
    price={price}
  />

  ~ If you already have the balance as a bignumber ~
  <Balance
    balance={balance}
    price={price}
  />

  ~ Features ~

  - Provide address={address} and get balance corresponding to given address
  - Provide provider={mainnetProvider} to access balance on mainnet or any other network (ex. localProvider)
  - Provide price={price} of ether and get your balance converted to dollars
*/

export default function Balance({ address, balance: bal, dollarMultiplier, pollTime, price, provider, size, value }) {
  const [dollarMode, setDollarMode] = useState(true);
  const [balance, setBalance] = useState();

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
  }, pollTime || 1999);

  let floatBalance = parseFloat("0.00");

  let usingBalance = balance;

  if (typeof bal !== "undefined") {
    usingBalance = bal;
  }
  if (typeof value !== "undefined") {
    usingBalance = value;
  }

  if (usingBalance) {
    const etherBalance = formatEther(usingBalance);
    parseFloat(etherBalance).toFixed(2);
    floatBalance = parseFloat(etherBalance);
  }

  let displayBalance = floatBalance.toFixed(4);

  const setPrice = price || dollarMultiplier;

  if (setPrice && dollarMode) {
    displayBalance = "$" + (floatBalance * setPrice).toFixed(2);
  }

  return (
    <span
      style={{
        verticalAlign: "middle",
        fontSize: size || 24,
        padding: 8,
        cursor: "pointer",
      }}
      onClick={() => {
        setDollarMode(!dollarMode);
      }}
    >
      {displayBalance}
    </span>
  );
}
