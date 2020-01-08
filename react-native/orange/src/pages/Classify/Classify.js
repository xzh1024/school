import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TextInput
} from 'react-native';

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
    },
    inputItem:{
        height: 50,
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc'
    }
});

export default class Classify extends Component {
    // static navigationOptions = {
    //     title: 'Classify',
    //     tabBarLabel: '分类',
    //     tabBarIcon: ({focused}) => {
    //         if (focused) {
    //             return (
    //                 <Image style={styles.tabBarIcon} source={require('../../images/a_icon_fenlei_hong.png')}/>
    //             );
    //         }
    //         return (
    //             <Image style={styles.tabBarIcon} source={require('../../images/a_icon_fenlei_an.png')}/>
    //         );
    //     },
    // };

    render() {
        return (
            <View style={styles.container}>
                <Text>这是分类</Text>
                <View style={styles.inputItem}>
                    <TextInput
                        style={{flex: 1, padding: 0}}
                        placecholder="搜索 ..."
                        autoFocus
                        defaultValue="火星救援"
                        keyboardType="default"
                    />
                </View>
            </View>
        );
    }
}
