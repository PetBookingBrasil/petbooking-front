import { createReducer, createActions } from "reduxsauce";
import produce from "immer";

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  employmentsRequest: ["data"],
  employmentsSuccess: ["data"],
  employmentsFailure: ["data"],
});

export const EmploymentTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
  data: [],
  fetching: false,
};

/* ------------- Selectors ------------- */

export const EmploymentSelectors = {
  employment: (state) => state.employment,
};

/* ------------- Reducers ------------- */

export const employmentsRequest = (state, { data }) =>
  produce(state, (draft) => {
    draft.fetching = true;
  });

export const employmentsSuccess = (state, { data }) =>
  produce(state, (draft) => {
    draft.fetching = false;
    draft.data = data.data.sort((a, b) => b.skills.length - a.skills.length);
  });

export const employmentsFailure = (state, { data }) =>
  produce(state, (draft) => {
    draft.fetching = false;
  });
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.EMPLOYMENTS_REQUEST]: employmentsRequest,
  [Types.EMPLOYMENTS_SUCCESS]: employmentsSuccess,
  [Types.EMPLOYMENTS_FAILURE]: employmentsFailure,
});
