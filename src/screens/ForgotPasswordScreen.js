import React from 'react';
import { View, Text } from 'react-native';

export default class ForgotPasswordScreen extends React.Component {
    static navigationOptions = {
        title: 'Reset Password',
    };
    render() {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text>Forgot Password</Text>
            </View>
        );
    }
}