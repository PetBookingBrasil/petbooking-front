// User actions, separated by type, request, success, failure.
// Each one can update the context state and use asynchronous calls.

import { getCampaigns } from "../../services/campaigns";

export const getCampaignsRequest = async (data = null, state) => {
  updateState(state, { fetching: true });

  let response = await getCampaigns();
  if (response.ok) {
    let json = await response.json();
    getCampaignsSuccess(json.data, state);
  } else {
    let json = await response.json();
    getCampaignsFailure(json.data.errors);
  }
};

export const getCampaignsSuccess = async (data, state) => {
  updateState(state, {
    data: data,
    fetching: false,
  });
};

export const getCampaignsFailure = async (data, state) => {
  updateState(state, { errors: data, fetching: false });
};

const updateState = ({ state, setState }, newState) => {
  setState({
    ...state,
    campaigns: { ...state.campaigns, ...newState },
  });
};

export default {
  getCampaignsRequest,
  getCampaignsSuccess,
  getCampaignsFailure,
};
