import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { show, hide } from '../../../redux/actionCreator/TabbarActionCreator';

function Detail(props) {
  const { show, hide, match } = props;

  useEffect(() => {
    // store.dispatch(hide());
    hide();

    return () => {
      console.log('destroy');
      show();
    };
  }, [match.params.id, show, hide]);

  return <div>Detail-{match.params.id}</div>;
}

// connect(将来给孩子传的属性，将来给孩子传的回调函数)
const mapDispatchToProps = {
  show,
  hide,
};
export default connect(null, mapDispatchToProps)(Detail);
