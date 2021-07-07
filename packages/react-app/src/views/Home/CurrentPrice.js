import React, { useState } from "react";
import clsx from "clsx";
import { useThemeSwitcher } from "react-css-theme-switcher";
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";

export const useStyles = makeStyles({
  snackbar: {
    width: 160,
    marginBottom: -20,
    marginRight: 65,
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

export default function CurrentPrice({ nftPrice }) {
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
      message={`Current Mint Price: ${nftPrice} ETH`}
      onClose={handleClose}
      open={nftPrice && open}
    />
  );
}
