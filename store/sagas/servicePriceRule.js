import { takeLatest, call, put, all, select } from "redux-saga/effects";
import api from "../../services/api";
import ServicePriceRuleActions from "../reducers/servicePriceRule";
import { ServicePriceRuleSelectors } from "../reducers/servicePriceRule";

export function* index({ data }) {
  const params = yield select(ServicePriceRuleSelectors.servicePriceRule);
  const response = yield call(api.rules, params);
  if (response.ok) {
    yield put(ServicePriceRuleActions.rulesSuccess(response.data));
  } else {
    yield put(ServicePriceRuleActions.rulesFailure(response.data));
  }
}

export function* pricesIndex({ data }) {
  const params = yield select(ServicePriceRuleSelectors.servicePriceRule);
  const response = yield call(api.prices, params);
  if (response.ok) {
    yield put(ServicePriceRuleActions.pricesSuccess(response.data));
  } else {
    yield put(ServicePriceRuleActions.pricesFailure(response.data));
  }
}

export function* breedsIndex({ data }) {
  const response = yield call(api.breeds, data);
  if (response.ok) {
    yield put(ServicePriceRuleActions.breedsSuccess(response.data));
  } else {
    yield put(ServicePriceRuleActions.breedsFailure(response.data));
  }
}

export function* updatePrices({ data }) {
  const response = yield call(api.updatePrices, data);
  if (response.ok) {
    yield put(ServicePriceRuleActions.updatePricesSuccess(response.data));
  } else {
    yield put(ServicePriceRuleActions.updatePricesFailure(response.data));
  }
}

export function* createPrices({ data }) {
  const response = yield call(api.createPrices, data);
  if (response.ok) {
    yield put(ServicePriceRuleActions.createPricesSuccess(response.data));
  } else {
    yield put(ServicePriceRuleActions.createPricesFailure(response.data));
  }
}

export default all([
  takeLatest("RULES_REQUEST", index),
  takeLatest("PRICES_REQUEST", pricesIndex),
  takeLatest("BREEDS_REQUEST", breedsIndex),
  takeLatest("UPDATE_PRICES_REQUEST", updatePrices),
  takeLatest("CREATE_PRICES_REQUEST", createPrices),
]);
