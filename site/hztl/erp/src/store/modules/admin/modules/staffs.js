// 员工下拉选择
import { searchTypeStaffs } from "@/api/company/company";

export default {
  namespaced: true,
  state: {
    allStaffs: [],
    myStaffs: []
  },
  actions: {
    async loadAll({ dispatch }, isReload = false) {
      await dispatch("loadAllStaffs", isReload);
      await dispatch("loadMyStaffs", isReload);
    },
    async loadAllStaffs({ state }, isReload = false) {
      if (isReload || state.allStaffs.length === 0) {
        const res = await searchTypeStaffs();
        state.allStaffs = res || [];
      }
    },
    async loadMyStaffs({ state }, isReload = true) {
      if (isReload) {
        const res = await searchTypeStaffs({
          company: "self"
        });
        state.myStaffs = res || [];
      }
    }
  },
  mutations: {
    clearData(state) {
      state.allStaffs = [];
      state.myStaffs = [];
    }
  }
};
