export default {
  namespace: 'city', // 命名空间
  state: {
    cityName: '北京',
    cityId: 110100
  },
  effects: {},
  reducers: {
    save(state: any, action: any) {
      return { ...state, ...action.payload };
    }
    // changeCinemaList(prevState: any, { payload }) {
    //   return { ...prevState, list: payload };
    // },
  }
};
