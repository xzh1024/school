import { searchTypeStaffs } from "@/api/company/company";

export default {
  namespaced: true,
  state: {
    warehouseManagers: []
  },
  actions: {
    async loadAll({ dispatch }, isReload) {
      await dispatch("loadWarehouseManagers", isReload);
    },
    // 以后isReload默认值改为false，以免重复请求数据
    async loadWarehouseManagers({ state }, isReload = true) {
      if (isReload || state.warehouseManagers.length === 0) {
        const res = await searchTypeStaffs({ role: "warehouseManager" });
        state.warehouseManagers = res;
      }
    }
  },
  mutations: {
    clearData(state) {
      state.warehouseManagers = [];
    }
  }
};
