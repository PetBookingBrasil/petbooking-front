import { takeLatest, call, put, all, select } from "redux-saga/effects";
import { toast } from "react-toastify";
import api from "../../services/api";
import ServiceActions from "../reducers/service";
import ServiceCategoryActions from "../reducers/serviceCategory";
import ServicePriceRuleActions from "../reducers/servicePriceRule";

export function* index({ data }) {
  const response = yield call(api.services, data);
  if (response.ok) {
    yield put(ServiceActions.servicesSuccess(response.data));
  } else {
    yield put(ServiceActions.servicesFailure(response.data));
  }
}

export function* create({ data }) {
  const response = yield call(api.createService, data);
  if (response.ok) {
    toast.success("Serviço criado com sucesso!");
    yield put(ServiceActions.setStep(0));
    yield put(ServiceCategoryActions.serviceCategoriesRequest());
    yield put(ServiceActions.createServiceSuccess(response.data));

    yield put(ServicePriceRuleActions.updatePricesRequest(data.rules[0]));
  } else {
    toast.error(
      "Ops, ocorreu um erro ao criar seu serviço, por favor, tente novamente"
    );
    yield put(ServiceActions.createServiceFailure(response.data));
  }
}

export function* update({ data }) {
  const response = yield call(api.updateService, data);
  if (response.ok) {
    toast.success("Serviço atualizado com sucesso!");
    yield put(ServiceActions.setStep(0));
    yield put(ServiceActions.updateServiceSuccess(response.data));
  } else {
    toast.error(
      "Ops, ocorreu um erro ao criar seu serviço, por favor, tente novamente"
    );
    yield put(ServiceActions.updateServiceFailure(response.data));
  }
}

export default all([
  takeLatest("SERVICES_REQUEST", index),
  takeLatest("CREATE_SERVICE_REQUEST", create),
  takeLatest("UPDATE_SERVICE_REQUEST", update),
]);
