import React, { useState, useEffect, useContext } from 'react';
import { Typography, Modal, Card, CardContent, List, ListItem, ListItemText, Box } from '@mui/material';
import { Rental } from 'types/api';
import makeStyles from '@mui/styles/makeStyles';
import { NetworkContext } from 'NetworkProvider';
import DegenImage from 'components/DegenImage';
import { NFT_CONTRACT } from '../../constants';
import { TRAIT_INDEXES, TRAIT_NAME_MAP, TRAIT_VALUE_MAP } from '../../constants/characters';

const useStyles = makeStyles(() => ({
  modal: {
    width: `100%`,
    height: `100%`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: 'black',
    maxWidth: '700px',
  },
  cardRoot: {
    border: '1px solid rgb(66, 66, 66)',
    textAlign: 'center',
    background: '#212121',
    color: 'white',
  },
  cardContent: { padding: 0, paddingBottom: 0, color: '#fff', textAlign: 'center' },
  traitList: { padding: 16, display: 'flex', flexWrap: 'wrap', flexDirection: 'row' },
  traitListItem: { width: '25%', alignItems: 'baseline' },
  traitListText: { color: '#fff', fontSize: 18, textAlign: 'center' },
  traitListTextSecondary: { color: '#aaa0a0', fontSize: 18, textAlign: 'center' },
  imageContainer: {
    position: 'relative',
    borderRadius: 8,
    overflow: 'hidden',
  },
  name: {
    color: 'white',
  },
  id: {
    color: 'grey',
  },
  multiplier: {
    color: 'yellow',
  },
  rentalCount: {
    color: 'green',
  },
  owner: {
    fontSize: '0.8rem',
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
    flex: 1,
    background: '#443760ba',
    cursor: 'pointer',
  },
}));

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
  const { readContracts } = useContext(NetworkContext);

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
    >
      {rental ? (
        <Box
          sx={{
            display: 'grid',
            gap: 1,
            gridTemplateColumns: 'repeat(2, 1fr)',
          }}
          className={classes.modalContent}
        >
          <Card className={classes.cardRoot}>
            <div className={classes.imageContainer}>
              <DegenImage tokenId={rental.id} />
              <div className={classes.name}>{rental.name || 'No Name DEGEN'}</div>
              <div className={classes.id}>#{rental.id}</div>
              <div className={classes.multiplier}>{rental.multiplier}x Multiplier</div>
              <div className={classes.rentalCount}>{rental.rental_count} Active Rentals</div>
              <div className={classes.price}>{rental.price} NFTL / 1 Week</div>
              <div className={classes.owner}>
                Owned by <span className={classes.underline}>{rental.owner.slice(0, 5)}...</span>
              </div>
            </div>
          </Card>
          <Box className={classes.cardContent}>
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
            <div className={classes.rentButton} onClick={onRent}>
              Rent Now
            </div>
          </Box>
        </Box>
      ) : (
        <div>Error</div>
      )}
    </Modal>
  );
};

export default ViewTraitsDialog;
