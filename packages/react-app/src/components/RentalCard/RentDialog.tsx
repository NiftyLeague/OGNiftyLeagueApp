import React, { useContext, useState, useEffect, useCallback } from 'react';
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
  RadioGroup,
  Radio,
} from '@mui/material';
import { Rental } from 'types/api';
import makeStyles from '@mui/styles/makeStyles';
import DegenImage from 'components/DegenImage';
import { getErrorForName } from 'utils/name';
import { ethers } from 'ethers';
import TitleAndValue from 'components/TitleAndValue';
import { NetworkContext } from 'NetworkProvider';
import { useSign } from 'utils/sign';
import { useRent, useRental } from 'hooks/rental';
import ErrorModal from 'components/Modal/ErrorModal';

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
    width: '100%',
    maxWidth: '840px',
  },
  left: {
    border: '1px solid rgb(66, 66, 66)',
    textAlign: 'center',
    background: '#212121',
    color: 'white',
    padding: '12px 24px',
  },
  right: { padding: 0, paddingBottom: 0, color: '#fff', textAlign: 'center' },
  overview: {
    padding: 16,
  },
  imageContainer: {
    position: 'relative',
    borderRadius: 8,
    overflow: 'hidden',
    width: '100%',
    maxWidth: '338px',
    margin: 'auto',
  },
  rentForWhom: {
    color: 'white',
    marginTop: '24px',
  },
  rentFor: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rentForItem: {
    '& .MuiFormControlLabel-label': {
      fontSize: '0.875rem',
    },
  },
  textField: {
    marginTop: '8px',
    '& input': {
      padding: '8px 12px',
      fontSize: '14px',
    },
    '& label': {
      fontSize: '14px',
      transform: 'translate(14px, 8px) scale(1)',
      '&.Mui-focused': {
        transform: 'translate(14px, -9px) scale(0.75)',
        fontSize: '16px',
      },
      '&.MuiFormLabel-filled': {
        transform: 'translate(14px, -9px) scale(0.75)',
        fontSize: '16px',
      },
    },
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
  checkboxContainer: {
    marginBottom: 0,
    marginTop: 8,
  },
  checkbox: {
    color: 'white',
    padding: 4,
    '&.Mui-checked': {
      color: 'white',
    },
  },
  checkboxLabel: {
    color: '#999',
    fontSize: '0.8rem',
  },
  renameFeeWarning: {
    fontSize: '0.8rem',
  },
  pointerUnderline: {
    textDecoration: 'underline',
    cursor: 'pointer',
  },
}));

const RentDialog = ({ rental, onClose }: { rental: Rental | null; onClose: () => void }): JSX.Element | null => {
  const classes = useStyles();
  const [agreed, setAgreed] = useState(false);
  const [scholarAddress, setScholarAddress] = useState('');
  const [name, setName] = useState('');
  const [addressError, setAddressError] = useState('');
  const [nameError, setNameError] = useState('');
  const [rentFor, setRentFor] = useState('scholar');
  const [renameEnabled, setRenameEnabled] = useState(false);
  const [useRentalPass, setUseRentalPass] = useState(false);
  const { address, loadWeb3Modal } = useContext(NetworkContext);
  const [signError, setSignError] = useState('');
  const [rentError, setRentError] = useState('');
  const [msgSent, signMsg] = useSign();
  const rent = useRent(rental?.id, 2, rental?.price, scholarAddress);
  const rentalDetails = useRental(rental?.id);

  const handleChangeAgreement = () => {
    setAgreed(!agreed);
  };

  const validateName = (value: string) => {
    setName(value);
    const errorMsg = getErrorForName(value);
    setNameError(errorMsg);
  };

  const validateAddress = (value: string) => {
    if (!ethers.utils.isAddress(value)) {
      setAddressError('Address is invalid!');
    } else if (!value) {
      setAddressError('Please input an address');
    } else {
      setAddressError('');
    }
  };

  const handleRent = useCallback(async () => {
    try {
      await rent();
    } catch (err: any) {
      setRentError(err.message);
    }
  }, [rent]);

  const showSignModal = useCallback(async () => {
    if (!msgSent) {
      try {
        const authToken = await signMsg();
        if (authToken) {
          void handleRent();
        }
      } catch (err: any) {
        setRentError(err.message);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, msgSent]);

  const precheckRent = () => {
    const authToken = window.localStorage.getItem('authentication-token');
    if (!address) {
      void loadWeb3Modal();
    } else if (!authToken) {
      void showSignModal();
    } else {
      void handleRent();
    }
  };

  const handleCloseErrorModal = () => {
    setSignError('');
    setRentError('');
  };

  if (!rental) {
    return null;
  }

  return (
    <Modal
      className={classes.modal}
      open
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
          <Box className={classes.left}>
            <div className={classes.imageContainer}>
              <DegenImage tokenId={rental.id} />
            </div>
            <div className={classes.owner}>
              Owned by <span className={classes.underline}>{rental.owner.slice(0, 5)}...</span>
            </div>
            <DialogContentText className={classes.rentForWhom}>Who are you renting for?</DialogContentText>
            <RadioGroup
              className={classes.rentFor}
              aria-label="anonymous"
              name="anonymous"
              value={rentFor}
              row
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setRentFor(event.target.value);
              }}
            >
              <FormControlLabel
                className={classes.rentForItem}
                value="scholar"
                control={<Radio size="small" />}
                label="Scholar"
              />
              <FormControlLabel
                className={classes.rentForItem}
                value="myself"
                control={<Radio size="small" />}
                label="Myself"
              />
            </RadioGroup>
            <DialogContentText className={classes.white}>What is your scholars ETH wallet address?</DialogContentText>
            <TextField
              margin="none"
              className={classes.textField}
              autoFocus
              error={!!addressError}
              helperText={addressError}
              fullWidth
              label="ETH Address"
              placeholder="0xUnknown"
              onChange={({ target: { value } }) => {
                setAddressError('');
                setScholarAddress(value);
              }}
              onBlur={({ target: { value } }) => validateAddress(value)}
              value={scholarAddress}
            />
            <FormControlLabel
              className={classes.checkboxContainer}
              control={
                <Checkbox
                  className={classes.checkbox}
                  checked={renameEnabled}
                  onChange={() => setRenameEnabled(!renameEnabled)}
                  name="checked"
                  color="primary"
                />
              }
              label={<div className={classes.checkboxLabel}>Rename the degen</div>}
            />
            <TextField
              className={classes.textField}
              autoFocus
              error={!!nameError}
              helperText={nameError}
              fullWidth
              label="New Name"
              placeholder="Enter new Degen name"
              margin="dense"
              onChange={({ target: { value } }) => validateName(value)}
              value={name}
              disabled={!renameEnabled}
            />
            <DialogContentText className={classes.renameFeeWarning}>
              There is a 1000 NFTL fee for renaming
            </DialogContentText>
          </Box>
          <Box className={classes.right}>
            <Typography className={classes.title} variant="h6">
              Rental Overview
            </Typography>
            <List dense className={classes.overview}>
              <TitleAndValue title="Degen Being Rented" value={rental.name || 'No Name DEGEN'} />
              <TitleAndValue title="" value={`Degen #${rental.id}`} />
              <TitleAndValue title="Rental Term" value={`Degen #${rental.multiplier}`} />
              <TitleAndValue title="Scholarship?" value={rentFor === 'scholar' ? 'Yes' : 'No'} />
              <TitleAndValue title="Total Multipliers" value={`${rental.multiplier}x`} />
              <TitleAndValue title="Rental Queue" value={`${3}x`} />
              <TitleAndValue title="First Week Rental Cost" value={`${rental.price} NFTL`} />
              <TitleAndValue title="Renews Daily After Week 1 at" value={`${rental.price_daily} NFTL`} />
              <TitleAndValue title="Rental Posseses Remaining" value="15 of 50" />
              <FormControlLabel
                control={
                  <Checkbox
                    className={classes.checkbox}
                    checked={useRentalPass}
                    onChange={() => setUseRentalPass(!useRentalPass)}
                    name="checked"
                    color="primary"
                  />
                }
                label={<div className={classes.checkboxLabel}>Use a rental pass?</div>}
              />
              <TitleAndValue title="Renaming Fee" value="1000 NFTL" />
              <TitleAndValue title="Total Due Now" value="2200 NFTL" />
            </List>
            <FormControlLabel
              control={
                <Checkbox
                  className={classes.checkbox}
                  checked={agreed}
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
            <Button className={classes.rentButton} disabled={!agreed} onClick={precheckRent}>
              {address ? 'Rent Now' : 'Connect wallet to rent'}
            </Button>
          </Box>
          <ErrorModal content={signError || rentError} onClose={handleCloseErrorModal} />
        </Box>
      ) : (
        <div>Error</div>
      )}
    </Modal>
  );
};

export default RentDialog;
