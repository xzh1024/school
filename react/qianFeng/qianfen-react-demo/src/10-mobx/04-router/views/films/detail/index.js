import React, { useEffect } from 'react';
import store from '../../../mobx/store';

export default function Detail(props) {
  console.log(props);
  useEffect(() => {
    console.log('create');

    // store.dispath  通知
    // store.isTabbarShow = false;
    store.changeHide();
    return () => {
      console.log('destroy');
      store.changeShow();
    };
  }, []);

  return (
    <div>Detail-{props.match.params.id}</div>
    // <div>Detail-{props.location.query.id}</div>
    // <div>Detail-{props.location.state.id}</div>
  );
}
