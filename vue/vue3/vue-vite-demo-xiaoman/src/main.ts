import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'

import ChildVue from './components/Child.vue'

// createApp(App).mount('#app')
const app = createApp(App)

// 全局组件
app.component('ChildVue', ChildVue)

app.mount('#app')
