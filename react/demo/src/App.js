import React, { Component } from 'react';
import { connect } from 'react-redux';
// import {HashRouter, Route, Switch} from 'react-router-dom';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
// import Tabbar from './components/tabbar';
import Login from './pages/login';
import Home from './pages/home/home';
import Category from './pages/category/category';
import Car from './pages/car/car';
import User from './pages/user/user';


// 由于 antd 组件的默认文案是英文，所以需要修改为中文
// import zhCN from 'antd/es/locale/zh_CN';


import './App.scss';

class App extends Component {
  render() {
    // console.log(this);
    return (
      <div className="App">
        <div className="container">
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" render={() => <Redirect to='/login'></Redirect>}></Route>
                    <Route exact path='/login' component={Login}></Route>
                    <Route path='/home' component={Home}></Route>
                    <Route path='/category' component={Category}></Route>
                    <Route path='/car' component={Car}></Route>
                    <Route path='/user' component={User}></Route>
                    <Redirect to="/" />
                </Switch>
            </BrowserRouter>
        </div>
      </div>
    );
  }
}

// function App() {
//   return (
//     <div className="App">
//       <div className="container">
//           <BrowserRouter>
//               <Switch>
//                   <Route exact path="/" render={() => <Redirect to='/home'></Redirect>}></Route>
//                   <Route path='/home' component={Home}></Route>
//                   <Route path='/category' component={Category}></Route>
//                   <Route path='/car' component={Car}></Route>
//                   <Route path='/user' component={User}></Route>
//                   <Redirect to="/" />
//               </Switch>
//           </BrowserRouter>
//       </div>
//     </div>
//   );
// }

//获取需要的数据
function mapStateToProps(state) {
  return {
    user: state.user
  }
}

// export default App;
export default connect(mapStateToProps)(App);
