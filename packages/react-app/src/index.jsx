import dotenv from "dotenv";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { createWeb3ReactRoot, Web3ReactProvider } from "@web3-react/core";
import { ThemeSwitcherProvider } from "react-css-theme-switcher";
import LanguageProvider from "./language";
import getLibrary from "./helpers/getLibrary";
import { NetworkContextName } from "./constants";
import App from "./App";
import store from "./state";

dotenv.config();

const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName);

const themes = {
  dark: `${process.env.PUBLIC_URL}/dark-theme.css`,
  light: `${process.env.PUBLIC_URL}/light-theme.css`,
};

const prevTheme = window.localStorage.getItem("theme");

const subgraphUri = "http://localhost:8000/subgraphs/name/scaffold-eth/your-contract";

const client = new ApolloClient({
  uri: subgraphUri,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <Web3ReactProvider getLibrary={getLibrary}>
    <Web3ProviderNetwork getLibrary={getLibrary}>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <LanguageProvider>
            <ThemeSwitcherProvider themeMap={themes} defaultTheme={prevTheme || "light"}>
              <Router>
                <App subgraphUri={subgraphUri} />
              </Router>
            </ThemeSwitcherProvider>
          </LanguageProvider>
        </Provider>
      </ApolloProvider>
    </Web3ProviderNetwork>
  </Web3ReactProvider>,
  document.getElementById("root"),
);
