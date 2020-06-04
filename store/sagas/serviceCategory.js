import { takeLatest, call, put, all } from "redux-saga/effects";
import api from "../../services/api";
import ServiceCategoryActions from "../reducers/serviceCategory";

export function* serviceCategories({ data }) {
  const response = yield call(api.serviceCategories, data);
  if (response.ok) {
    yield put(ServiceCategoryActions.serviceCategoriesSuccess(response.data));
  } else {
    yield put(ServiceCategoryActions.serviceCategoriesFailure(response.data));
  }
}

export default all([
  takeLatest("SERVICE_CATEGORIES_REQUEST", serviceCategories),
]);
