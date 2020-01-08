/*
* 客户端 entry 只需创建应用程序，并且将其挂载到 DOM 中：
* */
import { createApp } from './app'

// 客户端特定引导逻辑……

// const { app } = createApp()
//
// // 这里假定 App.vue 模板中根元素具有 `id="app"`
// app.$mount('#app')


// const { app, router } = createApp()
//
// router.onReady(() => {
//     app.$mount('#app')
// })



const { app, router, store } = createApp()

if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__)
}
