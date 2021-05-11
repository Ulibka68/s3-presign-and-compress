import { createApp } from "vue";

import * as Sentry from "@sentry/browser";
import { Severity } from "@sentry/browser";
import { Integrations } from "@sentry/tracing";
import App from "./App.vue";

Sentry.init({
  dsn:
    "https://e8f17c6386a44cc58ea9d8ffc84de4a8@o644502.ingest.sentry.io/5758343",
  integrations: [new Integrations.BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

const app = createApp(App);
// eslint-disable-next-line
(window as any).smf_VUE_image_upload = app;

// eslint-disable-next-line
app.config.errorHandler = (err, vm, info) => {
  Sentry.captureException(err);
  throw err; // rethrow
};

/*
В sentry все эти данные практически и так видны
const initMsg = `Start upload VUE app ==================\n
navigator.userAgent ${navigator.userAgent}\n
pixelDepth : ${window.screen.pixelDepth}, height : ${window.screen.height}, width : ${window.screen.width}`;
Sentry.captureMessage(initMsg, Severity.Info);
*/

app.mount("#a6309676754D94EB4B758ECCE1FCF316");

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// myUndefinedFunction();

/*
import ImageList from "@/views/ImageList.vue";

// eslint-disable-next-line
(window as any).smf_VUE_image_upload = createApp(ImageList).mount(
  "#a6309676754D94EB4B758ECCE1FCF316"
);
*/
