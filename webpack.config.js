// webpack.config.js

const { GenerateSW } = require("workbox-webpack-plugin");

module.exports = {
  // ...your existing config...

  plugins: [
    // ...your existing plugins...

    new GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
    }),
  ],
};
