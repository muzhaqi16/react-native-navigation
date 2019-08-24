import React from 'react';
import { Button, View, Text } from 'react-native';

export default class SignInScreen extends React.Component {
    static navigationOptions = {
        title: 'Sign In',
    };
    render() {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text>Sign In</Text>
                <Button title="Reset Password"
                    onPress={() => this.props.navigation.navigate('ForgotPassword')} />
            </View>
        );
    }
}
