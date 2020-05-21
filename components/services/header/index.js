import React from "react";

import { Grid, Typography, Button, IconButton } from "@material-ui/core";
import { ArrowBack, Add } from "@material-ui/icons";

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
              {!!props.employee.id && ` de ${props.employee.nickname}`}
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
