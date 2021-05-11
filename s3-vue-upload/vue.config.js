// const VUE_BASE_URL = "http://woodcraftsman/Themes/japanese-red-rsp/scripts/";
const VUE_BASE_URL = "https://woodcraftsman.ru/img-test/";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const RollbarSourceMapPlugin = require("rollbar-sourcemap-webpack-plugin");
// import RollbarSourceMapPlugin from "rollbar-sourcemap-webpack-plugin";

const publicPath = process.env.NODE_ENV === "production" ? VUE_BASE_URL : "/";

module.exports = {
  publicPath,
  /*
  chainWebpack: (webpackConfig) => {
    webpackConfig.plugins.ad;
    /!* .push(
      new RollbarSourceMapPlugin({
        accessToken: "d5692cd325c1496c8e720f5555f766b8",
        version: "version-1",
        publicPath,
      })
    );*!/
  },*/

  configureWebpack: {
    plugins: [
      new RollbarSourceMapPlugin({
        accessToken: "d5692cd325c1496c8e720f5555f766b8",
        version: "version-1",
        publicPath,
      }),
    ],
  },
};
