import { request } from "../api";

export const getCampaigns = async () => {
  return request("api/v2/admin/campaigns?", { method: "get" });
};

export const createCampaign = async (data) => {
  return request("api/v2/admin/campaigns?", { body: data, method: "post" });
};
