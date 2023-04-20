import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

export default function withRouter(Component) {
  return function (props) {
    const push = useNavigate();
    const match = useParams();
    const location = useLocation();
    // this.props.history.push 跳转页面
    // this.props.history.match 获取参数
    // this.props.history.location 获取当前路由
    return (
      <Component
        {...props}
        history={{
          push,
          match,
          location
        }}
      />
    );
  };
}
