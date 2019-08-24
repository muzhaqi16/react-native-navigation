import React from 'react';
import { createStackNavigator } from 'react-navigation';
import ProfileScreen from '../screens/ProfileScreen';

export default ProfileStack = createStackNavigator({
    Profile: ProfileScreen
})