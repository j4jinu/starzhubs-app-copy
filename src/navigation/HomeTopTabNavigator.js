import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from "react-navigation";
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import PortfolioListScreen from '../screens/PortfolioListScreen';
import HomePortfolioList from '../components/HomePortfolioList';
import HomePosterList from '../components/HomePosterList';

const RouteConfigs = {
    Portfolio: HomePortfolioList,
    Media: HomePosterList,
    Poster: HomePosterList
}

const TabNavigatorConfig = {
    upperCaseLabel: true,
    activeTintColor: 'orange',
    showIcon: true,
    showLabel: false,
    indicatorStyle: {
        activeTintColor: 'orange'
    },
    tabBarOptions: {
        activeTintColor: 'orange',
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