import React, { Component } from 'react';
import IndexRouter from './router/index';
import store from './redux/store';
class App extends Component {
  state = {
    isShow: store.getState().isShow,
  };

  componentDidMount() {
    store.subscribe(() => {
      console.log(store.getState());
      this.setState({
        isShow: store.getState().isShow,
      });
    });
  }

  render() {
    return (
      <div>
        <IndexRouter></IndexRouter>

        {this.state.isShow && (
          <ul>
            <li>电影</li>
            <li>影院</li>
            <li>我的</li>
          </ul>
        )}
      </div>
    );
  }
}

export default App;
