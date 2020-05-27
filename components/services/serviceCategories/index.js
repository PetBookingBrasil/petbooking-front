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
import ServiceCategoryItem from "../serviceCategoryItem";
import CustomDialog from "../customDialog";

export default function ServiceCategories({
  data,
  employee,
  setEmployee,
  setFirstEmployee,
}) {
  const [state, setState] = useState({
    currentService: {},
    editModalOpen: false,
    comission: "",
    duration: "",
    petKind: { dog: false, cat: false, pig: false },
  });

  console.log(!!data.length ? data[0].services[0] : []);

  return (
    <Grid container className="margin-t-5">
      {data.map((item) => (
        <ServiceCategoryItem
          key={item.id}
          data={item}
          employee={employee}
          setEmployee={setEmployee}
          setFirstEmployee={setFirstEmployee}
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

      <CustomDialog
        header={`Editando ${state.currentService.name} ${
          !!employee.id ? "para " + employee.name : ""
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
            className="margin-b-0"
          />

          <InputLabel>DURAÇÃO</InputLabel>
          <TextField
            variant="outlined"
            placeholder="HH:MM"
            value={state.duration}
            fullWidth
            size="small"
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
        </DialogContent>
        <DialogActions>
          <Grid container justify="space-between">
            <Grid item md={6}>
              <Button variant="contained" color="secondary">
                Cancelar
              </Button>
            </Grid>
            <Grid item md={6} className="d-flex justify-end">
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
