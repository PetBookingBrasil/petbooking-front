import { request, formatParams, getBusinessId } from "../api";

export const getServiceCategories = async () => {
  return request(
    "api/v2/services/service_categories?" +
      formatParams({ business_id: getBusinessId() }),
    { method: "get" }
  );
};
