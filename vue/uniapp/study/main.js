import App from './App'
import uView from "uview-ui"

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
Vue.use(uView)

// 引入 store 
import store from '@/store/index.js'
Vue.prototype.$store = store

App.mpType = 'app'
const app = new Vue({
	...App
})
// http拦截器，此为需要加入的内容，如果不是写在common目录，请自行修改引入路径
import httpInterceptor from '@/components/common/http.interceptor.js'
// 这里需要写在最后，是为了等Vue创建对象完成，引入"app"对象(也即页面的"this"实例)
// Vue.use(httpInterceptor, app)

// http接口API集中管理引入部分
// import httpApi from '@/components/common/http.api.js'
// Vue.use(httpApi, app)

app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App).use(uView)
	return {
		app
	}
}
// #endif

// 引入请求封装，将app参数传递到配置中
// require('@/config/request.js')(app)
