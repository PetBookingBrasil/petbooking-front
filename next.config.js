const withImages = require("next-images");
module.exports = {
  ...withImages(),
  exportPathMap: async function () {
    return {
      "/": { page: "/services" },
      "/services": { page: "/services" },
    };
  },
};
