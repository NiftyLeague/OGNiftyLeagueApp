import dotenv from 'dotenv';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { ThemeSwitcherProvider } from 'react-css-theme-switcher';
import { ThemeProvider, Theme, StyledEngineProvider } from '@mui/material/styles';
import NetworkProvider from './NetworkProvider';
import { SUBGRAPH_URI } from './constants';
import { MuiTheme as theme } from './theme';
import App from './App';

declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

dotenv.config();

const themes = {
  dark: `${process.env.PUBLIC_URL}/dark-theme.css`,
  light: `${process.env.PUBLIC_URL}/light-theme.css`,
};

const prevTheme = window.localStorage.getItem('theme');

const client = new ApolloClient({
  uri: SUBGRAPH_URI,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <ThemeSwitcherProvider themeMap={themes} defaultTheme={prevTheme ?? 'dark'}>
      <NetworkProvider>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <Router>
              <App />
            </Router>
          </ThemeProvider>
        </StyledEngineProvider>
      </NetworkProvider>
    </ThemeSwitcherProvider>
  </ApolloProvider>,
  document.getElementById('root'),
);
