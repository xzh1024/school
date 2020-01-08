import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Button,
    FlatList,
    RefreshControl,
    ScrollView
} from 'react-native';
import ReactNavigation from "react-navigation";

export default class GameInfo extends Component {
    constructor(props){
        super(props);

        this.state = {
            refreshing: false,
            gid: 0,
            gameinfo: {}
        };
    }

    static navigationOptions = {
        title: '游戏详情',//在导航中显示的标题内容
    };
    // static navigationOptions = ({ navigation }) => {
    //     return {
    //         title: navigation.getParam('gamename'),
    //     };
    // };

    //渲染前
    componentWillMount(){
        console.log('componentWillMount');
        // console.log(this.props.navigation.getParam('gid'));
        this.setState({
            gid: this.props.navigation.getParam('gid')
        })

    }
    //渲染后
    componentDidMount(){
        console.log('componentDidMount');

        this._onRefresh();
    }
    _onRefresh = () => {
        this.setState({refreshing: true});
        // fetchData().then(() => {
        //     this.setState({refreshing: false});
        // });
        this.fetchData();
    }

    fetchData = async () => {
        const result = await Api.oldGet('/api-game-gameInfo', {gid: this.state.gid, system: Config.system, username: '', uid: 0});
        console.log(result);
        this.setState({
            refreshing: false,
            gameinfo: result.gameinfo
        });
    }

    render(): React.ReactNode {
        // title: this.props.navigation.getParam('gid')
        return (
            <ScrollView style={{ flex: 1, flexDirection: 'column'}}
                        showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this._onRefresh}
                            />
                        }
            >
                <Text>{this.props.navigation.getParam('gid')}</Text>
            </ScrollView>
        );
    }
}