import React from 'react';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';

import Home from '../pages/Home/Home';
import Invite from '../pages/Invite/Invite';
import Classify from '../pages/Classify/Classify';
import Station from '../pages/Station/Station';
import My from '../pages/My/My';
// import HomeScreen from "../pages/HomeScreen";
// import DetailsScreen from "../pages/DetailsScreen";
// import Movie from "../pages/Movie";
import { Image, StyleSheet } from "react-native";

// export const TabNav = createBottomTabNavigator(
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
        order: ['Home','Invite','Classify','Station','My'],
        tabBarOptions: {
            activeTintColor: '#D74D43',
            activeBackgroundColor: '#FFFFFF',
            inactiveTintColor: '#000',
            inactiveBackgroundColor: '#FFFFFF',
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

// export const TabNav = createStackNavigator(
//     {
//         Home: {
//             screen: BottomNavigator,
//             navigationOptions: {
//                 // title: "首页"
//                 title: false
//             }
//         },
//         Movie: {screen: Movie}
//     },
//     {
//         initialRouteName: "Home",
//         headerLayoutPreset: "center"
//     }
// )