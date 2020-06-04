import { all } from "redux-saga/effects";

import user from "./user";
import employment from "./employment";
import serviceCategory from "./serviceCategory";

export default function* rootSaga() {
  yield all([user, employment, serviceCategory]);
}
