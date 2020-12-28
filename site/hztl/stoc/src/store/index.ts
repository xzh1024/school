import Vue from "vue";
import Vuex from "vuex";
import base from "@/store/modules/base/index";
import city from "@/store/modules/city/index";

Vue.use(Vuex);

export default new Vuex.Store({
  // state: {},
  // mutations: {},
  // actions: {},
  modules: {
    base,
    city
  }
});
