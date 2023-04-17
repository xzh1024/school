export default {
  namespace: 'CityModel', // 命名空间
  state: {
    cityName: '北京',
    cityId: 110100
  },
  effects: {},
  reducers: {
    // save(state: any, { payload }: any) {
    //   return { ...state, ...payload };
    // },
    changeCity(prevState: any, action: any) {
      console.log(action)
      return { ...prevState, ...action };
    }
    // changeCinemaList(prevState: any, { payload }) {
    //   return { ...prevState, list: payload };
    // },
  }
};
