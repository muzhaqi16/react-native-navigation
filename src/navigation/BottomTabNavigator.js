import { createBottomTabNavigator } from 'react-navigation';
import getTabBarIcon from '../components/getTabBarIcon';

import HomeStack from './HomeStack';
import AuthenticationStack from './AuthenticationStack';
import ShopingListStack from './ShoppingListStack';

export default BottomTabNavigator = createBottomTabNavigator({
    Home: HomeStack,
    'Search Recipe': AuthenticationStack,
    'Shopping List': ShopingListStack
},
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) =>
                getTabBarIcon(navigation, focused, tintColor),
        }),
        tabBarOptions: {
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
        },
    });