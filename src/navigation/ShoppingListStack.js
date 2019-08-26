import React from 'react';
import { createStackNavigator } from 'react-navigation';
import ShoppingListScreen from '../screens/ShoppingListScreen';

export default ShoppingListStack = createStackNavigator({
    List: ShoppingListScreen
})