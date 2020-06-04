import { createReducer, createActions } from "reduxsauce";
import produce from "immer";

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  serviceCategoriesRequest: ["data"],
  serviceCategoriesSuccess: ["data"],
  serviceCategoriesFailure: ["data"],
});

export const ServiceCategoryTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
  data: [],
  fetching: false,
};

/* ------------- Selectors ------------- */

export const ServiceCategorySelectors = {
  employment: (state) => state.employment,
};

/* ------------- Reducers ------------- */

export const serviceCategoriesRequest = (state, { data }) =>
  produce(state, (draft) => {
    draft.fetching = true;
  });

export const serviceCategoriesSuccess = (state, { data }) => {
  return produce(state, (draft) => {
    draft.fetching = false;
    draft.data = data.data;
  });
};

export const serviceCategoriesFailure = (state, { data }) =>
  produce(state, (draft) => {
    draft.fetching = false;
  });

export const signUpRequest = (state, { data }) =>
  produce(state, (draft) => {
    draft.fetching = true;
  });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SERVICE_CATEGORIES_REQUEST]: serviceCategoriesRequest,
  [Types.SERVICE_CATEGORIES_SUCCESS]: serviceCategoriesSuccess,
  [Types.SERVICE_CATEGORIES_FAILURE]: serviceCategoriesFailure,
});
