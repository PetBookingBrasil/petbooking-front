import React, { useState } from "react";

import {
  Grid,
  DialogContent,
  DialogActions,
  TextField,
  InputLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
} from "@material-ui/core";

import { DurationMask } from "../../../helpers/Masks";
import ListItem from "../listItem";
import CustomDialog from "../customDialog";

export default function Services(props) {
  const [state, setState] = useState({
    currentService: {},
    editModalOpen: false,
    comission: "",
    duration: "",
    petKind: { dog: false, cat: false, pig: false },
  });

  return (
    <Grid container className="mt-5">
      {props.data.map((item) => (
        <React.Fragment key={item.id}>
          <ListItem data={item} />

          {item.services.map((item) => (
            <ListItem
              key={item.id}
              data={item}
              employee={props.employee}
              setEmployee={props.setEmployee}
              setFirstEmployee={props.setFirstEmployee}
              subItem
              editItem={(item) => {
                setState({
                  ...state,
                  editModalOpen: true,
                  currentService: item,
                });
              }}
            />
          ))}
        </React.Fragment>
      ))}

      <CustomDialog
        header={`Editando ${state.currentService.name} ${
          !!props.employee.id ? "para " + props.employee.name : ""
        }`}
        open={state.editModalOpen}
        onClose={() => setState({ ...state, editModalOpen: false })}
      >
        <DialogContent>
          <InputLabel>COMISSÃO</InputLabel>
          <TextField
            variant="outlined"
            placeholder="% de comissão"
            type="number"
            value={state.comission}
            fullWidth
            size="small"
            onChange={(e) => setState({ ...state, comission: e.target.value })}
            className="mb-3"
          />

          <InputLabel>DURAÇÃO</InputLabel>
          <TextField
            variant="outlined"
            placeholder="HH:MM"
            value={state.duration}
            fullWidth
            size="small"
            onChange={(e) => seState({ ...state, duration: e.target.value })}
            className="mb-3"
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
                      petKind: { ...state.petKind, dog: !petKind.dog },
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
                      petKind: { ...state.petKind, cat: !petKind.cat },
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
                  onChange={() => setPetKind({ ...petKind, pig: !petKind.pig })}
                  name="pig"
                />
              }
              label="Porco"
            />
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Grid container justify="space-between">
            <Grid item md={6}>
              <Button variant="contained" color="secondary">
                Cancelar
              </Button>
            </Grid>
            <Grid item md={6} className="d-flex justify-content-end">
              <Button variant="contained" color="primary">
                Salvar
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </CustomDialog>
    </Grid>
  );
}
