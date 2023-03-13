import { fetchPlatformList, fetchDataServiceList } from "@/api/platform";

export default {
  namespaced: true,
  state() {
    return {
      platformList: [],
      dataServiceList: []
    };
  },
  actions: {
    async loadPlatformList({ state }, isReload = false) {
      if (isReload || state.platformList.length === 0) {
        const res = await fetchPlatformList();
        state.platformList = res || [];
      }
    },
    async loadDataServiceList({ state }, isReload = false) {
      if (isReload || state.dataServiceList.length === 0) {
        const res = await fetchDataServiceList();
        state.dataServiceList = res || [];
      }
    }
  },
  mutations: {
    clearData(state) {
      state.platformList = [];
      state.dataServiceList = [];
    }
  }
};
