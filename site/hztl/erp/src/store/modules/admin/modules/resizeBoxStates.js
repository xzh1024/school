//导入本地存储方式
export default {
  namespaced: true,
  state: {
    // 侧边菜单
    singleSettleDialog: true
  },
  mutations: {
    changeState(state, payload) {
      Object.keys(payload).forEach(key => {
        state[key] = payload[key];
      });
      localStorage.setItem("resizeBoxStates", JSON.stringify(state));
    },
    initState(state) {
      try {
        const data = JSON.parse(localStorage.getItem("resizeBoxStates"));
        data &&
          Object.keys(data).forEach(key => {
            state[key] = data[key];
          });
      } catch (e) {
        console.log(e);
      }
    }
  }
};
