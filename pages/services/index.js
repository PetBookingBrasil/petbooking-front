import { useState } from "react";

import {
  Divider,
  DialogContent,
  DialogActions,
  InputLabel,
  TextField,
  Grid,
  Button,
} from "@material-ui/core";

import SiteHeader from "../../components/header";
import Container from "../../components/container";

import Header from "../../components/services/header";
import Employees from "../../components/services/employees";
import Services from "../../components/services/services";
import ServiceInput from "../../components/services/serviceInput";
import ServiceForm from "../../components/services/serviceForm";
import CustomDialog from "../../components/services/customDialog";

export default function ServicesPage() {
  const props = {
    employees: [],
    service_categories: [],
  };
  const [state, setState] = useState({
    employee: {},
    addStep: 0,
    service: 0,
    newCategory: { open: false, name: "", parent: "" },
  });

  const setFirstEmployee = () => {
    if (!!props.employees.length) {
      setState({ ...state, employee: props.employees[0] });
    }
  };

  return (
    <Container>
      <SiteHeader></SiteHeader>

      <Header
        employee={state.employee}
        showBack={state.addStep > 0}
        backAction={() => setState({ ...state, addStep: 0 })}
        addService={() => setState({ ...state, addStep: 1 })}
        addCategory={() => setState({ ...state, newCategory: { open: true } })}
        addStep={state.addStep}
        service={state.service}
      />

      <Divider className="margin-t-3 margin-b-3" />

      {state.addStep === 0 && (
        <React.Fragment>
          {!!props.employees.length && (
            <Employees
              data={props.employees}
              employee={state.employee}
              setEmployee={(e) => setState({ ...state, employee: e })}
            />
          )}
          <Services
            data={
              !!state.employee.id
                ? state.employee.service_categories
                : props.service_categories
            }
            employee={state.employee}
            setEmployee={(e) => {
              if (!!!e.service_categories) {
                setState({
                  ...state,
                  employee: props.employees.find((item) => item.id === e.id),
                });
              } else {
                setState({ ...state, employee: e });
              }
            }}
            setFirstEmployee={setFirstEmployee}
          />
        </React.Fragment>
      )}
      {state.addStep === 1 && (
        <ServiceInput
          services={[{ id: 1, name: "Banho" }]}
          setService={(e) => {
            setState({ ...state, service: e, addStep: state.addStep + 1 });
          }}
        />
      )}
      {state.addStep === 2 && <ServiceForm service={state.service} />}

      <CustomDialog
        header="Adicionar categoria"
        open={state.newCategory.open}
        onClose={() => setState({ ...state, newCategory: { open: false } })}
      >
        <DialogContent>
          <InputLabel>Nome</InputLabel>
          <TextField
            variant="outlined"
            placeholder="Nome da categoria"
            value={state.newCategory.name}
            fullWidth
            size="small"
            onChange={(e) => setComission(e.target.value)}
            className="mb-3"
          />

          <InputLabel>Categoria filha de</InputLabel>
          <TextField
            variant="outlined"
            placeholder="HH:MM"
            value={state.newCategory.parent}
            fullWidth
            size="small"
            onChange={(e) => setDuration(e.target.value)}
            className="mb-3"
          />
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
    </Container>
  );
}
