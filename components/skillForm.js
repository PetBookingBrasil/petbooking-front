import React from 'react'

import {
  DialogContent,
  TextField,
  InputLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";

import { DurationMask } from '../helpers/masks'

const SkillForm = (props) => {
  const {
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
        onChange={(e) => setState({ ...state, comission: e.target.value })}
        className="margin-b-0"
      />
      
      <InputLabel>DURAÇÃO</InputLabel>
      <TextField
        variant="outlined"
        placeholder="HH:MM"
        value={state.duration}
        fullWidth
        onChange={(e) => seState({ ...state, duration: e.target.value })}
        className="margin-b-0"
        InputProps={{
          inputComponent: DurationMask,
        }}
      />
      
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              color="default"
              checked={state.petKind.dog}
              onChange={() =>
                setState({
                  ...state,
                  petKind: { ...state.petKind, dog: !state.petKind.dog },
                })
              }
              name="dog"
            />
          }
          label="Cachorro"
        />
        <FormControlLabel
          control={
            <Checkbox
              color="default"
              checked={state.petKind.cat}
              onChange={() =>
                setState({
                  ...state,
                  petKind: { ...state.petKind, cat: !state.petKind.cat },
                })
              }
              name="cat"
            />
          }
          label="Gato"
        />
        <FormControlLabel
          control={
            <Checkbox
              color="default"
              checked={state.petKind.pig}
              onChange={() =>
                setPetKind({ ...state.petKind, pig: !state.petKind.pig })
              }
              name="pig"
            />
          }
          label="Porco"
        />
      </FormGroup>
    </div>
  )
}

export default SkillForm;