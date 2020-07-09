import { all } from "redux-saga/effects";

import user from "./user";
import employment from "./employment";
import service from "./service";
import serviceCategory from "./serviceCategory";
import servicePriceRule from "./servicePriceRule";
import businessService from "./businessService";
import business from "./business";

export default function* rootSaga() {
  yield all([user, employment, service, serviceCategory, servicePriceRule, businessService, business]);
}
