import Head from "next/head";
import NextApp from "next/app";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { END } from "redux-saga";
import { wrapper } from "../store/configureStore";

import Index from "./";

import { ThemeProvider as StyledThemeProvider } from "styled-components";
import {
  ThemeProvider as MaterialThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
import { GlobalStyle, Colors } from "../themes";

const theme = {
  primary: Colors.primaryColor,
  ...createMuiTheme(),
};

class App extends NextApp {
  static getInitialProps = async ({ Component, ctx }) => {
    // 1. Wait for all page actions to dispatch
    const pageProps = {
      ...(Component.getInitialProps
        ? await Component.getInitialProps(ctx)
        : {}),
    };

    // 2. Stop the saga if on server
    if (ctx.req) {
      ctx.store.dispatch(END);
      await ctx.store.sagaTask.toPromise();
    }

    // 3. Return props
    return {
      pageProps,
    };
  };

  componentDidMount() {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentNode)
      jssStyles.parentNode.removeChild(jssStyles);
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <StyledThemeProvider theme={theme}>
        <MaterialThemeProvider theme={theme}>
          <Head>
            <link
              href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap"
              rel="stylesheet"
            ></link>
          </Head>
          <ToastContainer autoClose={3000} />
          <GlobalStyle />
          <Index>
            <Component {...pageProps} />
          </Index>
        </MaterialThemeProvider>
      </StyledThemeProvider>
    );
  }
}

export default wrapper.withRedux(App);
