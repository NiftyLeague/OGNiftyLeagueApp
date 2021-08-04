import dotenv from 'dotenv';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { ThemeSwitcherProvider } from 'react-css-theme-switcher';
import NetworkProvider from './NetworkProvider';
import App from './App';

dotenv.config();

const themes = {
  dark: `${process.env.PUBLIC_URL}/dark-theme.css`,
  light: `${process.env.PUBLIC_URL}/light-theme.css`,
};

const prevTheme = window.localStorage.getItem('theme');

const subgraphUri = process.env.REACT_APP_SUBGRAPH_URI;

const client = new ApolloClient({
  uri: subgraphUri,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <ThemeSwitcherProvider themeMap={themes} defaultTheme={prevTheme ?? 'dark'}>
      <NetworkProvider>
        <Router>
          <App subgraphUri={subgraphUri} />
        </Router>
      </NetworkProvider>
    </ThemeSwitcherProvider>
  </ApolloProvider>,
  document.getElementById('root'),
);
