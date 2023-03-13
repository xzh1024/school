import { searchTypeStaffs } from "@/api/company/company";

export default {
  namespaced: true,
  state: {
    salesMen: []
  },
  actions: {
    async loadAll({ dispatch }, company, isReload) {
      await dispatch("loadSalesMen", company, isReload);
    },
    // 以后isReload默认值改为false，以免重复请求数据
    async loadSalesMen({ state }, isReload = true) {
      if (isReload) {
        const res = await searchTypeStaffs({
          role: "salesMan",
          company: "self"
        });
        state.salesMen = res || [];
      }
    }
  },
  mutations: {
    clearData(state) {
      state.salesMen = [];
    }
  }
};
