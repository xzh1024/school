import React from 'react';
import { withRouter } from 'react-router-dom';

function Center(props) {
  return (
    <div>
      Center
      <div
        onClick={() => {
          console.log(props);
          props.history.push(`/filmssorder`);
        }}
      >
        电影订单
      </div>
    </div>
  );
}

export default withRouter(Center);

/**
 * 
 * withRouter, 作用是可以加工一般组件，让一般组件具备路由组件所特有的API
 * 
 * 原理：高阶组件中的withRouter, 作用是将一个组件包裹进Route里面, 然后react-router的三个对象history, location, match就会被放进这个组件的props属性中.
 * 如果我们某个东西不是一个Router, 但是我们要依靠它去跳转一个页面, 比如点击页面的logo, 返回首页, 这时候就可以使用withRouter来做.
 * 
 * **/
