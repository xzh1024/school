import { combineReducers, createStore } from 'redux';
import { TabbarReducer, CityReducer } from './reducers';

const reducer = combineReducers({ TabbarReducer, CityReducer });
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

const store = createStore(reducer);
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
