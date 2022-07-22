import React, { Component, Suspense } from 'react';
// import Comingsoon from './components/Comingsoon';
// import Nowplaying from './components/Nowplaying';
const Comingsoon = React.lazy(() => import('./components/Comingsoon'));
const Nowplaying = React.lazy(() => import('./components/Nowplaying'));

export default class App extends Component {
  state = {
    type: 1,
  };
  render() {
    return (
      <div>
        <button
          onClick={() =>
            this.setState({
              type: 1,
            })
          }
        >
          正在热映
        </button>
        <button
          onClick={() =>
            this.setState({
              type: 2,
            })
          }
        >
          即将上映{' '}
        </button>
        <Suspense fallback={<div>正在加载中......</div>}>
          {this.state.type === 1 ? <Nowplaying /> : <Comingsoon />}
        </Suspense>
      </div>
    );
  }
}
