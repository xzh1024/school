import { takeEvery } from 'redux-saga/effects';
import { getList1 } from './saga/saga1';
import { getList2 } from './saga/saga2';

function* watchSage() {
  // yield all([watchSage1(), watchSage2()]);
  yield takeEvery('get-list1', getList1);
  yield takeEvery('get-list2', getList2);
}

export default watchSage;
