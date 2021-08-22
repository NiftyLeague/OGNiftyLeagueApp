import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@material-ui/core';
import { Image, Tooltip } from 'antd';
import EditIcon from '@material-ui/icons/Edit';

import { makeStyles } from '@material-ui/core/styles';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';

import { NetworkContext } from 'NetworkProvider';
import { Address, OpenSeaLink, RenameDialog, ShareCharacter } from 'components';
import { ResolveImageURL } from 'helpers/ipfs';
import UnavailableImg from 'assets/images/unavailable-image.jpeg';
import { TRAIT_INDEXES, TRAIT_NAME_MAP, TRAIT_VALUE_MAP } from '../constants/characters';
import { NFT_CONTRACT } from '../constants';

export const useStyles = makeStyles({
  container: { padding: '40px 0', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' },
  cardRoot: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 30,
    background: '-webkit-linear-gradient(89deg, #620edf 0%, #5e72eb 100%)',
  },
  avatar: { '& div': { backgroundColor: 'transparent', border: 'solid #ffffff4d 0.5px' } },
  cardTitle: { fontSize: 22, display: 'flex', color: '#fff', alignItems: 'center' },
  name: { marginRight: 6 },
  owner: {
    display: 'flex',
    marginLeft: 'auto',
    marginRight: 16,
    '& div': { marginLeft: '8px !important', color: '#fff' },
    '& a': { color: '#fff !important' },
  },
  traitsHeader: { color: '#fff', paddingLeft: 8 },
  cardContent: { padding: 0, paddingBottom: 0, color: '#fff' },
  traitList: { padding: 16, display: 'flex', flexWrap: 'wrap', flexDirection: 'row' },
  traitListItem: { width: '25%', alignItems: 'baseline' },
  traitListText: { color: '#fff', fontSize: 18, textAlign: 'center' },
  traitListTextSecondary: { color: '#aaa0a0', fontSize: 18, textAlign: 'center' },
  cardActions: { marginTop: 'auto', color: '#fff' },
  actionButtons: { color: '#fff', borderRadius: '50%', '&:focus': { outline: 'none' } },
});

const Character = ({ width }) => {
  const { address, readContracts, targetNetwork, mainnetProvider } = useContext(NetworkContext);
  const classes = useStyles();
  const { tokenId } = useParams<{ tokenId: string }>();
  const [character, setCharacter] = useState({
    name: null,
    owner: null,
    traitList: [],
  });
  const { name, owner, traitList } = character as unknown as { name: string; owner: string; traitList: number[] };
  const [image, setImage] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    async function getCharacter() {
      const characterData = {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
        name: await readContracts[NFT_CONTRACT].getName(tokenId),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
        owner: await readContracts[NFT_CONTRACT].ownerOf(tokenId),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
        traitList: await readContracts[NFT_CONTRACT].getCharacterTraits(tokenId),
      };
      setCharacter(characterData);
    }
    if (tokenId && readContracts) void getCharacter();
  }, [tokenId, readContracts]);

  useEffect(() => {
    async function setImageURL() {
      const ipfsImageURL = await ResolveImageURL(tokenId);
      if (ipfsImageURL) setImage(ipfsImageURL);
    }
    void setImageURL();
  }, [tokenId]);

  const displayName = name || 'No Name Degen';
  const ownerOwned = address === owner;

  const traits: { [traitType: string]: number } = traitList.reduce((acc, trait, i) => {
    return { ...acc, [TRAIT_INDEXES[i]]: trait };
  }, {});

  return (
    <Container className={classes.container}>
      <Image
        style={{ borderRadius: 30 }}
        width={isWidthDown('sm', width) ? '100%' : '40%'}
        src={image ?? UnavailableImg}
      />
      <Card className={classes.cardRoot} style={{ width: isWidthDown('sm', width) ? '100%' : '58%' }}>
        <CardHeader
          classes={{ title: classes.cardTitle, avatar: classes.avatar }}
          avatar={<Avatar aria-label="Character ID">{tokenId}</Avatar>}
          title={
            <>
              <Typography variant="h6" className={classes.name}>
                {displayName}
              </Typography>{' '}
              <OpenSeaLink tokenId={tokenId} />
            </>
          }
        />

        <CardContent className={classes.cardContent}>
          <Typography variant="h6">Character Traits:</Typography>
          <List dense className={classes.traitList}>
            {Object.entries(traits)
              .filter(([, value]) => parseInt(value as unknown as string, 10) > 0)
              .map(([key, value]) => (
                <ListItem key={key} className={classes.traitListItem}>
                  <ListItemText
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    primary={TRAIT_NAME_MAP[key]}
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    secondary={TRAIT_VALUE_MAP[value] ?? value}
                    classes={{ primary: classes.traitListText, secondary: classes.traitListTextSecondary }}
                  />
                </ListItem>
              ))}
          </List>
        </CardContent>
        <CardActions disableSpacing className={classes.cardActions}>
          {ownerOwned && (
            <Tooltip title="Rename">
              <IconButton aria-label="rename" className={classes.actionButtons} onClick={() => setDialogOpen(true)}>
                <EditIcon />
              </IconButton>
            </Tooltip>
          )}
          <ShareCharacter tokenId={tokenId} />
          <span className={classes.owner}>
            Owner:
            <Address
              address={owner}
              blockExplorer={targetNetwork.blockExplorer}
              copyable
              ensProvider={mainnetProvider}
            />
          </span>
        </CardActions>
      </Card>
      {ownerOwned ? (
        <RenameDialog displayName={displayName} tokenId={tokenId} open={dialogOpen} setOpen={setDialogOpen} />
      ) : null}
    </Container>
  );
};

export default withWidth()(Character);
