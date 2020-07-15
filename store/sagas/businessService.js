import { takeLatest, call, put, all, select } from "redux-saga/effects";
import { toast } from "react-toastify";
import api from "../../services/api";
import ServiceActions from "../reducers/service";
import ServiceCategoryActions, { ServiceCategorySelectors } from '../reducers/serviceCategory'
import ServicePriceRuleActions from "../reducers/servicePriceRule";
import BusinessServiceActions from "../reducers/businessService";

export function* create({ data }) {
  const response = yield call(api.createBusinessService, data);
  if (response.ok) {
    toast.success("Serviço criado com sucesso!");
    yield put(ServiceActions.setStep(0));
    yield put(ServiceCategoryActions.serviceCategoriesRequest());
    yield put(BusinessServiceActions.createBusinessServiceSuccess(response.data));
    
    const business_service = response.data.data
  
    yield all(
      data.rules.map((item) =>
        put(ServicePriceRuleActions.createPricesRequest({ ...item, business_service }))
      )
    );
  } else {
    toast.error(
      "Ops, ocorreu um erro ao criar seu serviço, por favor, tente novamente"
    );
    yield put(BusinessServiceActions.createBusinessServiceFailure(response.data));
  }
}

export function* update({ data }) {
  const response = yield call(api.updateBusinessService, data);
  if (response.ok) {
    yield put(ServiceActions.setStep(0));
    yield put(ServiceCategoryActions.serviceCategoriesRequest());
    yield put(BusinessServiceActions.updateBusinessServiceSuccess(response.data));
    const business_service = response.data.data
    
    yield all(
      data.rules.map((item) => {
        let hasBusinessServicePrices = item.combinations.data.filter(d => {
          return d.business_service_prices.some(bsp => bsp.service_id == data.service.id);
        });
  
        if (hasBusinessServicePrices.length > 0) {
          return put(ServicePriceRuleActions.updatePricesRequest({ ...item, service: data.service }))
        } else {
          return put(ServicePriceRuleActions.createPricesRequest({ ...item, business_service }))
        }
      })
    );
  } else {
    toast.error(
      "Ops, ocorreu um erro ao criar seu serviço, por favor, tente novamente"
    );
    yield put(ServiceActions.createServiceFailure(response.data));
  }
}

export default all([
  takeLatest("CREATE_BUSINESS_SERVICE_REQUEST", create),
  takeLatest("UPDATE_BUSINESS_SERVICE_REQUEST", update),
]);
