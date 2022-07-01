import React, { useContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import './css/index.scss';

const GlobaContext = React.createContext();

const initailState = {
  filmList: [],
  filmInfo: null,
};

const reducer = (prevState, action) => {
  const newState = { ...prevState };

  switch (action.type) {
    case 'change-list':
      newState.filmList = action.value;
      return newState;
    case 'change-info':
      newState.filmInfo = action.value;
      return newState;

    default:
      return prevState;
  }
};

export default function App() {
  const [state, dispatch] = useReducer(reducer, initailState);

  useEffect(() => {
    axios.get('./test.json').then((res) => {
      // setfilmList(res.data || []);
      dispatch({
        type: 'change-list',
        value: res.data || [],
      });
    });
  }, []);

  return (
    <GlobaContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      <div>
        <div>
          {state.filmList.map((item) => (
            <FilmItem key={item.filmId} data={item}></FilmItem>
          ))}
        </div>
        {state.filmInfo && <FilmDetail></FilmDetail>}
      </div>
    </GlobaContext.Provider>
  );
}

function FilmItem(props) {
  const { dispatch } = useContext(GlobaContext);
  return (
    <div
      className="film-item clearfix"
      onClick={() =>
        dispatch({
          type: 'change-info',
          value: props.data,
        })
      }
    >
      <div>{props.data.name}</div>
      <img className="film-img" src={props.data.poster} alt="" />
    </div>
  );
}

function FilmDetail() {
  const {
    state: { filmInfo = {} },
  } = useContext(GlobaContext);
  return (
    <div className="film-detail">
      <div>{filmInfo.name}</div>
      <img className="film-img" src={filmInfo.poster} alt="" />
      {filmInfo.synopsis}
    </div>
  );
}
