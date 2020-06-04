import { takeLatest, call, put, all } from "redux-saga/effects";
import api from "../../services/api";
import UserActions from "../reducers/user";

export function* consumerToken({ data }) {
  const response = yield call(api.setConsumerToken, data);
  if (response.ok) {
    yield put(UserActions.consumerTokenSuccess(response.data));
  } else {
    yield put(UserActions.consumerTokenFailure(response.data));
  }
}

export default all([takeLatest("CONSUMER_TOKEN_REQUEST", consumerToken)]);
