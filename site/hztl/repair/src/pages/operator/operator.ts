import Vue from "vue";
import operatorRouter from "../../router/operator";
import store from "../../store";
import OperatorPage from "./operator.vue";
// import "@/assets/styles/index.scss";
Vue.config.productionTip = false;
import "@/assets/css/operator.scss";

new Vue({
  router: operatorRouter,
  store,
  render: h => h(OperatorPage)
}).$mount("#operatorPage");
