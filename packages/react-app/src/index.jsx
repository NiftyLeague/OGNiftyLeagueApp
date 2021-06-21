import dotenv from "dotenv";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { ThemeSwitcherProvider } from "react-css-theme-switcher";
import LanguageProvider from "./language";
import App from "./App";
import store from "./state";

dotenv.config();

const themes = {
  dark: `${process.env.PUBLIC_URL}/dark-theme.css`,
  light: `${process.env.PUBLIC_URL}/light-theme.css`,
};

const prevTheme = window.localStorage.getItem("theme");

const subgraphUri =
  process.env.NODE_ENV === "development" ? process.env.LOCAL_SUBGRAPH_URI : process.env.LIVE_SUBGRAPH_URI;

const client = new ApolloClient({
  uri: subgraphUri,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <LanguageProvider>
        <ThemeSwitcherProvider themeMap={themes} defaultTheme={prevTheme || "dark"}>
          <Router>
            <App subgraphUri={subgraphUri} />
          </Router>
        </ThemeSwitcherProvider>
      </LanguageProvider>
    </Provider>
  </ApolloProvider>,
  document.getElementById("root"),
);
