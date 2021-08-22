import React, { useState, useEffect } from 'react';
import { Input } from 'antd';
import { utils, constants } from 'ethers';

/*
  ~ What it does? ~

  Displays input field with options to convert between STRING and BYTES32

  ~ How can I use? ~

  <BytesStringInput
    autofocus
    value={"scaffold-eth"}
    placeholder="Enter value..."
    onChange={value => {
      setValue(value);
    }}
  />

  ~ Features ~

  - Provide value={value} to specify initial string
  - Provide placeholder="Enter value..." value for the input
  - Control input change by onChange={value => { setValue(value);}}

*/

interface InputProps {
  autoFocus: boolean;
  onChange: (any) => void;
  placeholder: string;
  value: string;
}

export default function BytesStringInput({
  autoFocus,
  onChange,
  placeholder,
  value: currValue,
}: InputProps): JSX.Element {
  const [mode, setMode] = useState('STRING');
  const [display, setDisplay] = useState('');
  const [value, setValue] = useState(constants.HashZero);

  // current value is the value in bytes32
  const currentValue = typeof currValue !== 'undefined' ? currValue : value;

  const option = title => {
    return (
      <div
        style={{ cursor: 'pointer' }}
        onClick={() => {
          if (mode === 'STRING') {
            setMode('BYTES32');
            if (!utils.isHexString(currentValue)) {
              /* in case user enters invalid bytes32 number, 
                   it considers it as string and converts to bytes32 */
              const changedValue = utils.formatBytes32String(currentValue);
              setDisplay(changedValue);
            } else {
              setDisplay(currentValue);
            }
          } else {
            setMode('STRING');
            if (currentValue && utils.isHexString(currentValue)) {
              setDisplay(utils.parseBytes32String(currentValue));
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

  let addonAfter: JSX.Element;
  if (mode === 'STRING') {
    addonAfter = option('STRING 🔀');
  } else {
    addonAfter = option('BYTES32 🔀');
  }

  useEffect(() => {
    if (!currentValue) {
      setDisplay('');
    }
  }, [currentValue]);

  return (
    <Input
      placeholder={placeholder || `Enter value in ${mode}`}
      autoFocus={autoFocus}
      value={display}
      addonAfter={addonAfter}
      onChange={e => {
        const newValue = e.target.value;
        if (mode === 'STRING') {
          // const ethValue = parseFloat(newValue) / price;
          // setValue(ethValue);
          if (typeof onChange === 'function') {
            onChange(utils.formatBytes32String(newValue));
          }
          setValue(utils.formatBytes32String(newValue));
          setDisplay(newValue);
        } else {
          if (typeof onChange === 'function') {
            onChange(newValue);
          }
          setValue(newValue);
          setDisplay(newValue);
        }
      }}
    />
  );
}
