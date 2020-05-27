import { useState, useContext, useEffect } from "react";

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

import Header from "../../components/services/header";
import Employees from "../../components/services/employees";
import ServiceCategories from "../../components/services/serviceCategories";
import ServiceInput from "../../components/services/serviceInput";
import ServiceForm from "../../components/services/serviceForm";
import CustomDialog from "../../components/services/customDialog";

import Container from "../../components/container";

import { AppContext } from "../../context";

export default function ServicesPage() {
  const { state, dispatch } = useContext(AppContext);

  const props = {
    employees: [],
    service_categories: [],
  };

  const [serviceCategories, setServiceCategories] = useState(
    state.serviceCategory.data
  );

  const [data, setData] = useState({
    employee: {},
    addStep: 0,
    service: 0,
    newCategory: { open: false, name: "", parent: "" },
  });

  const setFirstEmployee = () => {
    if (!!props.employees.length) {
      setData({ ...data, employee: props.employees[0] });
    }
  };

  useEffect(() => {
    dispatch("@serviceCategory/SERVICE_CATEGORIES_REQUEST");
  }, []);

  useEffect(() => {
    setServiceCategories(state.serviceCategory.data);
  }, [state.serviceCategory.data]);

  return (
    <Container>
      <SiteHeader></SiteHeader>

      <Header
        employee={data.employee}
        showBack={data.addStep > 0}
        backAction={() => setData({ ...data, addStep: 0 })}
        addService={() => setData({ ...data, addStep: 1 })}
        addCategory={() => setData({ ...data, newCategory: { open: true } })}
        addStep={data.addStep}
        service={data.service}
      />

      <Divider className="margin-t-3 margin-b-3" />

      {data.addStep === 0 && (
        <React.Fragment>
          {!!props.employees.length && (
            <Employees
              data={props.employees}
              employee={data.employee}
              setEmployee={(e) => setData({ ...data, employee: e })}
            />
          )}
          <ServiceCategories
            data={serviceCategories}
            employee={data.employee}
            setEmployee={(e) => {
              if (!!!e.service_categories) {
                setData({
                  ...data,
                  employee: props.employees.find((item) => item.id === e.id),
                });
              } else {
                setData({ ...data, employee: e });
              }
            }}
            setFirstEmployee={setFirstEmployee}
          />
        </React.Fragment>
      )}

      {data.addStep === 1 && (
        <ServiceInput
          services={[{ id: 1, name: "Banho" }]}
          setService={(e) => {
            setData({ ...data, service: e, addStep: data.addStep + 1 });
          }}
        />
      )}

      {data.addStep === 2 && <ServiceForm service={data.service} />}

      <CustomDialog
        header="Adicionar categoria"
        open={data.newCategory.open}
        onClose={() => setData({ ...data, newCategory: { open: false } })}
      >
        <DialogContent>
          <InputLabel>Nome</InputLabel>
          <TextField
            variant="outlined"
            placeholder="Nome da categoria"
            value={data.newCategory.name}
            fullWidth
            size="small"
            onChange={(e) => setComission(e.target.value)}
            className="margin-b-3"
          />

          <InputLabel>Categoria filha de</InputLabel>
          <TextField
            variant="outlined"
            placeholder="HH:MM"
            value={data.newCategory.parent}
            fullWidth
            size="small"
            onChange={(e) => setDuration(e.target.value)}
            className="margin-b-3"
          />
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
    </Container>
  );
}
