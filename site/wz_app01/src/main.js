// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios';
Vue.prototype.$http = axios;
// require('es6-promise').polyfill()//解决安卓4.3及以下的手机不支持axios的使用，主要就是无法使用promise
import Es6Promise from 'es6-promise'
Es6Promise.polyfill()
import md5 from 'js-md5';
window.Base64 = require('js-base64').Base64;
//全局引入jquery
// import $ from 'jquery'
//复制粘贴插件
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

//全局引入jquery
// import $ from 'jquery'
// 饿了么前端团队推出的 Mint UI
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
//vue滑块
import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper)
//图片预览插件
import wcView from 'wc-view';
import 'wc-view/style.css';
Vue.use(wcView);
// import vuePicturePreview from 'vue-picture-preview'
// Vue.use(vuePicturePreview)


import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad,{
  // error:'./static/img/tubiao_jiazaishibai.jpg',
  // loading:'./static/img/c_jiazaizhong.jpg'
  error:require('./static/img/tubiao_jiazaishibai.jpg'),
  loading:require('./static/img/c_jiazaizhong.jpg')
});

import './static/css/reset.css'
import './static/css/public.css'
import './static/css/icon.css'
import store from './store/index.js'  //vuex
import publicJS from './static/js/public.js'
Vue.use(publicJS);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
	store,
  components: { App },
  template: '<App/>'
})
