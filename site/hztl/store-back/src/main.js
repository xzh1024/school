import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'
import './assets/css/global.less'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/element-variables.scss'
import '@/assets/css/class.scss'

import '@/assets/iconFont/iconfont.css';
import VueClipboard from "vue-clipboard2";
import dayjs from 'dayjs'
import Common from './utils/plugin'//全局公共方法


Vue.prototype.$bus = new Vue();
Vue.prototype.$dayjs = dayjs


Vue.config.productionTip = false
VueClipboard.config.autoSetContainer = true
Vue.use(VueClipboard)
Vue.use(ElementUI)
Vue.use(Common)



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

