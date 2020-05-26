const withImages = require("next-images");
module.exports = {
  ...withImages(),
  env: {
    PB_URL: "http://localhost:3000/",
  },
  exportPathMap: async function () {
    return {
      "/": { page: "/services" },
      "/services": { page: "/services" },
    };
  },
};
