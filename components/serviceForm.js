import React, { useState } from 'react'

import {
  DialogContent,
  TextField,
  InputLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";

import { DurationMask } from '../helpers/masks'
import Grid from '@material-ui/core/Grid'

let ServiceForm = (props) => {
  const {
    handleChange,
    state
  } = props
  
  return (
    <div>
      <InputLabel>COMISSÃO</InputLabel>
      <TextField
        variant="outlined"
        placeholder="% de comissão"
        type="number"
        value={state.comission}
        fullWidth
        onChange={(e) => handleChange({ ...state, comission: e.target.value })}
        className="margin-b-0"
      />
    </div>
  )
}

export default ServiceForm;
