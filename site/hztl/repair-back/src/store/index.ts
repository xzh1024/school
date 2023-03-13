import Vue from "vue";
import Vuex from "vuex";
import base from "@/store/modules/base";
import tablePage from "@/store/modules/tablePage";

Vue.use(Vuex);

export default new Vuex.Store({
  // state: {},
  // mutations: {},
  // actions: {},
  modules: {
    base,
    tablePage
  }
});
