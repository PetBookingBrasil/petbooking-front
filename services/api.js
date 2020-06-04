import apisauce from "apisauce";

export const getToken = () => localStorage.getItem("@pb/token");
export const getBusinessId = () => localStorage.getItem("@pb/businessId");
export const getConsumerUuid = () => localStorage.getItem("@pb/consumerUuid");
export const getConsumerToken = () => localStorage.getItem("@pb/consumerToken");

const api = apisauce.create({
  baseURL: "http://localhost:3000/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/vnd.api+json",
    Accept: "application/vnd.petbooking-v1+json",
    "X-Application": "petbooking",
    "X-Device": "web",
  },
});

api.addRequestTransform((request) => {
  request.headers = {
    ...request.headers,
    "X-Petbooking-Session-Token": `Token token="${getToken()}"`,
    Authorization: `Bearer ${getConsumerToken()}`,
    Jwt: getToken(),
  };
});

// Consumer requests

const setConsumerToken = (uuid = getConsumerUuid()) =>
  api.post("api/v2/consumers/auth", {
    data: {
      type: "consumers",
      attributes: {
        uuid: uuid,
      },
    },
  });

// Employment requests

const employments = () =>
  api.get("api/v3/employments", {
    business_id: getBusinessId(),
  });

// Service requests

const services = () =>
  api.get("api/v3/services", {
    application: "petbooking",
    business_id: getBusinessId(),
  });

// ServiceCategory requests

const serviceCategories = () =>
  api.get("api/v3/service_categories", {
    application: "petbooking",
    business_id: getBusinessId(),
  });

const requests = {
  setConsumerToken,
  employments,
  services,
  serviceCategories,
};

export default requests;
