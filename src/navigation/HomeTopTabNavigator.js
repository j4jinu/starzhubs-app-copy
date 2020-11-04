import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from "react-navigation";
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import PortfolioListScreen from '../screens/PortfolioListScreen';
import HomePortfolioList from '../components/HomePortfolioList';
import HomePosterList from '../components/HomePosterList';
import theme from '../config/theme';

const RouteConfigs = {
    Portfolio: HomePortfolioList,
    Media: HomePosterList,
    Poster: HomePosterList
}

const TabNavigatorConfig = {
    upperCaseLabel: true,
    activeTintColor: theme.$primaryColor,
    showIcon: true,
    showLabel: false,
    indicatorStyle: {
        activeTintColor: theme.$primaryColor
    },
    tabBarOptions: {
        activeTintColor: theme.$primaryColor,
        inactiveTintColor: 'gray',
        pressColor: 'gray',
        style: {
            backgroundColor: 'white',
        }
    },
    tabsStyle: {
        backgroundColor: 'white'
    },
    style: {
        backgroundColor: 'white'
    }
}

const HomeTopTabNavigator = createMaterialTopTabNavigator(RouteConfigs, TabNavigatorConfig);

export default createAppContainer(HomeTopTabNavigator)