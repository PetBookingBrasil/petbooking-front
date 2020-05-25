import { request } from "../api";

export const getTodos = async (url) => {
  return request(url, { method: "get" });
};
