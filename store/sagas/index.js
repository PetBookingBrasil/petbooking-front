import { all } from "redux-saga/effects";

import user from "./user";
import employment from "./employment";
import service from "./service";
import serviceCategory from "./serviceCategory";
import servicePriceRule from "./servicePriceRule";

export default function* rootSaga() {
  yield all([user, employment, service, serviceCategory, servicePriceRule]);
}
