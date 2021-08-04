import React, { useEffect, useState } from 'react';
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
} from '@material-ui/core';
import { Tooltip } from 'antd';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';

import UnavailableImg from 'assets/images/unavailable-image.jpeg';
import { formatDateTime } from 'helpers/dateTime';
import { ResolveImageURL } from 'helpers/ipfs';
import RenameDialog from './RenameDialog';
import OpenSeaLink from './OpenSeaLink';
import ShareCharacter from './ShareCharacter';
import { TRAIT_NAME_MAP, TRAIT_VALUE_MAP } from '../constants/characters';

export const useStyles = makeStyles(theme => ({
  cardRoot: { borderRadius: 30, background: '-webkit-linear-gradient(89deg, #620edf 0%, #5e72eb 100%)' },
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
  cardTitle: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'left',
    '&:hover': { color: '#fff' },
  },
  cardSubheader: { fontSize: 14, textAlign: 'left', color: '#ffffff66' },
  media: { height: 280, paddingTop: '56.25%' },
  actionButtons: { color: '#fff', borderRadius: '50%', '&:focus': { outline: 'none' } },
  traitsHeader: { color: '#fff', paddingLeft: 8 },
  cardContent: { padding: 0, paddingBottom: 0 },
  traitList: { paddingTop: 0, display: 'flex', flexWrap: 'wrap', flexDirection: 'row' },
  traitListItem: { width: '33%', alignItems: 'baseline' },
  traitListText: { color: '#fff', fontSize: 14 },
  traitListTextSecondary: { color: '#aaa0a0', fontSize: 14 },
}));

export default function CharacterCard({ character, ownerOwned }) {
  const { createdAt, id: tokenId, name, traits } = character;
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [image, setImage] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    async function setImageURL() {
      const ipfsImageURL = await ResolveImageURL(tokenId);
      if (ipfsImageURL) setImage(ipfsImageURL);
    }
    if (tokenId) setImageURL();
  }, [tokenId]);

  const displayName = name || 'No Name Degen';

  return (
    <>
      <Card className={classes.cardRoot}>
        <CardHeader
          classes={{ title: classes.cardTitle, subheader: classes.cardSubheader, avatar: classes.avatar }}
          avatar={
            <Link to={`degens/${tokenId}`}>
              <Avatar aria-label="Character ID">{tokenId}</Avatar>
            </Link>
          }
          title={
            <>
              <Link to={`degens/${tokenId}`} className={classes.cardTitle}>
                {displayName}
              </Link>{' '}
              <OpenSeaLink tokenId={tokenId} />
            </>
          }
          subheader={`Created: ${formatDateTime(createdAt)}`}
        />
        <Link to={`degens/${tokenId}`}>
          <CardMedia className={classes.media} image={image ?? UnavailableImg} title="NFT image" />
        </Link>
        <CardActions disableSpacing>
          {ownerOwned && (
            <Tooltip title="Rename">
              <IconButton aria-label="rename" className={classes.actionButtons} onClick={() => setDialogOpen(true)}>
                <EditIcon />
              </IconButton>
            </Tooltip>
          )}
          <ShareCharacter tokenId={tokenId} />
          <span className={classes.traitsHeader}>Traits:</span>
          <IconButton
            className={clsx(classes.actionButtons, classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent className={classes.cardContent}>
            <List dense className={classes.traitList}>
              {Object.entries(traits)
                .filter(([key, value]) => key !== '__typename' && parseInt(value, 10) > 0)
                .map(([key, value]) => (
                  <ListItem key={key} className={classes.traitListItem}>
                    <ListItemText
                      primary={TRAIT_NAME_MAP[key]}
                      secondary={TRAIT_VALUE_MAP[value] ?? value}
                      classes={{ primary: classes.traitListText, secondary: classes.traitListTextSecondary }}
                    />
                  </ListItem>
                ))}
            </List>
          </CardContent>
        </Collapse>
      </Card>
      {ownerOwned ? (
        <RenameDialog displayName={displayName} open={dialogOpen} setOpen={setDialogOpen} tokenId={tokenId} />
      ) : null}
    </>
  );
}
