/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import makeStyles from '@mui/styles/makeStyles';
import React, { useState, useEffect } from 'react';
import { Slider } from 'antd';
import { useThemeSwitcher } from 'react-css-theme-switcher';

const useStyles = makeStyles(() => ({
  label: {
    marginTop: '16px',
    textAlign: 'left',
  },
}));

interface RangeSelectDiscreteProps {
  label: string;
  min: number;
  max: number;
  low: number | undefined;
  high: number | undefined;
  setRange: (low: number, high: number) => void;
}

const RangeSelectDiscrete = ({ label, min, max, low, high, setRange }: RangeSelectDiscreteProps): JSX.Element => {
  const classes: any = useStyles();
  const [lowValue, setLowValue] = useState<number>();
  const [highValue, setHighValue] = useState<number>();
  const { currentTheme } = useThemeSwitcher();

  useEffect(() => {
    setLowValue(low);
    setHighValue(high);
  }, [low, high]);
  return (
    <>
      <div style={{ marginTop: '16px', textAlign: 'left', color: currentTheme === 'dark' ? '#121212' : '#fff' }}>
        {label}
      </div>{' '}
      <Slider
        range
        defaultValue={[min, max]}
        value={[lowValue || min, highValue || max]}
        onChange={([l, h]) => {
          setLowValue(l);
          setHighValue(h);
        }}
        onAfterChange={([l, h]) => setRange(l, h)}
      />
    </>
  );
};

export default RangeSelectDiscrete;
