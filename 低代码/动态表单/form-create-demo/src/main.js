import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import FormCreate from '@form-create/element-ui'

import App from './App.vue'
import router from './router'

import './assets/css/main.scss'

const app = createApp(App)

app.use(createPinia())
app.use(ElementPlus)
app.use(FormCreate)
app.use(router)

app.mount('#app')
