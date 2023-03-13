// 下拉配件品牌 - 下拉配件分类
import { newAllBrands } from "@/api/common/common";

export default {
  namespaced: true,
  state: {
    brands: [],
    partsCategories: []
  },
  actions: {
    async loadAll({ dispatch }, isReload = false) {
      dispatch("loadBrands", isReload);
    },
    async loadBrands({ state }, isReload = false) {
      // 配件品牌
      if (isReload || state.brands.length === 0) {
        const res = await newAllBrands({ types: [2, 3] });
        state.brands = res.brands;
      }
    }
  },
  mutations: {
    clearData(state) {
      state.brands = [];
      state.partsCategories = [];
    }
  }
};
