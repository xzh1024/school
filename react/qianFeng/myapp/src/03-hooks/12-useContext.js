import React, { Component, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import './css/index.scss';

const GlobaContext = React.createContext();

export default function App() {
  const [filmList, setfilmList] = useState([]);
  const [filmInfo, setfilmInfo] = useState({});

  useEffect(() => {
    axios.get('./test.json').then((res) => {
      setfilmList(res.data || []);
    });
  }, filmList.length);

  const changeFilmInfo = (item) => {
    setfilmInfo(item);
  };
  return (
    <GlobaContext.Provider
      value={{
        call: '打电话',
        sms: '短信',
        info: filmInfo,
        changeInfo: changeFilmInfo,
      }}
    >
      <div>
        <div>
          {filmList.map((item) => (
            <FilmItem key={item.filmId} data={item}></FilmItem>
          ))}
        </div>
        {filmInfo && <FilmDetail data={filmInfo}></FilmDetail>}
      </div>
    </GlobaContext.Provider>
  );
}

function FilmItem(props) {
  const value = useContext(GlobaContext);
  return (
    <div
      className="film-item clearfix"
      onClick={() => value.changeInfo(props.data)}
    >
      <div>{props.data.name}</div>
      <img className="film-img" src={props.data.poster} alt="" />
    </div>
  );
}

function FilmDetail(props) {
  const value = useContext(GlobaContext);
  console.log(value);
  return (
    <div className="film-detail">
      {/* <div>{this.props.data.name}</div> */}
      <div>{value.info.name}</div>
      <img className="film-img" src={props.data.poster} alt="" />
      {value.info.synopsis}
    </div>
  );
}
