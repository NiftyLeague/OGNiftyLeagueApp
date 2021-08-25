import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';

export const useStyles = makeStyles({
  snackbar: {
    width: 250,
    marginBottom: -15,
    marginRight: 80,
    '& > div': {
      width: 'inherit',
      minWidth: 160,
    },
  },
});

const CurrentPrice = ({ nftPrice, isLoaded }: { nftPrice?: string; isLoaded?: boolean }): JSX.Element => {
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
          <div>Current mint price: {nftPrice} ETH</div>
          <div>Includes 5000 NFTL tokens</div>
        </>
      }
      onClose={handleClose}
      open={Boolean(nftPrice && open && isLoaded)}
    />
  );
};

CurrentPrice.defaultProps = { nftPrice: undefined, isLoaded: false };

export default CurrentPrice;
