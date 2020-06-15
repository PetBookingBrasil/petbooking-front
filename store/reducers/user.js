import { createReducer, createActions } from "reduxsauce";
import produce from "immer";

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  consumerTokenRequest: ["data"],
  consumerTokenSuccess: ["data"],
  consumerTokenFailure: ["data"],
});

export const UserTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
  name: "Usuário",
  consumerToken: "",
  fetching: false,
};

/* ------------- Selectors ------------- */

export const UserSelectors = {
  employment: (state) => state.employment,
};

/* ------------- Reducers ------------- */

export const consumerTokenRequest = (state, { data }) =>
  produce(state, (draft) => {
    draft.fetching = true;
  });

export const consumerTokenSuccess = (state, { data }) => {
  localStorage.setItem("@pb/consumerToken", data.data.attributes.token);

  return produce(state, (draft) => {
    draft.fetching = false;
    draft.consumerToken = data.data.attributes.token;
  });
};

export const consumerTokenFailure = (state, { data }) =>
  produce(state, (draft) => {
    draft.fetching = false;
  });
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CONSUMER_TOKEN_REQUEST]: consumerTokenRequest,
  [Types.CONSUMER_TOKEN_SUCCESS]: consumerTokenSuccess,
  [Types.CONSUMER_TOKEN_FAILURE]: consumerTokenFailure,
});
