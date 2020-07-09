import { takeLatest, call, put, all } from "redux-saga/effects";
import api from "../../services/api";
import BusinessActions from "../reducers/business";

export function* show({ data }) {
  const response = yield call(api.getBusiness, data);
  if (response.ok) {
    yield put(BusinessActions.getBusinessSuccess(response.data));
  } else {
    yield put(BusinessActions.getBusinessFailure(response.data));
  }
}

export default all([
  takeLatest("GET_BUSINESS_REQUEST", show),
]);
