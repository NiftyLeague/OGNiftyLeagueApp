import React, { useCallback, useEffect, useState } from "react";
import { useThemeSwitcher } from "react-css-theme-switcher";
import { MaxUint256 } from "@ethersproject/constants";
import clsx from "clsx";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
} from "@material-ui/core";
import { Tooltip } from "antd";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import EditIcon from "@material-ui/icons/Edit";
import ShareIcon from "@material-ui/icons/Share";
import { makeStyles } from "@material-ui/core/styles";
import OpenSeaIcon from "assets/images/opensea.png";
import { formatDateTime } from "helpers/dateTime";
import { ResolveImageURL } from "helpers/ipfs";
import { DEBUG, NFT_CONTRACT, NFTL_CONTRACT } from "../constants";
import { TRAIT_NAME_MAP, TRAIT_VALUE_MAP } from "../constants/characters";

export const useStyles = makeStyles(theme => ({
  cardRoot: {
    borderRadius: 30,
    background: "-webkit-linear-gradient(89deg, #620edf 0%, #5e72eb 100%)",
  },
  media: {
    height: 280,
    paddingTop: "56.25%", // 16:9
  },
  actionButtons: {
    color: "#fff",
    borderRadius: "50%",
    "&:focus": {
      outline: "none",
    },
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
    "& svg": {
      fontSize: 24,
    },
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  cardTitle: {
    fontSize: 18,
    color: "#fff",
    textAlign: "left",
  },
  cardSubheader: {
    fontSize: 14,
    textAlign: "left",
    color: "#ffffff4d",
  },
  avatar: {
    "& div": {
      backgroundColor: "transparent",
      border: "solid #ffffff4d 0.5px",
    },
  },
  traitsHeader: {
    color: "#fff",
    paddingLeft: 8,
  },
  cardContent: {
    padding: 0,
    paddingBottom: 0,
  },
  traitList: {
    paddingTop: 0,
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
  },
  traitListItem: {
    width: "33%",
    alignItems: "baseline",
  },
  traitListText: {
    color: "#fff",
    fontSize: 14,
  },
  dialogDark: {
    backgroundColor: "rgb(49, 49, 49)",
    "& p, input": { color: "#fff" },
    "& label": { color: "#3f51b5" },
  },
}));

const RenameDialog = ({ address, displayName, open, setOpen, tokenId, tx, writeContracts }) => {
  const { currentTheme } = useThemeSwitcher();
  const classes = useStyles();
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("");

  const handleClose = useCallback(() => setOpen(false), [setOpen]);

  const validateName = value => {
    setInput(value);
    const regex = new RegExp("^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$");
    const doubleSpaceRegex = new RegExp("^(?!.*[ ]{2})");
    let hasError = true;
    if (!value.length) {
      setHelperText("Please input a name.");
    } else if (value.length > 32) {
      setHelperText("Max character length of 32.");
    } else if (!regex.test(value)) {
      setHelperText("Invalid character. Please only use numbers, letters, or spaces.");
    } else if (value.charAt(0) === " " || value.charAt(value.length - 1) === " ") {
      setHelperText("No leading or trailing spaces.");
    } else if (!doubleSpaceRegex.test(value)) {
      setHelperText("No double spaces allowed.");
    } else {
      hasError = false;
      setHelperText("");
    }
    setError(hasError);
    return hasError;
  };

  const handleRename = useCallback(async () => {
    const hasError = validateName(input);
    if (!hasError) {
      handleClose();
      if (DEBUG) console.log("Rename NFT to:", input);
      const NFTAddress = writeContracts[NFT_CONTRACT].address;
      const allowance = await writeContracts[NFTL_CONTRACT].allowance(address, NFTAddress);
      if (allowance < 1000) {
        if (DEBUG) console.log("Allowance:", allowance);
        const result = tx(writeContracts[NFTL_CONTRACT].approve(NFTAddress, MaxUint256));
        if (DEBUG) console.log("awaiting metamask/web3 confirm result...", result);
        await result;
      }
      tx(writeContracts[NFT_CONTRACT].changeName(parseInt(tokenId, 10), input));
    }
  }, [address, handleClose, input, tokenId, tx, writeContracts]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="rename-form-dialog"
      classes={{ paper: clsx({ [classes.dialogDark]: currentTheme === "dark" }) }}
    >
      <DialogTitle>
        Rename {displayName} #{tokenId}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Renaming costs <strong>1000 NFTL</strong>. Each name must be unique (case insensitive) with a max character
          length of 32 and may only include numbers, letters, or spaces.
        </DialogContentText>
        <TextField
          autoFocus
          error={error}
          helperText={helperText}
          fullWidth
          label="New Name"
          margin="dense"
          onChange={({ target: { value } }) => validateName(value)}
          value={input}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleRename} color="primary" disabled={error}>
          Rename
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default function CharacterCard({ address, character, ownerOwned, tx, writeContracts }) {
  const { createdAt, id: tokenId, name, traits } = character;
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [image, setImage] = useState("https://eagle-sensors.com/wp-content/uploads/unavailable-image.jpg");
  const [open, setOpen] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    async function setImageURL() {
      const ipfsImageURL = await ResolveImageURL(tokenId);
      if (ipfsImageURL) setImage(ipfsImageURL);
    }
    setImageURL();
  }, [tokenId]);

  const displayName = name || "No Name Degen";

  return (
    <>
      <Card className={classes.cardRoot}>
        <CardHeader
          classes={{ title: classes.cardTitle, subheader: classes.cardSubheader, avatar: classes.avatar }}
          avatar={<Avatar aria-label="Character ID">{tokenId}</Avatar>}
          title={
            <>
              {displayName} <img src={OpenSeaIcon} alt="opensea icon" style={{ width: 24, height: 24 }} />
            </>
          }
          subheader={`Created: ${formatDateTime(createdAt)}`}
        />
        <CardMedia className={classes.media} image={image} title="NFT image" />
        <CardActions disableSpacing>
          {ownerOwned && (
            <Tooltip title="Rename">
              <IconButton aria-label="rename" className={classes.actionButtons} onClick={() => setOpen(true)}>
                <EditIcon />
              </IconButton>
            </Tooltip>
          )}
          <Tooltip title="Share link">
            <IconButton aria-label="share" className={classes.actionButtons}>
              <ShareIcon />
            </IconButton>
          </Tooltip>
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
                .filter(([key, value]) => key !== "__typename" && parseInt(value, 10) > 0)
                .map(([key, value]) => (
                  <ListItem key={key} className={classes.traitListItem}>
                    <ListItemText
                      primary={TRAIT_NAME_MAP[key]}
                      secondary={TRAIT_VALUE_MAP[value] ?? value}
                      className={classes.traitListText}
                    />
                  </ListItem>
                ))}
            </List>
          </CardContent>
        </Collapse>
      </Card>
      {ownerOwned ? (
        <RenameDialog
          address={address}
          character={character}
          displayName={displayName}
          tokenId={tokenId}
          tx={tx}
          writeContracts={writeContracts}
          open={open}
          setOpen={setOpen}
        />
      ) : null}
    </>
  );
}
