import apisauce from "apisauce";

export const getToken = () => localStorage.getItem("@pb/token");
export const getBusinessId = () => localStorage.getItem("@pb/businessId");
export const getConsumerUuid = () => localStorage.getItem("@pb/consumerUuid");
export const getConsumerToken = () => localStorage.getItem("@pb/consumerToken");

const api = apisauce.create({
  baseURL: "http://localhost:3001/",
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
      price:
        typeof params.price === "number"
          ? params.price
          : params.price.replace("R$", ""),
      cost:
        typeof params.cost === "number"
          ? params.cost
          : params.cost.replace("R$", ""),
      iss_type: params.issType,
      duration: params.duration,
      municipal_code: params.municipalCode,
      reschedule_reminder_days_after: params.sendAfter,
      reschedule_reminder_message: params.sendAfterMessage,
    },
  });
};

const updateService = (params) => {
  return api.put("api/v3/services", {
    id: params.id,
    service: {
      application: "petbooking",
      business_id: getBusinessId(),
      name: params.name,
      service_category_id: params.category,
      description: params.description,
      ancestry: params.ancestry,
      price:
        typeof params.price === "number"
          ? params.price
          : params.price.replace("R$", ""),
      cost:
        typeof params.cost === "number"
          ? params.cost
          : params.cost.replace("R$", ""),
      iss_type: params.issType,
      duration: params.duration,
      municipal_code: params.municipalCode,
      reschedule_reminder_days_after: params.sendAfter,
      reschedule_reminder_message: params.sendAfterMessage,
    },
  });
};

const removeService = (id) => {
  return api.delete("api/v3/services", {
    id: id,
  });
};

const petKinds = () => api.get("api/v3/pet_kinds");

const createSkill = (params) => {
  return api.post("api/v3/skills", {
    pet_kind_ids: params.petKindIds,
    skill: {
      employment_id: params.employment.id,
      service_id: params.serviceId,
      price:
        typeof params.price === "number"
          ? params.price
          : params.price.replace("R$", ""),
      duration: params.duration,
      comission_percentage: params.comission,
    },
  });
};

const updateSkill = (params) => {
  return api.put("api/v3/skills", {
    pet_kind_ids: params.petKindIds,
    id: params.currentSkill.id,
    skill: {
      employment_id: params.employment.id,
      service_id: params.currentService.id,
      price:
        typeof params.price === "number"
          ? params.price
          : params.price.replace("R$", ""),
      duration: params.duration,
      comission_percentage: params.comission,
    },
  });
};

const removeSkill = (id) => {
  return api.delete("api/v3/skills", {
    id: id,
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
    business_id: getBusinessId(),
  });

const prices = () =>
  api.get("api/v3/business_service_prices", {
    application: "petbooking",
    business_id: getBusinessId(),
  });

const breeds = (kind) =>
  api.get(`api/v2/breeds/${kind}`, {
    "page[number]": 1,
    "page[size]": 250,
  });

const updatePrices = (rule) => {
  const prices = rule.combinations.data.map((item) => ({
    id: item.business_service_price.id,
    price:
      typeof item.price === "number"
        ? item.price
        : item.price.replace("R$", ""),
  }));

  return api.put("api/v3/business_service_prices", {
    business_service_prices: prices,
  });
};

const createPrices = (rule) => {
  const prices = rule.combinations.data.map((item) => ({
    service_price_combination_id: item.id,
    price:
      typeof item.price === "number"
        ? item.price
        : item.price.replace("R$", ""),
  }));
  
  return api.post("api/v3/business_service_prices", {
    business_service_prices: prices,
    service_id: rule.service.id
  });
};

const requests = {
  setConsumerToken,
  employments,
  services,
  createService,
  serviceCategories,
  createServiceCategory,
  rules,
  prices,
  breeds,
  createPrices,
  updatePrices,
  updateService,
  removeService,
  petKinds,
  createSkill,
  updateSkill,
  removeSkill,
};

export default requests;
