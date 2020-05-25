import React, { useContext } from "react";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import { Component, LogoWrapper, Image } from "./styles";
import { AppContext } from "../../context";

export default function Header() {
  const { state, dispatch } = useContext(AppContext);

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
        <Typography variant="body2">{state.user.name}</Typography>
      </Grid>
    </Component>
  );
}
