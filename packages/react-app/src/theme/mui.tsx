import { createTheme, adaptV4Theme } from '@mui/material/styles';

export default createTheme(
  adaptV4Theme({
    typography: {
      fontFamily: "'Ubuntu', 'Roboto', sans-serif",
      subtitle1: { fontWeight: 400 },
      subtitle2: { fontWeight: 400 },
      body1: { fontWeight: 400 },
      body2: { fontWeight: 400 },
      caption: { fontWeight: 400 },
      button: { fontWeight: 400 },
    },
    overrides: {
      MuiSnackbarContent: {
        root: {
          fontSize: 16,
          backgroundColor: 'rgb(22,21,34)',
          border: '1px solid #2a3a50',
          color: '#C3C5CB',
          boxShadow: '0 4px 8px 0 rgb(0 0 0 / 10%)',
        },
      },
    },
  }),
);
