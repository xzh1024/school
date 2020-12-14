interface StateModel {
  title: string;
  userInfo: UserInfoModel;
  user: string;
}

interface UserInfoModel {
  name: string;
  age: number;
}

export default {
  namespaced: true,
  state: {
    // 用户个人信息
    title: "息展馆-商家后台",
    userInfo: {
      name: "xxx",
      age: 115
    }
  },
  getters: {
    userInfo: (state: StateModel) => {
      return state.userInfo
    }
  },
  actions: {
  },
  mutations: {
    setUserInfo(state: StateModel, userData: UserInfoModel) {
      state.userInfo = userData
    }
  }
};
