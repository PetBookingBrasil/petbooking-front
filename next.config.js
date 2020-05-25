const withImages = require("next-images");
module.exports = {
  ...withImages(),
  exportPathMap: async function () {
    return {
      "/services": { page: "/" },
    };
  },
};
