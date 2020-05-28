// User actions, separated by type, request, success, failure.
// Each one can update the context state and use asynchronous calls.

import {
  getCampaigns,
  createCampaign,
} from "../../services/campaigns";


// GET CAMPAIGNS
export const getCampaignsRequest = async (data = null, state) => {
  updateState(state, { fetching: true });

  // let response = await getCampaigns();
  // if (response.ok) {
  //   let json = await response.json();
  //   getCampaignsSuccess(json.data, state);
  // } else {
  //   let json = await response.json();
  //   getCampaignsFailure(json.data.errors);
  // }
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

// POST CAMPAIGNS
export const createCampaignRequest = async (data = null, state) => {
  updateState(state, { fetching: true });

  let response = await createCampaign(data);
  if (response.ok) {
    console.log('deu certo mano');

  //   let json = await response.json();
  //   getCampaignsSuccess(json.data, state);
  } else {
    console.log('vish cagou');
  //   let json = await response.json();
  //   getCampaignsFailure(json.data.errors);
  }
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
  createCampaignRequest,
};
