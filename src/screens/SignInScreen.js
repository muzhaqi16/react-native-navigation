import React from 'react';
import { Keyboard, Text, View, TextInput, TouchableWithoutFeedback, ActivityIndicator, KeyboardAvoidingView } from 'react-native';
import { Button } from 'react-native-elements';
import FBLoginButton from '../components/FBLoginButton';
import AsyncStorage from '@react-native-community/async-storage';
import styles from "./SignInStyle";

const appId = "906979363006410"
import config from '../../config'

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
        if (this.state.email == '' || this.state.password.length < 6 || this.state.email < 5 || this.state.password == '')
            return
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

            isLoading = <View style={{}}>
                <ActivityIndicator />
            </View>

        }
        return (
            <KeyboardAvoidingView style={styles.containerView} behavior="padding">
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.loginScreenContainer}>
                        <View style={styles.loginFormView}>
                            <Text style={styles.logoText}>Sous Chef</Text>
                            <TextInput placeholder="Username" onChangeText={this.handleEmailChange} placeholderColor="#c4c3cb" style={styles.loginFormTextInput} />
                            <TextInput placeholder="Password" onChangeText={this.handlePasswordChange} placeholderColor="#c4c3cb" style={styles.loginFormTextInput} secureTextEntry={true} />
                            {isLoading}
                            <Button
                                buttonStyle={styles.loginButton}
                                onPress={() => this.handleLogin()}
                                title="Login" />
                            <Text style={styles.or}>OR</Text>
                            <FBLoginButton />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView >
        );
    }
};
