/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';
import { Slider } from 'antd';

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
  return (
    <>
      <div className={classes.label}>{label}</div>
      <Slider range defaultValue={[min, max]} value={[low || min, high || max]} onChange={([l, h]) => setRange(l, h)} />
    </>
  );
};

export default RangeSelectDiscrete;
