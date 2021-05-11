import { createApp } from "vue";
import Rollbar from "rollbar";

import App from "./App.vue";
const app = createApp(App);

const _rollbarConfig = {
  accessToken: "d5692cd325c1496c8e720f5555f766b8",
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: {
    environment: "production",
    client: {
      javascript: {
        code_version: "version-1",
      },
    },
  },
};
const rollbar = new Rollbar(_rollbarConfig);
// eslint-disable-next-line
declare var smf_Rollbar_vue : Rollbar;
(globalThis as any).smf_Rollbar_vue = rollbar;

// console.log("smf_Rollbar_vue : ", (globalThis as any).smf_Rollbar_vue);

app.config.globalProperties.$rollbar = rollbar;
// eslint-disable-next-line
(window as any).smf_VUE_image_upload = app;

// If you have already set up a global error handler,
// just add `vm.$rollbar.error(err)` to the top of it.
// If not, this simple example will preserve the app’s existing
// behavior while also reporting uncaught errors to Rollbar.
app.config.errorHandler = (err, vm, info) => {
  rollbar.error(err as any);
  throw err; // rethrow
};

rollbar.info("Start upload VUE app ==================");
rollbar.info("navigator.userAgent " + navigator.userAgent);
rollbar.info(
  `pixelDepth : ${window.screen.pixelDepth}, height : ${window.screen.height}, width : ${window.screen.width}`
);

app.mount("#a6309676754D94EB4B758ECCE1FCF316");

/*
import ImageList from "@/views/ImageList.vue";

// eslint-disable-next-line
(window as any).smf_VUE_image_upload = createApp(ImageList).mount(
  "#a6309676754D94EB4B758ECCE1FCF316"
);
*/
