let allStates = [];
const maxLength = 10;

export default {
  namespaced: true,
  state: {
    loaded: false,
    staffId: null,
    data: {}
  },
  actions: {
    async initData({ state, rootState, dispatch }) {
      state.staffId = rootState.admin.user.userInfoMsg.staffId;
      try {
        allStates = JSON.parse(localStorage.getItem("orderStates")) || [];
        const curState = allStates.find(item => item.staffId === state.staffId);
        state.data = curState ? curState : { staffId: state.staffId };
      } catch (e) {
        state.data = { staffId: state.staffId };
        allStates = [];
        console.log(e);
      }
      dispatch("updateLocalStorage");
      state.loaded = true;
    },
    setState({ state, dispatch }, data) {
      state.data = {
        ...state.data,
        ...data
      };
      dispatch("updateLocalStorage");
    },
    updateLocalStorage({ state }) {
      // 使用到放在第一位，超过10个用户清除未使用的
      allStates = allStates.filter(item => item.staffId !== state.staffId);
      allStates.unshift(state.data);
      while (allStates.length > maxLength) {
        allStates.pop();
      }
      localStorage.setItem("orderStates", JSON.stringify(allStates));
    }
  },
  mutations: {
    clearData(state) {
      state.staffId = null;
      state.data = {};
      state.loaded = false;
    }
  }
};
