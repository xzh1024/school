export default {
  namespace: 'cinema', // 命名空间
  state: {
    list: []
  },
  effects: {
    *getList(action: any, obj: any) {
      console.log(obj);
      const { put, call } = obj;
      // const res = yield call(getListForCinema);
    }
  },
  reducers: {
    // save(state: any, { payload }: any) {
    //   return { ...state, ...payload };
    // },
    // changeCity(prevState: any, action: any) {
    //   console.log(action);
    //   return { ...prevState, ...action };
    // }
  }
};

async function getListForCinema(): Promise<any> {
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
