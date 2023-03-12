import Vue from "vue";
import Vuex from "vuex";
import admin from "./modules/admin";
import platform from "./modules/platform";
import baseData from "./modules/baseData";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    admin,
    platform,
    baseData
  }
});
