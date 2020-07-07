import { createReducer, createActions } from "reduxsauce";
import produce from "immer";

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  createBusinessServiceRequest: ["data"],
  createBusinessServiceSuccess: ["data"],
  createBusinessServiceFailure: ["data"],
  updateBusinessServiceRequest: ["data"],
  updateBusinessServiceSuccess: ["data"],
  updateBusinessServiceFailure: ["data"],
});

export const BusinessServiceTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
  data: [],
  fetching: false,
  saving: false,
};

/* ------------- Selectors ------------- */

export const BusinessServiceSelectors = {
  businessService: (state) => state.businessService,
};

/* ------------- Reducers ------------- */

export const createBusinessServiceRequest = (state, { data }) =>
  produce(state, (draft) => {
    draft.saving = true;
  });

export const createBusinessServiceSuccess = (state, { data }) =>
  produce(state, (draft) => {
    draft.saving = false;
    draft.data = data.data;
  });

export const createBusinessServiceFailure = (state, { data }) =>
  produce(state, (draft) => {
    draft.saving = false;
  });

export const updateBusinessServiceRequest = (state, { data }) =>
  produce(state, (draft) => {
    draft.saving = true;
  });

export const updateBusinessServiceSuccess = (state, { data }) =>
  produce(state, (draft) => {
    draft.saving = false;
    draft.data = data.data;
  });

export const updateBusinessServiceFailure = (state, { data }) =>
  produce(state, (draft) => {
    draft.saving = false;
  });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CREATE_BUSINESS_SERVICE_REQUEST]: createBusinessServiceRequest,
  [Types.CREATE_BUSINESS_SERVICE_SUCCESS]: createBusinessServiceSuccess,
  [Types.CREATE_BUSINESS_SERVICE_FAILURE]: createBusinessServiceFailure,
  [Types.UPDATE_BUSINESS_SERVICE_REQUEST]: updateBusinessServiceRequest,
  [Types.UPDATE_BUSINESS_SERVICE_SUCCESS]: updateBusinessServiceSuccess,
  [Types.UPDATE_BUSINESS_SERVICE_FAILURE]: updateBusinessServiceFailure,
});
