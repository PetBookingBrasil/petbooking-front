import { request } from "../api";

export const getCampaigns = async () => {
  return request("api/v2/campaigns?", { method: "GET" });
};

export const createCampaign = async (data) => {
  return request("api/v2/campaigns?", { body: {data: {attributes: data}}, method: "POST" });
};

export const updateCampaign = async (data) => {
  return request("api/v2/campaigns?", { body: data, method: "PUT" });
};
