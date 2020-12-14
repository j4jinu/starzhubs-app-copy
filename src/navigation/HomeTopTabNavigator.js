import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from "react-navigation";
import PortfolioListScreen from '../screens/PortfolioListScreen';
import HomePosterList from '../components/HomePosterList';
import theme from '../config/theme';
import PosterListScreen from '../screens/PosterListScreen';

const RouteConfigs = {
    Portfolio: PortfolioListScreen,
    Media: HomePosterList,
    Poster: PosterListScreen
}

const TabNavigatorConfig = {
    upperCaseLabel: true,
    activeTintColor: theme.$primaryColor,
    showLabel: false,
    indicatorStyle: {
        activeTintColor: theme.$primaryColor
    },
    tabBarOptions: {
        labelStyle: {
            fontSize: 14,
            textTransform: 'capitalize',
            fontWeight: "bold",
        },
        activeTintColor: theme.$primaryColor,
        inactiveTintColor: 'gray',
        pressColor: 'gray',
        indicatorStyle: {
            backgroundColor: theme.$primaryColor
        },
        style: {
            backgroundColor: 'white',
            elevation: 0,
            shadowOpacity: 0,
        },
    },
    tabsStyle: {
        width: 100,
        backgroundColor: 'white'
    },
    style: {
        backgroundColor: 'white'
    }
}

const HomeTopTabNavigator = createMaterialTopTabNavigator(RouteConfigs, TabNavigatorConfig);

export default createAppContainer(HomeTopTabNavigator)