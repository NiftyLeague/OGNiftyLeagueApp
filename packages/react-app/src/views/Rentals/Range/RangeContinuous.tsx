/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useCallback, useEffect, useState } from 'react';
import { TextField, Button } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import classnames from 'classnames';
import { useThemeSwitcher } from 'react-css-theme-switcher';

const useStyles = makeStyles(() => ({
  fields: {
    display: 'flex',
    alignItems: 'center',
  },

  textField: {
    padding: '20px 16px 8px',
    margin: 0,
    '& legend': {
      display: 'none',
    },
    '& input': {
      paddingTop: '8px',
      paddingBottom: '11px',
    },
  },
  to: {
    paddingTop: '6px',
  },
  button: {
    marginTop: '8px',
    padding: '8px 24px',
    display: 'inline-block',
    backgroundColor: 'white',
    border: '1px solid rgb(229, 232, 235)',
    color: 'rgb(82, 92, 101)',
    boxShadow: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  disabledButton: {
    opacity: 0.5,
  },
  error: {
    color: 'rgb(235, 87, 87)',
    fontSize: '13px',
  },
}));

interface RangeContinuousProps {
  label: string;
  low: number | undefined;
  high: number | undefined;
  setRange: (low: number, high: number) => void;
}

const RangeContinuous = ({ label, low, high, setRange }: RangeContinuousProps): JSX.Element => {
  const classes: any = useStyles();
  const [lowValue, setLowValue] = useState<number>();
  const [highValue, setHighValue] = useState<number>();
  const [error, setError] = useState('');
  const { currentTheme } = useThemeSwitcher();

  useEffect(() => {
    setLowValue(low);
    setHighValue(high);
  }, [low, high]);

  const handleApply = useCallback(() => {
    if (!lowValue || !highValue) {
      return;
    }

    if (lowValue > highValue) {
      setError('Min must be less than Max');
      return;
    }

    setRange(lowValue, highValue);
  }, [lowValue, highValue, setRange]);

  return (
    <>
      <div style={{ marginTop: '8px', textAlign: 'left', color: currentTheme === 'dark' ? '#121212' : '#fff' }}>
        {label}
      </div>{' '}
      <div className={classes.fields}>
        <TextField
          sx={{
            padding: '20px 16px 8px',
            margin: 0,
            '& legend': {
              display: 'none',
            },
            '& div': {
              '& input': {
                paddingTop: '8px',
                paddingBottom: '11px',
                color: currentTheme === 'dark' ? '#121212' : '#fff',
              },
              '& fieldset': {
                borderColor: currentTheme === 'dark' ? '#121212' : '#fff',
              },
            },
          }}
          fullWidth
          placeholder="Min"
          onChange={({ target: { value } }) => {
            setError('');
            setLowValue(Number(value));
          }}
          value={lowValue || ''}
          variant="outlined"
          type="number"
          inputProps={{ min: 0 }}
        />
        <div style={{ paddingTop: '6px', color: currentTheme === 'dark' ? '#121212' : '#fff' }}>to</div>
        <TextField
          sx={{
            padding: '20px 16px 8px',
            margin: 0,
            '& legend': {
              display: 'none',
            },
            '& div': {
              '& input': {
                paddingTop: '8px',
                paddingBottom: '11px',
                color: currentTheme === 'dark' ? '#121212' : '#fff',
              },
              '& fieldset': {
                borderColor: currentTheme === 'dark' ? '#121212' : '#fff',
              },
            },
          }}
          fullWidth
          placeholder="Max"
          onChange={({ target: { value } }) => {
            setError('');
            setHighValue(Number(value));
          }}
          value={highValue || ''}
          variant="outlined"
          type="number"
          inputProps={{ min: 0 }}
        />
      </div>
      {error && <div className={classes.error}>{error}</div>}
      <div
        className={classnames(classes.button, { [classes.disabledButton]: !lowValue || !highValue })}
        onClick={handleApply}
      >
        Apply
      </div>
    </>
  );
};

export default RangeContinuous;
