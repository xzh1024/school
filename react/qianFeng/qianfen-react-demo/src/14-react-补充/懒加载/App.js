import React, {
  Component,
  Suspense, // 是一个React组件，允许你定义一个加载指示器（如加载中的提示），当它在树中的子组件开始加载时显示。这对于动态导入的组件特别有用
  lazy // 允许你定义一个动态加载的组件。你需要提供一个函数，该函数必须调用import()方法。import()返回一个Promise，该Promise解决为模块的默认导出。
} from 'react'
// import Comingsoon from './components/Comingsoon';
// import Nowplaying from './components/Nowplaying';
const Comingsoon = lazy(() => import('./components/Comingsoon'))
const Nowplaying = lazy(() => import('./components/Nowplaying'))

export default class App extends Component {
  state = {
    type: 1
  }
  render() {
    return (
      <div>
        <button
          onClick={() =>
            this.setState({
              type: 1
            })
          }
        >
          正在热映
        </button>
        <button
          onClick={() =>
            this.setState({
              type: 2
            })
          }
        >
          即将上映{' '}
        </button>
        <Suspense fallback={<div>正在加载中......</div>}>
          {this.state.type === 1 ? <Nowplaying /> : <Comingsoon />}
        </Suspense>
      </div>
    )
  }
}
