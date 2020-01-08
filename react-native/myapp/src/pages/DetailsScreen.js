import React from 'react';
import {
    AppRegistry,
    Text,
    View,
    Button
} from 'react-native';
import ReactNavigation from "react-navigation";

export default class DetailsScreen extends React.Component {
    // constructor(props){
    //     super(props);
    // }

    // static navigationOptions = {
    //     title: 'Details',
    // };
    //
    // render() {
    //     // console.log(this.props);
    //     // console.log(this.props.navigation.state.params.itemId);
    //     // console.log(this.props.navigation.getParam('itemId'));
    //     return (
    //         <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    //             <Text>Details Screen</Text>
    //             <Button
    //                 title="Home"
    //                 onPress={() => {
    //                     /* 1. Navigate to the Details route with params */
    //                     this.props.navigation.navigate('Home', {
    //                         itemId: 86,
    //                         otherParam: 'anything you want here',
    //                     });
    //                 }}
    //             />
    //             <Button
    //                 title="Go back"
    //                 onPress={() => this.props.navigation.goBack()}
    //             />
    //             <Text>{this.props.navigation.getParam('itemId')}</Text>
    //         </View>
    //     );
    // }

    static navigationOptions = ({ navigation, navigationOptions }) => {
        const { params } = navigation.state;

        return {
            title: params ? params.otherParam : 'A Nested Details Screen',
            /* These values are used instead of the shared configuration! */
            headerStyle: {
                backgroundColor: navigationOptions.headerTintColor,
            },
            headerTintColor: navigationOptions.headerStyle.backgroundColor,
        };
    };

    render() {
        /* 2. Read the params from the navigation state */
        const { params } = this.props.navigation.state;
        const itemId = params ? params.itemId : null;
        const otherParam = params ? params.otherParam : null;

        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Details Screen</Text>
                <Text>itemId: {JSON.stringify(itemId)}</Text>
                <Text>otherParam: {JSON.stringify(otherParam)}</Text>
                <Button
                    title="Update the title"
                    onPress={() =>
                        this.props.navigation.setParams({ otherParam: 'Updated!' })}
                />
                <Button
                    title="Go to Details... again"
                    onPress={() => this.props.navigation.navigate('Details')}
                />
                <Button
                    title="Go back"
                    onPress={() => this.props.navigation.goBack()}
                />
            </View>
        );
    }
}