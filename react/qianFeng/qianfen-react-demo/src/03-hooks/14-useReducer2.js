import React, { useContext, useReducer } from 'react';

const GlobaContext = React.createContext();

const initailState = {
  a: 0,
  b: 0,
};

const reducer = (prevState, action) => {
  const newState = { ...prevState };

  switch (action.type) {
    case 'change-child2':
      newState.a++;
      return newState;
    case 'change-child3':
      newState.b++;
      return newState;

    default:
      return prevState;
  }
};

export default function App() {
  const [state, dispatch] = useReducer(reducer, initailState);
  return (
    <GlobaContext.Provider value={{ state, dispatch }}>
      <div>
        <Child1></Child1>
        <Child2></Child2>
        <Child3></Child3>
      </div>
    </GlobaContext.Provider>
  );
}

function Child1() {
  const value = useContext(GlobaContext);
  return (
    <div>
      <div>child1</div>
      <button
        onClick={() =>
          value.dispatch({
            type: 'change-child2',
          })
        }
      >
        改变a
      </button>
      <button
        onClick={() =>
          value.dispatch({
            type: 'change-child3',
          })
        }
      >
        改变b
      </button>
    </div>
  );
}

function Child2() {
  const value = useContext(GlobaContext);
  return <div>child2-{value.state.a}</div>;
}

function Child3() {
  const value = useContext(GlobaContext);
  return <div>child3-{value.state.b}</div>;
}
