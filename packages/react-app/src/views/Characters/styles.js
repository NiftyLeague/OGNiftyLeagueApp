import { makeStyles } from '@material-ui/core/styles';

const searchStyles = {
  paper: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
    marginLeft: 'auto',
  },
  input: {
    marginLeft: 3,
    flex: 1,
    fontSize: 16,
  },
  iconButton: {
    padding: 10,
    ' & svg': {
      fontSize: 18,
    },
  },
  iconPrimary: {
    color: '#90caf9',
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
    margin: '5px 0',
  },
  label: {
    fontSize: 16,
    color: '#bcbcbc !important',
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
    fontSize: 14,
    lineHeight: 20,
  },
};

const accordionStyles = {
  accRoot: {
    background: 'transparent',
    boxShadow: 'none',
  },
  accHeader: {
    fontSize: 18,
    color: '#fff',
    margin: '5px 40px',
  },
  accDetails: {
    flexWrap: 'wrap',
  },
};

export const useStyles = makeStyles(theme => ({
  ...searchStyles,
  ...multiSelectStyles,
  ...accordionStyles,
  pagination: {
    width: '100%',
    paddingTop: 20,
    paddingBottom: 125,
    '& ul': {
      justifyContent: 'center',
    },
  },
  paginationDark: {
    '& button, li > div': {
      color: 'white',
      borderColor: 'white',
    },
  },
  snackbar: { width: '50vw', bottom: 18 },
  [theme.breakpoints.down('md')]: {
    snackbar: { width: '75vw' },
  },
  [theme.breakpoints.down('sm')]: {
    snackbar: { width: '90vw', marginBottom: 40 },
    paper: { width: '60%' },
  },
}));

export const getMenuItemStyles = (trait, selectedOptions) => {
  return {
    fontWeight: selectedOptions.indexOf(trait) === -1 ? 300 : 500,
    fontSize: 16,
  };
};
