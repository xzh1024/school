import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import ChildVue from './components/Child.vue'
import mitt from 'mitt'

const Mit = mitt()

// createApp(App).mount('#app')
const app = createApp(App)

declare module 'vue' {
  export interface ComponentCustomProperties {
    $Bus: typeof Mit
  }
}

app.config.globalProperties.$bus = Mit

// 全局组件
app.component('ChildVue', ChildVue)

app.mount('#app')
