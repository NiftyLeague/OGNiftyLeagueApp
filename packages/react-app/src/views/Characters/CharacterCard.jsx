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
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import OpenSeaIcon from "assets/images/opensea.png";
import { useStyles } from "./styles";

function formatTime(timestamp) {
  const date = new Date(timestamp * 1e3);
  return `${date.toLocaleDateString("en-US")} ${date.toLocaleTimeString("en-US", { timeStyle: "short" })}`;
}

export default function CharacterCard({ character }) {
  const { name, id, created, ...traitList } = character;
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
            {name} <img src={OpenSeaIcon} alt="opensea icon" style={{ width: 24, height: 24 }} />
          </>
        }
        subheader={`Created: ${formatTime(created)}`}
      />
      <CardMedia className={classes.media} image="/static/images/cards/paella.jpg" title="NFT image" />
      <CardActions disableSpacing>
        <span className={classes.traitsHeader}>Traits:</span>
        <IconButton
          className={clsx(classes.expand, {
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
            {Object.entries(traitList).map(([key, value]) => (
              <ListItem>
                <ListItemText primary={key} secondary={value} className={classes.traitListItem} />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Collapse>
    </Card>
  );
}
