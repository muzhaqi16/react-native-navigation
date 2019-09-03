import React from 'react';
import { createDrawerNavigator } from 'react-navigation';
import { Button } from 'react-native';

import BottomTabNavigator from './BottomTabNavigator';
import ProfileStack from './ProfileStack'
import SignInScreen from './AuthenticationStack'
export default DrawerNavigator = createDrawerNavigator({
    Home: {
        screen: BottomTabNavigator,
        navigationOptions: {
            drawerLabel: 'Home',
        }
    },
    Profile: {
        screen: ProfileStack,
        navigationOptions: {
            drawerLabel: 'Profile',
        }
    },

})
