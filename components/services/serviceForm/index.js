import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ServiceActions from "../../../store/reducers/service";
import ServicePriceRuleActions from "../../../store/reducers/servicePriceRule";

import { toast } from "react-toastify";

import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import Collapse from "@material-ui/core/Collapse";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Chip from "@material-ui/core/Chip";
import CircularProgress from "@material-ui/core/CircularProgress";

import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Remove from "@material-ui/icons/Remove";

import { CollapseTitle, CollapseBody } from "./styles";

import { DaysMask, MoneyMask, DurationMask } from "../../../helpers/Masks";

export default function ServiceForm({ newService, services, categories }) {
  const dispatch = useDispatch();
  const { service, servicePriceRule } = useSelector(
    ({ service, servicePriceRule }) => ({
      service,
      servicePriceRule,
    })
  );

  const [state, setState] = useState({
    name: newService.category.name,
    category: newService.category.id,
    ancestry: newService.ancestry,
    cost: 0,
    price: 0,
    duration: "00:00",
    aliquot: "",
    issType: "2",
    municipalCode: "",
    sendAfter: "",
    sendAfterMessage: "",
    petKind: { slug: "dog", name: "Cachorro" },
    breeds: [],
    sizes: [
      { x: ["Pequeno", "Médio", "Grande", "Gigante"] },
      { y: ["Curto", "Médio", "Longo"] },
    ],
    rulesOpen: [],
  });
  const [rules, setRules] = useState([]);

  useEffect(() => {
    dispatch(ServicePriceRuleActions.rulesRequest());
    //dispatch(ServicePriceRuleActions.pricesRequest());
    dispatch(ServicePriceRuleActions.breedsRequest("dog"));
  }, []);

  useEffect(() => {
    setState({
      ...state,
      rulesOpen: servicePriceRule.data.map((item) => false),
    });
    setRules(servicePriceRule.data);
  }, [servicePriceRule.data]);

  useEffect(() => {
    dispatch(ServicePriceRuleActions.breedsRequest(state.petKind));
  }, [state.petKind]);

  const handleSave = () => {
    if (!!service.saving) return;

    if (!!!state.name || !!!state.price || !!!state.duration) {
      toast.error("Verifique os campos obrigatórios, por favor");
      return;
    }
    dispatch(ServiceActions.createServiceRequest({ ...state, rules }));
  };

  const handleServicePriceChange = (item, value) => {
    const newChanged = [...changedPrices];
    const exists = !!newChanged.find((inner) => item.id === inner.id);

    if (exists) {
      newChanged.map((inner) =>
        item.id === inner.id ? { ...inner, price: value } : inner
      );
      setChangedPrices(newChanged);
    } else {
      setChangedPrices([...newChanged, { ...item, price: value }]);
    }
  };

  const CombinationRows = ({ rule, isBreed }) => {
    const newCombinations = [...rule.service_price_combinations];

    const rows = [],
      size = rule.service_price_variations[0].variations.length;

    while (newCombinations.length > 0)
      rows.push(newCombinations.splice(0, size));

    return rows.map((item, i) => {
      // const breed =
      //   !!isBreed && servicePriceRule.breeds.length
      //     ? servicePriceRule.breeds.find(
      //         (breed) => breed.id === item.slug.split("-")[0]
      //       )
      //     : {};

      return (
        <Grid item>
          <Grid container justify="center" alignItems="center" spacing={1}>
            <Grid item xs={1}>
              <Typography variant="body2">
                {isBreed
                  ? breed.name
                  : rule.service_price_variations[1].variations[i]}
              </Typography>
            </Grid>

            {!isBreed &&
              item.map((inner, j) => (
                <Grid
                  item
                  xs={parseInt(
                    11 / rule.service_price_variations[0].variations.length
                  )}
                >
                  <TextField
                    fullWidth
                    variant="outlined"
                    value={parseFloat(inner.business_service_price.price)}
                    onChange={(e) => {
                      setRules(
                        rules.map((r) =>
                          r.id === rule.id
                            ? {
                                ...r,
                                service_price_combinations: r.service_price_combinations.map(
                                  (c) =>
                                    c.id === inner.id
                                      ? {
                                          ...c,
                                          business_service_price: {
                                            ...c.business_service_price,
                                            price: e.target.value,
                                          },
                                        }
                                      : c
                                ),
                              }
                            : r
                        )
                      );
                    }}
                  />
                </Grid>
              ))}

            {!!isBreed &&
              item
                .filter((inner) => inner.slug)
                .map((inner, j) => (
                  <Grid
                    item
                    xs={parseInt(
                      11 / rule.service_price_variations[0].variations.length
                    )}
                  >
                    <TextField
                      fullWidth
                      variant="outlined"
                      value={
                        !!inner.business_service_price
                          ? inner.business_service_price.price
                          : 0
                      }
                      onChange={() => {}}
                    />
                  </Grid>
                ))}
          </Grid>
        </Grid>
      );
    });
  };

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
          <InputLabel className="margin-b-0">Serviço adicional de</InputLabel>
          <Select
            variant="outlined"
            fullWidth
            onChange={(e) => setState({ ...state, ancestry: e.target.value })}
            className="margin-b-0"
          >
            <MenuItem value="">Nenhum</MenuItem>
            {services.map((item, i) => (
              <MenuItem key={i} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={4}>
          <InputLabel className="margin-b-0">Preço</InputLabel>
          <TextField
            fullWidth
            variant="outlined"
            value={state.price}
            InputProps={{
              inputComponent: MoneyMask,
            }}
            onChange={(e) => setState({ ...state, price: e.target.value })}
          />
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
          <InputLabel className="margin-b-0">Categoria mãe</InputLabel>
          <Select
            variant="outlined"
            fullWidth
            onChange={(e) => setState({ ...state, category: e.target.value })}
            value={state.category}
            defaultValue={state.category}
            className="margin-b-0"
          >
            {categories.map((item, i) => (
              <MenuItem key={i} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </Grid>

        <Grid item xs={4}>
          <InputLabel className="margin-b-0">Duração</InputLabel>
          <TextField
            fullWidth
            variant="outlined"
            value={state.duration}
            InputProps={{
              inputComponent: DurationMask,
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
              inputComponent: MoneyMask,
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

      {rules
        .filter(
          (item) =>
            !item.service_price_variations.some(
              (inner) => inner.kind === "breed"
            )
        )
        .map((item, i) => (
          <Grid container className="margin-b-4" key={i}>
            <CollapseTitle
              container
              justify="space-between"
              alignItems="center"
            >
              <Typography variant="body2">
                Variação de preço: {item.name}
              </Typography>
              <IconButton
                onClick={() =>
                  setState({
                    ...state,
                    rulesOpen: state.rulesOpen.map((inner, j) =>
                      i === j ? !inner : inner
                    ),
                  })
                }
              >
                {!!state.rulesOpen[i] ? <ExpandLess /> : <ExpandMore />}
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
                  {item.service_price_variations.some(
                    (inner) => inner.kind === "breed"
                  ) && (
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
                              console.log(e.target.value);

                              setState({
                                ...state,
                                breeds: [
                                  ...state.breeds,
                                  e.target.value,
                                ].flat(),
                              });
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
                      <Grid item className="margin-t-2">
                        <Grid
                          container
                          justify="center"
                          alignItems="center"
                          spacing={3}
                        >
                          <Grid item xs={1}></Grid>
                          {item.service_price_variations[1].variations.map(
                            (inner, j) => (
                              <Grid
                                item
                                xs={parseInt(
                                  11 /
                                    item.service_price_variations[1].variations
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
                    </>
                  )}

                  {!item.service_price_variations.some(
                    (inner) => inner.kind === "breed"
                  ) && (
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

                  <CombinationRows
                    rule={item}
                    isBreed={item.service_price_variations.some(
                      (inner) => inner.kind === "breed"
                    )}
                  />
                </Grid>
              </Grid>
            </CollapseBody>
          </Grid>
        ))}

      <Grid container className="margin-b-4">
        <CollapseTitle container justify="space-between" alignItems="center">
          <Typography variant="body2">Configurações fiscais</Typography>
          <IconButton
            onClick={() =>
              setState({ ...state, fiscalOpen: !state.fiscalOpen })
            }
          >
            {!!state.fiscalOpen ? <ExpandLess /> : <ExpandMore />}
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
            !!service.saving && <CircularProgress size={20} className="white" />
          }
        >
          Salvar
        </Button>
      </Grid>
    </Grid>
  );
}
