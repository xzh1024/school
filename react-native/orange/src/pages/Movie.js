/**
 * Created by Admin on 2019/3/6.
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    ScrollView,
    View,
    Text,
    Image,
    Button,
    Alert,
    FlatList,
    ActivityIndicator,
    ToolbarAndroid
} from 'react-native';
import ReactNavigation from "react-navigation";

export default class Movie extends Component {
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
    static navigationOptions = {
        title: 'Movie',//在导航中显示的标题内容
    };

    //渲染前
    componentWillMount(){
        console.log('componentWillMount');
    }
    //渲染后
    componentDidMount(){
        console.log('componentDidMount');
        console.log(this.props);
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
    //属性(props)改变
    componentWillReceiveProps(nextProps: Readonly<P>, nextContext: any): void {
        console.log('componentWillReceiveProps');
    }
    //状态(state)改变
    shouldComponentUpdate(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): boolean {
        console.log('shouldComponentUpdate');
        console.log(nextProps);
        console.log(nextState);
        if(nextState.isLoading == this.state.isLoading){
            return false;
        }
        return true;
    }

    //更新前
    componentWillUpdate(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): void {
        console.log('componentWillUpdate');
    }

    //更新后
    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        console.log('componentDidUpdate');
    }

    //卸载(Unmount)
    componentWillUnmount(){
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

    onActionSelected = (position) => {
        console.log(position)
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
                    <Text style={{lineHeight: 50, textAlign: 'center'}}
                          onPress={() => {
                              /* 1. Navigate to the Details route with params */
                              this.props.navigation.navigate('HomeStack', {
                                  itemId: 86,
                                  otherParam: 'anything you want here',
                              });
                          }}>Haeder</Text>
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


                <View style={{height:50}}>
                    <View style={{flex:1, flexDirection:'row'}}>
                        <ToolbarAndroid
                            style={{flex:1}}
                            logo={require('../images/a_icon_youxi_an.png')}
                            title="标题1"
                            titleColor="#000"
                            actions={[{title: 'Settings', icon: require('../images/a_icon_youxi_hong.png'), show: 'always'}]}
                            onActionSelected={this.onActionSelected} />
                        <ToolbarAndroid
                            style={{flex:1}}
                            logo={require('../images/a_icon_youxi_an.png')}
                            title="标题2"
                            titleColor="#000"
                            actions={[{title: 'Settings', icon: require('../images/a_icon_youxi_hong.png'), show: 'always'}]}
                            onActionSelected={this.onActionSelected} />
                        <ToolbarAndroid
                            style={{flex:1}}
                            logo={require('../images/a_icon_youxi_an.png')}
                            title="标题3"
                            titleColor="#000"
                            actions={[{title: 'Settings', icon: require('../images/a_icon_youxi_hong.png'), show: 'always'}]}
                            onActionSelected={this.onActionSelected} />
                    </View>
                </View>
            </View>
        );
    }
};
