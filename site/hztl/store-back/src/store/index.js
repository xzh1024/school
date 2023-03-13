import Vue from 'vue';
import Vuex from 'vuex';
import { getBase, getShareInfo } from '@/api/commonService';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    audioMuted: true,
    version: '完整版', //版本切换
    isCollapse: false, //左侧导航菜单展开/收起
    base: {
      name: '',
      companyType: '',
      erp: {},
    },
    shareInfo: {
      image: '',
      link: '',
      title: '',
    },
  },
  mutations: {
    setVersion(state, data) {
      state.version = data;
    },
    getCollapse(state, data) {
      state.isCollapse = data;
    },
    setBase(state, data) {
      Object.assign(state.base, data);
    },
    setAudioMuted(state) {
      state.audioMuted = false;
    },
    setShareInfo(state, data) {
      Object.assign(state.shareInfo, data);
    },
  },
  actions: {
    async getBase({ commit }) {
      const res = await getBase();
      if (res) {
        commit('setBase', res);
      }
    },
    async getShareInfo({ commit }) {
      const res = await getShareInfo();
      if (res) {
        commit('setShareInfo', res);
      }
    },
  },
  modules: {},
});
