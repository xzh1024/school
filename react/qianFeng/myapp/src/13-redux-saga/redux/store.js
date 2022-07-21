import { createStore, applyMiddleware } from 'redux';
import reducer from './reducer';
import createSagaMidlleWare from 'redux-saga';
// import watchSage from './saga';
import watchSage from './saga-every';

const SagaMidlleWare = createSagaMidlleWare();
const store = createStore(reducer, applyMiddleware(SagaMidlleWare));

SagaMidlleWare.run(watchSage); // saga任务
export default store;
