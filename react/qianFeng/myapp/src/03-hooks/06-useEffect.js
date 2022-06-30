import React, { Component, useEffect } from 'react';

function Child() {
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

  useEffect(() => {
    window.onresize = () => {
      console.log('resize');
    };

    let timer = setInterval(() => {
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
    isCreated: true,
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
              isCreated: !this.state.isCreated,
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
