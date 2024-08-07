import { all } from 'redux-saga/effects';
import watchSage1 from './saga/saga1';
import watchSage2 from './saga/saga2';

function* watchSage() {
  yield all([watchSage1(), watchSage2()]);
}

export default watchSage;
