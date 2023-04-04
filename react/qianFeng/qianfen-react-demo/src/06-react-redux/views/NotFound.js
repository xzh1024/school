import React, { useEffect } from 'react';

function NotFound(props) {
  useEffect(() => {
    console.log(props);
  }, [props]);

  return <div>404 not found</div>;
}

// 高阶函数
function myConnect(cb, obj) {
  const value = cb && cb();
  return (MyComponent) => {
    return (props) => {
      return (
        <div style={{ color: 'red' }}>
          <MyComponent {...props} {...value} {...obj} />
        </div>
      );
    };
  };
}

export default myConnect(
  () => {
    // console.log(state);
    return {
      a: 1,
      b: 2
    };
  },
  {
    fn1() {},
    fn2() {}
  }
)(NotFound);
