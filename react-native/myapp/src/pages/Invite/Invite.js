import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
} from 'react-native';

export default class Invite extends Component {
    // static navigationOptions = {
    //     title: 'Invite',
    //     tabBarLabel: '分享',
    //     tabBarIcon: ({focused}) => {
    //         if (focused) {
    //             return (
    //                 <Image style={styles.tabBarIcon} source={require('../../public/img/a_icon_yaoqing_hong.png')}/>
    //             );
    //         }
    //         return (
    //             <Image style={styles.tabBarIcon} source={require('../../public/img/a_icon_yaoqing_an.png')}/>
    //         );
    //     },
    // };

    render() {
        return (
            <View style={styles.container}>
                <Text>这是分享</Text>
            </View>
        );
    }
}
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