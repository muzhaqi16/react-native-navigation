import React from 'react';
import { createStackNavigator } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import AddGroceries from '../screens/AddGroceries';

export default HomeStack = createStackNavigator(
    {
        Home: HomeScreen,
        Add: AddGroceries,
    },
    {
        initialRouteName: 'Home',
        /* The header config from HomeScreen is now here */
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
            navigationOptions: {
                tabBarLabel: 'Home!',
            },
        },
    }
);