import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
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
import { Character } from 'types/graph';

import { DEGEN_BASE_IMAGE_URL } from '../../constants/characters';

export const useStyles = makeStyles(theme => ({
  cardRoot: { borderRadius: 8, background: '-webkit-linear-gradient(89deg, #620edf 75%, #5e72eb 100%)' },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    '& svg': { fontSize: 24 },
  },
  expandOpen: { transform: 'rotate(180deg)' },
  avatar: { '& div': { backgroundColor: 'transparent', border: 'solid #ffffff4d 0.5px' } },
  cardTitle: { display: 'flex', alignItems: 'center' },
  cardTitleLink: { fontSize: 18, marginRight: 6, color: '#fff', '&:hover': { color: '#fff' } },
  cardSubheader: { fontSize: 14, textAlign: 'left', color: '#ffffff66' },
  media: { height: 338, display: 'flex', alignItems: 'center', justifyContent: 'center' },
  loading: { width: 80, height: 80 },
  actionButtons: { color: '#fff', borderRadius: '50%', '&:focus': { outline: 'none' } },
  reduceSize: { padding: 8, '& svg': { fontSize: 22 } },
  traitsHeader: { color: '#fff', paddingLeft: 8 },
  cardContent: { padding: 0, paddingBottom: 0 },
  traitList: { paddingTop: 0, display: 'flex', flexWrap: 'wrap', flexDirection: 'row' },
  traitListItem: { width: '33%', alignItems: 'baseline' },
  traitListText: { color: '#fff', fontSize: 14 },
  traitListTextSecondary: { color: '#aaa0a0', fontSize: 14 },
}));

const DegenImage = ({ tokenId }: { tokenId: string }) => {
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
  character,
  favs,
  handleToggleFavs,
  singleClaim,
}: {
  character: Character;
  favs?: string[];
  handleToggleFavs?: (tokenId: string) => void;
  singleClaim?: boolean;
}): JSX.Element => {
  const { id: tokenId, name } = character;
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const displayName = name || 'No Name DEGEN';

  const tokenIdNum = parseInt(tokenId, 10);
  let fontSize = '1.25rem';
  if (tokenIdNum === 10000) fontSize = '.8rem';
  if (tokenIdNum >= 1000) fontSize = '.85rem';
  else if (tokenIdNum >= 100) fontSize = '1rem';

  const actionClasses = clsx(classes.actionButtons, { [classes.reduceSize]: singleClaim });

  return (
    <>
      <Card className={classes.cardRoot}>
        <Link to={`/degens/${tokenId}`}>
          <DegenImage tokenId={tokenId} />
        </Link>
        <Tooltip text="Favorite">
          <IconButton
            aria-label="favorite"
            className={actionClasses}
            onClick={() => {
              if (handleToggleFavs) handleToggleFavs(tokenId);
            }}
            size="large"
          >
            {favs?.includes(tokenId) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
        </Tooltip>
        {tokenIdNum}
        {displayName}
        <CardActions disableSpacing>
          <IconButton
            className={clsx(classes.actionButtons, classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
            size="large"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
      </Card>
    </>
  );
};

RentalCard.defaultProps = {
  favs: [],
  handleToggleFavs: () => {},
  ownerOwned: undefined,
  singleClaim: false,
  userNFTLBalance: 0,
};

export default RentalCard;
