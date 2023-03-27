import React, { useEffect } from 'react';

export default function Detail(props) {
  console.log(props);
  useEffect(() => {
    console.log('create');
    
    // store.dispath  通知

    return () => {
      console.log('destroy');
    };
  }, []);

  return (
    <div>Detail-{props.match.params.id}</div>
    // <div>Detail-{props.location.query.id}</div>
    // <div>Detail-{props.location.state.id}</div>
  );
}
