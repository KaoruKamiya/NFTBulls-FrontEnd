import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import React from "react";
import { ThemeSwitcherProvider } from "react-css-theme-switcher";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { DummyDataContextProvider } from "./context/dummy";
import {MoralisProvider} from 'react-moralis';

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

const app = (
  <DummyDataContextProvider>
    <App subgraphUri={subgraphUri} />
  </DummyDataContextProvider>
);

ReactDOM.render(
  <ApolloProvider client={client}>
    <ThemeSwitcherProvider themeMap={themes} defaultTheme={prevTheme || "light"}>
      <MoralisProvider appId = "ea6nGhL7KG4i1ztzTcnHYfVkGZVn3oDGnxqFT784" serverUrl = "https://pfalb9lepomh.moralishost.com:2053/server">
        {app}
      </MoralisProvider>
    </ThemeSwitcherProvider>
  </ApolloProvider>,
  document.getElementById("root"),
);
