import React, { useState, useContext } from 'react';
import { Card, IconButton } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useThemeSwitcher } from 'react-css-theme-switcher';

import { Rental } from 'types/api';
import DegenImage from 'components/DegenImage';
import Address from 'components/Address';
import ViewTraitsDialog from './ViewTraitsDialog';
import RentDialog from './RentDialog';

const V_PADDING = '10px';
const H_PADDING = '12px';

export const useStyles = makeStyles(() => ({
  cardRoot: {
    background: 'transparent',
    width: 300,
  },
  imageContainer: {
    position: 'relative',
    borderRadius: 8,
    overflow: 'hidden',
  },
  multiplier: {
    top: V_PADDING,
    left: H_PADDING,
  },
  rentalCount: {
    top: V_PADDING,
    right: H_PADDING,
    color: '#50b900',
  },
  favorite: {
    bottom: '20px',
    left: 0,
  },
  owner: {
    bottom: `calc(${V_PADDING} + 20px)`,
    right: H_PADDING,
    display: 'flex',
  },
  tokenId: {
    color: '#979798',
  },
  price: {
    textAlign: 'left',
    color: '#971b1c',
  },
  actions: {
    display: 'flex',
    gap: '8px',
    fontSize: '16px',
  },
  rentButton: {
    color: 'white',
    flex: 1,
    background: '#6400e6',
    cursor: 'pointer',
  },
  viewTraitsButton: {
    flex: 1,
    cursor: 'pointer',
  },
  bottom: {
    margin: 'auto',
    padding: '8px 10px',
    borderRadius: '2px',
    fontSize: '13px',
    gap: '6px',
    display: 'flex',
    flexDirection: 'column',
  },
  flexBetween: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  degenName: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  address: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: 'block',
    whiteSpace: 'nowrap',
    width: 70,
    fontSize: '13px',
    textDecoration: 'underline',
  },
}));

const RentalCard = ({
  rental,
  favs,
  handleToggleFavs,
  refreshMyRentals,
}: {
  rental: Rental;
  favs?: string[];
  handleToggleFavs?: (tokenId: string) => void;
  refreshMyRentals: () => void;
}): JSX.Element => {
  const { id: tokenId, name, multiplier, rental_count, price, owner } = rental;
  const classes = useStyles();
  const [rentDialogOpen, setRentDialogOpen] = useState(false);
  const [viewTraitsDialogOpen, setViewTraitsDialogOpen] = useState(false);
  const { currentTheme } = useThemeSwitcher();
  const darkTheme = currentTheme === 'dark';
  const handleShowRent = () => {
    setViewTraitsDialogOpen(false);
    setRentDialogOpen(true);
  };

  const handleViewTraits = () => {
    setViewTraitsDialogOpen(true);
  };

  return (
    <>
      <Card className={classes.cardRoot}>
        <div className={classes.imageContainer}>
          <DegenImage tokenId={tokenId} />
        </div>
        <div
          className={classes.bottom}
          style={{
            background: darkTheme ? '#191b1f' : '#e7dfe1',
            color: darkTheme ? 'white' : 'black',
          }}
        >
          <div className={classes.flexBetween}>
            <div className={classes.degenName}>{name || 'No Name DEGEN'}</div>
            <div
              className={classes.multiplier}
              style={{
                color: darkTheme ? 'yellow' : '#333300',
              }}
            >
              {multiplier}x Multiplier
            </div>
          </div>
          <div className={classes.flexBetween}>
            <div className={classes.tokenId}>Degen #{tokenId}</div>
            <div className={classes.rentalCount}>{rental_count} Active Rentals</div>
          </div>
          <div className={classes.flexBetween}>
            <div className={classes.price}>{price} NFTL / Week</div>
            <div className={classes.owner}>
              Ownedby&nbsp;&nbsp;
              <a
                className={classes.address}
                style={{ color: currentTheme === 'light' ? '#222222' : '#ddd' }}
                target="_blank"
                href={`https://etherscan.io/address/${owner}`}
                rel="noopener noreferrer"
              >
                {owner}
              </a>
            </div>
          </div>
          <div className={classes.actions}>
            <div className={classes.rentButton} onClick={handleShowRent}>
              Rent Degen
            </div>
            <div
              className={classes.viewTraitsButton}
              onClick={handleViewTraits}
              style={{
                background: darkTheme ? 'white' : 'black',
                color: darkTheme ? 'black' : 'white',
              }}
            >
              View Traits
            </div>
          </div>
        </div>
      </Card>
      {viewTraitsDialogOpen && (
        <ViewTraitsDialog rental={rental} handleClose={() => setViewTraitsDialogOpen(false)} onRent={handleShowRent} />
      )}
      {rentDialogOpen && (
        <RentDialog rental={rental} onClose={() => setRentDialogOpen(false)} refreshMyRentals={refreshMyRentals} />
      )}
    </>
  );
};

RentalCard.defaultProps = {
  favs: [],
  handleToggleFavs: () => {},
};

export default RentalCard;
