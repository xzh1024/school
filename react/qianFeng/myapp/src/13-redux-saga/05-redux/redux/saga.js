import { takeEvery, call, put } from 'redux-saga/effects';
import axios from 'axios';

function* watchSaga() {
  yield takeEvery('get-cinema-list', getCinemaList);
}

function* getCinemaList() {
  let res = yield call(getListAction); // 返回值是promise对象的函数

  yield put({
    type: 'change-cinema-list',
    payload: res,
  });
}

function getListAction() {
  return axios({
    method: 'get',
    url: 'https://m.maizuo.com/gateway?cityId=110100&ticketFlag=1&k=7964413',
    headers: {
      'X-Client-Info':
        '{"a":"3000","ch":"1002","v":"5.2.0","e":"16551164151371705180160001","bc":"110100"}',
      'X-Host': 'mall.film-ticket.cinema.list',
    },
  })
    .then((res) => {
      console.log(res.data.data.cinemas);
      return res.data.data.cinemas;
    })
    .catch((err) => {
      console.log(err);
    });
}

export default watchSaga;
