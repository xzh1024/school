import React, { Component } from 'react'
import {View, Text, Image, StyleSheet, Alert, TouchableOpacity} from 'react-native'

const styles = StyleSheet.create({
    menuList: {
        height: 100,
        flex: 1,
        flexDirection: 'row',
        // justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor: '#9DD6EB',
        // backgroundColor: '#f60'
    },
    menuItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#06f'
    },
    menuImg: {
        width: 60,
        // width: width,
        height: 60
    }
});

class MenuItem extends Component {
    render(): React.ReactNode {
        // console.log(this.props);
        const { type, name } = this.props;
        var icon = '';
        if(type === 1){
            icon = require('../../../public/img/menu/02_icon_xinyou.png');
        } else if(type === 2){
            icon = require('../../../public/img/menu/02_icon_phb.png');
        } else if(type === 3){
            icon = require('../../../public/img/menu/01_icon_manv.png');
        } else if(type === 4){
            icon = require('../../../public/img/menu/03_icon_fenlei.png');
        }
        return (
            <View style={styles.menuItem}>
                <Image source={icon} style={styles.menuImg}/>
                {/*<Image source={this.props.icon} style={styles.menuImg} />;*/}
                <Text>{this.props.name}</Text>
            </View>
        )
    }
}

export default class MenuList extends Component {
    render(): React.ReactNode {
        return (
            <View style={styles.menuList}>
                <MenuItem
                    type={1}
                    name="新游"
                />
                <MenuItem
                    type={2}
                    name="排行榜"
                />
                <MenuItem
                    type={3}
                    name="送满V"
                />
                <MenuItem
                    type={4}
                    name="开服表"
                />
            </View>
        )
    }
}