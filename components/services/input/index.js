import React from 'react'

import { Grid, TextField } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { useDispatch, useSelector } from 'react-redux'
import ServiceActions from '../../../store/reducers/service'

export default function Input({ categories, setCategory }) {
  const dispatch = useDispatch()
  
  let { service } = useSelector(
    ({ service }) => ({
      service
    })
  )
  
  const onChangeHandler = (e, item) => {
    const value = e.target.value
    
    setTimeout(function () {
      dispatch(ServiceActions.searchServicesRequest(value))
    }, 500)
    
    if (e.type === 'click') {
      setCategory(item)
    }
  }
  
  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      className="sns-service-input"
    >
      <Autocomplete
        options={service.action_type === 'SEARCH_SERVICES_REQUEST' ? service.data : []}
        getOptionLabel={(option) => option.name}
        noOptionsText="Não encontramos nenhum serviço com esse nome"
        onKeyUp={onChangeHandler}
        onChange={onChangeHandler}
        fullWidth
        renderInput={(params) => (
          <TextField
            {...params}
            label="Busque por um serviço"
            variant="outlined"
            fullWidth
          />
        )}
      />
    </Grid>
  )
}
