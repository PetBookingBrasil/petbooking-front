import { takeLatest, call, put, all, select } from "redux-saga/effects";
import api from "../../services/api";
import EmploymentActions from "../reducers/employment";

export function* employments({ data }) {
  const response = yield call(api.employments, data);
  if (response.ok) {
    yield put(EmploymentActions.employmentsSuccess(response.data));
  } else {
    yield put(EmploymentActions.employmentsFailure(response.data));
  }
}

export default all([takeLatest("EMPLOYMENTS_REQUEST", employments)]);
