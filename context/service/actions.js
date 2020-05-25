// User actions, separated by type, request, success, failure.
// Each one can update the context state and use asynchronous calls.

import { getServices } from "../../services/service";

export const servicesRequest = async (data = null, state) => {
  updateState(state, { fetching: true });

  let response = await getServices();
  console.log("RESPONSE", response, await response.json());

  if (response.ok) {
    let json = await response.json();
    servicesSuccess(json.data, state);
  }
};

export const servicesSuccess = async (data, state) => {
  updateState(state, {
    data: data,
    fetching: false,
  });
};

export const servicesFailure = async (state) => {
  updateState(state, { fetching: false });
};

const updateState = ({ state, setState }, newState) => {
  setState({
    ...state,
    service: { ...state.service, ...newState },
  });
};

export default {
  servicesRequest,
  servicesSuccess,
  servicesFailure,
};
