import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { Image } from 'antd';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import makeStyles from '@mui/styles/makeStyles';

import { NetworkContext } from 'NetworkProvider';
import Tooltip from 'components/Tooltip';
import UnavailableImg from 'assets/images/unavailable-image.png';
import LoadingGif from 'assets/gifs/loading.gif';
import { formatDateTime } from 'helpers/dateTime';
import useBackgroundType from 'hooks/useBackgroundType';
import { Character } from 'types/graph';
import RenameDialog from './RenameDialog';
import OpenSeaLink from './OpenSeaLink';
import ShareCharacter from './ShareCharacter';
import ClaimNFTL from '../ClaimNFTL';
import { DEGEN_BASE_IMAGE_URL, TRAIT_NAME_MAP, TRAIT_VALUE_MAP } from '../../constants/characters';

export const useStyles = makeStyles(theme => ({
  cardRoot: { borderRadius: 30, background: '-webkit-linear-gradient(89deg, #620edf 75%, #5e72eb 100%)' },
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

const CharacterCard = ({
  character,
  favs,
  handleToggleFavs,
  ownerOwned,
  singleClaim,
  userNFTLBalance,
}: {
  character: Character;
  favs?: string[];
  handleToggleFavs?: (tokenId: string) => void;
  ownerOwned?: boolean;
  singleClaim?: boolean;
  userNFTLBalance?: number;
}): JSX.Element => {
  const { createdAt, id: tokenId, name, traits } = character;
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
        <CardHeader
          classes={{ title: classes.cardTitle, subheader: classes.cardSubheader, avatar: classes.avatar }}
          avatar={
            <Link to={`/degens/${tokenId}`}>
              <Avatar aria-label="Character ID" style={{ width: 45, height: 45, fontSize }}>
                {tokenIdNum}
              </Avatar>
            </Link>
          }
          title={
            <>
              <Link to={`/degens/${tokenId}`} className={classes.cardTitleLink}>
                {displayName}
              </Link>{' '}
              <OpenSeaLink tokenId={tokenId} />
            </>
          }
          subheader={`Created: ${formatDateTime(createdAt as unknown as number)}`}
        />
        <Link to={`/degens/${tokenId}`}>
          <DegenImage tokenId={tokenId} />
        </Link>
        <CardActions disableSpacing>
          {ownerOwned && (
            <>
              <Tooltip text="Rename">
                <IconButton
                  aria-label="rename"
                  className={actionClasses}
                  onClick={() => setDialogOpen(true)}
                  size="large"
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
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
            </>
          )}
          <ShareCharacter tokenId={tokenId} className={actionClasses} />
          {ownerOwned && singleClaim && <ClaimNFTL tokenIndices={[tokenIdNum]} singleClaim />}
          <span className={classes.traitsHeader}>Traits:</span>
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
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent className={classes.cardContent}>
            <List dense className={classes.traitList}>
              {Object.entries(traits)
                .filter(([key, value]) => key !== '__typename' && parseInt(value as unknown as string, 10) > 0)
                .map(
                  ([key, value]): JSX.Element => (
                    <ListItem key={key} className={classes.traitListItem}>
                      <ListItemText
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                        primary={TRAIT_NAME_MAP[key]}
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                        secondary={TRAIT_VALUE_MAP[value] ?? value}
                        classes={{ primary: classes.traitListText, secondary: classes.traitListTextSecondary }}
                      />
                    </ListItem>
                  ),
                )}
            </List>
          </CardContent>
        </Collapse>
      </Card>
      {ownerOwned ? (
        <RenameDialog
          displayName={displayName}
          open={dialogOpen}
          setOpen={setDialogOpen}
          tokenId={tokenId}
          userNFTLBalance={userNFTLBalance ?? 0}
        />
      ) : null}
    </>
  );
};

CharacterCard.defaultProps = {
  favs: [],
  handleToggleFavs: () => {},
  ownerOwned: undefined,
  singleClaim: false,
  userNFTLBalance: 0,
};

export default CharacterCard;
