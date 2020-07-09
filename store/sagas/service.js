import { takeLatest, call, put, all, select } from "redux-saga/effects";
import { toast } from "react-toastify";
import api from "../../services/api";
import ServiceActions from "../reducers/service";
import ServiceCategoryActions from "../reducers/serviceCategory";
import EmploymentActions from "../reducers/employment";
import BusinessServiceActions from "../reducers/businessService";
import { getBusinessServiceByBusiness } from '../../helpers/business_services'

export function* index({ data }) {
  const response = yield call(api.services, data);
  if (response.ok) {
    yield put(ServiceActions.servicesSuccess(response.data));
  } else {
    yield put(ServiceActions.servicesFailure(response.data));
  }
}

export function* search({ data }) {
  const response = yield call(api.searchServices, data);
  if (response.ok) {
    yield put(ServiceActions.searchServicesSuccess(response.data));
  } else {
    yield put(ServiceActions.searchServicesFailure(response.data));
  }
}

export function* create({ data }) {
  const response = yield call(api.createService, data);
  if (response.ok) {
    yield put(ServiceActions.createServiceSuccess(response.data));
    const service = response.data.data
    
    yield put(BusinessServiceActions.createBusinessServiceRequest({ ...service, ...data, id: service.id }));
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
    const service = response.data.data
    
    const businessService = getBusinessServiceByBusiness(service.business_services)
  
    yield put(BusinessServiceActions.updateBusinessServiceRequest({ ...service, ...data, service, id: businessService.id}))
    yield put(ServiceCategoryActions.serviceCategoriesRequest());
  } else {
    toast.error(
      "Ops, ocorreu um erro ao criar seu serviço, por favor, tente novamente"
    );
    yield put(ServiceActions.updateServiceFailure(response.data));
  }
}

export function* remove({ data }) {
  const response = yield call(api.removeService, data);
  if (response.ok) {
    toast.success("Serviço removido com sucesso!");
    yield put(ServiceActions.updateServiceSuccess(response.data));
    yield put(ServiceCategoryActions.serviceCategoriesRequest());
  } else {
    toast.error(
      "Ops, ocorreu um erro ao remover seu serviço, por favor, tente novamente"
    );
    yield put(ServiceActions.updateServiceFailure(response.data));
  }
}

export function* petKindsIndex({ data }) {
  const response = yield call(api.petKinds, data);
  if (response.ok) {
    yield put(ServiceActions.petKindsSuccess(response.data));
  } else {
    yield put(ServiceActions.petKindsFailure(response.data));
  }
}

export function* createSkill({ data }) {
  const response = yield call(api.createSkill, data);
  if (response.ok) {
    toast.success("Habilidade criada com sucesso!");
    yield put(ServiceActions.createSkillSuccess(response.data));

    yield put(ServiceCategoryActions.serviceCategoriesRequest());
    yield put(EmploymentActions.employmentsRequest());
  } else {
    toast.error(
      "Ops, ocorreu um erro ao criar a habilidade, por favor, tente novamente"
    );
    yield put(ServiceActions.createSkillFailure(response.data));
  }
}

export function* updateSkill({ data }) {
  const response = yield call(api.updateSkill, data);
  if (response.ok) {
    toast.success("Habilidade atualizada com sucesso!");
    yield put(ServiceActions.updateSkillSuccess(response.data));

    yield put(ServiceCategoryActions.serviceCategoriesRequest());
    yield put(EmploymentActions.employmentsRequest());
  } else {
    toast.error(
      "Ops, ocorreu um erro ao atualizar a habilidade, por favor, tente novamente"
    );
    yield put(ServiceActions.updateSkillFailure(response.data));
  }
}

export function* removeSkill({ data }) {
  const response = yield call(api.removeSkill, data);
  if (response.ok) {
    toast.success("Habilidade removida com sucesso!");
    yield put(ServiceActions.removeSkillSuccess(response.data));

    yield put(ServiceCategoryActions.serviceCategoriesRequest());
    yield put(EmploymentActions.employmentsRequest());
  } else {
    toast.error(
      "Ops, ocorreu um erro ao remover habilidade, por favor, tente novamente"
    );
    yield put(ServiceActions.removeSkillFailure(response.data));
  }
}

export default all([
  takeLatest("SERVICES_REQUEST", index),
  takeLatest("SEARCH_SERVICES_REQUEST", search),
  takeLatest("CREATE_SERVICE_REQUEST", create),
  takeLatest("UPDATE_SERVICE_REQUEST", update),
  takeLatest("REMOVE_SERVICE_REQUEST", remove),
  takeLatest("PET_KINDS_REQUEST", petKindsIndex),
  takeLatest("CREATE_SKILL_REQUEST", createSkill),
  takeLatest("UPDATE_SKILL_REQUEST", updateSkill),
  takeLatest("REMOVE_SKILL_REQUEST", removeSkill),
]);
