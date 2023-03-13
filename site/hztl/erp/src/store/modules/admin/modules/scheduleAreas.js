// 所属区域列表
import { scheduleAreas } from "@/api/store/schedules";
export default {
  namespaced: true,
  state: {
    scheduleAreasList: []
  },
  actions: {
    async loadAll({ dispatch }, isReload = false) {
      await dispatch("loadScheduleAreas", isReload);
    },
    async loadScheduleAreas({ state }, isReload = false) {
      if (isReload || state.scheduleAreasList.length === 0) {
        const res = await scheduleAreas();
        state.scheduleAreasList = res;
      }
    }
  },
  mutations: {
    clearData(state) {
      state.scheduleAreasList = [];
    }
  }
};
