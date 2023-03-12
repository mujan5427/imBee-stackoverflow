const path = require('path');

module.exports = {
  style: { sass: { loaderOptions: { additionalData: `
          @import "src/scss/_variables.scss";
          @import "src/scss/_reset.scss";
          @import "src/scss/_mixin.scss";
          @import "src/scss/_main.scss";
        ` } } },
  webpack: { alias: { '@': path.resolve(__dirname, 'src/') } }
};