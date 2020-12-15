import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import service from '@/common/interceptors/interceptorConfig'
import "./plugins/element.js";
import "@/assets/css/main.scss";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
