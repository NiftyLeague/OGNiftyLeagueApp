import makeStyles from '@mui/styles/makeStyles';

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
  noItem: {
    height: 'calc(100vh - 133px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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

// @ts-expect-error ts-migrate(2345) FIXME: Argument of type '(theme: Theme) => { pagination: ... Remove this comment to see the full error message
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
  grid: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  container: {
    maxWidth: '100% !important',
    background: '#2f2f2f',
    minHeight: 'calc(100vh - 64px)',
  },
  paginationDark: {
    '& button, li > div': {
      color: 'white',
      borderColor: 'white',
    },
  },
  snackbar: { width: '60vw', bottom: 18 },
  topBox: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'space-between',
  },
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
