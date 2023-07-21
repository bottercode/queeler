import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ColorModeScript, ChakraProvider, theme } from "@chakra-ui/react";
import { ApolloProvider } from "@apollo/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { client } from "./utils/apolloConfig";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ColorModeScript />
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ChakraProvider>
    </ApolloProvider>
  </React.StrictMode>
);

reportWebVitals();
