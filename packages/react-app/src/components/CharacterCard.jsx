import React from "react";
import clsx from "clsx";
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
} from "@material-ui/core";
import { Tooltip } from "antd";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import EditIcon from "@material-ui/icons/Edit";
import ShareIcon from "@material-ui/icons/Share";
import { makeStyles } from "@material-ui/core/styles";
import OpenSeaIcon from "assets/images/opensea.png";
import { TRAIT_NAME_MAP, TRAIT_VALUE_MAP } from "../constants/characters";

export const useStyles = makeStyles(theme => ({
  cardRoot: {
    borderRadius: 30,
    background: "-webkit-linear-gradient(89deg, #620edf 0%, #5e72eb 100%)",
  },
  media: {
    height: 0,
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
    " & div": {
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
}));

function formatTime(timestamp) {
  const date = new Date(timestamp * 1e3);
  return `${date.toLocaleDateString("en-US")} ${date.toLocaleTimeString("en-US", { timeStyle: "short" })}`;
}

export default function CharacterCard({ character, ownerOwned }) {
  const { createdAt, id, name, traits } = character;
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.cardRoot}>
      <CardHeader
        classes={{ title: classes.cardTitle, subheader: classes.cardSubheader, avatar: classes.avatar }}
        avatar={<Avatar aria-label="Character ID">{id}</Avatar>}
        title={
          <>
            {name || "No Name Degen"} <img src={OpenSeaIcon} alt="opensea icon" style={{ width: 24, height: 24 }} />
          </>
        }
        subheader={`Created: ${formatTime(createdAt)}`}
      />
      <CardMedia className={classes.media} image="/static/images/cards/paella.jpg" title="NFT image" />
      <CardActions disableSpacing>
        {ownerOwned && (
          <Tooltip title="Rename">
            <IconButton aria-label="rename" className={classes.actionButtons}>
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
  );
}
