import React, { useState } from 'react';
import { useBalance, useExchangePrice } from 'hooks';
import { Provider } from 'types/web3';
import { useThemeSwitcher } from 'react-css-theme-switcher';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';

/*
  Displays a balance of given address in ether & dollar
  - Provide address={address} and get balance corresponding to given address
  - Provide provider={userProvider} to access balance on mainnet or any other network (ex. localProvider)
*/

function Balance({
  address,
  provider,
  ignoreConversion,
  width,
}: {
  address: string;
  provider: Provider;
  ignoreConversion?: boolean;
  width: Breakpoint;
}): JSX.Element {
  const { currentTheme } = useThemeSwitcher();
  const mobileView = isWidthDown('sm', width);
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

export default withWidth()(Balance);
