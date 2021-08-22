import { createTheme } from '@material-ui/core/styles';

export default createTheme({
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
      },
    },
  },
});
