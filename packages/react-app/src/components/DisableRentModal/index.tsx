import React from 'react';
import { Checkbox, FormControlLabel, Typography, Modal, Card, CardContent, CardHeader, Button } from '@mui/material';
import { Rental } from 'types/api';
import { useThemeSwitcher } from 'react-css-theme-switcher';
// eslint-disable-next-line import/no-cycle
import { DegenImage } from 'components/RentalCard';

// modal position
function getModalStyle() {
  const top = 45;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const DisableRentModal = ({
  rental,
  open,
  handleClose,
}: {
  rental: Rental;
  open: boolean;
  handleClose: () => void;
}): JSX.Element => {
  const [modalStyle] = React.useState(getModalStyle);
  const [agreement, setAgreement] = React.useState(false);
  const handleChangeAgreement = () => {
    setAgreement(!agreement);
  };
  const { currentTheme } = useThemeSwitcher();
  console.log(rental);
  const { id: tokenId, name, multiplier, rental_count, price, is_active, owner } = rental;

  return (
    <Modal
      style={modalStyle}
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Card
        style={{
          border: '1px solid rgb(66, 66, 66)',
          textAlign: 'center',
          ...(currentTheme === 'dark' ? { background: '#212121', color: 'white' } : { background: '#c1ccdd' }),
        }}
      >
        <CardHeader title={<Typography variant="h6">Disable Degen #{rental.id} Rentals</Typography>} />
        <CardContent>
          <DegenImage tokenId={tokenId} />
          <div>
            {owner ? (
              <>
                Owned by <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>{owner}</span>
              </>
            ) : (
              <>No owner</>
            )}
          </div>

          <div>
            Disabling your rental allows you to rent your rental to only specific wallets (by using our rent for someone
            system) and avoid the rental price curve. Keep in mind that enabling your degen for rentals incurs a 1,000
            NFTL fee.
          </div>
          <FormControlLabel
            control={
              <Checkbox
                sx={
                  currentTheme === 'dark'
                    ? {
                        color: 'white',
                        '&.Mui-checked': {
                          color: 'white',
                        },
                      }
                    : {
                        color: 'black',
                        '&.Mui-checked': {
                          color: 'black',
                        },
                      }
                }
                checked={agreement}
                onChange={handleChangeAgreement}
                name="checked"
                color="primary"
              />
            }
            label={
              <div>
                I have read the{' '}
                <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>terms & conditions</span> regarding
                disabling a rental
              </div>
            }
          />
          <Button
            sx={{
              color: currentTheme === 'dark' ? 'white' : 'black',
              backgroundColor: '#5f44e5',
            }}
            disabled={!agreement}
          >
            {is_active ? `Disable Degen #${tokenId} Rentals` : `Enable Degen #${tokenId} Rentals`}
          </Button>
        </CardContent>
      </Card>
    </Modal>
  );
};

export default DisableRentModal;
