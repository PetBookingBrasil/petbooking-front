import { useState, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import EmploymentActions from "../../store/reducers/employment";
import ServiceCategoryActions from "../../store/reducers/serviceCategory";

import Divider from "@material-ui/core/Divider";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
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
    newCategory: { open: false, name: "", ancestry: "" },
  });

  const setFirstEmployment = () => {
    if (!!employment.data.length) {
      setData({ ...data, employment: employment.data[0] });
    }
  };

  useEffect(() => {
    document.addEventListener("scroll", trackScrolling);

    dispatch(ServiceCategoryActions.serviceCategoriesRequest());
    dispatch(EmploymentActions.employmentsRequest());
    return () => {
      document.removeEventListener("scroll", trackScrolling);
    };
  }, []);

  useEffect(() => {
    if (serviceCategory.meta.page > 1)
      dispatch(ServiceCategoryActions.serviceCategoriesRequest());
  }, [serviceCategory.meta.page]);

  const isBottom = () => {
    return (
      document.scrollingElement.scrollHeight -
        document.scrollingElement.scrollTop ===
      document.scrollingElement.clientHeight
    );
  };

  const trackScrolling = () => {
    if (isBottom() && !!!serviceCategory.fetching) {
      dispatch(
        ServiceCategoryActions.setMeta({
          ...serviceCategory.meta,
          page: serviceCategory.meta.page + 1,
        })
      );
    }
  };

  const handleSaveCategory = () => {
    if (!!!serviceCategory.saving)
      dispatch(
        ServiceCategoryActions.createServiceCategoryRequest(data.newCategory)
      );
  };

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
              <CircularProgress />
            </Grid>
          )}

          {!!!employment.fetching && (
            <Employments
              data={employment.data}
              employment={data.employment}
              setEmployment={(e) => {
                setData({ ...data, employment: e });
                if (!!!e.id)
                  dispatch(
                    ServiceCategoryActions.setMeta({
                      ...serviceCategory.meta,
                      page: 1,
                    })
                  );
                dispatch(ServiceCategoryActions.serviceCategoriesRequest());
              }}
            />
          )}

          <ServiceCategories
            data={serviceCategory.data}
            employment={data.employment}
            setEmployment={(e) => {
              if (!!!e.service_categories) {
                setData({
                  ...data,
                  employment: employment.data.find((item) => item.id === e.id),
                });
              } else {
                setData({ ...data, employment: e });
              }
            }}
            setFirstEmployment={setFirstEmployment}
          />

          {!!serviceCategory.fetching && (
            <Grid
              container
              justify="center"
              alignItems="center"
              className="margin-t-4"
            >
              <CircularProgress />
            </Grid>
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
          <InputLabel className="margin-b-0">Nome</InputLabel>
          <TextField
            variant="outlined"
            placeholder="Nome da categoria"
            value={data.newCategory.name}
            fullWidth
            size="small"
            onChange={(e) =>
              setData({
                ...data,
                newCategory: { ...data.newCategory, name: e.target.value },
              })
            }
            className="margin-b-3"
          />

          <InputLabel className="margin-b-0">Categoria filha de</InputLabel>
          <Select
            variant="outlined"
            fullWidth
            size="small"
            onChange={(e) =>
              setData({
                ...data,
                newCategory: { ...data.newCategory, ancestry: e.target.value },
              })
            }
            className="margin-b-3"
          >
            <MenuItem value="">Nenhum</MenuItem>
            {serviceCategory.data.map((item, i) => (
              <MenuItem key={i} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </DialogContent>
        <DialogActions>
          <Grid container justify="space-between">
            <Grid item md={6}>
              <Button
                variant="contained"
                color="secondary"
                onClick={() =>
                  setData({ ...data, newCategory: { open: false } })
                }
              >
                Cancelar
              </Button>
            </Grid>
            <Grid item md={6} className="d-flex justify-end">
              <Button
                variant="contained"
                color="primary"
                onClick={handleSaveCategory}
                endIcon={
                  !!serviceCategory.saving && (
                    <CircularProgress size={20} className="white" />
                  )
                }
              >
                Salvar
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </CustomDialog>
    </Container>
  );
}
