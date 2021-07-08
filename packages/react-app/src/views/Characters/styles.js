import { makeStyles } from "@material-ui/core/styles";

const searchStyles = {
  paper: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400,
    marginLeft: "auto",
  },
  input: {
    marginLeft: 3,
    flex: 1,
    fontSize: 16,
  },
  iconButton: {
    padding: 10,
    " & svg": {
      fontSize: 18,
    },
  },
  iconPrimary: {
    color: "#90caf9",
  },
  divider: {
    height: 28,
    margin: 4,
  },
};

const multiSelectStyles = {
  formControl: {
    margin: 3,
    minWidth: 140,
    maxWidth: 250,
    fontSize: 18,
  },
  select: {
    margin: "5px 0",
  },
  label: {
    fontSize: 16,
    color: "#bcbcbc !important",
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
    fontSize: 14,
    lineHeight: 20,
  },
};

const accordionStyles = {
  accRoot: {
    background: "transparent",
    boxShadow: "none",
  },
  accHeader: {
    fontSize: 18,
    color: "#fff",
    margin: "5px 40px",
  },
  accDetails: {
    flexWrap: "wrap",
  },
};

const cardStyles = theme => ({
  cardRoot: {
    maxWidth: 345,
    borderRadius: 30,
    background: "-webkit-linear-gradient(89deg, #620edf 0%, #5e72eb 100%)",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    color: "#fff",
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
});

export const useStyles = makeStyles(theme => ({
  ...searchStyles,
  ...multiSelectStyles,
  ...accordionStyles,
  ...cardStyles(theme),
  pagination: {
    width: "100%",
    paddingTop: 20,
    paddingBottom: 125,
    "& ul": {
      justifyContent: "center",
    },
  },
  paginationDark: {
    "& button, li > div": {
      color: "white",
      borderColor: "white",
    },
  },
  snackbar: { width: "50vw", bottom: 12 },
  [theme.breakpoints.down("md")]: {
    snackbar: { width: "75vw" },
  },
  [theme.breakpoints.down("sm")]: {
    snackbar: { width: "90vw" },
    paper: { width: "60%" },
  },
}));

export const getMenuItemStyles = (trait, selectedOptions) => {
  return {
    fontWeight: selectedOptions.indexOf(trait) === -1 ? 300 : 500,
    fontSize: 16,
  };
};
