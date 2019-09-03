import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import DrawerNavigator from './src/navigation/DrawerNavigator';
import AuthStack from './src/navigation/AuthenticationStack';
import AuthLoadingScreen from './src/screens/AuthLoadingScreen';

const AppContainer = createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: DrawerNavigator,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));
export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}