import apisauce from "apisauce";

export const getToken = () => localStorage.getItem("@pb/token");
export const getBusinessId = () => localStorage.getItem("@pb/businessId");
export const getConsumerUuid = () => localStorage.getItem("@pb/consumerUuid");
export const getConsumerToken = () => localStorage.getItem("@pb/consumerToken");

const api = apisauce.create({
  baseURL: "http://localhost:3000/",
  timeout: 30000,
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
    "Content-Type": request.url.includes("v3")
      ? "application/json"
      : "application/vnd.api+json",
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

const createService = (params) => {
  return api.post("api/v3/services", {
    service: {
      application: "petbooking",
      business_id: getBusinessId(),
      name: params.name,
      service_category_id: params.category,
      description: params.description,
      ancestry: params.ancestry,
      price: params.price,
      cost: params.cost,
      iss_type: params.issType,
      duration: params.duration,
      municipal_code: params.municipalCode,
      reschedule_reminder_days_after: params.sendAfter,
      reschedule_reminder_message: params.sendAfterMessage,
    },
  });
};

// ServiceCategory requests

const serviceCategories = (params) =>
  api.get("api/v3/service_categories", {
    application: "petbooking",
    business_id: getBusinessId(),
    page: params.meta.page,
    per_page: params.meta.perPage,
  });

const createServiceCategory = (params) =>
  api.post("api/v3/service_categories", {
    service_category: {
      name: params.name,
      application: "petbooking",
      business_id: getBusinessId(),
      ancestry: params.ancestry,
    },
  });

// ServicePriceRule requests

const rules = () =>
  api.get("api/v3/service_price_rules", {
    application: "petbooking",
  });

const requests = {
  setConsumerToken,
  employments,
  services,
  createService,
  serviceCategories,
  createServiceCategory,
  rules,
};

export default requests;
