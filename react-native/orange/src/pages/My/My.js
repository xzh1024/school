import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
} from 'react-native';

export default class My extends Component {
    // static navigationOptions = {
    //     title: 'My',
    //     tabBarLabel: '我的',
    //     tabBarIcon: ({focused}) => {
    //         if (focused) {
    //             return (
    //                 <Image style={styles.tabBarIcon} source={require('../../images/a_icon_wode_hong.png')}/>
    //             );
    //         }
    //         return (
    //             <Image style={styles.tabBarIcon} source={require('../../images/a_icon_wode_an.png')}/>
    //         );
    //     },
    // };

    render() {
        return (
            <View style={styles.container}>
                <Text>这是我的</Text>
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
