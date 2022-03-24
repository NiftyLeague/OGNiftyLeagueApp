import makeStyles from '@mui/styles/makeStyles';

// eslint-disable-next-line import/prefer-default-export
export const useStyles = makeStyles(() => ({
  searchField: {
    padding: '0 16px',
  },
  label: {
    fontSize: 16,
    color: '#bcbcbc !important',
    marginBottom: '0 !important',
  },
  list: {
    width: '100%',
    maxWidth: 360,
    maxHeight: 400,
    overflow: 'auto',
    overflowX: 'hidden',
    bgcolor: 'background.paper',

    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  list2Columns: {
    width: '100%',
    maxWidth: 360,
    maxHeight: 400,
    overflow: 'auto',
    overflowX: 'hidden',
    bgcolor: 'background.paper',

    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',

    '& > li': {
      minWidth: '50%',
      maxWidth: '50%',
      flex: 1,
    },
  },
  summary: {
    '&.Mui-expanded': {
      borderTop: '1px solid rgba(0, 0, 0, 0.12)',
      borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    },
    '& .MuiAccordionSummary-content': {
      margin: '20px 0 !important',
    },
  },
}));
