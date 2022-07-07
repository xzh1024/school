// import { connect } from 'react-redux';
import { createStore } from 'redux';

const reducer = (
  prevState = {
    show: true,
  },
  action
) => {
  console.log(prevState);
  console.log(action);
  const newState = { ...prevState };
  switch (action.type) {
    case 'hide-tabbar':
      newState.show = false;
      return newState;
    case 'show-tabbar':
      newState.show = true;
      return newState;
    default:
      return prevState;
  }
};

// const store = createStore(reducer);
const store = createMyStore(reducer);

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
