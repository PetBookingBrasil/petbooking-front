// User actions, separated by type, request, success, failure.
// Each one can update the context state and use asynchronous calls.

import { getTodos } from "../../services/user";

export const signInRequest = async (data = null, state) => {
  updateState(state, { fetching: true });
};

export const signInSuccess = async (data, state) => {
  updateState(state, {
    name: data.name,
    fetching: false,
  });
};

export const signInFailure = async (state) => {
  updateState(state, { fetching: false });
};

const updateState = ({ state, setState }, newState) => {
  setState({
    ...state,
    user: { ...state.user, ...newState },
  });
};

export default {
  signInRequest,
  signInSuccess,
  signInFailure,
};
