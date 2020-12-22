import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/element.js";
import '@/assets/css/element.scss'
import "@/assets/css/main.scss";
import HtButton from "@/components/hztl/ht-button";
Vue.use(HtButton);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
