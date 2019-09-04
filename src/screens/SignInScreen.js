import React from 'react';
import { Text, View, Button, KeyboardAvoidingView, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import config from '../../config'

import EmailInput from '../components/inputs/EmailInput';
import PasswordInput from '../components/inputs/PasswordInput';

export default class SignInScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: "",
            hasError: false,
            isLoading: false,
            errorMessage: ''
        };

    }
    static navigationOptions = {
        title: 'Sign In',
    };
    handleEmailChange = email => {
        this.setState({ email: email });
    };
    handlePasswordChange = password => {
        this.setState({ password: password });
    };
    storeData = async (authToken) => {
        try {
            await AsyncStorage.setItem('@authToken', authToken)
        } catch (e) {
            this.setState({
                hasError: true,
                errorMessage: e.error
            })
        }
        this.props.navigation.navigate('App');
    }
    handleLogin = () => {
        this.setState({ isLoading: true })
        const login = {
            user_name: this.state.email,
            password: this.state.password
        }
        fetch(`${config.API_ENDPOINT}/auth/login`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${config.API_KEY}`
            },
            body: JSON.stringify(login)
        }).then(res => {
            this.setState({
                hasError: false,
                errorMessage: ''
            })
            if (!res.ok) {
                return res.json().then(error => Promise.reject(error))
            }
            return res.json()
        })
            .then(res => this.storeData(res.authToken))
            .catch((error) => {
                this.setState({
                    hasError: true,
                    errorMessage: error.error
                })
            });
    }
    render() {
        let isLoading = <Text></Text>;
        if (this.state.isLoading) {

            isLoading = <View style={{ flex: 1, padding: 20 }}>
                <ActivityIndicator />
            </View>

        }
        return (
            <KeyboardAvoidingView style={styles.wrapper} behavior="padding">
                <View style={styles.scrollView}>
                    <ScrollView style={styles.scrollViewWrapper}>
                        {this.state.hasError ? <Text>{this.state.errorMessage}</Text> : <Text></Text>}
                        <EmailInput handleEmailChange={this.handleEmailChange} />
                        <PasswordInput handlePasswordChange={this.handlePasswordChange} />
                        {isLoading}
                        <Button
                            title="Login"
                            onPress={this.handleLogin}
                            style={{
                                color: 'white', flex: 1
                            }} />
                    </ScrollView>

                </View>
            </KeyboardAvoidingView>
        );
    }
}
const styles = StyleSheet.create({
    wrapper: {
        display: "flex",
        flex: 1,
        justifyContent: "flex-start"
    },
    scrollView: {
        flex: 1,
    },
    scrollViewWrapper: {
        marginTop: 70,
        flex: 1
    }
});
