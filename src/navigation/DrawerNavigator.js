import React from 'react';
import { createDrawerNavigator } from 'react-navigation';
import DrawerContainer from '../components/DrawerContainer'
import BottomTabNavigator from './BottomTabNavigator';
import ProfileStack from './ProfileStack'



export default DrawerNavigator = createDrawerNavigator(
    {
        Home: BottomTabNavigator,
        Profile: ProfileStack,
    }, {
        contentComponent: DrawerContainer
    }
)
