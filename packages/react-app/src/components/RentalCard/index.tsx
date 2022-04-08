import React, { useContext, useState } from 'react';
import clsx from 'clsx';
import { Card, CardActions, CardMedia, IconButton } from '@mui/material';
import { Image } from 'antd';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import makeStyles from '@mui/styles/makeStyles';
import Tooltip from 'components/Tooltip';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { NetworkContext } from 'NetworkProvider';
import UnavailableImg from 'assets/images/unavailable-image.png';
import LoadingGif from 'assets/gifs/loading.gif';
import useBackgroundType from 'hooks/useBackgroundType';

import { Rental } from 'types/api';
import { DEGEN_BASE_IMAGE_URL } from '../../constants/characters';

const V_PADDING = '10px';
const H_PADDING = '12px';

export const useStyles = makeStyles(() => ({
  cardRoot: {
    background: 'transparent',
  },
  media: { height: 338, display: 'flex', alignItems: 'center', justifyContent: 'center' },
  loading: { width: 80, height: 80 },
  imageContainer: {
    position: 'relative',
    borderRadius: 8,
    overflow: 'hidden',
  },
  multiplier: {
    position: 'absolute',
    top: V_PADDING,
    left: H_PADDING,
  },
  rentalCount: {
    position: 'absolute',
    top: V_PADDING,
    right: H_PADDING,
  },
  favorite: {
    position: 'absolute',
    bottom: '20px',
    left: 0,
  },
  owner: {
    position: 'absolute',
    bottom: `calc(${V_PADDING} + 20px)`,
    right: H_PADDING,
  },
  tokenIdAndName: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  price: {
    textAlign: 'left',
  },
  actions: {
    display: 'flex',
    gap: '8px',
    fontSize: '16px',
  },
  rentButton: {
    flex: 1,
    background: '#443760ba',
    cursor: 'pointer',
  },
  viewTraitsButton: {
    flex: 1,
    cursor: 'pointer',

    '&:hover': {
      background: '#443760ba',
    },
  },
  bottom: {
    width: 'calc(100% - 32px)',
    margin: 'auto',
    padding: '8px 10px',
    transform: 'translateY(-20px)',
    borderRadius: '4px',
    background: '-webkit-linear-gradient(89deg, #620edf 75%, #5e72eb 100%)',
    color: 'white',
    fontSize: '14px',
    gap: '6px',
    display: 'flex',
    flexDirection: 'column',
  },
}));

export const DegenImage = ({ tokenId }: { tokenId: string }): JSX.Element => {
  const classes = useStyles();
  const { targetNetwork } = useContext(NetworkContext);
  const [loading, error, background] = useBackgroundType(tokenId);
  if (error) return <CardMedia className={classes.media} title="Unavailable image" image={UnavailableImg} />;
  if (loading)
    return (
      <div className={classes.media}>
        <Image className={classes.loading} src={LoadingGif} />
      </div>
    );

  const imageURL = `${DEGEN_BASE_IMAGE_URL}/${targetNetwork.name || 'rinkeby'}/images/${tokenId}`;
  if (background === 'Legendary')
    return (
      <CardMedia
        className={clsx(classes.media, 'pixelated')}
        title="Legendary DEGEN mp4"
        component="video"
        autoPlay
        loop
        src={`${imageURL}.mp4`}
      />
    );

  return <CardMedia className={clsx(classes.media, 'pixelated')} title="DEGEN image" image={`${imageURL}.png`} />;
};

const RentalCard = ({
  rental,
  favs,
  handleToggleFavs,
}: {
  rental: Rental;
  favs?: string[];
  handleToggleFavs?: (tokenId: string) => void;
}): JSX.Element => {
  const { id: tokenId, name, multiplier, rental_count, price } = rental;
  const classes = useStyles();
  const [rentDialogOpen, setRentDialogOpen] = useState(false);
  const [viewTraitsDialogOpen, setViewTraitsDialogOpen] = useState(false);

  const handleRent = () => {
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
          <div className={classes.multiplier}>{multiplier}x Multiplier</div>
          <div className={classes.rentalCount}>{rental_count} Rentals</div>
          <IconButton
            className={classes.favorite}
            aria-label="favorite"
            onClick={() => {
              if (handleToggleFavs) handleToggleFavs(tokenId);
            }}
            size="large"
          >
            {favs?.includes(tokenId) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
          <div className={classes.owner}>0x0wner</div>
        </div>
        <div className={classes.bottom}>
          <div className={classes.tokenIdAndName}>
            <div>#{tokenId}</div>
            <div>{name || 'No Name DEGEN'}</div>
          </div>
          <div className={classes.price}>Rent for {price} NFTL / Week</div>
          <div className={classes.actions}>
            <div className={classes.rentButton} onClick={handleRent}>
              Rent Now
            </div>
            <div className={classes.viewTraitsButton} onClick={handleViewTraits}>
              View Traits
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};

RentalCard.defaultProps = {
  favs: [],
  handleToggleFavs: () => {},
};

export default RentalCard;
