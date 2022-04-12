import React, { useState } from 'react';
import {
  Typography,
  Modal,
  Card,
  List,
  Box,
  Checkbox,
  FormControlLabel,
  Button,
  DialogContentText,
  TextField,
} from '@mui/material';
import { Rental } from 'types/api';
import makeStyles from '@mui/styles/makeStyles';
import DegenImage from 'components/DegenImage';

const useStyles = makeStyles(() => ({
  modal: {
    width: `100%`,
    height: `100%`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: 'black',
    width: '720px',
  },
  cardRoot: {
    border: '1px solid rgb(66, 66, 66)',
    textAlign: 'center',
    background: '#212121',
    color: 'white',
  },
  cardContent: { padding: 0, paddingBottom: 0, color: '#fff', textAlign: 'center' },
  overview: {
    padding: 16,
  },
  imageContainer: {
    position: 'relative',
    borderRadius: 8,
    overflow: 'hidden',
  },
  white: {
    color: 'white',
  },
  id: {
    color: 'grey',
  },
  multiplier: {
    color: 'yellow',
  },
  rentalCount: {
    color: 'green',
  },
  owner: {
    fontSize: '0.8rem',
  },
  underline: {
    textDecoration: 'underline',
  },
  tokenIdAndName: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  price: {
    color: 'red',
  },
  title: {
    padding: '1rem 0rem',
    borderBottom: '1px grey solid',
  },
  rentButton: {
    flex: 1,
    background: '#443760ba',
    cursor: 'pointer',
  },
  checkbox: {
    color: 'white',
    '&.Mui-checked': {
      color: 'white',
    },
  },
  checkboxLabel: {
    color: '#999',
    fontSize: '0.8rem',
  },
  pointerUnderline: {
    textDecoration: 'underline',
    cursor: 'pointer',
  },
}));

const RentDialog = ({
  open,
  rental,
  onClose,
  onRent,
}: {
  open: boolean,
  rental: Rental | null;
  onClose: () => void;
  onRent: () => void;
}): JSX.Element | null => {
  const classes = useStyles();
  const [agreement, setAgreement] = useState(false);
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState('');
  const [input, setInput] = useState('');

  const handleChangeAgreement = () => {
    setAgreement(!agreement);
  };

  const validateName = (value: string) => {
    setInput(value);
    const regex = new RegExp('^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$');
    const doubleSpaceRegex = new RegExp('^(?!.*[ ]{2})');
    let hasError = true;
    if (!value.length) {
      setHelperText('Please input a name.');
    } else if (value.length > 32) {
      setHelperText('Max character length of 32.');
    } else if (!regex.test(value)) {
      setHelperText('Invalid character. Please only use numbers, letters, or spaces.');
    } else if (value.charAt(0) === ' ' || value.charAt(value.length - 1) === ' ') {
      setHelperText('No leading or trailing spaces.');
    } else if (!doubleSpaceRegex.test(value)) {
      setHelperText('No double spaces allowed.');
    } else {
      hasError = false;
      setHelperText('');
    }
    setError(hasError);
    return hasError;
  };

  if (!rental) {
    return null;
  }

  return (
    <Modal
      className={classes.modal}
      open={open}
      onClose={onClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      {rental ? (
        <Box
          sx={{
            display: 'grid',
            gap: 1,
            gridTemplateColumns: 'repeat(2, 1fr)',
          }}
          className={classes.modalContent}
        >
          <Card className={classes.cardRoot}>
            <div className={classes.imageContainer}>
              <DegenImage tokenId={rental.id} />
            </div>
            <div className={classes.owner}>
              Owned by <span className={classes.underline}>{rental.owner.slice(0, 5)}...</span>
            </div>
            <DialogContentText className={classes.white}>Who are you renting for?</DialogContentText>
            <DialogContentText className={classes.white}>What is your scholars ETH wallet address?</DialogContentText>
            <TextField
              autoFocus
              error={error}
              helperText={helperText}
              fullWidth
              label="New Name"
              margin="dense"
              onChange={({ target: { value } }) => validateName(value)}
              value={input}
            />
            <DialogContentText className={classes.white}>Do you want to rename the degen?</DialogContentText>
            <TextField
              autoFocus
              error={error}
              helperText={helperText}
              fullWidth
              label="New Name"
              margin="dense"
              onChange={({ target: { value } }) => validateName(value)}
              value={input}
            />
            <DialogContentText className={classes.white}>There is a 1000 NFTL fee for renaming</DialogContentText>
          </Card>
          <Box className={classes.cardContent}>
            <Typography className={classes.title} variant="h6">
              Rental Overview
            </Typography>
            <List dense className={classes.overview}>
              <div className={classes.white}>{rental.name || 'No Name DEGEN'}</div>
              <div className={classes.id}>#{rental.id}</div>
              <div className={classes.multiplier}>{rental.multiplier}x Multiplier</div>
              <div className={classes.rentalCount}>{rental.rental_count} Active Rentals</div>
              <div className={classes.price}>{rental.price} NFTL / 1 Week</div>
            </List>
            <FormControlLabel
              control={
                <Checkbox
                  className={classes.checkbox}
                  checked={agreement}
                  onChange={handleChangeAgreement}
                  name="checked"
                  color="primary"
                />
              }
              label={
                <div className={classes.checkboxLabel}>
                  I have read the <span className={classes.pointerUnderline}>terms & conditions</span> regarding
                  disabling a rental
                </div>
              }
            />
            <Button className={classes.rentButton} disabled={!agreement} onClick={onRent}>
              Rent Now
            </Button>
          </Box>
        </Box>
      ) : (
        <div>Error</div>
      )}
    </Modal>
  );
};

export default RentDialog;
