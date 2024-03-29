import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import './plugins/element.js'

// 全局过滤器
import * as Filters from './utils/filters'
Object.keys(Filters).forEach(key => Vue.filter(key, Filters[key]))
Vue.filter('money', function (value) {
  return value + '元';
});


Vue.config.productionTip = false;

new Vue({
  router,
  store, // 把 store 对象提供给 “store” 选项，这可以把 store 的实例注入所有的子组件
  render: h => h(App)
}).$mount("#app");
