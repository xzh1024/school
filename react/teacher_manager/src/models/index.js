const modelIndex = {
  namespace: 'index',
  state: {
    num: 0
  },
  effects: {
    //异步action
    *changeNum({ payload }, { select, put, call }) {
      yield put({ type: 'changeNum' }, payload)
    }
  },
  reducers: {
    changeNum(state, { payload }) {
      console.log(state);
      console.log(payload);
      // 保存数据到 state
      return {
        num: state.num + payload.num
      }
    },
  }
}

export default modelIndex;