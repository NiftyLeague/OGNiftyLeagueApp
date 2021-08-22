import React, { useState } from 'react';
import { BigNumber, utils } from 'ethers';
import { useTokenBalance } from 'eth-hooks';
import { Contracts } from 'types/web3';

interface TokenBalanceProps {
  address: string;
  balance?: BigNumber;
  contracts: Contracts;
  dollarMultiplier?: number;
  img: string;
  name: string;
}

const TokenBalance = ({
  address,
  balance: bal,
  contracts,
  dollarMultiplier,
  img,
  name,
}: TokenBalanceProps): JSX.Element => {
  const [dollarMode, setDollarMode] = useState(true);

  const tokenContract = contracts && contracts[name];
  const balance = useTokenBalance(tokenContract, address, 1777);

  let floatBalance = parseFloat('0.00');

  let usingBalance = balance;

  if (typeof bal !== 'undefined') {
    usingBalance = bal;
  }

  if (usingBalance) {
    const etherBalance = utils.formatEther(usingBalance);
    parseFloat(etherBalance).toFixed(2);
    floatBalance = parseFloat(etherBalance);
  }

  let displayBalance = floatBalance.toFixed(4);

  if (dollarMultiplier && dollarMode) {
    displayBalance = `$${(floatBalance * dollarMultiplier).toFixed(2)}`;
  }

  return (
    <span
      style={{
        verticalAlign: 'middle',
        fontSize: 24,
        padding: 8,
        cursor: 'pointer',
      }}
      onClick={() => {
        setDollarMode(!dollarMode);
      }}
    >
      {img} {displayBalance}
    </span>
  );
};

TokenBalance.defaultProps = {
  balance: undefined,
  dollarMultiplier: undefined,
};

export default TokenBalance;
