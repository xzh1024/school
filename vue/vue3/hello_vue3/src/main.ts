import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// 引入pinia
import { createPinia } from 'pinia'

// createApp(App).mount('#app')

// 创建一个Vue应用实例
const app = createApp(App)
const pinia = createPinia()
// 使用路由
app.use(router)
app.use(pinia)
// 挂载到DOM
app.mount('#app')
