import Vue from "vue";
// 采用编译后的
// import HztlUi from "hztl-ui/lib/hztl-ui.common";
// import "hztl-ui/lib/theme-chalk/index.css";

// 采用未编译代码
import HztlUi from "hztl-ui/src/index";
import "hztl-ui/packages/theme-chalk/src/index.scss";
import "./assets/css/common.scss";

import App from "./App.vue";

import router from "./router";

Vue.use(HztlUi)

new Vue({
    router,
    render: h => h(App)
}).$mount("#app");