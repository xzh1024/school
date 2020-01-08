/**
 * Created by Admin on 2019/3/6.
 */

import React, { Component } from 'react';
import { AppRegistry, ScrollView, View, Text, Image, Button, Alert, FlatList, ActivityIndicator } from 'react-native';

export default class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            isShowingText: true
        };
        // 每1000毫秒对showText状态做一次取反操作
        // setInterval(() => {
        //     this.setState(previousState => {
        //         console.log(previousState.isShowingText);
        //         return { isShowingText: !previousState.isShowingText };
        //     });
        // }, 1000);
    }

    componentWillMount(){
        console.log(1);
    }
    componentDidMount(){
        console.log('componentDidMount');
        return fetch('http://boxapi.xiyou7.com/api-game-newIndex')
            .then((response) => response.json())
            .then((responseJson) => {

            console.log('-------------------');
            console.log(responseJson);
                this.setState({
                    isLoading: false,
                    dataSource: responseJson.data.gamelist,
                }, function(){

                });

            })
            .catch((error) =>{
                console.error(error);
            });
    }
    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        console.log('componentDidUpdate');
    }
    componentWillUnmount(): void {
        console.log('componentWillUnmount');
    }

    onPressLearnMore = () => {
        Alert.alert(
            '提示',
            '是否删除此信息',
            [
                // {text: '询问', onPress: () => console.log('点击询问')},
                {text: '取消', onPress: () => console.log('点击取消'), style: 'cancel'},
                {text: '确定', onPress: () => console.log('点击确定')},
            ],
            { cancelable: false }
        )
    }

    render() {
        if(this.state.isLoading){
            return(
                <View style={{flex: 1, padding: 20}}>
                    <ActivityIndicator/>
                </View>
            )
        }
        return (
            // 尝试把`flexDirection`改为`column`看看
            <View style={{flex: 1, column: 'row'}}>
                <View style={{width: '100%', height: 50, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomStyle: 'solid', borderBottomColor: '#eee'}}>
                    <Text style={{lineHeight: 50, textAlign: 'center'}}>Haeder</Text>
                </View>
                <View style={{flex: 1, backgroundColor: '#fff'}}>
                    <ScrollView>
                        <View style={{flex: 1, paddingTop:20}}>
                            <FlatList
                                data={this.state.dataSource}
                                renderItem={({item}) => <Text>{item.gamename}</Text>}
                                keyExtractor={(item, index) => item.id}
                            />
                        </View>
                        <Button
                            onPress={this.onPressLearnMore}
                            title="Learn More"
                            color="#841584"
                            accessibilityLabel="Learn more about this purple button"
                        />
                        <Text style={{fontSize:96}}>Scroll me plz</Text>
                        <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
                        <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
                        <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
                        <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
                        <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
                        <Text style={{fontSize:96}}>If you like</Text>
                        <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
                        <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
                        <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
                        <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
                        <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
                        <Text style={{fontSize:96}}>Scrolling down</Text>
                        <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
                        <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
                        <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
                        <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
                        <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
                        <Text style={{fontSize:96}}>What's the best</Text>
                        <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
                        <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
                        <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
                        <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
                        <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
                        <Text style={{fontSize:96}}>Framework around?</Text>
                        <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
                        <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
                        <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
                        <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
                        <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
                        <Text style={{fontSize:80}}>React Native</Text>
                    </ScrollView>
                </View>
                <View style={{width: '100%', height: 50, backgroundColor: 'steelblue'}}>
                    <Text>Footer</Text>
                </View>
            </View>
        );
    }
};