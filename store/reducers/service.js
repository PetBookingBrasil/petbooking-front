import { createReducer, createActions } from "reduxsauce";
import produce from "immer";

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  setStep: ["data"],
  servicesRequest: ["data"],
  servicesSuccess: ["data"],
  servicesFailure: ["data"],
  createServiceRequest: ["data"],
  createServiceSuccess: ["data"],
  updateServiceRequest: ["data"],
  updateServiceSuccess: ["data"],
  updateServiceFailure: ["data"],
  createServiceFailure: ["data"],
});

export const ServiceTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
  data: [],
  fetching: false,
  saving: false,
  step: 0,
};

/* ------------- Selectors ------------- */

export const ServiceSelectors = {
  service: (state) => state.service,
};

/* ------------- Reducers ------------- */

export const setStep = (state, { data }) =>
  produce(state, (draft) => {
    draft.step = data;
  });

export const servicesRequest = (state, { data }) =>
  produce(state, (draft) => {
    draft.fetching = true;
  });

export const servicesSuccess = (state, { data }) =>
  produce(state, (draft) => {
    draft.fetching = false;
    draft.data = data.data;
  });

export const servicesFailure = (state, { data }) =>
  produce(state, (draft) => {
    draft.fetching = false;
  });

export const createServiceRequest = (state, { data }) =>
  produce(state, (draft) => {
    draft.saving = true;
  });

export const createServiceSuccess = (state, { data }) =>
  produce(state, (draft) => {
    draft.saving = false;
  });

export const updateServiceRequest = (state, { data }) =>
  produce(state, (draft) => {
    draft.saving = true;
  });

export const updateServiceSuccess = (state, { data }) =>
  produce(state, (draft) => {
    draft.saving = false;
  });

export const createServiceFailure = (state, { data }) =>
  produce(state, (draft) => {
    draft.saving = false;
  });

export const updateServiceFailure = (state, { data }) =>
  produce(state, (draft) => {
    draft.saving = false;
  });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_STEP]: setStep,
  [Types.SERVICES_REQUEST]: servicesRequest,
  [Types.SERVICES_SUCCESS]: servicesSuccess,
  [Types.SERVICES_FAILURE]: servicesFailure,
  [Types.CREATE_SERVICE_REQUEST]: createServiceRequest,
  [Types.CREATE_SERVICE_SUCCESS]: createServiceSuccess,
  [Types.CREATE_SERVICE_FAILURE]: createServiceFailure,
  [Types.UPDATE_SERVICE_REQUEST]: updateServiceRequest,
  [Types.UPDATE_SERVICE_SUCCESS]: updateServiceSuccess,
  [Types.UPDATE_SERVICE_FAILURE]: updateServiceFailure,
});
