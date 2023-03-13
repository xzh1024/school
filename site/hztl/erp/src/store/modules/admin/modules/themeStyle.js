import {
  getStaffSystemParamsDetail,
  updateStaffSystemParamsDetail
} from "@/api/base/base";

const MODULE = "common";
const TYPE = "themeColor";
const SET_THEME_NAME = "setThemeColor";

export default {
  namespaced: true,
  state: {
    themeColor: ""
  },
  actions: {
    async loadThemeColor({ commit }) {
      const { value: themeColor } = await getStaffSystemParamsDetail({
        module: MODULE,
        type: TYPE
      });
      commit(SET_THEME_NAME, themeColor);
      return themeColor;
    },
    async updateThemeColor({ commit }, themeColor = "") {
      await updateStaffSystemParamsDetail({
        module: MODULE,
        type: TYPE,
        value: themeColor
      });
      commit(SET_THEME_NAME, themeColor);
      return themeColor;
    }
  },
  mutations: {
    setThemeColor(state, themeColor) {
      state.themeColor = themeColor;
    }
  }
};
