import React from 'react';
import { connect } from 'react-redux';
import './App.css';

// import { HashRouter, BrowserRouter, NavLink, Link, Switch, Redirect, Router, Route} from 'react-router-dom'
import { BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import Info from './Info'
import WishList from './WishList'
/*
  路由插件 react-router-dom：
    Link组件，会渲染一个a标签；
    BrowserRouter组件，history模式，使用pushState和popState事件构建路由；
    HashRouter组件，使用window.location.hash和hashchange事件构建路由。
    exact：精确匹配
*/

class Man extends React.Component {
  componentDidMount() {
    console.log(this.props)
  }
  render () {
    return (
      <div>
        男人详情页
      </div>
    )
  }
}

class Woman extends React.Component {
  componentDidMount() {
    console.log(this.props)
  }
  render () {
    return (
      <div>
        女人详情页
      </div>
    )
  }
}

class Home extends React.Component {
  componentDidMount() {
    console.log(this.props)
  }
  render () {
    return (
      <div>
        <h1>我是首页</h1>
      </div>
    )
  }
}

function App() {
  console.log(this);
  return (
    <div className="App">
      <header>头部</header>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home}></Route>
          <Route path="/hemo/:id" exact component={Home}></Route>
          <Route path="/info" render={() => 
            <Info>
              <Route path="/info/man" component={Man}></Route>
              <Route path="/info/woman" component={Woman}></Route>
            </Info>
          } />
          <Route path="/wishList" exact component={WishList}></Route>
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
      <footer>底部</footer>
    </div>
  );
}

function mapStateToProps(state) {
  return state
}

// export default App;
export default connect(mapStateToProps)(App);