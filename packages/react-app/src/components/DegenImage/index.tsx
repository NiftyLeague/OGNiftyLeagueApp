import React, { useContext } from 'react';
import clsx from 'clsx';
import { CardMedia } from '@mui/material';
import { Image } from 'antd';
import makeStyles from '@mui/styles/makeStyles';
import { NetworkContext } from 'NetworkProvider';
import UnavailableImg from 'assets/images/unavailable-image.png';
import LoadingGif from 'assets/gifs/loading.gif';
import useBackgroundType from 'hooks/useBackgroundType';

import { DEGEN_BASE_IMAGE_URL } from '../../constants/characters';

export const useStyles = makeStyles(() => ({
  media: { height: 338, display: 'flex', alignItems: 'center', justifyContent: 'center' },
  loading: { width: 80, height: 80 },
}));

const DegenImage = ({ tokenId }: { tokenId: string }): JSX.Element => {
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

export default DegenImage;
