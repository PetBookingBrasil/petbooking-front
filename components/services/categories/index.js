import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ServiceActions from "../../../store/reducers/service";
import { toast } from "react-toastify";

import Grid from "@material-ui/core/Grid";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import CurrencyInput from '../../../helpers/currencyInput'
import DurationInput from '../../../helpers/durationInput'
import PercentageInput from '../../../helpers/percentageInput'
import InputAdornment from '@material-ui/core/InputAdornment';

import ServiceCategoryItem from "../categoryItem";
import CustomDialog from "../customDialog";

export default function Categories({
  data,
  employment,
  setEmployment,
  setFirstEmployment,
  editService,
  businessService,
}) {
  const dispatch = useDispatch();
  const service = useSelector(({ service }) => service);
  const initialPetKind = { dog: false, cat: false, pig: false };

  const [state, setState] = useState({
    currentService: {},
    currentSkill: {},
    editModalOpen: false,
    serviceId: "",
    price: "",
    comission: "",
    duration: "",
    petKind: initialPetKind,
  });
  const petKindsTranslation = {
    dog: "Cachorro",
    cat: "Gato",
    pig: "Porco",
  };
  const isEditing = !!state.currentSkill && !!state.currentSkill.id;
  const categories = !!!employment.id
    ? data
    : data
        .filter((item) =>
          item.services.some((inner) =>
            inner.skills.map((sk) => sk.employment_id).includes(employment.id)
          )
        )
        .map((item) => ({
          ...item,
          services: item.services.filter((inner) =>
            inner.skills.map((sk) => sk.employment_id).includes(employment.id)
          ),
        }));

  const handleSaveSkill = () => {
    const payload = {
      ...state,
      employment: employment,
      petKindIds: service.petKinds
        .filter((item) => state.petKind[item.name])
        .map((item) => item.id),
    };

    if (isEditing) {
      // Editing skill
      dispatch(ServiceActions.updateSkillRequest(payload));
    } else {
      // Adding skill
      if (!!!state.serviceId) {
        toast.error(
          "Selecione um serviço da lista para atribuir uma habilidade"
        );
        return;
      }
      dispatch(ServiceActions.createSkillRequest(payload));
    }
  };

  return (
    <Grid container className="margin-t-5">
      {!!employment.id && (
        <Grid container justify="center">
          <Button
            variant="contained"
            color="primary"
            onClick={() =>
              setState({
                ...state,
                editModalOpen: true,
                currentService: {},
                currentSkill: {},
              })
            }
          >
            Adicionar habilidade
          </Button>
        </Grid>
      )}

      {categories.map((item) => (
        <ServiceCategoryItem
          key={item.id}
          businessService={businessService}
          data={item}
          employment={employment}
          setEmployment={setEmployment}
          setFirstEmployment={setFirstEmployment}
          subItem
          editItem={(inner) => {
            const currentSkill = !!employment.id
              ? employment.skills.find((sk) => sk.service_id === inner.id)
              : { pet_kinds: [] };
            const petKind = initialPetKind;
            currentSkill.pet_kinds && currentSkill.pet_kinds.map((pk) => {
              petKind[pk.name] = true;
            });

            // Open Service form if editing
            !!employment.id
              ? setState({
                  ...state,
                  editModalOpen: true,
                  petKind: petKind,
                  currentService: inner,
                  currentSkill: currentSkill,
                  price: currentSkill.price,
                  duration: currentSkill.duration,
                  comission: currentSkill.comission_percentage,
                })
              : editService(inner, item);
          }}
          removeItem={(inner) => {
            const currentSkill = !!employment.id
              ? employment.skills.find((sk) => sk.service_id === inner.id)
              : { pet_kinds: [] };

            // Open Service form if editing
            !!employment.id
              ? window.confirm("Deseja mesmo remover habilidade?")
                ? dispatch(ServiceActions.removeSkillRequest(currentSkill.id))
                : {}
              : window.confirm("Deseja mesmo remover serviço?")
              ? dispatch(ServiceActions.removeServiceRequest(inner.id))
              : {};
          }}
        />
      ))}

      <CustomDialog
        header={`${
          state.currentSkill.id
            ? `Editando ${state.currentService.name}`
            : "Adicionando habilidade"
        } para ${employment.name}`}
        open={state.editModalOpen}
        onClose={() => setState({ ...state, editModalOpen: false })}
      >
        <DialogContent>
          {!isEditing && (
            <>
              <InputLabel className="margin-b-0">Serviço</InputLabel>
              <Select
                variant="outlined"
                fullWidth
                onChange={(e) =>
                  setState({ ...state, serviceId: e.target.value })
                }
                className="margin-b-0"
              >
                {service.data.map((item, i) => (
                  <MenuItem key={i} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </>
          )}

          <InputLabel className="margin-b-0 margin-t-1">Preço</InputLabel>
          <TextField
            variant="outlined"
            placeholder="Preço"
            value={state.price}
            fullWidth
            InputProps={{
              inputComponent: CurrencyInput,
            }}
            onChange={(e) => setState({ ...state, price: e.target.value })}
            className="margin-b-0"
          />

          <InputLabel className="margin-b-0 margin-t-1">Duração</InputLabel>
          <TextField
            variant="outlined"
            placeholder="HH:MM"
            value={state.duration}
            fullWidth
            onChange={(e) => setState({ ...state, duration: e.target.value })}
            className="margin-b-0"
            InputProps={{
              inputComponent: DurationInput,
            }}
          />

          <InputLabel className="margin-b-0 margin-t-1">Comissão</InputLabel>
          <TextField
            variant="outlined"
            placeholder="% de comissão"
            value={state.comission}
            fullWidth
            className="margin-b-0"
            InputProps={{
              inputComponent: PercentageInput,
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
            }}
            onChange={(e) => setState({ ...state, comission: e.target.value })}
          />

          <FormGroup>
            <InputLabel className="margin-b-0 margin-t-1">
              Realiza serviço em:
            </InputLabel>

            {service.petKinds.map((item, i) => (
              <FormControlLabel
                key={i}
                control={
                  <Checkbox
                    color="default"
                    checked={state.petKind[item.name]}
                    onChange={() => {
                      const newState = { ...state };
                      newState.petKind[item.name] = !newState.petKind[
                        item.name
                      ];
                      setState(newState);
                    }}
                    name={item.name}
                  />
                }
                label={petKindsTranslation[item.name]}
              />
            ))}
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Grid container justify="space-between">
            <Grid item md={6}>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => setState({ ...state, editModalOpen: false })}
              >
                Cancelar
              </Button>
            </Grid>
            <Grid item md={6} className="d-flex justify-end">
              <Button
                variant="contained"
                color="primary"
                onClick={handleSaveSkill}
              >
                Salvar
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </CustomDialog>
    </Grid>
  );
}
