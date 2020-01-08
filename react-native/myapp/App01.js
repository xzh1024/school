/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

// import React, {Component} from 'react';
// import {Platform, StyleSheet, Text, View} from 'react-native';

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android:
//     'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });
//
// type Props = {};
// export default class App extends Component<Props> {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.welcome}>Welcome to React Native!</Text>
//         <Text style={styles.instructions}>To get started, edit App.src</Text>
//         <Text style={styles.instructions}>{instructions}</Text>
//       </View>
//     );
//   }
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });

// import React, { Component } from 'react';
// import { Text, View } from 'react-native';
// import Index from './src/pages/index/index';
//
// export default class App extends Component {
//   render() {
//     return (
//         <Index />
//     );
//   }
// }

// import React, { Component } from 'react';
// import {StackNavigator} from 'react-navigation';
// import {TabNav} from "./src/router/rootPage";
// // import Index from './src/pages/index/index';
// // import Login from './src/pages/Login/login';
// // import My from './src/pages/My/my';
// // import {FindAccountPage} from "./page/Login/findAccountPage"; // 路由导航
//
// const App = StackNavigator({
//       // Login: {screen: LoginPage}, // 登录页
//       // Reg: {screen: RegPage}, // 注册页
//       // FindAccount: {screen: FindAccountPage}, // 找回密码页
//       Main: {
//         screen: TabNav,
//         navigationOptions: ({navigation}) => ({
//           header: null
//         })
//       }
//     },
//     {
//       initialRouteName: 'Home',
//       headerMode: 'screen'
//     });
//
// export default App;


// import React, { Component } from 'react'
// import { Platform, StyleSheet, Text, View } from 'react-native'
// import { createStackNavigator, createAppContainer } from 'react-navigation'
// import HomeScreen from './pages/HomeScreen'
// import ProfileScreen from './pages/ProfileScreen'
//
// const navigator = createStackNavigator({
//     Home: { screen: HomeScreen },
//     Profile: { screen: ProfileScreen }
// })
//
// const App = createAppContainer(navigator)
//
// export default App
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#F5FCFF'
//     },
//     welcome: {
//         fontSize: 20,
//         textAlign: 'center',
//         margin: 10
//     },
//     instructions: {
//         textAlign: 'center',
//         color: '#333333',
//         marginBottom: 5
//     }
// })

import React from 'react';
import ReactNative, { Button, View, Text } from 'react-native';
import ReactNavigation, { createStackNavigator, createAppContainer } from 'react-navigation'; // Version can be specified in package.json


import HomeScreen from './src/pages/HomeScreen';
// class HomeScreen extends React.Component {
//     static navigationOptions = {
//         title: 'Home',
//     };
//
//     render() {
//         console.log(ReactNavigation);
//         return (
//             <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//                 <Text>Home Screen</Text>
//                 <Button
//                     title="Go to Details"
//                     onPress={() => {
//                         /* 1. Navigate to the Details route with params */
//                         this.props.navigation.navigate('Details', {
//                             itemId: 86,
//                             otherParam: 'anything you want here',
//                         });
//                     }}
//                 />
//             </View>
//         );
//     }
// }

import DetailsScreen from './src/pages/DetailsScreen';
// class DetailsScreen extends React.Component {
//     static navigationOptions = ({ navigation }) => {
//         return {
//             title: navigation.getParam('otherParam', 'A Nested Details Screen'),
//         };
//     };
//
//     render() {
//         /* 2. Get the param, provide a fallback value if not available */
//         const { navigation } = this.props;
//         const itemId = navigation.getParam('itemId', 'NO-ID');
//         const otherParam = navigation.getParam('otherParam', 'some default value');
//
//         return (
//             <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//                 <Text>Details Screen</Text>
//                 <Text>itemId: {JSON.stringify(itemId)}</Text>
//                 <Text>otherParam: {JSON.stringify(otherParam)}</Text>
//                 <Button
//                     title="Go to Details... again"
//                     onPress={() =>
//                         this.props.navigation.push('Details', {
//                             itemId: Math.floor(Math.random() * 100),
//                         })}
//                 />
//                 <Button
//                     title="Update the title"
//                     onPress={() =>
//                         this.props.navigation.setParams({ otherParam: 'Updated!' })}
//                 />
//                 <Button
//                     title="Go to Home"
//                     onPress={() => this.props.navigation.navigate('Home')}
//                 />
//                 <Button
//                     title="Go back"
//                     onPress={() => this.props.navigation.goBack()}
//                 />
//             </View>
//         );
//     }
// }

const RootStack = createStackNavigator(
    {
        Home: HomeScreen,
        Details: DetailsScreen,
    },
    {
        initialRouteName: 'Home',
        /* The header config from HomeScreen is now here */
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        },
    }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
    render() {
        return <AppContainer />;
    }
}

// import React from 'react';
// import {createStackNavigator} from 'react-navigation';
// import {TabNav} from "./src/router/RootPage";
// // import LoginPage from "./src/pages/Login/loginPage";
// // import RegPage from "./src/pages/Login/regPage";
// // import {FindAccountPage} from "./src/pages/Login/findAccountPage"; // 路由导航
//
// const App = createStackNavigator({
//         // Login: {screen: LoginPage}, // 登录页
//         // Reg: {screen: RegPage}, // 注册页
//         // FindAccount: {screen: FindAccountPage}, // 找回密码页
//         Main: {
//             screen: TabNav,
//             navigationOptions: ({navigation}) => ({
//                 header: null
//             })
//         }
//     },
//     {
//         initialRouteName: 'Login',
//         headerMode: 'screen'
//     });
//
// export default App;