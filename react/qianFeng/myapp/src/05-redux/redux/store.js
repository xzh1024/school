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

const store = createStore(reducer);

export default store;
