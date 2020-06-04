import React from "react";

import { Grid, TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

export default function ServiceInput({ categories, setCategory }) {
  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      className="sns-service-input"
    >
      <Autocomplete
        options={categories}
        getOptionLabel={(option) => option.name}
        noOptionsText="Não encontramos uma categoria com esse nome"
        onChange={(e, item) => {
          setCategory(item);
        }}
        fullWidth
        renderInput={(params) => (
          <TextField
            {...params}
            label="Busque uma categoria"
            variant="outlined"
            fullWidth
          />
        )}
      />
    </Grid>
  );
}
