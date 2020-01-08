import React from 'react';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';

import Home from '../pages/Home/Home';
import Classify from '../pages/Classify/Classify';
import Invite from '../pages/Invite/Invite';
import Station from '../pages/Station/Station';
import My from '../pages/My/My';
import { Image, StyleSheet } from "react-native";

// const Home = createStackNavigator({ Home }, {
//     // This is the default for screens in the stack, so `A` will
//     // use this title unless it overrides it
//     defaultNavigationOptions: {
//         title: '游戏',
//         headerBackImage: true,
//         headerBackTitle: '后退'
//     }
// });
const HomeStack = createStackNavigator({ Home }, {
    // This is the default for screens in the stack, so `A` will
    // use this title unless it overrides it
    defaultNavigationOptions: {
        header: null,
    }
});
const ClassifyStack = createStackNavigator({ Classify }, {
    defaultNavigationOptions: {
        title: '分类',
        headerLayoutPreset: 'center',
    }
});
const InviteStack = createStackNavigator({ Invite }, {
    defaultNavigationOptions: {
        header: null,
    }
});
const StationStack = createStackNavigator({ Station }, {
    defaultNavigationOptions: {
        title: '充电站'
    }
});
const MyStack = createStackNavigator({ My }, {
    defaultNavigationOptions: {
        title: '我的'
    }
});

HomeStack.navigationOptions = {
    tabBarLabel: '游戏',
    tabBarIcon: ({focused}) => {
        if (focused) {
            return (
                <Image style={styles.tabBarIcon} source={require('../images/a_icon_youxi_hong.png')}/>
            );
        }
        return (
            <Image style={styles.tabBarIcon} source={require('../images/a_icon_youxi_an.png')}/>
        );
    }
};
ClassifyStack.navigationOptions = {
    tabBarLabel: '分类',
    tabBarIcon: ({focused}) => {
        if (focused) {
            return (
                <Image style={styles.tabBarIcon} source={require('../images/a_icon_fenlei_hong.png')}/>
            );
        }
        return (
            <Image style={styles.tabBarIcon} source={require('../images/a_icon_fenlei_an.png')}/>
        );
    }
};
InviteStack.navigationOptions = {
    tabBarLabel: '邀请',
    tabBarIcon: ({focused}) => {
        if (focused) {
            return (
                <Image style={styles.tabBarIcon} source={require('../images/a_icon_yaoqing_hong.png')}/>
            );
        }
        return (
            <Image style={styles.tabBarIcon} source={require('../images/a_icon_yaoqing_an.png')}/>
        );
    }
};
StationStack.navigationOptions = {
    tabBarLabel: '充电站',
    tabBarIcon: ({focused}) => {
        if (focused) {
            return (
                <Image style={styles.tabBarIcon} source={require('../images/a_icon_chongdianzhan_hong.png')}/>
            );
        }
        return (
            <Image style={styles.tabBarIcon} source={require('../images/a_icon_chongdianzhan_an.png')}/>
        );
    }
};
MyStack.navigationOptions = {
    tabBarLabel: '我的',
    tabBarIcon: ({focused}) => {
        if (focused) {
            return (
                <Image style={styles.tabBarIcon} source={require('../images/a_icon_wode_hong.png')}/>
            );
        }
        return (
            <Image style={styles.tabBarIcon} source={require('../images/a_icon_wode_an.png')}/>
        );
    }
};

// export const TabNav = createBottomTabNavigator(
export const TabNav = createBottomTabNavigator(
    // {
    //     Home: { screen: Home },
    //     Invite: { screen: Invite },
    //     Classify: { screen: Classify },
    //     My: { screen: My },
    //     Station: { screen: Station }
    // },
    {
        // Home: { screen: Home },
        HomeStack,
        ClassifyStack,
        InviteStack,
        StationStack,
        MyStack
    },
    {
        // defaultNavigationOptions: ({ navigation }) => ({
        //     tabBarIcon: ({ focused, tintColor }) =>
        //         getTabBarIcon(navigation, focused, tintColor),
        // }),
        // tabBarOptions: {
        //     activeTintColor: 'tomato',
        //     inactiveTintColor: 'gray',
        // },
        tabBarOptions: {
            headerLayoutPreset: 'center',
            // initialRouteName: 'Home',
            //活动选项卡的标签和图标颜色
            // activeTintColor: '#4BC1D2',
            activeTintColor: '#D74D43',
            //活动选项卡的背景色
            activeBackgroundColor: '#FFFFFF',
            //"非活动" 选项卡的标签和图标颜色
            inactiveTintColor: '#000',
            //非活动选项卡的背景色
            // inactiveBackgroundColor: '',
            //是否显示tab bar的图标，默认是false
            // showIcon: true,
            //是否显示选项卡的标签, 默认值为 true
            showLabel: true,
            //选项卡的样式对象
            // tabStyle: '',
            // 无论标签字体是否应缩放以尊重文字大小可访问性设置，默认值都是 true
            // allowFontScaling: '',
            //是否将文本转换为大小，默认是true
            // upperCaseLabel: false,
            //material design中的波纹颜色(仅支持Android >= 5.0)
            // pressColor: '#788493',
            //按下tab bar时的不透明度(仅支持iOS和Android < 5.0).
            // pressOpacity: 0.8,
            //选项卡栏的样式对象
            style: {
                backgroundColor: '#fff',
                paddingBottom: 1,
                borderTopWidth: 0.2,
                paddingTop:1,
                borderTopColor: '#ccc',
            },
            //选项卡标签的样式对象
            labelStyle: {
                fontSize: 11,
                margin: 1
            },
            //tab 页指示符的样式 (tab页下面的一条线).
            indicatorStyle: {height: 0},
        },
        //tab bar的位置, 可选值： 'top' or 'bottom'
        tabBarPosition: 'bottom',
        //是否允许滑动切换tab页
        swipeEnabled: true,
        //是否在切换tab页时使用动画
        animationEnabled: false,
        //是否懒加载
        lazy: true,
        //返回按钮是否会导致tab切换到初始tab页？ 如果是，则设置为initialRoute，否则为none。 缺省为initialRoute。
        backBehavior: 'none',
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
