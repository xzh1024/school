import {
  // take,
  // fork,
  put,
  call,
  takeEvery,
} from 'redux-saga/effects';

function* watchSage1() {
  // while (true) {
  //   // take 监听组件发来的action
  //   yield take('get-list1');
  //   // fork 同步执行异步处理函数
  //   yield fork(getList1);
  // }
  yield takeEvery('get-list1', getList1);
}

function* getList1() {
  // 异步处理
  // call函数发异步请求
  let res = yield call(getListAction1); // 返回值是promise对象的函数

  yield put({
    type: 'change-list1',
    payload: res,
  });
  // put函数发出新的action
}

function getListAction1() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(['111', '222', '333']);
    }, 2000);
  });
}

export default watchSage1;
export { getList1 };
