import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
} from 'react-native';

export default class Classify extends Component {
    // static navigationOptions = {
    //     title: 'Classify',
    //     tabBarLabel: '分类',
    //     tabBarIcon: ({focused}) => {
    //         if (focused) {
    //             return (
    //                 <Image style={styles.tabBarIcon} source={require('../../public/img/a_icon_fenlei_hong.png')}/>
    //             );
    //         }
    //         return (
    //             <Image style={styles.tabBarIcon} source={require('../../public/img/a_icon_fenlei_an.png')}/>
    //         );
    //     },
    // };

    render() {
        return (
            <View style={styles.container}>
                <Text>这是分类</Text>
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