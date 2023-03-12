import { getMyCompanyInfo } from "@/api/company/company";
export default {
  namespaced: true,
  state: {
    myCompnayInfoData: null
  },
  actions: {
    async loadAll({ dispatch }, isReload) {
      await dispatch("loadMyCompnayInfo", isReload);
      return Promise.resolve();
    },
    // 以后isReload默认值改为false，以免重复请求数据
    async loadMyCompnayInfo({ state }, isReload = true) {
      if (isReload) {
        const res = await getMyCompanyInfo();
        state.myCompnayInfoData = res;
      }
    }
  },
  mutations: {
    clearData(state) {
      state.myCompnayInfoData = null;
    }
  }
};
