import { combineReducers } from "redux";

const finalReducers = combineReducers({
  user: require("./user").reducer,
  employment: require("./employment").reducer,
  serviceCategory: require("./serviceCategory").reducer,
});

export default finalReducers;
