import React from 'react';
import {
    AppRegistry,
    Text,
    View,
    Button,
    Image
} from 'react-native';
import ReactNavigation from "react-navigation";

// export default class HomeScreen extends React.Component {
//     static navigationOptions = {
//         title: 'Welcome',//在导航中显示的标题内容
//     };
//     render() {
//         const { navigate } = this.props.navigation;
//         return (
//             <View>
//                 <Text>Hello, Chat App!</Text>
//                 <Button
//                     onPress={() => navigate('Chat',{user:'111'})}
//                     title="Chat with Lucy"
//                 />
//             </View>
//         );
//     }
// }

class LogoTitle extends React.Component {
    render() {
        return (
            <Image
                source={require('../public/img/a_icon_chongdianzhan_an.png')}
                style={{ width: 30, height: 30 }}
            />
        );
    }
}
export default class HomeScreen extends React.Component {
    // static navigationOptions = {
    //     title: 'Home',
    // };
    static navigationOptions = {
        headerTitle: <LogoTitle />,
        headerRight: (
            <Button
                onPress={() => alert('This is a button!')}
                title="Info"
                color="#fff"
            />
        ),
    };

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Home Screen</Text>
                <Button
                    title="Go to Details"
                    onPress={() => {
                        /* 1. Navigate to the Details route with params */
                        this.props.navigation.navigate('Details', {
                            itemId: 86,
                            otherParam: 'anything you want here',
                        });
                    }}
                />
            </View>
        );
    }
}