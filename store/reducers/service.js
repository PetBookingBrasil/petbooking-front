import { createReducer, createActions } from "reduxsauce";
import produce from "immer";

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  servicesRequest: ["data"],
  servicesSuccess: ["data"],
  servicesFailure: ["data"],
});

export const ServiceTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
  data: [],
  fetching: false,
};

/* ------------- Selectors ------------- */

export const ServiceSelectors = {
  employment: (state) => state.employment,
};

/* ------------- Reducers ------------- */

export const servicesRequest = (state, { data }) =>
  produce(state, (draft) => {
    draft.fetching = true;
  });

export const servicesSuccess = (state, { data }) =>
  produce(state, (draft) => {
    draft.fetching = false;
    draft.data = data;
  });

export const servicesFailure = (state, { data }) =>
  produce(state, (draft) => {
    draft.fetching = false;
  });

export const signUpRequest = (state, { data }) =>
  produce(state, (draft) => {
    draft.fetching = true;
  });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SERVICES_REQUEST]: servicesRequest,
  [Types.SERVICES_SUCCESS]: servicesSuccess,
  [Types.SERVICES_FAILURE]: servicesFailure,
});
