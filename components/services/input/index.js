import React from 'react'

import { Grid, TextField } from '@material-ui/core'
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete'
import { useDispatch, useSelector } from 'react-redux'
import ServiceActions from '../../../store/reducers/service'
import { isFranchiseer } from '../../../helpers/business'

export default function Input({ categories, setCategory, business}) {
  const dispatch = useDispatch()
  const filter = createFilterOptions();
  
  let { service } = useSelector(
    ({ service }) => ({
      service
    })
  )
  
  const isBusinessSync = categories[0].date_last_sync.length > 0
  
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
        getOptionLabel={(option) => option.title || option.name}
        noOptionsText="Não encontramos nenhum serviço com esse nome"
        onKeyUp={onChangeHandler}
        onChange={onChangeHandler}
        fullWidth
        filterOptions={(options, params) => {
          const filtered = filter(options, params);
          
          if (isFranchiseer(business) &&
            filtered.length === 0 && service.action_type === 'SEARCH_SERVICES_REQUEST' && !isBusinessSync) {
            filtered.push({ name: params.inputValue, title: `Criar ${params.inputValue}` });
          }
  
          return filtered;
        }}
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
