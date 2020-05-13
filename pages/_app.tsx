import React from "react";
import { ThemeProvider } from "theme-ui";
import { AppProps } from "next/app";
import { Global } from "@emotion/core";
import { theme, globalStyles } from "./theme";

const App = ({ Component, pageProps }: AppProps): JSX.Element => (
  <ThemeProvider theme={theme}>
    <Global styles={globalStyles} />
    <Component {...pageProps} />
  </ThemeProvider>
);

export default App;
