import React, { useState } from 'react';
import { useBalance, useExchangePrice } from 'hooks';
import { Provider } from 'types/web3';
import { useThemeSwitcher } from 'react-css-theme-switcher';
import { useIsWidthDown } from 'hooks/useWidth';

/*
  Displays a balance of given address in ether & dollar
  - Provide address={address} and get balance corresponding to given address
  - Provide provider={userProvider} to access balance on mainnet or any other network (ex. localProvider)
*/

function Balance({
  address,
  provider,
  ignoreConversion,
}: {
  address: string;
  provider: Provider;
  ignoreConversion?: boolean;
}): JSX.Element {
  const { currentTheme } = useThemeSwitcher();
  const mobileView = useIsWidthDown('sm');
  const [dollarMode, setDollarMode] = useState(false);
  const price = useExchangePrice();
  const balance = useBalance(provider, address);
  const floatBalance = parseFloat(balance);
  let displayBalance = floatBalance.toFixed(3);

  if (price && dollarMode) {
    displayBalance = `$${(floatBalance * price).toFixed(2)}`;
  } else {
    displayBalance = `${displayBalance} ${mobileView ? 'Ξ' : 'ETH'}`;
  }

  return (
    <span
      style={{
        verticalAlign: 'middle',
        padding: '0 8px',
        cursor: 'pointer',
        fontSize: mobileView ? 16 : 18,
        color: currentTheme === 'light' ? '#222222' : '#ddd',
      }}
      onClick={() => (ignoreConversion ? () => {} : setDollarMode(!dollarMode))}
    >
      {displayBalance}
    </span>
  );
}

Balance.defaultProps = {
  ignoreConversion: false,
};

export default Balance;
