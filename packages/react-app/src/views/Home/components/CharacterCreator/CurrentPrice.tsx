import React, { useMemo, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

export const useStyles = makeStyles({
  snackbar: {
    width: 285,
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

  const emissionAmount = useMemo(() => {
    if (totalSupply >= 9500) return 20000;
    if (totalSupply >= 8500) return 16000;
    if (totalSupply >= 6500) return 12000;
    if (totalSupply >= 4500) return 8000;
    if (totalSupply >= 2500) return 4000;
    if (totalSupply >= 1000) return 3000;
    return 2000;
  }, [totalSupply]);

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      classes={{ root: classes.snackbar }}
      message={
        <>
          <div>Current mint price: {nftPrice} ETH</div>
          <div>includes {emissionAmount} NFTL tokens</div>
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
