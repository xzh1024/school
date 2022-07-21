import { applyMiddleware, compose, combineReducers, createStore } from 'redux';
import { TabbarReducer, CityReducer, CinemaListReducer } from './reducers';
import reduxThunk from 'redux-thunk';
import reduxPromise from 'redux-promise';
import createSagaMidller from 'redux-saga';
import watchSaga from './saga';

const reducer = combineReducers({
  TabbarReducer,
  CityReducer,
  CinemaListReducer,
});
// const reducer = (
//   prevState = {
//     show: true,
//     cityName: '北京',
//   },
//   action
// ) => {
//   console.log(prevState);
//   console.log(action);
//   const newState = { ...prevState };
//   switch (action.type) {
//     case 'hide-tabbar':
//       newState.show = false;
//       return newState;
//     case 'show-tabbar':
//       newState.show = true;
//       return newState;
//     case 'change-city':
//       newState.cityName = action.value;
//       return newState;
//     default:
//       return prevState;
//   }
// };

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sageMidlleware = createSagaMidller();
const store = createStore(
  reducer,
  /* preloadedState, */ composeEnhancers(
    applyMiddleware(reduxThunk, reduxPromise, sageMidlleware)
  )
);

sageMidlleware.run(watchSaga);
// const store = createStore(reducer, applyMiddleware(reduxThunk, reduxPromise));
// const store = createMyStore(reducer);

/*
  store.dispatch
  store.subscribe
  store.getState
*/
function createMyStore(reducer) {
  var list = [];
  var state = reducer(undefined, {});

  function subscribe(callback) {
    list.push(callback);
  }

  function dispatch(action) {
    state = reducer(state, action);
    for (var i in list) {
      list[i] && list[i]();
    }
  }

  function getState() {
    return state;
  }

  return {
    subscribe,
    dispatch,
    getState,
  };
}

export default store;

/*
  var obj = {
    myname: "zhangsan"
  }
  function test(obj2) {
    // obj.myname = "xiaoming";
    var newobj = {...obj2};
    newobj.myname = "xiaoming"

    return newobj;
  }

  test(obj)

  纯函数：
      1.对外界没有副作用
      2.同样的输入得到同样的输出
*/
