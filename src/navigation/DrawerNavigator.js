import React from 'react';
import { createDrawerNavigator } from 'react-navigation';

import BottomTabNavigator from './BottomTabNavigator';
import ProfileStack from './ProfileStack'

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
    }
})
