/* eslint-disable jsx-a11y/media-has-caption */
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
} from '@mui/material';
import { Image } from 'antd';
import { Edit as EditIcon, Download as DownloadIcon } from '@mui/icons-material';
import makeStyles from '@mui/styles/makeStyles';

import { NetworkContext } from 'NetworkProvider';
import { Address, Tooltip } from 'components';
import { useIsWidthDown } from 'hooks/useWidth';
import OpenSeaLink from 'components/CharacterCard/OpenSeaLink';
import RenameDialog from 'components/CharacterCard/RenameDialog';
import ShareCharacter from 'components/CharacterCard/ShareCharacter';
import useBackgroundType from 'hooks/useBackgroundType';
import useNFTLBalance from 'hooks/useNFTLBalance';
import UnavailableImg from 'assets/images/unavailable-image.png';
import LoadingGif from 'assets/gifs/loading.gif';
import { downloadDegenAsZip } from 'utils/file';
import ErrorModal from 'components/Modal/ErrorModal';
import { DEGEN_BASE_IMAGE_URL, TRAIT_INDEXES, TRAIT_NAME_MAP, TRAIT_VALUE_MAP } from '../constants/characters';
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
  loadingContainer: { height: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  loading: { width: 100, height: 100 },
  traitsHeader: { color: '#fff', paddingLeft: 8 },
  cardContent: { padding: 0, paddingBottom: 0, color: '#fff' },
  traitList: { padding: 16, display: 'flex', flexWrap: 'wrap', flexDirection: 'row' },
  traitListItem: { width: '25%', alignItems: 'baseline' },
  traitListText: { color: '#fff', fontSize: 18, textAlign: 'center' },
  traitListTextSecondary: { color: '#aaa0a0', fontSize: 18, textAlign: 'center' },
  cardActions: { marginTop: 'auto', color: '#fff' },
  actionButtons: { color: '#fff', borderRadius: '50%', '&:focus': { outline: 'none' } },
});

const DegenImage = ({ network = 'rinkeby', tokenId }: { network?: string; tokenId: string }) => {
  const classes = useStyles();
  const [loading, error, background] = useBackgroundType(tokenId);
  const mobileView = useIsWidthDown('sm');
  const size = mobileView ? '100%' : '40%';
  if (error) return <Image style={{ borderRadius: 30 }} width={size} src={UnavailableImg} />;
  if (loading)
    return (
      <div className={classes.loadingContainer} style={{ width: size }}>
        <Image className={classes.loading} src={LoadingGif} />
      </div>
    );

  const imageURL = `${DEGEN_BASE_IMAGE_URL}/${network}/images/${tokenId}`;
  if (background === 'Legendary')
    return <video src={`${imageURL}.mp4`} title="Legendary Degen" width={mobileView ? '100%' : '40%'} autoPlay loop />;

  return (
    <Image style={{ borderRadius: 30 }} width={mobileView ? '100%' : '40%'} height="auto" src={`${imageURL}.png`} />
  );
};

DegenImage.defaultProps = { network: 'rinkeby' };

const Character = (): JSX.Element | null => {
  const { address, readContracts, targetNetwork, mainnetProvider } = useContext(NetworkContext);
  const userNFTLBalance = useNFTLBalance(address);
  const classes = useStyles();
  const mobileView = useIsWidthDown('sm');
  const { tokenId } = useParams<{ tokenId: string }>();
  const [character, setCharacter] = useState({
    name: null,
    owner: null,
    traitList: [],
  });
  const { name, owner, traitList } = character as unknown as { name: string; owner: string; traitList: number[] };
  const [dialogOpen, setDialogOpen] = useState(false);
  const [errorContent, setErrorContent] = useState('');

  const handleCloseErrorModal = () => {
    setErrorContent('');
  };

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
    if (tokenId && readContracts && readContracts[NFT_CONTRACT]) void getCharacter();
  }, [tokenId, readContracts]);

  const displayName = name || 'No Name DEGEN';
  const ownerOwned = address === owner;

  const traits: { [traitType: string]: number } = traitList.reduce((acc, trait, i) => {
    return { ...acc, [TRAIT_INDEXES[i]]: trait };
  }, {});

  if (!tokenId) return null;
  const tokenIdNum = parseInt(tokenId, 10);
  let fontSize = '1.25rem';
  if (tokenIdNum === 10000) fontSize = '.8rem';
  if (tokenIdNum >= 1000) fontSize = '.85rem';
  else if (tokenIdNum >= 100) fontSize = '1rem';

  const authToken = window.localStorage.getItem('authentication-token');
  const degenDownloadClick = async () => {
    if (authToken) {
      try {
        await downloadDegenAsZip(authToken, tokenId);
      } catch (e) {
        setErrorContent(`${e}`);
      }
    }
  };
  return (
    <Container className={classes.container}>
      <DegenImage network={targetNetwork.name} tokenId={tokenId} />
      <Card className={classes.cardRoot} style={{ width: mobileView ? '100%' : '58%' }}>
        <CardHeader
          classes={{ title: classes.cardTitle, avatar: classes.avatar }}
          avatar={
            <Avatar aria-label="Character ID" style={{ width: 45, height: 45, fontSize }}>
              {tokenId}
            </Avatar>
          }
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
            <>
              <Tooltip text="Rename">
                <IconButton
                  aria-label="rename"
                  className={classes.actionButtons}
                  onClick={() => setDialogOpen(true)}
                  size="large"
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip text="Download">
                <IconButton
                  aria-label="download"
                  className={classes.actionButtons}
                  onClick={degenDownloadClick}
                  size="large"
                >
                  <DownloadIcon />
                </IconButton>
              </Tooltip>
            </>
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
        <RenameDialog
          displayName={displayName}
          tokenId={tokenId}
          open={dialogOpen}
          setOpen={setDialogOpen}
          userNFTLBalance={userNFTLBalance ?? 0}
          redirectToWallet
        />
      ) : null}
      <ErrorModal content={errorContent} />
    </Container>
  );
};

export default Character;
