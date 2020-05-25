import { useEffect } from "react";
import Head from "next/head";
import Services from "./services";
import { GlobalStyle } from "../themes";
import Container from "../components/container";
import { getConsumerToken } from "../services/consumer";

export default function App() {
  useEffect(() => {
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
  }, []);

  return (
    <Container>
      <Head>
        <title>Pet Booking</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GlobalStyle />

      <Services />
    </Container>
  );
}
