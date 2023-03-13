import { createSSRApp } from "vue";
import App from "./App.vue";
import common from "./mixins/common";
import storage from "@/ls";
import { createPinia } from "pinia";
export function createApp() {
  const app = createSSRApp(App);
  app.use(storage);
  app.use(createPinia());
  app.mixin(common);
  return {
    app
  };
}
