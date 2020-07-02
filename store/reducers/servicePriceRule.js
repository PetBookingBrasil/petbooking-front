import { createReducer, createActions } from "reduxsauce";
import produce from "immer";

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  rulesRequest: ["data"],
  rulesSuccess: ["data"],
  rulesFailure: ["data"],
  pricesRequest: ["data"],
  pricesSuccess: ["data"],
  pricesFailure: ["data"],
  breedsRequest: ["data"],
  breedsSuccess: ["data"],
  breedsFailure: ["data"],
  updatePricesRequest: ["data"],
  updatePricesSuccess: ["data"],
  updatePricesFailure: ["data"],
  createPricesRequest: ["data"],
  createPricesSuccess: ["data"],
  createPricesFailure: ["data"],
});

export const ServicePriceRuleTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
  data: [],
  prices: [],
  breeds: [],
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

export const pricesRequest = (state, { data }) =>
  produce(state, (draft) => {
    draft.fetching = true;
  });

export const pricesSuccess = (state, { data }) =>
  produce(state, (draft) => {
    draft.fetching = false;
    draft.prices = data.data;
  });

export const pricesFailure = (state, { data }) =>
  produce(state, (draft) => {
    draft.fetching = false;
  });

export const breedsRequest = (state, { data }) =>
  produce(state, (draft) => {
    draft.fetching = true;
  });

export const breedsSuccess = (state, { data }) =>
  produce(state, (draft) => {
    draft.fetching = false;
    draft.breeds = data.data.map((i) => ({ id: i.id, ...i.attributes }));
  });

export const breedsFailure = (state, { data }) =>
  produce(state, (draft) => {
    draft.fetching = false;
  });

export const updatePricesRequest = (state, { data }) =>
  produce(state, (draft) => {
    draft.fetching = true;
  });

export const updatePricesSuccess = (state, { data }) =>
  produce(state, (draft) => {
    draft.fetching = false;
  });

export const updatePricesFailure = (state, { data }) =>
  produce(state, (draft) => {
    draft.fetching = false;
  });

export const createPricesRequest = (state, { data }) =>
  produce(state, (draft) => {
    draft.fetching = true;
  });

export const createPricesSuccess = (state, { data }) =>
  produce(state, (draft) => {
    draft.fetching = false;
  });

export const createPricesFailure = (state, { data }) =>
  produce(state, (draft) => {
    draft.fetching = false;
  });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.RULES_REQUEST]: rulesRequest,
  [Types.RULES_SUCCESS]: rulesSuccess,
  [Types.RULES_FAILURE]: rulesFailure,
  [Types.PRICES_REQUEST]: pricesRequest,
  [Types.PRICES_SUCCESS]: pricesSuccess,
  [Types.PRICES_FAILURE]: pricesFailure,
  [Types.BREEDS_REQUEST]: breedsRequest,
  [Types.BREEDS_SUCCESS]: breedsSuccess,
  [Types.BREEDS_FAILURE]: breedsFailure,
  [Types.UPDATE_PRICES_REQUEST]: updatePricesRequest,
  [Types.UPDATE_PRICES_SUCCESS]: updatePricesSuccess,
  [Types.UPDATE_PRICES_FAILURE]: updatePricesFailure,
  [Types.CREATE_PRICES_REQUEST]: createPricesRequest,
  [Types.CREATE_PRICES_SUCCESS]: createPricesSuccess,
  [Types.CREATE_PRICES_FAILURE]: createPricesFailure,
});
