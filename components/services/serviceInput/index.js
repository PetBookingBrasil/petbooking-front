import React from 'react'

import {
  Grid,
  TextField
} from "@material-ui/core"
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function ServiceInput(props) {
  return (
    <Grid container justify="center" alignItems="center" className="sns-service-input">
      <Autocomplete
        options={props.services}
        getOptionLabel={option => option.name}
        noOptionsText="Não encontramos um serviço com esse nome"
        onChange={(e, item) => {
          props.setService(item);
        }}
        fullWidth
        renderInput={params => (
          <TextField {...params} label="Busque um serviço" variant="outlined" fullWidth />
        )}
      />
    </Grid>
  );
}
