import { createReducer, createActions } from "reduxsauce";
import produce from "immer";

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  rulesRequest: ["data"],
  rulesSuccess: ["data"],
  rulesFailure: ["data"],
});

export const ServicePriceRuleTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
  data: [],
  fetching: false,
  saving: false,
  meta: {
    page: 1,
    perPage: 20,
  },
};

/* ------------- Selectors ------------- */

export const ServicePriceRuleSelectors = {
  servicePriceRule: (state) => state.servicePriceRule,
};

/* ------------- Reducers ------------- */

export const rulesRequest = (state, { data }) =>
  produce(state, (draft) => {
    draft.fetching = true;
  });

export const rulesSuccess = (state, { data }) =>
  produce(state, (draft) => {
    draft.fetching = false;
    draft.data = data.data;
  });

export const rulesFailure = (state, { data }) =>
  produce(state, (draft) => {
    draft.fetching = false;
  });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.RULES_REQUEST]: rulesRequest,
  [Types.RULES_SUCCESS]: rulesSuccess,
  [Types.RULES_FAILURE]: rulesFailure,
});
