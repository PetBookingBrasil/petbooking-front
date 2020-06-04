import { useState, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import EmploymentActions from "../../store/reducers/employment";
import ServiceCategoryActions from "../../store/reducers/serviceCategory";

import Divider from "@material-ui/core/Divider";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

import SiteHeader from "../../components/header";

import Header from "../../components/services/header";
import Employments from "../../components/services/employments";
import ServiceCategories from "../../components/services/serviceCategories";
import ServiceInput from "../../components/services/serviceInput";
import ServiceForm from "../../components/services/serviceForm";
import CustomDialog from "../../components/services/customDialog";

import Container from "../../components/container";

export default function ServicesPage() {
  const dispatch = useDispatch();
  const { employment, serviceCategory } = useSelector(
    ({ employment, serviceCategory }) => ({
      employment,
      serviceCategory,
    })
  );

  const [data, setData] = useState({
    employment: {},
    addStep: 0,
    service: 0,
    newCategory: { open: false, name: "", parent: "" },
  });

  const setFirstEmployment = () => {
    if (!!employment.data.length) {
      setData({ ...data, employment: employment.data[0] });
    }
  };

  useEffect(() => {
    dispatch(ServiceCategoryActions.serviceCategoriesRequest());
    dispatch(EmploymentActions.employmentsRequest());
  }, []);

  console.log(employment);
  console.log(serviceCategory);

  return (
    <Container>
      <SiteHeader></SiteHeader>

      <Header
        employment={data.employment}
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
          {!!employment.fetching && (
            <Grid
              container
              justify="center"
              alignItems="center"
              className="margin-b-4"
            >
              <CircularProgress color="default" />
            </Grid>
          )}

          {!!!employment.fetching && !!employment.data.length && (
            <Employments
              data={employment.data}
              employment={data.employment}
              setEmployee={(e) => setData({ ...data, employment: e })}
            />
          )}

          {!!serviceCategory.fetching && (
            <Grid
              container
              justify="center"
              alignItems="center"
              className="margin-t-4"
            >
              <CircularProgress color="default" />
            </Grid>
          )}
          {!!!serviceCategory.fetching && (
            <ServiceCategories
              data={serviceCategory.data}
              employment={data.employment}
              setEmployee={(e) => {
                if (!!!e.service_categories) {
                  setData({
                    ...data,
                    employment: employment.data.find(
                      (item) => item.id === e.id
                    ),
                  });
                } else {
                  setData({ ...data, employment: e });
                }
              }}
              setFirstEmployment={setFirstEmployment}
            />
          )}
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
