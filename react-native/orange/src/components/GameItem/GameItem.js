import React, { Component } from 'react'
import {StyleSheet, View, Text, Image, TouchableHighlight, Alert} from 'react-native'
// import ReactNavigation from "react-navigation";

const styles = StyleSheet.create({
    item: {
        // height: 100,
        padding: 10,
        flex: 1,
        flexDirection: 'row',
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    itemLeft:{
        // width: 50,
    },
    itemLogo: {
        width: 60,
        height: 60,
        borderWidth: 1,
        // borderColor: '#f00',
        borderRadius: 10,
    },
    itemCenter: {
        flex: 1,
        marginLeft: 5,
        overflow: 'hidden'
    },
    itemRight: {
        marginLeft: 5,
        height: '100%',
    },
    itemOperate: {
        marginLeft: 5,
        paddingLeft: 5,
        paddingRight: 5,
        borderRadius: 7,
        fontSize: 12,
        borderWidth: 1,
        borderColor: '#d200ff',
        color: '#d200ff'
    },
    itemLabel: {
        marginRight: 5,
        paddingLeft: 5,
        paddingRight: 5,
        borderRadius: 7,
        fontSize: 12,
        color: '#fff',
    },
    itemLabelOne:{

    },
    itemLabelTwo:{

    },
    itemLabelThree:{

    },
    itemContent: {
        fontSize: 12,
        paddingLeft: 5,
        paddingRight: 5,
        borderRadius: 7,
        color: '#fff',
        backgroundColor: '#ff8838'
    },
    flex: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    flexRow:{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        overflow: 'hidden',
    }
})

export default class GameItem extends Component {
    constructor(props){
        super(props);
    }

    gameInfoRouter = () => {
        // console.log(this.props);
        this.props.gameInfoRouter(this.props.data.id);
        // this.props.navigation.navigate('GameInfo', {
        //     gid: this.props.data.id,
        //     gamename: this.props.data.gamename,
        // });
    }
    //onPress={() => {
    //                         /* 1. Navigate to the Details route with params */
    //                         this.props.navigation.navigate('Movie', {
    //                             itemId: 86,
    //                             otherParam: 'anything you want here',
    //                         });
    //                     }}

    render() {
        const { data } = this.props;
        // console.log(data);
        const icon = {uri: Config.proxy.oldhost + data.logo};
        return (
            <TouchableHighlight underlayColor="rgba(34, 26, 38, 0.1)" style={{height: 90}} onPress={this.gameInfoRouter}>
                <View style={styles.item}>
                    <View style={styles.itemLeft}>
                        <Image source={icon} style={styles.itemLogo}/>
                    </View>
                    <View style={styles.itemCenter}>
                        <View style={styles.flexRow}>
                            <Text numberOfLines={1} ellipsizeMode={'tail'} style={{
                                color: '#000'
                            }}>{data.gamename}</Text>
                            <Text style={styles.itemOperate}>{data.operate == 1 ? '独家' : '联运'}</Text>
                        </View>
                        <View>
                            <Text style={{
                                fontSize: 12
                            }}>{data.types}</Text>
                        </View>
                        <View style={[styles.flexRow, styles.label]}>
                            {
                                data.label.split(',', 3).map((item, index) => {
                                    return (
                                        <Text key={index} style={[styles.itemLabel, {
                                            backgroundColor: ['#ffaa1c', '#59bcf7', '#ff7c7a'][index]
                                        }]}>{item}</Text>
                                    )
                                })
                            }
                        </View>
                        <View style={styles.flexRow}>
                            <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.itemContent}>{data.content}</Text>
                        </View>
                    </View>
                    <View style={styles.itemRight}>
                        <View style={styles.flex}>
                            <Text style={{
                                fontSize: 12,
                                height: 14,
                                lineHeight: 14,
                                color: '#ff3e3e'
                            }}>固定佣金</Text>
                            <Text style={{
                                paddingLeft: 5,
                                paddingRight: 5,
                                borderRadius: 7,
                                fontSize: 12,
                                height: 14,
                                lineHeight: 14,
                                color: '#fff',
                                backgroundColor: '#ff3e3e',
                            }}>{data.fixed_commission}%</Text>
                        </View>
                        <View style={styles.flex}>
                            <Text style={{
                                fontSize: 12,
                                height: 14,
                                lineHeight: 14,
                                color: '#ff7900'
                            }}>预估佣金</Text>
                            <Text style={{
                                paddingLeft: 5,
                                paddingRight: 5,
                                borderRadius: 7,
                                fontSize: 12,
                                height: 14,
                                lineHeight: 14,
                                color: '#fff',
                                backgroundColor: '#ff7900',
                            }}>{data.float_commission}%</Text>
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
}
