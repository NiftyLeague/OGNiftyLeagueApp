import React, { useState } from 'react';
import { useThemeSwitcher } from 'react-css-theme-switcher';
import copy from 'copy-to-clipboard';
import makeStyles from '@mui/styles/makeStyles';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import ShareIcon from '@mui/icons-material/Share';
import CloseIcon from '@mui/icons-material/Close';
import Tooltip from 'components/Tooltip';

export const useStyles = makeStyles({
  actionButtons: { color: '#fff', borderRadius: '50%', '&:focus': { outline: 'none' } },
  snackbarLight: {
    '& > div': {
      color: 'black',
      backgroundColor: 'white',
    },
  },
});

const ShareCharacter = ({ className, tokenId }: { className?: string; tokenId: string }): JSX.Element => {
  const classes = useStyles();
  const { currentTheme } = useThemeSwitcher();
  const [open, setOpen] = useState(false);

  const handleClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };

  return (
    <>
      <Tooltip text="Share link">
        <IconButton
          aria-label="share"
          className={className || classes.actionButtons}
          onClick={() => {
            copy(`${window.location.origin}/degens/${tokenId}`);
            setOpen(true);
          }}
          size="large"
        >
          <ShareIcon />
        </IconButton>
      </Tooltip>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        autoHideDuration={4000}
        classes={{ root: currentTheme === 'light' ? classes.snackbarLight : undefined }}
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

ShareCharacter.defaultProps = { className: undefined };

export default ShareCharacter;
