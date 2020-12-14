import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from "react-navigation";
import MyConnectionScreen from '../screens/MyConnectionScreen';
import PendingConnectionScreen from '../screens/PendingConnectionScreen';
import SentConnectionScreen from '../screens/SentConnectionScreen';
import theme from '../config/theme';

const RouteConfigs = {
    Connections: MyConnectionScreen,
    Requests: PendingConnectionScreen,
    Sent: SentConnectionScreen,
}

const TabNavigatorConfig = {
    upperCaseLabel: false,
    activeTintColor: theme.$primaryColor,
    showIcon: true,
    showLabel: false,
    indicatorStyle: {
        activeTintColor: theme.$primaryColor,
    },
    labelStyle: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    tabBarOptions: {
        labelStyle: {
            fontSize: 13,
            textTransform: 'capitalize',
            fontWeight: "bold"
        },
        activeTintColor: theme.$primaryColor,
        inactiveTintColor: 'gray',
        pressColor: 'gray',
        style: {
            backgroundColor: 'white',
            elevation: 0,
            width: '100%',

        },
        indicatorStyle: {
            backgroundColor: theme.$primaryColor,
        },
    },
    tabsStyle: {
        backgroundColor: 'white',
        elevation: 0,
    },
    style: {
        backgroundColor: 'white',

    }
}

const BuddyTopNavigator = createMaterialTopTabNavigator(RouteConfigs, TabNavigatorConfig);

export default createAppContainer(BuddyTopNavigator)