// User actions, separated by type, request, success, failure.
// Each one can update the context state and use asynchronous calls.

import { getServiceCategories } from "../../services/serviceCategory";

export const serviceCategoriesRequest = async (data = null, state) => {
  updateState(state, { fetching: true });

  let response = await getServiceCategories();
  if (response.ok) {
    let json = await response.json();
    serviceCategoriesSuccess(json.data, state);
  }
};

export const serviceCategoriesSuccess = async (data, state) => {
  updateState(state, {
    data: data.map((item) => ({
      ...item.attributes,
      id: item.id,
      services: item.attributes.services.map((inner) => ({
        ...inner.data.attributes,
        id: inner.data.id,
      })),
    })),
    fetching: false,
  });
};

export const serviceCategoriesFailure = async (state) => {
  updateState(state, { fetching: false });
};

const updateState = ({ state, setState }, newState) => {
  setState({
    ...state,
    serviceCategory: { ...state.serviceCategory, ...newState },
  });
};

export default {
  serviceCategoriesRequest,
  serviceCategoriesSuccess,
  serviceCategoriesFailure,
};
