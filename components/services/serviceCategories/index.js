import React, { useState } from 'react'

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
} from '@material-ui/core'

import ServiceCategoryItem from '../serviceCategoryItem'
import CustomDialog from '../customDialog'
import SkillForm from '../../skillForm'
import ServiceForm from '../../serviceForm'
import { toast } from 'react-toastify'
import ServiceActions from '../../../store/reducers/service'
import { useDispatch, useSelector } from "react-redux";

export default function ServiceCategories({
  data,
  employment,
  setEmployment,
  setFirstEmployment,
}) {
  const [state, setState] = useState({
    currentService: {},
    editModalOpen: false,
    comission: '',
    duration: '',
    petKind: { dog: false, cat: false, pig: false },
  })
  const dispatch = useDispatch();
  const handleSave = () => {
    dispatch(ServiceActions.updateServiceRequest({ ...state }));
  };
  
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
      }))
  
  return (
    <Grid container className="margin-t-5">
      {categories.map((item) => (
        <ServiceCategoryItem
          key={item.id}
          data={item}
          employment={employment}
          setEmployment={setEmployment}
          setFirstEmployment={setFirstEmployment}
          subItem
          editItem={(item) => {
            setState({
              ...state,
              editModalOpen: true,
              currentService: item,
            })
          }}
        />
      ))}
      
      <CustomDialog
        header={`Editando ${state.currentService.name} ${
          !!employment.id ? 'para ' + employment.name : ''
          }`}
        open={state.editModalOpen}
        onClose={() => setState({ ...state, editModalOpen: false })}
      >
        <DialogContent>
          {
            employment.id ? <SkillForm state={state}/> :
              <ServiceForm handleChange={setState} state={state}/>
          }
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
              <Button variant="contained" color="primary"
                      onClick={handleSave} >
                Salvar
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </CustomDialog>
    </Grid>
  )
}
