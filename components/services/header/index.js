import React from "react";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import IconButton from "@material-ui/core/IconButton";
import ArrowBack from "@material-ui/icons/ArrowBack";
import Add from "@material-ui/icons/Add";

export default function Header({
  showBack,
  step,
  addCategory,
  addService,
  backAction,
  employment,
  service,
}) {
  return (
    <Grid container justify="space-between" alignItems="center">
      <Grid item md={6} className="d-flex align-center">
        {showBack && (
          <IconButton onClick={backAction}>
            <ArrowBack fontSize="large" />
          </IconButton>
        )}
        <Typography variant="subtitle1" className="margin-l-2">
          {step === 0 && (
            <b>
              Serviços e habilidades{" "}
              {!!employment.id && ` de ${employment.nickname}`}
            </b>
          )}
          {step === 1 && <b>Adicionar serviço</b>}
          {step === 2 && (
            <b>
              Adicionar serviço {!!service.name ? " - " + service.name : ""}
            </b>
          )}
        </Typography>
      </Grid>
      <Grid item md={6} className="d-flex justify-end">
        {!!!showBack && (
          <Button
            variant="contained"
            endIcon={<Add />}
            onClick={addCategory}
            className="margin-r-2"
          >
            Adicionar categoria
          </Button>
        )}
        {!!!showBack && (
          <Button variant="contained" endIcon={<Add />} onClick={addService}>
            Adicionar serviço
          </Button>
        )}
      </Grid>
    </Grid>
  );
}
