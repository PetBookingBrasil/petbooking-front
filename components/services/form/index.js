import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ServicePriceRuleActions from '../../../store/reducers/servicePriceRule'
import BusinessServiceActions from '../../../store/reducers/businessService'
import ServiceActions from '../../../store/reducers/service'
import FormHelperText from '@material-ui/core/FormHelperText';
import { getBusinessServiceByBusiness } from '../../../helpers/business_services'
import CurrencyInput, { formatterCurrency } from '../../../helpers/currencyInput'
import DurationInput from '../../../helpers/durationInput'

import { toast } from 'react-toastify'

import Grid from '@material-ui/core/Grid'
import InputLabel from '@material-ui/core/InputLabel'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Chip from '@material-ui/core/Chip'
import CircularProgress from '@material-ui/core/CircularProgress'

import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'

import { CollapseTitle, CollapseBody } from './styles'

import { DaysMask, MoneyMask, DurationMask } from '../../../helpers/masks'
import { getPriceByService } from '../../../helpers/business_service_prices'
import { isFranchiseer } from '../../../helpers/business'

export default function Form({ newService, services, categories }) {
  const dispatch = useDispatch()
  let { service, servicePriceRule, businessService, business } = useSelector(
    ({ service, servicePriceRule, businessService, business }) => ({
      service,
      servicePriceRule,
      businessService,
      business,
    })
  )
  
  const { business_services: BusinessServices } = newService
  const businessServiceFromService = getBusinessServiceByBusiness(BusinessServices)
  businessService = businessServiceFromService || businessService.data
  
  const duration = () => {
    if (businessService.duration !== 'zero') {
      return businessService.duration_mask;
    }
  
    if (newService.duration !== 'zero') {
      return newService.duration_mask;
    }
    
    return '';
  };
  
  const [state, setState] = useState({
    id: newService.id,
    name: newService.name,
    description: newService.description,
    category: newService.service_category_id,
    ancestry: newService.ancestry,
    cost: !!newService.cost ? formatterCurrency(newService.cost) : formatterCurrency(businessService.cost) || 0,
    price: businessService ? formatterCurrency(businessService.price) : !!newService.price && formatterCurrency(newService.price) || 0,
    duration: duration(),
    aliquot: !!newService.aliquot ? newService.aliquot : '',
    issType: !!newService.iss_type ? newService.iss_type : '2',
    municipalCode: !!newService.municipal_code ? newService.municipal_code : '',
    sendAfter: !!newService.reschedule_reminder_days_after
      ? newService.reschedule_reminder_days_after
      : '',
    sendAfterMessage: !!newService.reschedule_reminder_message
      ? newService.reschedule_reminder_message
      : '',
    petKind: { slug: 'dog', name: 'Cachorro' },
    breeds: [],
    rulesOpen: [],
  })
  
  const additionalServices = (categories.filter(c => c.id === state.category)[0] || {}).services
  
  const [formattedRules, setFormattedRules] = useState([])
  
  useEffect(() => {
    dispatch(ServicePriceRuleActions.rulesRequest())
    dispatch(ServicePriceRuleActions.breedsRequest('dog'))
  }, [])
  
  useEffect(() => {
    setState({
      ...state,
      rulesOpen: servicePriceRule.data.map((_item) => false),
    })
    
    // Handles only "regular" kind for now
    const formatted = servicePriceRule.data
      .filter(
        (item) =>
          !item.service_price_variations.some((inner) => inner.kind === 'breed')
      )
      .map((item) => ({
        id: item.id,
        kind: item.service_price_variations.some(
          (inner) => inner.kind === 'breed'
        )
          ? 'breed'
          : 'regular',
        combinations: {
          dimensions: item.service_price_variations.length,
          columns: item.service_price_variations[0].variations.length,
          rows: item.service_price_variations[1].variations.length,
          xLabels: item.service_price_variations[0].variations,
          yLabels: item.service_price_variations[1].variations,
          data: item.service_price_combinations.map((inner) => ({
            ...inner,
            price: state.id === undefined ? 0 : formatterCurrency((getPriceByService(inner.business_service_prices, state) || {}).price)
          })),
        },
      }))
    
    setFormattedRules(formatted)
  }, [servicePriceRule.data])
  
  useEffect(() => {
    dispatch(ServicePriceRuleActions.breedsRequest(state.petKind))
  }, [state.petKind])
  
  const handleSave = () => {
    if (!!service.saving) return
    
    if (!!!state.name || !!!state.price || !!!state.duration) {
      toast.error('Verifique os campos obrigatórios, por favor')
      return
    }
    
    if (isFranchiseer(business.data)) {
      if (newService.id === undefined) {
        dispatch(ServiceActions.createServiceRequest({ ...state, rules: formattedRules }))
      } else {
        dispatch(ServiceActions.updateServiceRequest({ ...state, rules: formattedRules }))
      }
    } else {
      if (businessService.id === undefined) {
        dispatch(BusinessServiceActions.createBusinessServiceRequest({ ...state, rules: formattedRules }))
      } else {
        dispatch(BusinessServiceActions.updateBusinessServiceRequest(
          { ...state, rules: formattedRules, service: newService, id: businessService.id })
        )
      }
    }
  }
  
  return (
    <Grid container justify="center" alignItems="center">
      <Grid
        container
        justify="space-between"
        alignItems="flex-start"
        spacing={3}
        className="margin-b-0"
      >
        <Grid item xs={4}>
          <InputLabel className="margin-b-0">Nome</InputLabel>
          <TextField
            fullWidth
            variant="outlined"
            value={state.name}
            onChange={(e) => setState({ ...state, name: e.target.value })}
          />
        </Grid>

        <Grid item xs={4}>
          <InputLabel className="margin-b-0">Categoria mãe</InputLabel>
          <Select
            variant="outlined"
            disabled={!isFranchiseer(business.data)}
            fullWidth
            onChange={(e) => setState({ ...state, category: e.target.value })}
            value={state.category}
            defaultValue={state.category}
            className="margin-b-0"
          >
            {categories.map((item, i) => {
              <FormHelperText>Placeholder</FormHelperText>
              return <MenuItem key={i} value={item.id}>
                {item.name}
              </MenuItem>
            })
            }
          </Select>
        </Grid>
        
        <Grid item xs={4}>
          <InputLabel className="margin-b-0">Serviço adicional de</InputLabel>
          <Select
            disabled={!isFranchiseer(business.data)}
            variant="outlined"
            fullWidth
            onChange={(e) => setState({ ...state, ancestry: e.target.value })}
            className="margin-b-0"
          >
            <MenuItem value="">Nenhum</MenuItem>
            {additionalServices && additionalServices.map((item, i) => (
              <MenuItem key={i} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </Grid>
      </Grid>
      
      <Grid
        container
        justify="space-between"
        alignItems="flex-start"
        spacing={3}
        className="margin-b-0"
      >
        
        <Grid item xs={4}>
          <InputLabel className="margin-b-0">Preço</InputLabel>
          <TextField
            fullWidth
            variant="outlined"
            value={state.price}
            InputProps={{
              inputComponent: CurrencyInput
            }}
            onChange={(e) => setState({ ...state, price: e.target.value })}
          />
        </Grid>
        
        <Grid item xs={4}>
          <InputLabel className="margin-b-0">Duração</InputLabel>
          <TextField
            fullWidth
            variant="outlined"
            value={state.duration}
            InputProps={{
              inputComponent: DurationInput,
            }}
            onChange={(e) => setState({ ...state, duration: e.target.value })}
          />
        </Grid>
        
        <Grid item xs={4}>
          <InputLabel className="margin-b-0">Custo</InputLabel>
          <TextField
            fullWidth
            variant="outlined"
            value={state.cost}
            InputProps={{
              inputComponent: CurrencyInput,
            }}
            onChange={(e) => setState({ ...state, cost: e.target.value })}
          />
        </Grid>
      </Grid>
      
      <Grid container className="margin-b-2">
        <Grid item xs={12}>
          <InputLabel className="margin-b-0">Descrição do serviço</InputLabel>
          <TextField
            fullWidth
            variant="outlined"
            multiline
            value={state.description}
            onChange={(e) =>
              setState({ ...state, description: e.target.value })
            }
          />
        </Grid>
      </Grid>
      
      {formattedRules.map((item, i) => {
        return (
          <Grid container className="margin-b-4" key={i}>
            <CollapseTitle container justify="space-between" alignItems="center"
                           onClick={() =>
                             setState({
                               ...state,
                               rulesOpen: state.rulesOpen.map((inner, j) =>
                                 i === j ? !inner : inner
                               ),
                             })} >
              <Typography variant="body2">
                Variação de preço: {item.name}
              </Typography>
              <IconButton
              >
                {!!state.rulesOpen[i] ? <ExpandLess/> : <ExpandMore/>}
              </IconButton>
            </CollapseTitle>
            <CollapseBody in={state.rulesOpen[i]}>
              <Grid container direction="column">
                <Grid
                  container
                  direction="column"
                  spacing={1}
                  className="margin-t-5"
                >
                  {item.kind === 'breed' && (
                    <>
                      <Grid
                        container
                        justify="space-between"
                        alignItems="center"
                        spacing={6}
                      >
                        <Grid item xs={6}>
                          <InputLabel className="margin-b-0">Tipo</InputLabel>
                          <Select
                            fullWidth
                            defaultValue="dog"
                            variant="outlined"
                            value={state.petKind}
                            onChange={(e) =>
                              setState({ ...state, petKind: e.target.value })
                            }
                          >
                            <MenuItem value="dog">Cachorro</MenuItem>
                            <MenuItem value="cat">Gato</MenuItem>
                            <MenuItem value="pig">Porco</MenuItem>
                          </Select>
                        </Grid>
                        <Grid item xs={6}>
                          <InputLabel className="margin-b-0">Raça</InputLabel>
                          <Select
                            multiple
                            value={state.breeds}
                            onChange={(e) => {
                              setState({
                                ...state,
                                breeds: [...state.breeds, e.target.value].flat(),
                              })
                            }}
                            variant="outlined"
                            fullWidth
                            renderValue={(selected) => (
                              <Grid container wrap="wrap">
                                {selected.map((value) => (
                                  <Chip
                                    key={value}
                                    label={value.name}
                                    className="m-1"
                                    onClick={() =>
                                      setState({
                                        ...state,
                                        breeds: state.breeds.filter(
                                          (inner) => inner.slug !== value.slug
                                        ),
                                      })
                                    }
                                  />
                                ))}
                              </Grid>
                            )}
                          >
                            {servicePriceRule.breeds.map((item) => (
                              <MenuItem key={item.id} value={item}>
                                {item.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </Grid>
                      </Grid>
                    </>
                  )}
                  
                  {!item.kind === 'breed' && (
                    <Grid item>
                      <Grid
                        container
                        justify="center"
                        alignItems="center"
                        spacing={3}
                      >
                        <Grid item xs={1}></Grid>
                        {item.service_price_variations[0].variations.map(
                          (inner, j) => (
                            <Grid
                              item
                              xs={parseInt(
                                11 /
                                item.service_price_variations[0].variations
                                  .length
                              )}
                              className="flex-1"
                            >
                              <Typography variant="body2">{inner}</Typography>
                            </Grid>
                          )
                        )}
                      </Grid>
                    </Grid>
                  )}
                  
                  <Grid container justify="center" wrap="flex-wrap" spacing={3}>
                    {item.combinations.data.map((inner, j) => {
                      return (<Grid item xs={parseInt(12 / item.combinations.rows)}>
                        <TextField
                          InputLabelProps={{
                            shrink: true,
                          }}
                          placeholder={"R$ 00.00"}
                          value={inner.price}
                          variant="outlined"
                          label={inner.name}
                          fullWidth
                          onChange={(e) =>
                            setFormattedRules(
                              formattedRules.map((rule, k) => {
                                return k === i
                                  ? {
                                    ...rule,
                                    combinations: {
                                      ...rule.combinations,
                                      data: rule.combinations.data.map(
                                        (c, ci) => {
                                          return ci === j
                                            ? {
                                              ...c,
                                              price: e.target.value,
                                            }
                                            : c
                                        }),
                                    },
                                  }
                                  : rule
                              })
                            )
                          }
                          InputProps={{
                            inputComponent: CurrencyInput
                          }}
                        />
                      </Grid>)
                    })}
                  </Grid>
                </Grid>
              </Grid>
            </CollapseBody>
          </Grid>
        )
      })}
      
      <Grid container className="margin-b-4">
        <CollapseTitle onClick={() =>
          setState({ ...state, fiscalOpen: !state.fiscalOpen })
        } container justify="space-between" alignItems="center">
          <Typography variant="body2">Configurações fiscais</Typography>
          <IconButton>
            {!!state.fiscalOpen ? <ExpandLess/> : <ExpandMore/>}
          </IconButton>
        </CollapseTitle>
        <CollapseBody in={state.fiscalOpen}>
          <Grid container direction="column">
            <Grid container spacing={3} className="margin-t-5">
              <Grid item md={6}>
                <InputLabel className="margin-b-0">
                  Alíquota em %. EX: 2,0
                </InputLabel>
                
                <TextField
                  fullWidth
                  variant="outlined"
                  value={state.aliquot}
                  onChange={(e) =>
                    setState({ ...state, aliquot: e.target.value })
                  }
                />
                
                <InputLabel className="margin-b-0 margin-t-1">
                  Tipo de ISS (1 - Retido / 2- Sem ISS Retido)
                </InputLabel>
                
                <TextField
                  fullWidth
                  variant="outlined"
                  value={state.issType}
                  onChange={(e) =>
                    setState({ ...state, issType: e.target.value })
                  }
                />
              </Grid>
              
              <Grid item md={6}>
                <InputLabel className="margin-b-0">
                  Código municipal do serviço
                </InputLabel>
                
                <TextField
                  fullWidth
                  variant="outlined"
                  value={state.municipalCode}
                  onChange={(e) =>
                    setState({ ...state, municipalCode: e.target.value })
                  }
                />
              </Grid>
            </Grid>
          </Grid>
        </CollapseBody>
      </Grid>
      
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        className="margin-b-4"
      >
        <Grid item className="margin-b-2">
          <Typography variant="body1">
            Lembrete de retorno (mensagem de pós venda)
          </Typography>
        </Grid>
        <Grid container alignItems="flex-start" spacing={3}>
          <Grid item md={6}>
            <InputLabel className="margin-b-0">Enviar após</InputLabel>
            <TextField
              fullWidth
              variant="outlined"
              InputProps={{
                inputComponent: DaysMask,
              }}
              value={state.sendAfter}
              onChange={(e) =>
                setState({ ...state, sendAfter: e.target.value })
              }
            />
          </Grid>
          <Grid item md={6}>
            <InputLabel className="margin-b-0">Mensagem</InputLabel>
            <TextField
              fullWidth
              multiline
              variant="outlined"
              multiline
              value={state.sendAfterMessage}
              onChange={(e) =>
                setState({ ...state, sendAfterMessage: e.target.value })
              }
            />
          </Grid>
        </Grid>
      </Grid>
      
      <Grid container justify="center" className="margin-b-4">
        <Button
          variant="contained"
          className="padding-l-4 padding-r-4"
          onClick={handleSave}
          endIcon={
            !!service.saving && <CircularProgress size={20} className="white"/>
          }
        >
          Salvar
        </Button>
      </Grid>
    </Grid>
  )
}
