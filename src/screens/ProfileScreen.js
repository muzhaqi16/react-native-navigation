import React from 'react';
import { View, Text } from 'react-native'

export default class ProfileScreen extends React.Component {
    static navigationOptions = {
        title: 'Profile',
    };
    render() {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text>Name : Artan</Text>
            </View>
        );
    }
}