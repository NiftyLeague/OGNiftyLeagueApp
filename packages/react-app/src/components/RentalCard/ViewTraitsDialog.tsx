import React, { useState, useEffect, useContext } from 'react';
import { useThemeSwitcher } from 'react-css-theme-switcher';
import { Typography, Modal, Card, List, ListItem, ListItemText, Box } from '@mui/material';
import { Rental } from 'types/api';
import makeStyles from '@mui/styles/makeStyles';
import { NetworkContext } from 'NetworkProvider';
import DegenImage from 'components/DegenImage';
import { NFT_CONTRACT } from '../../constants';
import { TRAIT_INDEXES, TRAIT_NAME_MAP, TRAIT_VALUE_MAP } from '../../constants/characters';
import Address from 'components/Address';

const useStyles = makeStyles(() => {
  return {
    modal: {
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    modalContent: {
      width: '900px',
    },
    cardRoot: {
      textAlign: 'center',
    },
    cardContent: {
      padding: 0,
      paddingBottom: 0,
      paddingRight: 5,
      textAlign: 'center',
      position: 'relative',
    },
    traitList: {
      padding: 16,
      paddingBottom: 62,
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'row',
    },
    traitListItem: { width: '33%', alignItems: 'baseline' },
    traitListText: { fontSize: 18, textAlign: 'center' },
    traitListTextSecondary: { color: '#aaa0a0', fontSize: 18, textAlign: 'center' },
    imageContainer: {
      position: 'relative',
      overflow: 'hidden',
      padding: 15,
    },
    id: {
      color: 'grey',
    },
    rentalCount: {
      color: 'green',
    },
    owner: {
      fontSize: '0.8rem',
      alignItems: 'center',
    },
    ownerSpan: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: '1rem',
    },
    ownerLabel: {
      marginRight: '12px',
    },
    underline: {
      textDecoration: 'underline',
    },
    tokenIdAndName: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    price: {
      color: 'red',
    },
    title: {
      padding: '1rem 0rem',
      borderBottom: '1px grey solid',
    },
    rentButton: {
      padding: '6px 10px',
      borderRadius: '3px',
      width: '98%',
      background: '#443760ba',
      cursor: 'pointer',
      position: 'absolute',
      bottom: '10px',
    },
  };
});

const ViewTraitsDialog = ({
  rental,
  handleClose,
  onRent,
}: {
  rental: Rental | null;
  handleClose: () => void;
  onRent: () => void;
}): JSX.Element => {
  const classes = useStyles();
  const [traitList, setTraitList] = useState([]);
  const { readContracts, targetNetwork, mainnetProvider } = useContext(NetworkContext);

  const { currentTheme } = useThemeSwitcher();
  const darkThemed = currentTheme === 'dark';

  useEffect(() => {
    async function getCharacter() {
      if (rental && rental.id) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
        const list = await readContracts[NFT_CONTRACT].getCharacterTraits(rental.id);
        setTraitList(list);
      }
    }
    if (readContracts && readContracts[NFT_CONTRACT]) void getCharacter();
  }, [rental, readContracts]);

  const traits: { [traitType: string]: number } = traitList.reduce((acc, trait, i) => {
    return { ...acc, [TRAIT_INDEXES[i]]: trait };
  }, {});

  return (
    <Modal
      className={classes.modal}
      open
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      sx={{ color: darkThemed ? 'white' : 'black' }}
    >
      {rental ? (
        <Box
          sx={{
            display: 'grid',
            gap: 1,
            gridTemplateColumns: 'repeat(2, 1fr)',
            backgroundColor: darkThemed ? 'black' : 'white',
          }}
          className={classes.modalContent}
        >
          <Card className={classes.cardRoot} sx={{ backgroundColor: darkThemed ? 'black' : 'white' }}>
            <Box className={classes.imageContainer}>
              <DegenImage tokenId={rental.id} />
              <Box sx={{ color: darkThemed ? 'white' : 'black' }}>{rental.name || 'No Name DEGEN'}</Box>
              <Box className={classes.id}>#{rental.id}</Box>
              <Box sx={{ color: darkThemed ? 'yellow' : 'black' }}>{rental.multiplier}x Multiplier</Box>
              <Box className={classes.rentalCount}>{rental.rental_count} Active Rentals</Box>
              <Box className={classes.price}>{rental.price} NFTL / 1 Week</Box>
              <Box className={classes.owner} sx={{ color: darkThemed ? 'white' : 'black' }}>
                <span className={classes.ownerSpan}>
                  <span className={classes.ownerLabel}>Owned by:</span>
                  <Address
                    address={rental.owner}
                    blockExplorer={targetNetwork.blockExplorer}
                    copyable
                    ensProvider={mainnetProvider}
                  />
                </span>
              </Box>
            </Box>
          </Card>
          <Box className={classes.cardContent} sx={{ backgroundColor: darkThemed ? 'black' : 'white' }}>
            <Typography className={classes.title} variant="h6">
              Degen Traits
            </Typography>
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
            <Box className={classes.rentButton} onClick={onRent}>
              Rent Now
            </Box>
          </Box>
        </Box>
      ) : (
        <Box>Error</Box>
      )}
    </Modal>
  );
};

export default ViewTraitsDialog;
