import React, { useState } from "react";

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

import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Remove from "@material-ui/icons/Remove";

import { CollapseTitle, CollapseBody } from "./styles";

import { DaysMask, MoneyMask, DurationMask } from "../../../helpers/Masks";

export default function ServiceForm(props) {
  const [state, setState] = useState({
    cost: 0,
    price: 0,
    duration: "00:00",
    petKind: { slug: "dog", name: "Cachorro" },
    breeds: [],
    sizes: [
      { x: ["Pequeno", "Médio", "Grande", "Gigante"] },
      { y: ["Curto", "Médio", "Longo"] },
    ],
    priceBreedOpen: true,
    priceSizeOpen: true,
  });
  const [breeds, setBreeds] = useState([
    { slug: "pinscher", name: "Affenpinchser" },
    { slug: "dog", name: "Alemao" },
    { slug: "adaiw", name: "AShduahduw" },
    { slug: "pinscdaiwjd", name: "PianduaduUs" },
  ]);

  return (
    <Grid container justify="center" alignItems="center" className="margin-t-3">
      <Grid
        container
        justify="space-between"
        alignItems="center"
        spacing={3}
        className="margin-b-4"
      >
        <Grid item xs={4}>
          <InputLabel>Custo</InputLabel>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            value={state.cost}
            InputProps={{
              inputComponent: MoneyMask,
            }}
            onChange={(e) => setState({ ...state, cost: e.target.value })}
          />
        </Grid>
        <Grid item xs={4}>
          <InputLabel>Preço</InputLabel>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            value={state.price}
            InputProps={{
              inputComponent: MoneyMask,
            }}
            onChange={(e) => setState({ ...state, price: e.target.value })}
          />
        </Grid>
        <Grid item xs={4}>
          <InputLabel>Duração</InputLabel>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            value={state.duration}
            InputProps={{
              inputComponent: DurationMask,
            }}
            onChange={(e) => setState({ ...state, duration: e.target.value })}
          />
        </Grid>
      </Grid>

      <Grid container className="margin-b-4">
        <CollapseTitle container justify="space-between" alignItems="center">
          <Typography variant="body2">
            Variação de preço: Raça e pelagem
          </Typography>
          <IconButton
            onClick={() =>
              setState({ ...state, priceBreedOpen: !state.priceBreedOpen })
            }
          >
            {!!state.priceBreedOpen ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </CollapseTitle>
        <CollapseBody in={state.priceBreedOpen}>
          <Grid container direction="column">
            <Grid
              container
              justify="space-between"
              alignItems="center"
              spacing={6}
            >
              <Grid item xs={6}>
                <InputLabel>Tipo</InputLabel>
                <Select
                  fullWidth
                  defaultValue="dog"
                  variant="outlined"
                  size="small"
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
                <InputLabel>Raça</InputLabel>
                <Select
                  multiple
                  value={state.breeds}
                  onChange={(e) =>
                    setState({
                      ...state,
                      breeds: e.target.value,
                    })
                  }
                  variant="outlined"
                  size="small"
                  fullWidth
                  renderValue={(selected) => (
                    <Grid container wrap="wrap">
                      {selected.map((value) => (
                        <Chip key={value} label={value.name} className="m-1" />
                      ))}
                    </Grid>
                  )}
                >
                  {breeds.map((item) => (
                    <MenuItem key={item.slug} value={item}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
            </Grid>

            <Grid
              container
              direction="column"
              spacing={1}
              className="margin-t-5"
            >
              {state.breeds.map((item) => (
                <Grid item>
                  <Grid container spacing={1}>
                    <Grid item xs={1} className="margin-r-2">
                      {item.name}
                    </Grid>
                    <Grid item>
                      <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        value=""
                        onChange={() => {}}
                        InputProps={{
                          inputComponent: MoneyMask,
                        }}
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        value=""
                        onChange={() => {}}
                        InputProps={{
                          inputComponent: MoneyMask,
                        }}
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        value=""
                        onChange={() => {}}
                        InputProps={{
                          inputComponent: MoneyMask,
                        }}
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        value=""
                        onChange={() => {}}
                        InputProps={{
                          inputComponent: MoneyMask,
                        }}
                      />
                    </Grid>
                    <Grid item xs={1}>
                      <Button variant="contained">
                        <Remove fontSize="small" />
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </CollapseBody>
      </Grid>

      <Grid container className="margin-b-4">
        <CollapseTitle container justify="space-between" alignItems="center">
          <Typography variant="body2">
            Variação de preço: Porte e pelagem
          </Typography>
          <IconButton
            onClick={() =>
              setState({ ...state, priceSizeOpen: !state.priceSizeOpen })
            }
          >
            {!!state.priceSizeOpen ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </CollapseTitle>
        <CollapseBody in={state.priceSizeOpen}>
          <Grid container direction="column">
            <Grid
              container
              direction="column"
              spacing={1}
              className="margin-t-5"
            >
              <Grid item>
                <Grid container spacing={3}>
                  <Grid item xs={1}></Grid>
                  <Grid item className="flex-1">
                    <Typography variant="body2">Pequeno</Typography>
                  </Grid>
                  <Grid item className="flex-1">
                    <Typography variant="body2">Médio</Typography>
                  </Grid>
                  <Grid item className="flex-1">
                    <Typography variant="body2">Grande</Typography>
                  </Grid>
                  <Grid item className="flex-1">
                    <Typography variant="body2">Gigante</Typography>
                  </Grid>
                  <Grid item xs={1}></Grid>
                </Grid>
              </Grid>

              <Grid item>
                <Grid container spacing={1}>
                  <Grid item xs={1}>
                    <Typography variant="body2">Curto</Typography>
                  </Grid>
                  <Grid item>
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      value=""
                      onChange={() => {}}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      value=""
                      onChange={() => {}}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      value=""
                      onChange={() => {}}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      value=""
                      onChange={() => {}}
                    />
                  </Grid>
                  <Grid item xs={1}>
                    <Button variant="contained">
                      <Remove fontSize="small" />
                    </Button>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item>
                <Grid container spacing={1}>
                  <Grid item xs={1}>
                    <Typography variant="body2">Médio</Typography>
                  </Grid>
                  <Grid item>
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      value=""
                      onChange={() => {}}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      value=""
                      onChange={() => {}}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      value=""
                      onChange={() => {}}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      value=""
                      onChange={() => {}}
                    />
                  </Grid>
                  <Grid item xs={1}>
                    <Button variant="contained">
                      <Remove fontSize="small" />
                    </Button>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item>
                <Grid container spacing={1}>
                  <Grid item xs={1}>
                    <Typography variant="body2">Longo</Typography>
                  </Grid>
                  <Grid item>
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      value=""
                      onChange={() => {}}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      value=""
                      onChange={() => {}}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      value=""
                      onChange={() => {}}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      value=""
                      onChange={() => {}}
                    />
                  </Grid>
                  <Grid item xs={1}>
                    <Button variant="contained">
                      <Remove fontSize="small" />
                    </Button>
                  </Grid>
                </Grid>
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
            <InputLabel>Enviar após</InputLabel>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              InputProps={{
                inputComponent: DaysMask,
              }}
            />
          </Grid>
          <Grid item md={6}>
            <InputLabel>Mensagem</InputLabel>
            <TextField fullWidth variant="outlined" size="small" multiline />
          </Grid>
        </Grid>
      </Grid>

      <Grid container justify="center" className="margin-b-4">
        <Button variant="contained" className="padding-l-5 padding-r-5">
          Salvar
        </Button>
      </Grid>
    </Grid>
  );
}
