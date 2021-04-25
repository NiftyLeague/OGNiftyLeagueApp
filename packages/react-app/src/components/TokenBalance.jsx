import React, { useState } from "react";
import { formatEther } from "@ethersproject/units";
import { useTokenBalance } from "eth-hooks";

export default function TokenBalance({ address, balance: bal, contracts, dollarMultiplier, img, name }) {
  const [dollarMode, setDollarMode] = useState(true);

  const tokenContract = contracts && contracts[name];
  const balance = useTokenBalance(tokenContract, address, 1777);

  let floatBalance = parseFloat("0.00");

  let usingBalance = balance;

  if (typeof bal !== "undefined") {
    usingBalance = bal;
  }

  if (usingBalance) {
    const etherBalance = formatEther(usingBalance);
    parseFloat(etherBalance).toFixed(2);
    floatBalance = parseFloat(etherBalance);
  }

  let displayBalance = floatBalance.toFixed(4);

  if (dollarMultiplier && dollarMode) {
    displayBalance = "$" + (floatBalance * dollarMultiplier).toFixed(2);
  }

  return (
    <span
      style={{
        verticalAlign: "middle",
        fontSize: 24,
        padding: 8,
        cursor: "pointer",
      }}
      onClick={() => {
        setDollarMode(!dollarMode);
      }}
    >
      {img} {displayBalance}
    </span>
  );
}
