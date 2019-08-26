import React from 'react'
import Ionicons from "react-native-vector-icons/Ionicons";

import IconWithBadge from '../components/IconWithBadge';

export default getTabBarIcon = (navigation, focused, tintColor) => {
    const { routeName } = navigation.state;
    let IconComponent = Ionicons;
    let iconName;
    if (routeName === 'Home') {
        iconName = `ios-basket`;
        // We want to add badges to home tab icon
        IconComponent = HomeIconWithBadge;
    } else if (routeName === 'Settings') {
        iconName = `ios-options${focused ? '' : '-outline'}`;
    }
    else if (routeName === 'Search Recipe') {
        iconName = `ios-search`;
    }
    else if (routeName === 'Shopping List') {
        IconComponent = ShoppingListIconWithBadge;
        iconName = `ios-cart`;
    }
    // You can return any component that you like here!
    return <IconComponent name={iconName} size={25} color={tintColor} />;
};
const HomeIconWithBadge = props => {
    // You should pass down the badgeCount in some other ways like context, redux, mobx or event emitters.
    return <IconWithBadge {...props} badgeCount={3} />;
};
const ShoppingListIconWithBadge = props => {
    return <IconWithBadge {...props} badgeCount={112} />;
}