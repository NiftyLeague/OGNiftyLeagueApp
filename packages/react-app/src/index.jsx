import dotenv from "dotenv";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { ThemeSwitcherProvider } from "react-css-theme-switcher";
import App from "./App";
import store from "./state";

dotenv.config();

const themes = {
  dark: `${process.env.PUBLIC_URL}/dark-theme.css`,
  light: `${process.env.PUBLIC_URL}/light-theme.css`,
};

const prevTheme = window.localStorage.getItem("theme");

const subgraphUri = process.env.REACT_APP_SUBGRAPH_URI;

const client = new ApolloClient({
  uri: subgraphUri,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <ThemeSwitcherProvider themeMap={themes} defaultTheme={prevTheme ?? "dark"}>
        <Router>
          <App subgraphUri={subgraphUri} />
        </Router>
      </ThemeSwitcherProvider>
    </Provider>
  </ApolloProvider>,
  document.getElementById("root"),
);
