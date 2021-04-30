import { createApp } from "vue";

// import App from "./App.vue";
// createApp(App).mount("#app");

import ImageList from "@/views/ImageList.vue";
import { store } from "./store";

createApp(ImageList).use(store).mount("#app");
