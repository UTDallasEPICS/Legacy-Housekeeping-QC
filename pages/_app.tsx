import * as React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import { theme } from "../src/theme";
import createEmotionCache from "./createEmotionCache";
import { SessionProvider } from "next-auth/react";
import { store } from "../store";
import { Provider } from "react-redux";
import { useState } from "react";
import { Loader } from "../src/components";
import Router from "next/router";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// Import the UserProvider from Auth0
import { UserProvider } from '@auth0/nextjs-auth0/client';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps: { session, ...pageProps },
  } = props;

  const [loading, setLoading] = useState(false);

  Router.events.on("routeChangeStart", (url) => {
    if (url === "/admin/makeInspection") return;
    console.log("Loading start");
    setLoading(true);
  });

  Router.events.on("routeChangeComplete", (url) => {
    console.log("Loading Complete");
    setLoading(false);
  });

  return (
    <SessionProvider session={session}>
      <CacheProvider value={emotionCache}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Head>
            <meta
              name="viewport"
              content="initial-scale=1, width=device-width"
            />
          </Head>
          <Provider store={store}>
            {/* Wrap the entire application in the UserProvider */}
            <UserProvider>
              {loading ? (
                <Loader />
              ) : (
                <ThemeProvider theme={theme}>
                  <CssBaseline />
                  <Component {...pageProps} />
                </ThemeProvider>
              )}
            </UserProvider>
          </Provider>
        </LocalizationProvider>
      </CacheProvider>
    </SessionProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
