import React from 'react';
import { createStackNavigator } from 'react-navigation';

import SignInScreen from '../screens/SignInScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';

export default AuthenticationNavigator = createStackNavigator({
    SignIn: SignInScreen,
    ForgotPassword: ForgotPasswordScreen,
});