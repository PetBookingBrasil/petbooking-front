import { takeLatest, call, put, all, select } from "redux-saga/effects";
import { toast } from "react-toastify";
import api from "../../services/api";
import EmploymentActions from "../reducers/employment";

export function* employments({ data }) {
  const response = yield call(api.employments, data);
  if (response.ok) {
    toast.success("Seja bem-vindo!");
    yield put(EmploymentActions.employmentsSuccess(response.data));
  } else {
    toast.error("Email ou senha incorretos");
    yield put(EmploymentActions.employmentsFailure(response.data));
  }
}

export default all([takeLatest("EMPLOYMENTS_REQUEST", employments)]);
