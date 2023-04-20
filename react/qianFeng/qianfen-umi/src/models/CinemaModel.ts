export default {
  namespace: 'cinema', // 命名空间
  state: {
    list: []
  },
  reducers: {
    changeList(prevState: any, action: any) {
      return { ...prevState, list: action.payload };
    }
  },
  effects: {
    *getList(action: any, obj: any): any {
      console.log(obj);
      const { put, call } = obj;
      const res = yield call(getListForCinema);
      yield put({
        type: 'changeList',
        payload: res
      });
    }
  }
};

async function getListForCinema() {
  const res = await fetch(
    'https://m.maizuo.com/gateway?cityId=110100&ticketFlag=1&k=4673145',
    {
      headers: {
        'X-Client-Info':
          '{"a":"3000","ch":"1002","v":"5.2.1","e":"16556233951665077216280577","bc":"110100"}',
        'X-Host': 'mall.film-ticket.cinema.list'
      }
    }
  ).then((res) => res.json());
  // .then((res) => {
  //   console.log(res);
  // });
  console.log(res);
  return res.data.cinemas;
}
