import React from "react";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import IconButton from "@material-ui/core/IconButton";
import ArrowBack from "@material-ui/icons/ArrowBack";
import Add from "@material-ui/icons/Add";

export default function Header(props) {
  return (
    <Grid container justify="space-between" alignItems="center">
      <Grid item md={6} className="d-flex align-center">
        {props.showBack && (
          <IconButton onClick={props.backAction}>
            <ArrowBack fontSize="large" />
          </IconButton>
        )}
        <Typography variant="subtitle1" className="margin-l-2">
          {props.addStep === 0 && (
            <b>
              Serviços e habilidades{" "}
              {!!props.employment.id && ` de ${props.employment.nickname}`}
            </b>
          )}
          {props.addStep === 1 && <b>Adicionar serviço</b>}
          {props.addStep === 2 && (
            <b>Adicionar serviço - {props.service.name}</b>
          )}
        </Typography>
      </Grid>
      <Grid item md={6} className="d-flex justify-end">
        {!!!props.showBack && (
          <Button
            variant="contained"
            endIcon={<Add />}
            onClick={props.addCategory}
            className="margin-r-2"
          >
            Adicionar categoria
          </Button>
        )}
        {!!!props.showBack && (
          <Button
            variant="contained"
            endIcon={<Add />}
            onClick={props.addService}
          >
            Adicionar serviço
          </Button>
        )}
      </Grid>
    </Grid>
  );
}
