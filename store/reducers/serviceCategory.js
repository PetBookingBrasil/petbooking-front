import { createReducer, createActions } from "reduxsauce";
import produce from "immer";

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  setMeta: ["data"],
  serviceCategoriesRequest: ["data"],
  serviceCategoriesSuccess: ["data"],
  serviceCategoriesFailure: ["data"],
  createServiceCategoryRequest: ["data"],
  createServiceCategorySuccess: ["data"],
  createServiceCategoryFailure: ["data"],
});

export const ServiceCategoryTypes = Types;
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

export const ServiceCategorySelectors = {
  serviceCategory: (state) => state.serviceCategory,
};

/* ------------- Reducers ------------- */

export const setMeta = (state, { data }) =>
  produce(state, (draft) => {
    draft.meta = data;
  });

export const serviceCategoriesRequest = (state, { data }) =>
  produce(state, (draft) => {
    draft.fetching = true;
  });

export const serviceCategoriesSuccess = (state, { data }) =>
  produce(state, (draft) => {
    draft.fetching = false;
    draft.data = data.data
  });

export const serviceCategoriesFailure = (state, { data }) =>
  produce(state, (draft) => {
    draft.fetching = false;
  });

export const createServiceCategoryRequest = (state, { data }) =>
  produce(state, (draft) => {
    draft.saving = true;
  });

export const createServiceCategorySuccess = (state, { data }) =>
  produce(state, (draft) => {
    draft.saving = false;
    draft.data = [...state.data, data.data];
  });

export const createServiceCategoryFailure = (state, { data }) =>
  produce(state, (draft) => {
    draft.saving = false;
  });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_META]: setMeta,
  [Types.SERVICE_CATEGORIES_REQUEST]: serviceCategoriesRequest,
  [Types.SERVICE_CATEGORIES_SUCCESS]: serviceCategoriesSuccess,
  [Types.SERVICE_CATEGORIES_FAILURE]: serviceCategoriesFailure,
  [Types.CREATE_SERVICE_CATEGORY_REQUEST]: createServiceCategoryRequest,
  [Types.CREATE_SERVICE_CATEGORY_SUCCESS]: createServiceCategorySuccess,
  [Types.CREATE_SERVICE_CATEGORY_FAILURE]: createServiceCategoryFailure,
});
