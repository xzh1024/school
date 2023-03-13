// 往来单位下拉选择
import { selectCooperators } from "@/api/communion/communion";

export default {
  namespaced: true,
  state: {
    logisticsTypes: []
  },
  actions: {
    async loadAll({ dispatch }, isReload = false) {
      dispatch("loadLogistics", isReload);
    },
    async loadLogistics({ state }, isReload = false) {
      // 物流公司
      if (isReload || state.logisticsTypes.length === 0) {
        const res = await selectCooperators({ type: "logistics" });
        state.logisticsTypes = res || [];
      }
    }
  },
  mutations: {
    clearData(state) {
      state.logisticsTypes = [];
    }
  }
};
