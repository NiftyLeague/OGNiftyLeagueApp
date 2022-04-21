import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Checkbox, FormControlLabel, Typography, Modal, Card, CardContent, CardHeader, Button } from '@mui/material';
import { Rental } from 'types/api';
import makeStyles from '@mui/styles/makeStyles';
import DegenImage from 'components/DegenImage';
import { DISABLE_RENT_API_URL } from 'constants/characters';
import { Address } from 'components';
import { NetworkContext } from 'NetworkProvider';

const useStyles = makeStyles(() => ({
  modal: {
    width: `100%`,
    height: `100%`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  owner: {
    marginTop: '2rem',
  },
  ownerSpan: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& span': {
      '& span': {
        '& a': {
          color: '#fff !important',
        },
      },
    },
  },
  card: {
    border: '1px solid rgb(66, 66, 66)',
    maxWidth: '600px',
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
  error: { color: 'red' },
}));

const DisableRentModal = ({
  rental,
  handleClose,
  setRental,
}: {
  rental: Rental | undefined;
  handleClose: () => void;
  setRental: (any) => void;
}): JSX.Element => {
  const { targetNetwork, mainnetProvider } = useContext(NetworkContext);
  const [agreement, setAgreement] = React.useState(false);
  const [error, setError] = React.useState();
  const classes = useStyles();
  const handleChangeAgreement = () => {
    setAgreement(!agreement);
  };
  const auth = window.localStorage.getItem('authentication-token');
  const handleButtonClick = async () => {
    if (auth && rental) {
      const res = await fetch(
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        `${DISABLE_RENT_API_URL}${rental.is_active ? 'deactivate' : 'activate'}?degen_id=${rental.id}`,
        {
          method: 'POST',
          headers: { authorizationToken: auth },
        },
      );
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const json = await res.json();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (json.statusCode) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        setError(json.body);
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        setRental(prev => ({
          ...prev,
          is_active: !rental.is_active,
        }));
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
      {rental ? (
        <Card className={classes.card}>
          <CardHeader
            title={
              <Typography variant="h6" style={{ color: 'white' }}>
                {`${rental.is_active ? 'Disable' : 'Enable'} Degen #${rental.id} Rentals`}
              </Typography>
            }
          />
          <span className={classes.error}>{error}</span>
          <CardContent>
            <DegenImage tokenId={rental.id} />
            <div className={classes.owner}>
              {rental.owner ? (
                <>
                  <span className={classes.ownerSpan}>
                    Owned by:
                    <Address
                      address={rental.owner}
                      blockExplorer={targetNetwork.blockExplorer}
                      copyable
                      ensProvider={mainnetProvider}
                    />
                  </span>{' '}
                </>
              ) : (
                <>No owner</>
              )}
            </div>

            <div className={classes.description}>
              {rental.is_active
                ? `
              Disabling your rental allows you to rent your rental to only specific wallets (by using our rent for
              someone system) and avoid the rental price curve. Keep in mind that enabling your degen for rentals incurs
              a 1,000 NFTL fee.`
                : `
              Enabling your rental allows you to rent your rental to any wallets. Keep in mind that enabling your degen for rentals incurs
              a 1,000 NFTL fee.`}
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
                  I have read the{' '}
                  <Link
                    className={classes.pointerUnderline}
                    to="/terms-of-service"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    terms & conditions
                  </Link>{' '}
                  regarding disabling a rental
                </div>
              }
            />
            <Button className={classes.disableButton} disabled={!agreement} onClick={handleButtonClick}>
              {rental.is_active ? `Disable Degen #${rental.id} Rentals` : `Enable Degen #${rental.id} Rentals`}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div>Error</div>
      )}
    </Modal>
  );
};

export default DisableRentModal;
