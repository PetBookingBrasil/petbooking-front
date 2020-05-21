import React from "react";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import { Component, LogoWrapper, Image } from "./styles";

export default function Header() {
  return (
    <Component container justify="flex-end" alignItems="center">
      <LogoWrapper>
        <Image>
          <img src="/logo-header.svg" />
        </Image>
      </LogoWrapper>

      <Grid item className="margin-r-2">
        <Typography variant="body2">Perfil do seu estabelecimento</Typography>
      </Grid>

      <Grid item className="margin-r-2">
        <Typography variant="body2">Ajuda</Typography>
      </Grid>

      <Grid item>
        <Typography variant="body2">Equipe Pet Booking</Typography>
      </Grid>
    </Component>
  );
}
