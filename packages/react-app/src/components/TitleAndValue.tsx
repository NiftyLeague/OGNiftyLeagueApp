import React, { useState } from 'react';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  title: {},
  value: {},
}));

const TitleAndValue = ({ title, value }: { title: string; value: string }): JSX.Element | null => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.title}>{title}</div>
      <div className={classes.value}>{value}</div>
    </div>
  );
};

export default TitleAndValue;
