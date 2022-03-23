import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  // constructor() {
  // super虽然代表了父类A的构造函数，但是返回的是子类B的实例，即super内部的this指的是B的实例，因此super()在这里相当于A.prototype.constructor.call(this)。
  //   super();

  //   // 初始化state
  //   this.state = {
  //     count: 0,
  //   };
  // }

  // 简化语法初始化state
  state = {
    count: 0,
  };

  add = () => {
    this.setState({
      count: this.state.count + 1,
    });
  };

  render() {
    return (
      <div>
        <h1>计数器：{this.state.count}</h1>
        <button onClick={this.add}>+1</button>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
