import { request, getConsumerUuid } from "../api";

export const getConsumerToken = async () => {
  return request("api/v2/consumers/auth", {
    method: "post",
    body: {
      data: {
        type: "consumers",
        attributes: {
          uuid: getConsumerUuid(),
        },
      },
    },
  });
};
