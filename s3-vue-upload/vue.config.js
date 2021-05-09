// const VUE_BASE_URL = "http://woodcraftsman/Themes/japanese-red-rsp/scripts/";
const VUE_BASE_URL = "https://woodcraftsman.ru/img-test/";

module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? VUE_BASE_URL : "/",
};
