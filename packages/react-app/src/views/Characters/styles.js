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
  tooltip: {
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
  },
  accExpand: {
    fontSize: 24,
    color: "#fff",
  },
  accDetails: {
    flexWrap: "wrap",
  },
};

export const useStyles = makeStyles({
  ...searchStyles,
  ...multiSelectStyles,
  ...accordionStyles,
});

export const getMenuItemStyles = (name, selectedOptions) => {
  return {
    fontWeight: selectedOptions.indexOf(name) === -1 ? 300 : 500,
    fontSize: 16,
  };
};
