import Vue from "vue";
import hztl from "@/components/hztl";
import store from "@/store/store";
import index from "./index";
import "hztl-ui/lib/theme-chalk/index.css";

Vue.use(hztl);
index.store = store;
new Vue(index).$mount("#app");
