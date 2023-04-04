import React, { useEffect } from 'react';
import { connect } from 'react-redux'; // connect函数 生成一个父组件订阅，取消订阅 dispatch action
import { show, hide } from '../../../redux/actionCreator/TabbarActionCreator';

function Detail(props) {
  const { show, hide, match } = props;

  useEffect(() => {
    console.log(props);
    // store.dispatch(hide());
    // props.hide();
    hide();

    return () => {
      console.log('destroy');
      // props.show();
      show();
    };
  }, [match.params.id, show, hide]);

  return <div>Detail-{match.params.id}</div>;
}

// connect(将来给孩子传的属性，将来给孩子传的回调函数)
const mapDispatchToProps = {
  show,
  hide
};
export default connect(null, mapDispatchToProps)(Detail);
