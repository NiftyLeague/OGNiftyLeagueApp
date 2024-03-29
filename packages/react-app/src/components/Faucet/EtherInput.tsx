import React, { useState, useEffect } from 'react';
import { Input } from 'antd';

// small change in useEffect, display currentValue if it's provided by user

/*
  ~ What it does? ~

  Displays input field for ETH/USD amount, with an option to convert between ETH and USD

  ~ How can I use? ~

  <EtherInput
    autofocus
    price={price}
    value=100
    placeholder="Enter amount"
    onChange={value => {
      setAmount(value);
    }}
  />

  ~ Features ~

  - Provide price={price} of ether and easily convert between USD and ETH
  - Provide value={value} to specify initial amount of ether
  - Provide placeholder="Enter amount" value for the input
  - Control input change by onChange={value => { setAmount(value);}}
*/

interface EtherInputProps {
  autoFocus?: boolean;
  onChange: (number) => void;
  placeholder?: string;
  price?: number;
  value?: string;
}

export default function EtherInput({
  autoFocus,
  onChange,
  placeholder,
  price,
  value: currValue,
}: EtherInputProps): JSX.Element {
  const [mode, setMode] = useState(price ? 'USD' : 'ETH');
  const [display, setDisplay] = useState('');
  const [value, setValue] = useState('');

  const currentValue = typeof currValue !== 'undefined' ? currValue : value;

  const option = title => {
    if (!price) return '';
    return (
      <div
        style={{ cursor: 'pointer' }}
        onClick={() => {
          if (mode === 'USD') {
            setMode('ETH');
            setDisplay(currentValue);
          } else {
            setMode('USD');
            if (currentValue) {
              const usdValue = `${(parseFloat(currentValue) * price).toFixed(2)}`;
              setDisplay(usdValue);
            } else {
              setDisplay(currentValue);
            }
          }
        }}
      >
        {title}
      </div>
    );
  };

  let prefix: string;
  let addonAfter: JSX.Element | string;
  if (mode === 'USD') {
    prefix = '$';
    addonAfter = option('USD 🔀');
  } else {
    prefix = 'Ξ';
    addonAfter = option('ETH 🔀');
  }

  useEffect(() => {
    if (!currentValue) {
      setDisplay('');
    }
  }, [currentValue]);

  return (
    <Input
      placeholder={placeholder || `amount in ${mode}`}
      autoFocus={autoFocus}
      prefix={prefix}
      value={display}
      addonAfter={addonAfter}
      onChange={e => {
        const newValue = e.target.value;
        if (mode === 'USD' && price) {
          const possibleNewValue = parseFloat(newValue);
          if (possibleNewValue) {
            const ethValue = possibleNewValue / price;
            setValue(ethValue.toString());
            if (typeof onChange === 'function') onChange(ethValue);
            setDisplay(newValue);
          } else {
            setDisplay(newValue);
          }
        } else {
          setValue(newValue);
          if (typeof onChange === 'function') onChange(newValue);
          setDisplay(newValue);
        }
      }}
    />
  );
}

EtherInput.defaultProps = {
  autoFocus: false,
  placeholder: undefined,
  price: undefined,
  value: undefined,
};
