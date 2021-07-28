import React, { useState } from "react";
import { useThemeSwitcher } from "react-css-theme-switcher";
import copy from "copy-to-clipboard";
import { Tooltip } from "antd";
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import ShareIcon from "@material-ui/icons/Share";
import CloseIcon from "@material-ui/icons/Close";

export const useStyles = makeStyles({
  actionButtons: { color: "#fff", borderRadius: "50%", "&:focus": { outline: "none" } },
  snackbarLight: {
    "& > div": {
      color: "black",
      backgroundColor: "white",
    },
  },
});

const ShareCharacter = ({ tokenId }) => {
  const classes = useStyles();
  const { currentTheme } = useThemeSwitcher();
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  console.log("currentTheme", currentTheme);

  return (
    <>
      <Tooltip title="Share link">
        <IconButton
          aria-label="share"
          className={classes.actionButtons}
          onClick={() => {
            copy(`${window.location.origin}/degens/${tokenId}`);
            setOpen(true);
          }}
        >
          <ShareIcon />
        </IconButton>
      </Tooltip>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        autoHideDuration={4000}
        classes={{ root: currentTheme === "light" ? classes.snackbarLight : null }}
        message="Link copied to clipboard"
        onClose={handleClose}
        open={open}
        action={
          <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </>
  );
};

export default ShareCharacter;
