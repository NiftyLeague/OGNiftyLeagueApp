import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { LinearProgress, Typography } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { useContractReader } from "hooks";
import { NFT_CONTRACT, TOTAL_SUPPLY_INTERVAL } from "../constants";

const useStyles = makeStyles(theme => ({
  container: {
    width: "100%",
    "& > * + *": {
      marginTop: 5,
    },
  },
  alert: {
    width: 1300,
    margin: "0 auto",
  },
  message: { width: "95%" },
  [theme.breakpoints.down(1300)]: {
    alert: { width: "97vw" },
  },
  [theme.breakpoints.down("sm")]: {
    icon: { display: "none" },
    message: { width: "100%" },
  },
  col1: { width: "10%" },
  col2: { width: "15%" },
  col3: { width: "20%" },
  col4: { width: "20%" },
  col5: { width: "20%" },
  col6: { width: "10%" },
  col7: { width: "5%" },
  borderRight: { borderRight: "solid white" },
}));

const normalise = (value, min, max) => {
  if (value <= min) return 0;
  if (value >= max) return 100;
  return ((value - min) * 100) / (max - min);
};

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function SaleProgress({ readContracts, handleClose }) {
  const classes = useStyles();
  const progress = useContractReader(readContracts, NFT_CONTRACT, "totalSupply", null, TOTAL_SUPPLY_INTERVAL);

  return (
    <Alert
      severity="info"
      classes={{ root: classes.alert, message: classes.message, icon: classes.icon }}
      {...(handleClose && { onClose: handleClose })}
    >
      <Typography variant="h6" gutterBottom style={{ color: "#fff" }}>
        Sale Progress:
      </Typography>
      <div className="row d-flex flex-nowrap">
        <div className={classes.col1}>500 NFTs</div>
        <div className={classes.col2}>750 NFTs</div>
        <div className={classes.col3}>1000 NFTs</div>
        <div className={classes.col4}>1000 NFTs</div>
        <div className={classes.col5}>1000 NFTs</div>
        <div className={classes.col6}>500 NFTs</div>
        <div className={classes.col7}>250 NFTs</div>
      </div>
      <div className="row d-flex flex-nowrap">
        <LinearProgress
          className={clsx(classes.col1, classes.borderRight)}
          variant="determinate"
          value={normalise(progress, 0, 500)}
        />
        <LinearProgress
          className={clsx(classes.col2, classes.borderRight)}
          variant="determinate"
          value={normalise(progress, 500, 1250)}
        />
        <LinearProgress
          className={clsx(classes.col3, classes.borderRight)}
          variant="determinate"
          value={normalise(progress, 1250, 2250)}
        />
        <LinearProgress
          className={clsx(classes.col4, classes.borderRight)}
          variant="determinate"
          value={normalise(progress, 2250, 3250)}
        />
        <LinearProgress
          className={clsx(classes.col5, classes.borderRight)}
          variant="determinate"
          value={normalise(progress, 3250, 4250)}
        />
        <LinearProgress
          className={clsx(classes.col6, classes.borderRight)}
          variant="determinate"
          value={normalise(progress, 4250, 4750)}
        />
        <LinearProgress className={classes.col7} variant="determinate" value={normalise(progress, 4750, 4900)} />
      </div>
      <div className="row d-flex flex-nowrap">
        <div className={classes.col1}>0.05 ETH</div>
        <div className={classes.col2}>0.1 ETH</div>
        <div className={classes.col3}>0.25 ETH</div>
        <div className={classes.col4}>0.5 ETH</div>
        <div className={classes.col5}>0.75 ETH</div>
        <div className={classes.col6}>1.0 ETH</div>
        <div className={classes.col7}>1.25 ETH</div>
      </div>
    </Alert>
  );
}
