import Vue from "vue";
import hztl from "@/components/hztl";
import VueHtml2Canvas from "vue-html2canvas";
import store from "@/store/store";
import print from "./print";
import "hztl-ui/lib/theme-chalk/index.css";

/* eslint-disable @typescript-eslint/ban-ts-ignore */
// @ts-ignore
import { uiConfig } from "envConfigPath";

if (uiConfig && uiConfig.appName) {
  const title = document.getElementById("title");
  if (title) {
    title.innerHTML = `${uiConfig.appName}-打破传统，专注于解决门店痛点` || "";
  }
}

import getPrintData from "./printData";
window.printData = getPrintData();

Vue.use(hztl);
Vue.use(VueHtml2Canvas);
print.store = store;
new Vue(print).$mount("#app");
