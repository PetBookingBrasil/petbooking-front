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
  createServiceFailure: ["data"],
  updateServiceRequest: ["data"],
  updateServiceSuccess: ["data"],
  updateServiceFailure: ["data"],
  searchServicesRequest: ["data"],
  searchServicesSuccess: ["data"],
  searchServicesFailure: ["data"],
  removeServiceRequest: ["data"],
  removeServiceSuccess: ["data"],
  removeServiceFailure: ["data"],
  petKindsRequest: ["data"],
  petKindsSuccess: ["data"],
  petKindsFailure: ["data"],
  createSkillRequest: ["data"],
  createSkillSuccess: ["data"],
  createSkillFailure: ["data"],
  updateSkillRequest: ["data"],
  updateSkillSuccess: ["data"],
  updateSkillFailure: ["data"],
  removeSkillRequest: ["data"],
  removeSkillSuccess: ["data"],
  removeSkillFailure: ["data"],
});

export const ServiceTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
  data: [],
  petKinds: [],
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

export const searchServicesRequest = (state, action) => {
  return produce(state, (draft) => {
    draft.fetching = true;
    draft.action_type = action.type;
  });
}

export const searchServicesSuccess = (state, { data }) =>
  produce(state, (draft) => {
    draft.fetching = false;
    draft.data = data.data;
  });

export const searchServicesFailure = (state, { data }) =>
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

export const createServiceFailure = (state, { data }) =>
  produce(state, (draft) => {
    draft.saving = false;
  });

export const updateServiceRequest = (state, data) => {
  return produce(state, (draft) => {
    draft.saving = true;
  });
}

export const updateServiceSuccess = (state, { data }) => {
 return produce(state, (draft) => {
    draft.saving = false;
    draft.current = data.data
  });
}

export const updateServiceFailure = (state, { data }) =>
  produce(state, (draft) => {
    draft.saving = false;
  });

export const removeServiceRequest = (state, { data }) =>
  produce(state, (draft) => {
    draft.saving = true;
  });

export const removeServiceSuccess = (state, { data }) =>
  produce(state, (draft) => {
    draft.saving = false;
  });

export const removeServiceFailure = (state, { data }) =>
  produce(state, (draft) => {
    draft.saving = false;
  });

export const petKindsRequest = (state, { data }) =>
  produce(state, (draft) => {
    draft.saving = true;
  });

export const petKindsSuccess = (state, { data }) =>
  produce(state, (draft) => {
    draft.saving = false;
    draft.petKinds = data.data;
  });

export const petKindsFailure = (state, { data }) =>
  produce(state, (draft) => {
    draft.saving = false;
  });

export const createSkillRequest = (state, { data }) =>
  produce(state, (draft) => {
    draft.saving = true;
  });

export const createSkillSuccess = (state, { data }) =>
  produce(state, (draft) => {
    draft.saving = false;
  });

export const createSkillFailure = (state, { data }) =>
  produce(state, (draft) => {
    draft.saving = false;
  });

export const updateSkillRequest = (state, { data }) =>
  produce(state, (draft) => {
    draft.saving = true;
  });

export const updateSkillSuccess = (state, { data }) =>
  produce(state, (draft) => {
    draft.saving = false;
  });

export const updateSkillFailure = (state, { data }) =>
  produce(state, (draft) => {
    draft.saving = false;
  });

export const removeSkillRequest = (state, { data }) =>
  produce(state, (draft) => {
    draft.saving = true;
  });

export const removeSkillSuccess = (state, { data }) =>
  produce(state, (draft) => {
    draft.saving = false;
  });

export const removeSkillFailure = (state, { data }) =>
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
  [Types.SEARCH_SERVICES_REQUEST]: searchServicesRequest,
  [Types.SEARCH_SERVICES_SUCCESS]: searchServicesSuccess,
  [Types.SEARCH_SERVICES_FAILURE]: searchServicesFailure,
  [Types.REMOVE_SERVICE_REQUEST]: removeServiceRequest,
  [Types.REMOVE_SERVICE_SUCCESS]: removeServiceSuccess,
  [Types.REMOVE_SERVICE_FAILURE]: removeServiceFailure,
  [Types.PET_KINDS_REQUEST]: petKindsRequest,
  [Types.PET_KINDS_SUCCESS]: petKindsSuccess,
  [Types.PET_KINDS_FAILURE]: petKindsFailure,
  [Types.CREATE_SKILL_REQUEST]: createSkillRequest,
  [Types.CREATE_SKILL_SUCCESS]: createSkillSuccess,
  [Types.CREATE_SKILL_FAILURE]: createSkillFailure,
  [Types.UPDATE_SKILL_REQUEST]: updateSkillRequest,
  [Types.UPDATE_SKILL_SUCCESS]: updateSkillSuccess,
  [Types.UPDATE_SKILL_FAILURE]: updateSkillFailure,
  [Types.REMOVE_SKILL_REQUEST]: removeSkillRequest,
  [Types.REMOVE_SKILL_SUCCESS]: removeSkillSuccess,
  [Types.REMOVE_SKILL_FAILURE]: removeSkillFailure,
});
