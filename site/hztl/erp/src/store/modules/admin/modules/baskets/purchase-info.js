import {
  addPurchaseBasketFromEnquiry,
  loadPurchasesBasketInfoNum
} from "@/api/purchase";
import { Message } from "hztl-ui";

const state = {
  localNumber: 0,
  platform0Number: 0,
  platform1Number: 0
};

const getters = {
  baskketsTotal(state) {
    return state.localNumber + state.platform0Number + state.platform1Number;
  }
};

const actions = {
  async loadPurchaseBasketInfo({ commit }) {
    const res = await loadPurchasesBasketInfoNum();
    commit("setInfo", res.suppliersCountInfo);
  },
  async addLocalBasket({ dispatch }, payload) {
    await addPurchaseBasketFromEnquiry(payload);
    Message({
      message: "添加成功！",
      type: "success"
    });
    await dispatch("loadPurchaseBasketInfo");
  }
};

const mutations = {
  setInfo(state, payload) {
    state.localNumber = payload.local;
    state.platform0Number = payload.platform0;
    state.platform1Number = payload.platform1;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
