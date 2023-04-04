import React, { Component, useEffect, useLayoutEffect } from 'react';

/**
 *
 * @returns
 * useEffect与useLayoutEffect有什么区别？
 *    简单来说就是调用时机不同，useLayoutEffect 和原来 componentDidMount & componentDidUpdate 一致，在
 *    react完成DOM更新后马上同步调用的代码，会阻塞页面渲染。而 useEffect 会在整个页面渲染完才会调用的代码。
 *
 *  官方建议有限使用useEffect
 *    在实际使用时如果想避免页面抖动（在 useEffect 里修改DOM很有可能出现）的话，可以把需要操作DOM的代码放在
 *    useLayoutEffect 里。在这里做点dom操作，这些dom修改会和react做出的更改一起被一次性渲染到屏幕上，
 *    只有一次回流、重绘的代价。
 */
function Child() {
  console.log(111);
  // componentDidMount() {
  //   window.onresize = () => {
  //     console.log("resize");
  //   };

  //   this.timer = setInterval(() => {
  //     console.log(new Date().getTime());
  //   }, 2000);
  // }

  // componentWillUnmount() {
  //   console.log("Child组件销毁");
  //   window.onresize = null;
  //   clearInterval(this.timer);
  // }

  // useLayoutEffect(() => {
  useEffect(() => {
    window.onresize = () => {
      console.log('resize');
    };

    const timer = setInterval(() => {
      console.log(new Date().getTime());
    }, 2000);

    return function Unmount() {
      console.log('组件销毁');
      window.onresize = null;
      clearInterval(timer);
    };
  }, []);

  return (
    <div>
      <h3>child</h3>
    </div>
  );
}

export default class App extends Component {
  state = {
    isCreated: true
  };

  componentWillUnmount() {
    console.log('App组件销毁');
  }

  render() {
    return (
      <div>
        <button
          onClick={() => {
            this.setState({
              isCreated: !this.state.isCreated
            });
          }}
        >
          delete child
        </button>
        {this.state.isCreated && <Child></Child>}
      </div>
    );
  }
}
