import React, { useState } from "react";
import clsx from "clsx";
import { useThemeSwitcher } from "react-css-theme-switcher";
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";

export const useStyles = makeStyles({
  snackbar: {
    width: 225,
    marginBottom: -10,
    marginRight: 75,
    "& > div": {
      width: "inherit",
      minWidth: 160,
    },
  },
  snackbarLight: {
    "& > div": {
      color: "black",
      backgroundColor: "white",
    },
  },
});

export default function CurrentPrice({ nftPrice, isLoaded }) {
  const classes = useStyles();
  const { currentTheme } = useThemeSwitcher();
  const [open, setOpen] = useState(true);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      classes={{ root: clsx(classes.snackbar, { [classes.snackbarLight]: currentTheme === "light" }) }}
      message={
        <>
          <div>Current mint price: {nftPrice} ETH</div>
          <div>*includes ~5000 NFTL tokens</div>
        </>
      }
      onClose={handleClose}
      open={nftPrice && open && isLoaded}
    />
  );
}
