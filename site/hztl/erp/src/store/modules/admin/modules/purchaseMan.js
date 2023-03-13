import { searchTypeStaffs } from "@/api/company/company";

export default {
  namespaced: true,
  state: {
    purchaseMen: []
  },
  actions: {
    async loadAll({ dispatch }, company, isReload) {
      await dispatch("loadPurchaseMen", company, isReload);
    },
    // 以后isReload默认值改为false，以免重复请求数据
    async loadPurchaseMen({ state }, isReload = true) {
      if (isReload) {
        const res = await searchTypeStaffs({
          role: "purchaseMan",
          company: "self"
        });
        state.purchaseMen = res || [];
      }
    }
  },
  mutations: {
    clearData(state) {
      state.purchaseMen = [];
    }
  }
};
