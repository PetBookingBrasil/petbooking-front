import React from "react";

import { Grid, IconButton, Typography } from "@material-ui/core";
import Close from "@material-ui/icons/Close";

import { Component, Header } from "./styles";

export default function CustomDialog(props) {
  return (
    <Component
      open={props.open}
      onClose={props.onClose}
      onBackdropClick={props.onClose}
    >
      <Header>
        <Grid container justify="space-between" alignItems="center">
          <Grid item md={10}>
            <Typography variant="body1">{props.header}</Typography>
          </Grid>
          <Grid item md={2} className="d-flex justify-end">
            <IconButton onClick={props.onClose}>
              <Close />
            </IconButton>
          </Grid>
        </Grid>
      </Header>
      {props.children}
    </Component>
  );
}
