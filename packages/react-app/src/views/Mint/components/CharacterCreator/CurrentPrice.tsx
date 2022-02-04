import React, { useMemo, useState } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export const useStyles = makeStyles({
  snackbar: {
    width: 260,
    marginBottom: -15,
    marginRight: 80,
    '& > div': {
      width: 'inherit',
      minWidth: 160,
    },
  },
});

const CurrentPrice = ({
  nftPrice,
  isLoaded,
  totalSupply,
}: {
  nftPrice?: string;
  isLoaded?: boolean;
  totalSupply: number;
}): JSX.Element => {
  const classes = useStyles();
  const [open, setOpen] = useState(true);

  const handleClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      classes={{ root: classes.snackbar }}
      message={
        <>
          <div style={{ fontSize: 22 }}>Mint price: {nftPrice} ETH</div>
        </>
      }
      onClose={handleClose}
      open={Boolean(nftPrice && open && isLoaded && totalSupply >= 3)}
      action={
        <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
          <CloseIcon fontSize="small" />
        </IconButton>
      }
    />
  );
};

CurrentPrice.defaultProps = { nftPrice: undefined, isLoaded: false };

export default CurrentPrice;
