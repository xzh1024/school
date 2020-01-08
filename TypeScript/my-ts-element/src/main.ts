import Vue from 'vue';
import App from './App.vue';
// import router from './router';
import store from './store';

import './common/interceptors/interceptor.config'

import routerService from '@/router/router.service';
const router = routerService.getVueRouter();
import './plugins/element.js'
// console.log(router);
import "./styles/reset.css";
import "./styles/common.css";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
