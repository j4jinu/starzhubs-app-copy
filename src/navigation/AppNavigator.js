import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';

export default createAppContainer(
    createSwitchNavigator(
        {
            AuthLoading: AuthLoadingScreen,
            App: MainNavigator,
            Auth: AuthNavigator,
        },
        {
            initialRouteName: 'AuthLoading',
        }
    )
)