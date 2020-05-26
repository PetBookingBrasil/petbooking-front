import React, { useState, useContext, useEffect } from "react";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import { Name } from "./styles";

import { AppContext } from "../../../context";

export default function CampaignsPage() {
  const [data, setData] = useState("Douglas");

  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    dispatch("@campaigns/GET_CAMPAIGNS_REQUEST");
  }, []);

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      className="padding-3"
    >
      <Name color="#CCC">{state.campaigns.data[0].name}</Name>
    </Grid>
  );
}
