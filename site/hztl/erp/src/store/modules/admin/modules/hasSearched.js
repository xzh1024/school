export default {
  namespaced: true,
  state: {
    purchaseHasSearched: false,
    salesHasSearched: false
  },
  mutations: {
    activateHasSearched(state, type) {
      state[type] = true;
    },
    deactivateHasSearched(state, type) {
      state[type] = false;
    }
  }
};
