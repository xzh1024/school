import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
} from 'react-native';

export default class Station extends Component {
    // static navigationOptions = {
    //     title: 'Station',
    //     tabBarLabel: '充电站',
    //     tabBarIcon: ({focused}) => {
    //         if (focused) {
    //             return (
    //                 <Image style={styles.tabBarIcon} source={require('../../public/img/a_icon_chongdianzhan_hong.png')}/>
    //             );
    //         }
    //         return (
    //             <Image style={styles.tabBarIcon} source={require('../../public/img/a_icon_chongdianzhan_an.png')}/>
    //         );
    //     },
    // };

    render() {
        return (
            <View style={styles.container}>
                <Text>这是充电站</Text>
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