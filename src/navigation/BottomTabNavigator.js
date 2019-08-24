import React from 'react'
import { createBottomTabNavigator } from 'react-navigation';

import HomeStack from './HomeStack';
import AuthenticationStack from './AuthenticationStack';

export default BottomTabNavigator = createBottomTabNavigator({
    /* 
     * Rather than being rendered by a screen component, the
     * AuthenticationNavigator is a screen component
     */

    Home: HomeStack,
    Auth: AuthenticationStack,
});