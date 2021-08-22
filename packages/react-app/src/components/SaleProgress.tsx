import React, { memo } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { LinearProgress, Typography } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import MuiAlert from '@material-ui/lab/Alert';
import { useCachedSubgraph } from 'hooks';
import Tooltip from 'components/Tooltip';

const useStyles = makeStyles(theme => ({
  container: {
    width: '100%',
    '& > * + *': {
      marginTop: 5,
    },
  },
  alert: {
    width: '100%',
    margin: '0 auto',
    fontWeight: 300,
  },
  icon: { height: 35 },
  message: { width: '95%' },
  progressTitle: { color: '#fff', fontWeight: 400, fontSize: 22 },
  progressLabels: { width: '10%', fontSize: 16, fontWeight: 500, textAlign: 'right', marginLeft: -20 },
  progress: { width: '85%', fontSize: 16, marginLeft: 20 },
  extraMarginBottom: {
    '& > div': { marginBottom: 4 },
  },
  extraMarginTop: { marginTop: 11 },
  [theme.breakpoints.down('sm')]: {
    icon: { display: 'none' },
    message: { width: '100%' },
    progressLabels: { width: '15%', fontSize: 14 },
    progress: { width: '75%', fontSize: 14 },
  },
  col1: { width: '10%' },
  col2: { width: '15%' },
  col3: { width: '20%' },
  col4: { width: '20%' },
  col5: { width: '20%' },
  col6: { width: '10%' },
  col7: { width: '5%' },
  borderRight: { borderRight: 'solid white' },
}));

const normalise = (value: number, min: number, max: number) => {
  if (value <= min) return 0;
  if (value >= max) return 100;
  return ((value - min) * 100) / (max - min);
};

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

interface ProgressProps {
  // eslint-disable-next-line react/require-default-props
  className?: string;
  // eslint-disable-next-line react/require-default-props
  handleClose?: (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => void;
}

const SaleProgress = memo(({ className, handleClose }: ProgressProps): JSX.Element => {
  const classes = useStyles();
  const { totalSupply } = useCachedSubgraph();
  const progress = totalSupply ?? 0;
  return (
    <Alert
      icon={
        <Tooltip text="While sale price may increase, additional NFTL tokens are given away at each sale level to each minted DEGEN.">
          <InfoIcon fontSize="inherit" />
        </Tooltip>
      }
      severity="info"
      classes={{ root: clsx(classes.alert, className), message: classes.message, icon: classes.icon }}
      {...(handleClose && { onClose: handleClose })}
    >
      <Typography variant="h6" gutterBottom className={classes.progressTitle}>
        Sale Progress: {`${progress}/9900 NTFs Sold`}
      </Typography>
      <div className="row d-flex flex-nowrap">
        <div className={clsx(classes.progressLabels, classes.extraMarginBottom)}>
          <div className={classes.col0}>NFTs:</div>
          <div className={classes.col0}>NFTL/NFT:</div>
          <div className={clsx(classes.col0, classes.extraMarginTop)}>ETH:</div>
        </div>
        <div className={clsx(classes.progress, classes.extraMarginBottom)}>
          <div className="row d-flex flex-nowrap">
            <div className={classes.col1}>1000</div>
            <div className={classes.col2}>1500</div>
            <div className={classes.col3}>2000</div>
            <div className={classes.col4}>2000</div>
            <div className={classes.col5}>2000</div>
            <div className={classes.col6}>1000</div>
            <div className={classes.col7}>400</div>
          </div>
          <div className="row d-flex flex-nowrap">
            <div className={classes.col1}>1000</div>
            <div className={classes.col2}>2000</div>
            <div className={classes.col3}>4000</div>
            <div className={classes.col4}>8000</div>
            <div className={classes.col5}>12000</div>
            <div className={classes.col6}>16000</div>
            <div className={classes.col7}>20000</div>
          </div>
          <div className={clsx(classes.progressBar, 'row d-flex flex-nowrap')}>
            <LinearProgress
              className={clsx(classes.col1, classes.borderRight)}
              variant="determinate"
              value={normalise(progress, 0, 1000)}
            />
            <LinearProgress
              className={clsx(classes.col2, classes.borderRight)}
              variant="determinate"
              value={normalise(progress, 1000, 2500)}
            />
            <LinearProgress
              className={clsx(classes.col3, classes.borderRight)}
              variant="determinate"
              value={normalise(progress, 2500, 4500)}
            />
            <LinearProgress
              className={clsx(classes.col4, classes.borderRight)}
              variant="determinate"
              value={normalise(progress, 4500, 6500)}
            />
            <LinearProgress
              className={clsx(classes.col5, classes.borderRight)}
              variant="determinate"
              value={normalise(progress, 6500, 8500)}
            />
            <LinearProgress
              className={clsx(classes.col6, classes.borderRight)}
              variant="determinate"
              value={normalise(progress, 8500, 9500)}
            />
            <LinearProgress className={classes.col7} variant="determinate" value={normalise(progress, 9500, 9900)} />
          </div>
          <div className="row d-flex flex-nowrap">
            <div className={classes.col1}>0.025</div>
            <div className={classes.col2}>0.05</div>
            <div className={classes.col3}>0.1</div>
            <div className={classes.col4}>0.2</div>
            <div className={classes.col5}>0.3</div>
            <div className={classes.col6}>0.4</div>
            <div className={classes.col7}>0.5</div>
          </div>
        </div>
      </div>
    </Alert>
  );
});

(SaleProgress as React.ComponentType<ProgressProps>).defaultProps = { className: undefined, handleClose: undefined };

export default SaleProgress;