/* eslint-disable @typescript-eslint/no-explicit-any */
import "./public-path.js";
import "@/utils/polyfill";
import Vue from "vue";
import "vue-tsx-support/enable-check";
import router from "@/router/router";
import store from "@/store/store";
import "hztl-ui/lib/theme-chalk/index.css";
import "@/assets/css/iconfont/iconfont.css";
import "@/assets/css/main.scss";
import App from "./App.vue";
import VueHtml2Canvas from "vue-html2canvas";
/* eslint-disable @typescript-eslint/ban-ts-ignore */
// @ts-ignore
import { envConfig } from "envConfigPath";
// import "@/assets/css/theme/blue/theme/index.css";

//动态创建客服
function loadScriptString(accessId: string) {
  const script = document.createElement("script"); //创建一个script标签
  script.type = "text/javascript";
  script.src = `https://webchat.7moor.com/javascripts/7moorInit.js?accessId=${accessId}&autoShow=true&language=ZHCN`;
  document.getElementsByTagName("head")[0].appendChild(script);
}
loadScriptString(envConfig.webchat);
import hztl from "@/components/hztl";

import filters from "@/filters";
Object.keys(filters).forEach(name => {
  Vue.filter(name, filters[name]);
});

import { mapState } from "vuex";
import "@/directives";
import VueDND from "awe-dnd";
Vue.use(VueDND);
Vue.use(hztl);
Vue.use(VueHtml2Canvas);

// 设置生产模式
Vue.config.productionTip = false;

let instance: Vue | null = null;

function render(props: any = {}) {
  const { container } = props;

  instance = new Vue({
    router,
    store,
    computed: {
      ...mapState("admin/user", ["appName", "copyRight"])
    },
    created() {
      document.title = `${this.appName}${
        this.copyRight ? "-" + this.copyRight : ""
      }`;
    },
    render: h => h(App)
  }).$mount(container ? container.querySelector("#app") : "#app");
}

if (!(window as any).__POWERED_BY_QIANKUN__) {
  render();
}

export async function bootstrap() {
  console.log("[vue] vue app bootstraped");
}

export async function mount(props: any) {
  console.log("[vue] props from main framework", props);
  render(props);
}

export async function unmount() {
  instance!.$destroy();
  (instance!.$el as HTMLElement).innerHTML = "";
  instance = null;
}
