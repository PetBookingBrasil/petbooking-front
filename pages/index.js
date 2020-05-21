import Head from "next/head";
import Services from "./services";
import { GlobalStyle } from "../themes";

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Pet Booking</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GlobalStyle />

      <Services />
    </div>
  );
}
