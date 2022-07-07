import React, { useState } from 'react';
import store from '../redux/store';

export default function Cinemas(props) {
  const [cityName, setCityName] = useState(
    store.getState().CityReducer.cityName
  );
  console.log(store.getState());

  return (
    <div
      onClick={() => {
        props.history.push('./city');
      }}
    >
      Cinemas-{cityName}
    </div>
  );
}
