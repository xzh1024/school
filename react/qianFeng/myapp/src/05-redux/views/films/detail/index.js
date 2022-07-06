import React, { useEffect } from 'react';
import store from '../../../redux/store';
import { show, hide } from '../../../redux/actionCreator/TabbarActionCreator';

export default function Detail(props) {
  console.log(props);
  useEffect(() => {
    console.log('create');
    // store.dispath  通知
    // store.dispatch({
    //   type: 'hide-tabbar',
    // });
    store.dispatch(hide());

    return () => {
      console.log('destroy');
      // store.dispatch({
      //   type: 'show-tabbar',
      // });
      store.dispatch(show());
    };
  }, []);

  return (
    <div>Detail-{props.match.params.id}</div>
    // <div>Detail-{props.location.query.id}</div>
    // <div>Detail-{props.location.state.id}</div>
  );
}
