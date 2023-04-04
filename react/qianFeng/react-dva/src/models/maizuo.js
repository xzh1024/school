import { getCinemaListService } from "../services/maizuo";

export default {
  namespace: "maizuo",

  state: {
    isShow: true,
    list: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      // eslint-disable-line
    },
  },

  // 以 key/value 格式定义 effect。用于处理异步操作和业务逻辑，不直接修改 state。由 action 触发，可以触发 action，可以和服务器交互，可以获取全局 state 的数据等等。
  effects: {
    *fetch({ payload }, { call, put }) {
      // eslint-disable-line
      yield put({ type: "save" });
    },
    *getCinemaList(action, { call, put }) {
      const res = yield call(getCinemaListService);
      console.log(res.data.data.cinemas);
      yield put({
        type: "changeCinemaList",
        payload: res.data.data.cinemas || [],
      });
    },
  },

  // 以 key/value 格式定义 reducer。用于处理同步操作，唯一可以修改 state 的地方。由 action 触发。
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
    hide(prevState, action) {
      return { ...prevState, isShow: false };
    },
    show(prevState, action) {
      return { ...prevState, isShow: true };
    },
    changeCinemaList(prevState, { payload }) {
      return { ...prevState, list: payload };
    },
  },
};
