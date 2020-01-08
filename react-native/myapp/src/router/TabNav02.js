import React, { Component } from 'react';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
// import { Icon } from 'native-base';

import Home from '../pages/Home/Home';
import Invite from '../pages/Invite/Invite';
import Classify from '../pages/Classify/Classify';
import Station from '../pages/Station/Station';
import My from '../pages/My/My';
import HomeScreen from "../pages/HomeScreen";
import DetailsScreen from "../pages/DetailsScreen";
import Movie from "../pages/Movie";
import {Image, StyleSheet} from "react-native";




const SELECTED_COLOR = '#D74D43';
const UNSELECTED_COLOR = '#000';
const SELECTED_BGCOLOR = '#FFFFFF';
const UNSELECTED_BGCOLOR = '#FFFFFF';
const ORDER = ['Home','Invite','Classify','Station','My'];

// class TabBarIcon extends Component {
//     render() {
//         return(
//             <Icon name={this.props.name}
//                   style={{
//                       marginBottom: -5,
//                       marginRight: 2,
//                       fontSize: 24,
//                       color: this.props.color,
//                   }}
//             />
//         )
//     }
// }

const StackNavigator = createStackNavigator(
    {
        HomePage: Home,
        FriendPage: Invite,
        TaskPage: Classify,
        DealPage: Station,
        MinePage: My,
    },
    {
        initialRouteName: 'Home',
        defaultNavigationOptions: {
            headerStyle: {
                // backgroundColor: '#f4511e',
            },
            headerBackTitle: null,
            // headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
            header: null
        }
    }
)
const HomeStack = createStackNavigator({HomePage: Home}, {
    defaultNavigationOptions: {
        title: '游戏'
    }
});
const FriendStack = createStackNavigator({FriendPage: Invite}, {
    defaultNavigationOptions: {
        title: '分类'
    }
});
const TaskStack = createStackNavigator({TaskPage: Classify});
const DealStack = createStackNavigator({DealPage: Station});
const MineStack = createStackNavigator({MinePage: My});

export const TabNav = createBottomTabNavigator(
    {
        HomePage: {
            screen: Home,
            navigationOptions: {
                tabBarLabel: '首页',
                tabBarIcon: ({focused}) => {
                    if (focused) {
                        return (
                            <Image style={styles.tabBarIcon} source={require('../public/img/a_icon_youxi_hong.png')}/>
                        );
                    }
                    return (
                        <Image style={styles.tabBarIcon} source={require('../public/img/a_icon_youxi_an.png')}/>
                    );
                }
            }
        },
        FriendPage: {
            screen: Invite,
            navigationOptions: {
                tabBarLabel: '分类',
                tabBarIcon: ({focused}) => {
                    if (focused) {
                        return (
                            <Image style={styles.tabBarIcon} source={require('../public/img/a_icon_yaoqing_hong.png')}/>
                        );
                    }
                    return (
                        <Image style={styles.tabBarIcon} source={require('../public/img/a_icon_yaoqing_an.png')}/>
                    );
                }
            }
        },
        TaskPage: {
            screen: Classify,
            navigationOptions: {
                tabBarLabel: '分享',
                tabBarIcon: ({focused}) => {
                    if (focused) {
                        return (
                            <Image style={styles.tabBarIcon} source={require('../public/img/a_icon_fenlei_hong.png')}/>
                        );
                    }
                    return (
                        <Image style={styles.tabBarIcon} source={require('../public/img/a_icon_fenlei_an.png')}/>
                    );
                }
            }
        },
        DealPage: {
            screen: Station,
            navigationOptions: {
                tabBarLabel: '充电站',
                tabBarIcon: ({focused}) => {
                    if (focused) {
                        return (
                            <Image style={styles.tabBarIcon} source={require('../public/img/a_icon_chongdianzhan_hong.png')}/>
                        );
                    }
                    return (
                        <Image style={styles.tabBarIcon} source={require('../public/img/a_icon_chongdianzhan_an.png')}/>
                    );
                }
            }
        },
        MinePage: {
            screen: My,
            navigationOptions: {
                tabBarLabel: '我的',
                tabBarIcon: ({focused}) => {
                    if (focused) {
                        return (
                            <Image style={styles.tabBarIcon} source={require('../public/img/a_icon_wode_hong.png')}/>
                        );
                    }
                    return (
                        <Image style={styles.tabBarIcon} source={require('../public/img/a_icon_wode_an.png')}/>
                    );
                }
            }
        }
    },
    {
        initialRouteName: 'Home',
        order: ORDER,
        tabBarOptions: {
            activeTintColor: SELECTED_COLOR,
            activeBackgroundColor: SELECTED_BGCOLOR,
            inactiveTintColor: UNSELECTED_COLOR,
            inactiveBackgroundColor: UNSELECTED_BGCOLOR,
            style: {
                backgroundColor: 'pink',
            },
            labelStyle: {
                paddingBottom: 5,
                fontSize: 14,
            }
        }
    }
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabBarIcon: {
        width: 21,
        height: 21,
    }
});