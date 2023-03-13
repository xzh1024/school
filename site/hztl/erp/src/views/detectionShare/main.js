import Vue from "vue";
import hztl from "@/components/hztl";
import store from "@/store/store";
import index from "./index";
import "babel-polyfill";
import Es6Promise from "es6-promise";
import "hztl-ui/lib/theme-chalk/index.css";
import VueHtml2Canvas from "vue-html2canvas";
Es6Promise.polyfill();

Vue.use(hztl);
Vue.use(VueHtml2Canvas);
index.store = store;
new Vue(index).$mount("#app");
