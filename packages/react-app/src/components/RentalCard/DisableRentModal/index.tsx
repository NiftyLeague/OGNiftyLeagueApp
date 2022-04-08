import React from 'react';
import { Checkbox, FormControlLabel, Typography, Modal, Card, CardContent, CardHeader, Button } from '@mui/material';
import { Rental } from 'types/api';
import makeStyles from '@mui/styles/makeStyles';
// eslint-disable-next-line import/no-cycle
import { DegenImage } from 'components/RentalCard';
import { DISABLE_RENT_API_URL } from 'constants/characters';

const useStyles = makeStyles(() => ({
  modal: {
    width: `100%`,
    height: `100%`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    border: '1px solid rgb(66, 66, 66)',
    maxWidth: '500px',
    margin: 'auto',
    textAlign: 'center',
    background: '#212121',
    color: 'white',
  },
  pointerUnderline: { textDecoration: 'underline', cursor: 'pointer' },
  disableButton: {
    color: 'white',
    backgroundColor: '#5f44e5',
  },
  checkbox: {
    color: 'white',
    '&.Mui-checked': {
      color: 'white',
    },
  },
  checkboxLabel: { color: '#999', fontSize: '0.8rem' },
  description: { margin: '2rem 0rem' },
}));

const DisableRentModal = ({ rental, handleClose }: { rental: Rental; handleClose: () => void }): JSX.Element => {
  const [agreement, setAgreement] = React.useState(false);
  const classes = useStyles();
  const handleChangeAgreement = () => {
    setAgreement(!agreement);
  };
  const { id: tokenId, is_active, owner } = rental;
  const auth = window.localStorage.getItem('authentication-token');

  const handleButtonClick = async () => {
    if (auth) {
      const res = await fetch(`${DISABLE_RENT_API_URL}${is_active ? 'deactivate' : 'activate'}?degen_id=${tokenId}`, {
        method: 'POST',
        headers: { authorizationToken: auth },
      });
      const json = await res.json();
      if (json.statusCode) {
        console.log(json);
      } else {
        handleClose();
      }
    }
  };
  return (
    <Modal
      className={classes.modal}
      open
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Card className={classes.card}>
        <CardHeader
          title={
            <Typography variant="h6" style={{ color: 'white' }}>
              Disable Degen #{rental.id} Rentals
            </Typography>
          }
        />
        <CardContent>
          <DegenImage tokenId={tokenId} />
          <div>
            {owner ? (
              <>
                Owned by <span className={classes.pointerUnderline}>{owner}</span>
              </>
            ) : (
              <>No owner</>
            )}
          </div>

          <div className={classes.description}>
            Disabling your rental allows you to rent your rental to only specific wallets (by using our rent for someone
            system) and avoid the rental price curve. Keep in mind that enabling your degen for rentals incurs a 1,000
            NFTL fee.
          </div>
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
                I have read the <span className={classes.pointerUnderline}>terms & conditions</span> regarding disabling
                a rental
              </div>
            }
          />
          <Button className={classes.disableButton} disabled={!agreement} onClick={handleButtonClick}>
            {is_active ? `Disable Degen #${tokenId} Rentals` : `Enable Degen #${tokenId} Rentals`}
          </Button>
        </CardContent>
      </Card>
    </Modal>
  );
};

export default DisableRentModal;
