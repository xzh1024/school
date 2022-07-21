import { take, fork, put, call, takeEvery } from 'redux-saga/effects';

function* watchSage2() {
  // while (true) {
  //   // take 监听组件发来的action
  //   yield take('get-list2');
  //   // fork 同步执行异步处理函数
  //   yield fork(getList2);
  // }
  yield takeEvery('get-list2', getList2);
}

function* getList2() {
  // 异步处理
  // call函数发异步请求
  // let res = yield call(getListAction2); // 返回值是promise对象的函数
  let res1 = yield call(getListAction2_1);
  let res2 = yield call(getListAction2_2, res1);

  yield put({
    type: 'change-list2',
    payload: res2,
  });
  // put函数发出新的action，非阻塞式执行
}

function getListAction2() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(['aaa', 'bbb', 'ccc']);
    }, 2000);
  });
}

function getListAction2_1() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(['444', '555', '666']);
    }, 2000);
  });
}

function getListAction2_2(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([...data, '777', '888', '999']);
    }, 2000);
  });
}

export default watchSage2;
export { getList2 };
