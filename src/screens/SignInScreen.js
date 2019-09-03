import React from 'react';
import { Text, View, Button, KeyboardAvoidingView, ScrollView, StyleSheet } from 'react-native';
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
            loggedIn: false,
            hasError: false,
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
        this.setState({
            loggedIn: true
        })
    }
    handleLogin = () => {
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
        if (!this.state.loggedIn) {
            return (
                <KeyboardAvoidingView style={styles.wrapper} behavior="padding">
                    <View style={styles.scrollView}>
                        <ScrollView style={styles.scrollViewWrapper}>
                            {this.state.hasError ? <Text>{this.state.errorMessage}</Text> : <Text></Text>}
                            <EmailInput handleEmailChange={this.handleEmailChange} />
                            <PasswordInput handlePasswordChange={this.handlePasswordChange} />
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
        } else {
            return (
                <View>
                    <Text>You are already logged in dude</Text>
                    <Button onPress={async () => {
                        try {
                            await AsyncStorage.removeItem('@authToken')
                        } catch (e) {
                            // remove error
                        }

                        this.setState({ loggedIn: false })
                    }} title="Log Out" />
                </View>
            )
        }
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
