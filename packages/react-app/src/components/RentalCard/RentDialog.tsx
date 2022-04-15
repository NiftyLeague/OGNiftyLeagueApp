import React, { useContext, useState, useEffect } from 'react';
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
  rental,
  onClose,
}: {
  rental: Rental | null;
  onClose: () => void;
}): JSX.Element | null => {
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

  const handleRent = async () => {
    try {
      await rent();
    } catch (err: any) {
      setRentError(err.message);
    }
  };

  const showSignModal = async () => {
    if (!msgSent) {
      try {
        console.log('-------before signMsg-------', address, msgSent);
        const authToken = await signMsg();
        if (authToken) {
          void handleRent();
        }
      } catch (err: any) {
        setRentError(err.message);
      }
    }
  };

  const precheckRent = () => {
    const auth = window.localStorage.getItem('authentication-token');
    if (!address) {
      void loadWeb3Modal({ onConnected: showSignModal });
    } else if (!auth) {
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
          <Card className={classes.cardRoot}>
            <div className={classes.imageContainer}>
              <DegenImage tokenId={rental.id} />
            </div>
            <div className={classes.owner}>
              Owned by <span className={classes.underline}>{rental.owner.slice(0, 5)}...</span>
            </div>
            <DialogContentText className={classes.white}>Who are you renting for?</DialogContentText>
            <RadioGroup
              aria-label="anonymous"
              name="anonymous"
              value={rentFor}
              row
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setRentFor(event.target.value);
              }}
            >
              <FormControlLabel value="scholar" control={<Radio />} label="Scholar" />
              <FormControlLabel value="myself" control={<Radio />} label="Myself" />
            </RadioGroup>
            <DialogContentText className={classes.white}>What is your scholars ETH wallet address?</DialogContentText>
            <TextField
              autoFocus
              error={!!addressError}
              helperText={addressError}
              fullWidth
              label="ETH Address"
              placeholder="0xUnknown"
              margin="dense"
              onChange={({ target: { value } }) => {
                setAddressError('');
                setScholarAddress(value);
              }}
              onBlur={({ target: { value } }) => validateAddress(value)}
              value={scholarAddress}
            />
            <FormControlLabel
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
            <DialogContentText className={classes.white}>There is a 1000 NFTL fee for renaming</DialogContentText>
          </Card>
          <Box className={classes.cardContent}>
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
              Rent Now
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
