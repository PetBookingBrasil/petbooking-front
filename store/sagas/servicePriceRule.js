import { takeLatest, call, put, all, select } from "redux-saga/effects";
import { toast } from "react-toastify";
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

export default all([takeLatest("RULES_REQUEST", index)]);
