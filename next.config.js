const withImages = require("next-images");
module.exports = {
  ...withImages(),
  env: {
    PB_URL: "http://localhost:3001/",
  },
  exportPathMap: async function () {
    return {
      "/": {
        page: "/services",
        query: { token: "", business_id: "", consumer_uuid: "" },
      },
      "/services": {
        page: "/services",
        query: { token: "", business_id: "", consumer_uuid: "" },
      },
    };
  },
};
