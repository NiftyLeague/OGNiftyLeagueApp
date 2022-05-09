import makeStyles from '@mui/styles/makeStyles';

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

// @ts-expect-error ts-migrate(2345) FIXME: Argument of type '(theme: Theme) => { pagination: ... Remove this comment to see the full error message
export const useStyles = makeStyles(theme => ({
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
  snackbar: { width: '60vw', bottom: 18 },
  [theme.breakpoints.down('lg')]: {
    snackbar: { width: '75vw' },
  },
  [theme.breakpoints.down('md')]: {
    snackbar: { width: '90vw', marginBottom: 40 },
    paper: { width: '60%' },
  },
  [theme.breakpoints.down('sm')]: {
    snackbar: { display: 'none' },
  },
}));

export const getMenuItemStyles = (
  trait: string,
  selectedOptions: string[],
): { fontWeight: number; fontSize: number } => {
  return {
    fontWeight: selectedOptions.indexOf(trait) === -1 ? 300 : 500,
    fontSize: 16,
  };
};
