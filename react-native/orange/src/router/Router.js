import React from 'react';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
// import StackViewStyleInterpolator from 'react-navigation-stack/dist/views/StackView/StackViewStyleInterpolator.js'
import {TabNav} from "./TabNav";
import Movie from "../pages/Movie";
import GameInfo from "../pages/GameInfo/GameInfo";

TabNav.navigationOptions = {
    // Hide the header from AppNavigator stack
    header: null,
};
export const Router = createStackNavigator(
    {
        HomeStack: {
            screen: TabNav,
            // navigationOptions: {
            //     title: "首页"
            // },
        },
        Movie: { screen: Movie },
        GameInfo: { screen: GameInfo }
    },
    {
        initialRouteName: "HomeStack",
        headerLayoutPreset: "center",
        transitionConfig:()=>({
            // 只要修改最后的forVertical就可以实现不同的动画了。
            // forHorizontal：从右向左进入
            // forVertical：从下向上进入
            // forFadeFromBottomAndroid：从底部淡出
            // forFade：无动画
            // screenInterpolator: StackViewStyleInterpolator.forHorizontal,
        })
    }
)
