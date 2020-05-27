import Head from "next/head";
import NextApp from "next/app";
import React from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import {
  ThemeProvider as MaterialThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
import { GlobalStyle } from "../themes";

import { Colors } from "../themes";
import AppContextProvider from "../context/index";
import { getConsumerToken } from "../services/consumer";

const theme = {
  primary: Colors.primaryColor,
  ...createMuiTheme(),
};

export default class App extends NextApp {
  componentDidMount() {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentNode)
      jssStyles.parentNode.removeChild(jssStyles);

    async function getData() {
      let url = window.location.href;
      if (url.includes("&")) {
        // Save info from petbooking, for future requests
        localStorage.setItem("@pb/token", url.split("token=")[1].split("&")[0]);
        localStorage.setItem(
          "@pb/businessId",
          url.split("business_id=")[1].split("&")[0]
        );
        localStorage.setItem(
          "@pb/consumerUuid",
          url.split("consumer_uuid=")[1].split("&")[0]
        );

        let response = await getConsumerToken();
        if (response.ok) {
          let json = await response.json();
          localStorage.setItem("@pb/consumerToken", json.data.attributes.token);
        }
      }
    }

    getData();
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <StyledThemeProvider theme={theme}>
        <MaterialThemeProvider theme={theme}>
          <AppContextProvider>
            <Head>
              <link
                href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap"
                rel="stylesheet"
              ></link>
            </Head>

            <GlobalStyle />

            <Component {...pageProps} />
          </AppContextProvider>
        </MaterialThemeProvider>
      </StyledThemeProvider>
    );
  }
}
