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
import DisableRentModal from 'components/DisableRentModal';
import UnavailableImg from 'assets/images/unavailable-image.png';
import LoadingGif from 'assets/gifs/loading.gif';
import { formatDateTime } from 'helpers/dateTime';
import useBackgroundType from 'hooks/useBackgroundType';
import { Character } from 'types/graph';
import { Rental, CharacterType } from 'types/api';
import DegenImage from 'components/DegenImage';
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
  actionButtons: { color: '#fff', borderRadius: '50%', '&:focus': { outline: 'none' } },
  reduceSize: { padding: 8, '& svg': { fontSize: 22 } },
  traitsHeader: { color: '#fff', paddingLeft: 8 },
  cardContent: { padding: 0, paddingBottom: 0 },
  traitList: { paddingTop: 0, display: 'flex', flexWrap: 'wrap', flexDirection: 'row' },
  traitListItem: { width: '33%', alignItems: 'baseline' },
  traitListText: { color: '#fff', fontSize: 14 },
  traitListTextSecondary: { color: '#aaa0a0', fontSize: 14 },
  disable: {
    textAlign: 'center',
    textDecoration: 'underline',
    cursor: 'pointer',
    '&:hover': {
      background: '#443760ba',
    },
  },
}));

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
  const [rental, setRental] = useState<Rental>();
  const [disableRentDialogOpen, setDisableRentDialogOpen] = useState(false);
  const handleDisableRent = () => {
    setDisableRentDialogOpen(true);
  };
  const auth = window.localStorage.getItem('authentication-token');
  useEffect(() => {
    async function getCharacter() {
      if (auth && tokenId) {
        const rentalData = await fetch(
          `https://odgwhiwhzb.execute-api.us-east-1.amazonaws.com/prod/rentals/rentables?ids=${tokenId}`,
          {
            method: 'GET',
            headers: { authorizationToken: auth },
          },
        );
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const rentalJSON = await rentalData.json();
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        setRental(rentalJSON[tokenId]);
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    void getCharacter();
  }, [auth, tokenId]);
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
        {ownerOwned && rental && (
          <div className={classes.disable} onClick={handleDisableRent}>
            {rental.is_active ? 'Disable Rentals' : 'Enable Rentals'}
          </div>
        )}
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
      {ownerOwned && disableRentDialogOpen && (
        <DisableRentModal rental={rental} handleClose={() => setDisableRentDialogOpen(false)} setRental={setRental} />
      )}
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
