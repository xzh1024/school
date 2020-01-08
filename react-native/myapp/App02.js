import React from 'react';
// import {createBottomTabNavigator, createStackNavigator} from 'react-navigation';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';


import {TabNav} from "./src/router/TabNav";
// import LoginPage from "./src/pages/Login/loginPage";
// import RegPage from "./src/pages/Login/regPage";
// import {FindAccountPage} from "./src/pages/Login/findAccountPage"; // 路由导航
// import IndexPage from "./src/pages/index/index";
// import Home from "./src/pages/Home/Home";
// import Invite from "./src/pages/Invite/Invite";
// import Classify from "./src/pages/Classify/Classify";
// import My from "./src/pages/My/My";
// import Station from "./src/pages/Station/Station";

// const App = createStackNavigator(
// {
//     // Login: {screen: LoginPage}, // 登录页
//     // Reg: {screen: RegPage}, // 注册页
//     // FindAccount: {screen: FindAccountPage}, // 找回密码页
//     Index: {screen: IndexPage},
//     Main: {
//         screen: TabNav,
//         navigationOptions: ({navigation}) => ({
//             header: null
//         })
//     }
// },
// {
//     initialRouteName: 'Index',
//     headerMode: 'screen'
// });
const App = createAppContainer(TabNav);

export default App;