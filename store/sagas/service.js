import { takeLatest, call, put, all, select } from "redux-saga/effects";
import { toast } from "react-toastify";
import api from "../../services/api";
import ServiceActions from "../reducers/service";
import { ServiceSelectors } from "../reducers/service";

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
    yield put(ServiceActions.createServiceSuccess(response.data));
  } else {
    toast.error(
      "Ops, ocorreu um erro ao criar seu serviço, por favor, tente novamente"
    );
    yield put(ServiceActions.createServiceFailure(response.data));
  }
}

export default all([
  takeLatest("SERVICES_REQUEST", index),
  takeLatest("CREATE_SERVICE_REQUEST", create),
]);
