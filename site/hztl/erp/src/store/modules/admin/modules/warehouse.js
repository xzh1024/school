import { searchAllWarehouses } from "@/api/base";

export default {
  namespaced: true,
  state: {
    administerWareHouse: []
  },
  actions: {
    async loadAll({ dispatch }, isReload) {
      await dispatch("loadAdministerWareHouse", isReload);
    },
    // 以后isReload默认值改为false，以免重复请求数据
    async loadAdministerWareHouse({ state }, isReload = true) {
      if (isReload || state.administerWareHouse.length === 0) {
        const res = await searchAllWarehouses({ name: "", status: 0 });
        state.administerWareHouse = res;
      }
    }
  },
  mutations: {
    clearData(state) {
      state.administerWareHouse = [];
    }
  }
};
