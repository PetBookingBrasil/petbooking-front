import { request, formatParams, getBusinessId } from "../api";

export const getServices = async () => {
  return request(
    "api/v2/services/services?" +
      formatParams({ application: "petbooking", business_id: getBusinessId() }),
    { method: "get" }
  );
};
