import React, { useState, useContext, useEffect } from "react";

import {
  InputLabel,
  TextField,
  Grid,
  Button,
  Typography,
} from "@material-ui/core";

import { Name } from "./styles";

import { AppContext } from "../../../context";

export default function CampaignsPage() {
  const { dispatch, state } = useContext(AppContext);

  const [form, setForm] = useState({
    name: "",
    starts_at: "",
    ends_at: ""
  });

  const sendCampaign = async () =>{
    dispatch("@campaigns/CREATE_CAMPAIGN_REQUEST", form);
  }

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      className="padding-3"
    >
        <Grid item xs={6}>
          <TextField 
            id="campaign-name"
            name="name"
            value={form.price}
            label="Nome da campanha"
            variant="outlined"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
        </Grid>
        <Grid item xs={12}>
          <InputLabel>Inicia em:</InputLabel>
          <TextField
            id="starts-at"
            value={form.starts_at}
            label="Inicia em"
            type="datetime-local"
            onChange={(e) => setForm({ ...form, starts_at: e.target.value })}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item>
          <InputLabel>Finaliza em:</InputLabel>
          <TextField
            id="ends-at"
            label="Finaliza em"
            type="datetime-local"
            onChange={(e) => setForm({ ...form, ends_at: e.target.value })}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Button onClick={() => sendCampaign()} variant="contained" color="primary">
          Salvar
        </Button>
    </Grid>
  );
}
