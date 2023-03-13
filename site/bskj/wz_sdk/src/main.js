// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vueAxios from 'vue-axios'
import axios from 'axios'
Vue.use(vueAxios, axios)
import store from './store/index.js'  //vuex
//复制粘贴插件
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

import 'mint-ui/lib/style.css'
// import Mint from 'mint-ui'
// Vue.use(Mint)
import { Swipe, SwipeItem, InfiniteScroll, Spinner, Cell, Popup, Picker, DatetimePicker, Loadmore } from 'mint-ui';
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.use(InfiniteScroll);
Vue.component(Spinner.name, Spinner);
Vue.component(Cell.name, Cell);
Vue.component(Popup.name, Popup);
Vue.component(Picker.name, Picker);
Vue.component(DatetimePicker.name, DatetimePicker);
Vue.component(Loadmore.name, Loadmore);

import md5 from 'js-md5'
import publicJS from './static/js/public.js'
Vue.use(publicJS);
import wzSDK from './static/js/wzSDK.js'
Vue.use(wzSDK);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
