import { createReducer, createActions } from "reduxsauce";
import produce from "immer";

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getBusinessRequest: ["data"],
  getBusinessSuccess: ["data"],
  getBusinessFailure: ["data"],
});

export const businessTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
  data: [],
  fetching: false,
  saving: false,
};

/* ------------- Selectors ------------- */

export const businessSelectors = {
  business: (state) => state.business,
};

/* ------------- Reducers ------------- */

export const getBusinessRequest = (state, { data }) =>
  produce(state, (draft) => {
    draft.saving = true;
  });

export const getBusinessSuccess = (state, { data }) =>
  produce(state, (draft) => {
    draft.saving = false;
    draft.data = data.data;
  });

export const getBusinessFailure = (state, { data }) =>
  produce(state, (draft) => {
    draft.saving = false;
  });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_BUSINESS_REQUEST]: getBusinessRequest,
  [Types.GET_BUSINESS_SUCCESS]: getBusinessSuccess,
  [Types.GET_BUSINESS_FAILURE]: getBusinessFailure,
});
