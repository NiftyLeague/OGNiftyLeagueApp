import React, { useState } from 'react';
import { useBalance, useExchangePrice } from 'hooks';
import { Provider } from 'types/web3';

/*
  Displays a balance of given address in ether & dollar
  - Provide address={address} and get balance corresponding to given address
  - Provide provider={userProvider} to access balance on mainnet or any other network (ex. localProvider)
*/

export default function Balance({ address, provider }: { address: string; provider: Provider }): JSX.Element {
  const [dollarMode, setDollarMode] = useState(false);
  const price = useExchangePrice();
  const balance = useBalance(provider, address);
  const floatBalance = parseFloat(balance);
  let displayBalance = floatBalance.toFixed(3);

  if (price && dollarMode) {
    displayBalance = `$${(floatBalance * price).toFixed(2)}`;
  } else {
    displayBalance = `${displayBalance} ETH`;
  }

  return (
    <span
      style={{ verticalAlign: 'middle', padding: 8, cursor: 'pointer', fontSize: 18 }}
      onClick={() => setDollarMode(!dollarMode)}
    >
      {displayBalance}
    </span>
  );
}
