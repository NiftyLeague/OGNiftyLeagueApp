import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
} from "@material-ui/core";
import { Image, Tooltip } from "antd";
import EditIcon from "@material-ui/icons/Edit";

import { makeStyles } from "@material-ui/core/styles";
import withWidth, { isWidthDown } from "@material-ui/core/withWidth";

import { NetworkContext } from "NetworkProvider";
import { Address, OpenSeaLink, RenameDialog, ShareCharacter } from "components";
import UnavailableImg from "assets/images/unavailable-image.jpeg";
import { ResolveImageURL } from "helpers/ipfs";
import { TRAIT_INDEXES, TRAIT_NAME_MAP, TRAIT_VALUE_MAP } from "../constants/characters";
import { NFT_CONTRACT } from "../constants";

export const useStyles = makeStyles({
  container: { padding: "40px 0", display: "flex", flexWrap: "wrap", justifyContent: "space-between" },
  cardRoot: {
    display: "flex",
    flexDirection: "column",
    borderRadius: 30,
    background: "-webkit-linear-gradient(89deg, #620edf 0%, #5e72eb 100%)",
  },
  avatar: { "& div": { backgroundColor: "transparent", border: "solid #ffffff4d 0.5px" } },
  cardTitle: { fontSize: 22, color: "#fff", textAlign: "left" },
  owner: {
    display: "flex",
    marginLeft: 36,
    "& div": { marginLeft: "8px !important", color: "#fff" },
    "& a": { color: "#fff !important" },
  },
  traitsHeader: { color: "#fff", paddingLeft: 8 },
  cardContent: { padding: 0, paddingBottom: 0, color: "#fff" },
  traitList: { padding: 20, display: "flex", flexWrap: "wrap", flexDirection: "row" },
  traitListItem: { width: "25%", alignItems: "baseline" },
  traitListText: { color: "#fff", fontSize: 14, textAlign: "center" },
  traitListTextSecondary: { color: "#aaa0a0", fontSize: 14, textAlign: "center" },
  cardActions: { marginTop: "auto", color: "#fff" },
  actionButtons: { color: "#fff", borderRadius: "50%", "&:focus": { outline: "none" } },
});

const Character = ({ width }) => {
  const { address, readContracts, targetNetwork, mainnetProvider } = useContext(NetworkContext);
  const classes = useStyles();
  const { tokenId } = useParams();
  const [character, setCharacter] = useState({
    name: null,
    owner: null,
    traitList: [],
  });
  const { name, owner, traitList } = character;
  const [image, setImage] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    async function getCharacter() {
      const characterData = {
        name: await readContracts[NFT_CONTRACT].getName(tokenId),
        owner: await readContracts[NFT_CONTRACT].ownerOf(tokenId),
        traitList: await readContracts[NFT_CONTRACT].getCharacterTraits(tokenId),
      };
      setCharacter(characterData);
    }
    if (tokenId && readContracts) getCharacter();
  }, [tokenId, readContracts]);

  useEffect(() => {
    async function setImageURL() {
      const ipfsImageURL = await ResolveImageURL(tokenId);
      if (ipfsImageURL) setImage(ipfsImageURL);
    }
    setImageURL();
  }, [tokenId]);

  const displayName = name || "No Name Degen";
  const ownerOwned = address === owner;

  const traits = traitList.reduce((acc, trait, i) => {
    return { ...acc, [TRAIT_INDEXES[i]]: trait };
  }, {});

  return (
    <Container className={classes.container}>
      <Image
        style={{ borderRadius: 30 }}
        width={isWidthDown("sm", width) ? "100%" : "40%"}
        src={image ?? UnavailableImg}
      />
      <Card className={classes.cardRoot} style={{ width: isWidthDown("sm", width) ? "100%" : "58%" }}>
        <CardHeader
          classes={{ title: classes.cardTitle, avatar: classes.avatar }}
          avatar={<Avatar aria-label="Character ID">{tokenId}</Avatar>}
          title={
            <>
              {displayName} <OpenSeaLink tokenId={tokenId} />
            </>
          }
        />

        <CardContent className={classes.cardContent}>
          Character Traits:
          <List dense className={classes.traitList}>
            {Object.entries(traits)
              .filter(([, value]) => parseInt(value, 10) > 0)
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
