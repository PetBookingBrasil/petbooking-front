// Define API requests, creating methods for each endpoint used
// Loading all modules requests

import fetch from "isomorphic-unfetch";

export const request = async (url, options) => {
  return fetch(process.env.PB_URL + url, {
    ...options,
    body: !!options.body ? JSON.stringify(options.body) : null,
    headers: {
      "Content-Type": "application/vnd.api+json",
      Accept: "application/vnd.petbooking-v1+json",
      "X-Application": "petbooking",
      "X-Device": "web",
      Authorization: `Bearer ${getConsumerToken()}`,
      "X-Petbooking-Session-Token": `Token token="${getToken()}"`,
    },
  });
};

export const formatParams = (params) => {
  return Object.keys(params)
    .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(params[k]))
    .join("&");
};

export const getToken = () => localStorage.getItem("@pb/token");

export const getBusinessId = () => localStorage.getItem("@pb/businessId");

export const getConsumerUuid = () => localStorage.getItem("@pb/consumerUuid");

export const getConsumerToken = () => localStorage.getItem("@pb/consumerToken");
