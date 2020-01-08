import React, {Component} from 'react';
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
// import '../../public/js/Global';
// import ReactNavigation from "react-navigation";
import Banner from '../../components/Banner/Banner';
import MenuList from '../../components/Menu/MenuList/MenuList';
import GameItem from '../../components/GameItem/GameItem';

export default class Home extends Component {
    constructor(porps){
        super(porps);
        this.state = {
            refreshing: false,
            loading: true,
            page: 1,
            banner: [
                // {
                //     gid: 0,
                //     type: 1,
                //     url: '',
                //     slide_pic: '/data/upload/20190225/5c73579889955.jpg'
                // },
                // {
                //     gid: 0,
                //     type: 1,
                //     url: '',
                //     slide_pic: '/data/upload/20190225/5c7357bc7c19c.jpg'
                // },
                // {
                //     gid: 0,
                //     type: 1,
                //     url: '',
                //     slide_pic: '/data/upload/20190225/5c7357d23e044.jpg'
                // },
                // {
                //     gid: 0,
                //     type: 1,
                //     url: '',
                //     slide_pic: '/data/upload/20190225/5c735810aa025.jpg'
                // }
            ],
            gameList: []
        };
    }

    //渲染前
    componentWillMount(){
        console.log('渲染前');
    }
    //渲染后
    componentDidMount(){
        console.log('渲染后');
        console.log(this.props)
        this._onRefresh();
    }
    //属性(props)改变
    componentWillReceiveProps(nextProps: Readonly<P>, nextContext: any): void {
        console.log('属性(props)改变');
    }
    //状态(state)改变
    shouldComponentUpdate(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): boolean {
        console.log('状态(state)改变');
        console.log(nextProps);
        console.log(nextState);
        // if(nextState.sign == this.state.sign){
        //     return false;
        // }
        return true;
    }

    //更新前
    componentWillUpdate(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): void {
        console.log('更新前');
    }
    //更新后
    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        console.log('更新后');
    }

    //卸载(Unmount)
    componentWillUnmount(){
        console.log('卸载(Unmount)');
    }

     // showMeasure = () =>{
     //     this.refs.myText.measure((x,y,width,height,px,py) =>
     //             // alert(x);
     //         console.log('x:'+x+' y:'+y+' w:'+width+' h:'+height)
     //     );
     // }

    // 下拉刷新
    _onRefresh = () => {
        this.setState({
            refreshing: true,
            page: 1,
            loading: true
        }, () => {
            this.fetchData();
        });
        // fetchData().then(() => {
        //     this.setState({refreshing: false});
        // });
        console.log(this.state);

    }

    fetchData = async () => {
        // const promise = Api.oldGet('/api-game-newIndex', {page: 1, platform: 1, system: 1, uid: 0});
        // promise.then(result => {
        //     console.log(result);
        //     this.setState({
        //         refreshing: false,
        //         banner: result.data.banner,
        //         gameList: result.data.gamelist
        //     });
        // });
        // try {
        //     const result = await Api.oldGet('/api-game -newIndex', {page: 1, platform: 1, system: 1, uid: 0});
        //     // console.log(result);
        //     this.setState({
        //         refreshing: false,
        //         banner: result.data.banner,
        //         gameList: result.data.gamelist
        //     });
        // } catch (e) {
        //     console.log('请求出错');
        // }
        if(!this.state.loading){
            return
        }
        const result = await Api.oldGet('/api-game-newIndex', {page: this.state.page, platform: 1, system: Config.system, uid: 0});
        console.log(result);
        if(this.state.page === 1){
            this.setState({
                refreshing: false,
                banner: result.data.banner,
                gameList: result.data.gamelist,
                page: this.state.page+1
            });
        } else {
            console.log('page > 1');
            const list = result.data.gamelist;
            if(list && list.length > 0){
                this.setState({
                    gameList: this.state.gameList.concat(list),
                    page: this.state.page+1
                });
            } else {
                this.setState({
                    loading: false
                })
            }

        }
        console.log(this.state)

    }

    gameInfoRouter = (gid) => {
        console.log(gid);
        this.props.navigation.navigate('GameInfo', {
            gid: gid
        });
    }

    // 触底加载更多
    _contentViewScroll = (e: Object) => {
        // console.log(e);

        let offsetY = e.nativeEvent.contentOffset.y; //滑动距离
        let contentSizeHeight = e.nativeEvent.contentSize.height; //scrollView contentSize高度
        let oriageScrollHeight = e.nativeEvent.layoutMeasurement.height; //scrollView高度
        if (offsetY + oriageScrollHeight + 50 >= contentSizeHeight){
            console.log('触底')
            this.fetchData();
        }

        // console.log(contentSizeHeight);
        // console.log(oriageScrollHeight);
        // console.log(offsetY);
    }

    render() {
        const gameList = this.state.gameList;
        return (
            <ScrollView style={{ flex: 1, flexDirection: 'column'}}
                        showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this._onRefresh}
                            />
                        }
                        // onMomentumScrollEnd = {this._contentViewScroll}
            >
                <View style={{ height: 160 }}>
                    <Banner banners={this.state.banner} gameInfoRouter={this.gameInfoRouter}></Banner>
                </View>
                <View style={{ height: 100, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' }}>
                    <MenuList />
                </View>
                <Button
                    title="进入电影列表"
                    onPress={() => {
                        console.log(this.props);
                        /* 1. Navigate to the Details route with params */
                        this.props.navigation.navigate('Movie', {
                            itemId: 86,
                            otherParam: 'anything you want here',
                        });
                    }}
                />
                <View style={{flex:1, backgroundColor:'#fe0'}}>
                    {/*{*/}
                        {/*gameList.map((item, index) => {*/}
                            {/*return (*/}
                                {/*<GameItem*/}
                                    {/*data={item}*/}
                                    {/*key={index}*/}
                                    {/*index={index}*/}
                                {/*/>*/}
                            {/*)*/}
                        {/*})*/}
                    {/*}*/}
                    {/*<GameItem />*/}
                    <FlatList
                        data={gameList}
                        renderItem={({item}) => <GameItem data={item}
                                                          // navigation={this.props.navigation}
                                                          gameInfoRouter={this.gameInfoRouter}
                                                          // clickGameItem={(gid, gamename) => {
                                                          //     console.log(this.props);
                                                          //     this.props.navigation.navigate('GameInfo', {
                                                          //         gid: gid
                                                          //     });
                                                          // }}
                        />}
                        keyExtractor={(item, index) => item.id}
                    />
                </View>
            </ScrollView>
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