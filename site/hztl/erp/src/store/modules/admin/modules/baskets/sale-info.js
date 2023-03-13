import { loadSalesBasket } from "@/api/sales";
import { sumBy } from "lodash";

const state = {
  salesBasketsNumber: 0
};

const actions = {
  async loadSalesBasketInfo({ commit }) {
    const res = await loadSalesBasket();
    commit("setBasketInfo", sumBy(res, "rows.length"));
  }
};

const mutations = {
  setBasketInfo(state, payload) {
    state.salesBasketsNumber = payload;
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
