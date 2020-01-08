import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    TouchableHighlight,
    Alert
} from 'react-native';
import Swiper from 'react-native-swiper';
const { width } = Dimensions.get('window');  //解构赋值 获取屏幕宽度

class SwiperCell extends Component {
    constructor(props){
        super(props);
    }

    gameInfoRouter = () => {
        console.log(this.props);
        // Alert.alert(String(this.props.data.gid));
        this.props.gameInfoRouter(this.props.data.gid);
    }

    render(): React.ReactNode {
        const { gid, slide_pic, type, url } = this.props.data;
        return (
            <TouchableHighlight style={styles.slide} onPress={this.gameInfoRouter}>
                <Image source={{uri: Config.proxy.oldhost + slide_pic}} style={styles.img}/>
            </TouchableHighlight>
        )
    }
}

export default class Banner extends Component {
    constructor(props){
        super(props);

        this.state = {
            index: 0
        }
    }

    gameInfoRouter = (gid) =>{
        console.log(gid);
        this.props.gameInfoRouter(gid);
    }

    render() {
        const { banners } = this.props;
        console.log(banners);
        return (
            <Swiper style={styles.wrapper}
                    loop={true}
                    index={0}
                    autoplay={true}
                    autoplayTimeout={4}
                    horizontal={true}
                    showsButtons={false}
                    showsPagination={true}>
                {
                    banners.map((item, index) => {
                        return (
                            <SwiperCell
                                data={item}
                                key={index}
                                index={index}
                                gameInfoRouter={this.gameInfoRouter}
                            />
                        )
                    })
                }
                {/*<View style={styles.slide}>*/}
                    {/*/!*<Text style={styles.text}>Hello Swiper</Text>*!/*/}
                    {/*<Image source={require('../../public/img/1.jpg')} style={styles.img}/>*/}
                {/*</View>*/}
                {/*<View style={styles.slide}>*/}
                    {/*/!*<Text style={styles.text}>Beautiful</Text>*!/*/}
                    {/*<Image source={require('../../public/img/2.jpg')} style={styles.img}/>*/}
                {/*</View>*/}
                {/*<View style={styles.slide}>*/}
                    {/*/!*<Text style={styles.text}>And simple</Text>*!/*/}
                    {/*<Image source={require('../../public/img/3.jpg')} style={styles.img}/>*/}
                {/*</View>*/}
            </Swiper>
        );
    }
}
const styles = StyleSheet.create({
    wrapper: {
    },
    slide: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor: '#9DD6EB',
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    },
    img: {
        // width: '100%',
        width: width,
        height: '100%'
    }
})
AppRegistry.registerComponent('myproject', () => Swiper);