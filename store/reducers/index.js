import { combineReducers } from "redux";

const finalReducers = combineReducers({
  user: require("./user").reducer,
  employment: require("./employment").reducer,
  service: require("./service").reducer,
  serviceCategory: require("./serviceCategory").reducer,
  servicePriceRule: require("./servicePriceRule").reducer,
});

export default finalReducers;
