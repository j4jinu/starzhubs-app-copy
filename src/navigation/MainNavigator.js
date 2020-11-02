import React from 'react';
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from 'react-navigation-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import HomeTopTabNavigator from "./HomeTopTabNavigator";
import PortfolioListScreen from '../screens/PortfolioListScreen';
import PosterListScreen from '../screens/PosterListScreen';
import NotificationListScreen from '../screens/NotificationListScreen';
import AccountScreen from '../screens/AccountScreen';
import UserDetailsScreen from '../screens/UserDetailsScreen';
import PosterDetailsScreen from '../screens/PosterDetailsScreen';

const HomeNavigator = createStackNavigator({
    Portfolio: {
        screen: HomeTopTabNavigator,
        navigationOptions: {
            title: 'Explore',
            headerStyle: {
                elevation: 0,
                shadowOpacity: 0
            },
            headerTitleStyle: {
                fontWeight: '100',
                fontSize: 17
            },
            headerRight: () => (
                <MaterialIcons
                    style={{ marginRight: 15 }}
                    size={25}
                    name='search'
                    onPress={() => alert('This is a button!')}
                />
            ),
        }
    },
    UserDetails: {
        screen: UserDetailsScreen
    },
    PosterDetails: {
        screen: PosterDetailsScreen
    }
}, {
    defaultNavigationOptions: {
        headerTitleStyle: {
            fontWeight: '100',
            fontSize: 17
        },
    }
})

const UserNavigator = createStackNavigator({
    Users: {
        screen: PortfolioListScreen,
        navigationOptions: {
            headerStyle: {
                elevation: 0,
                shadowOpacity: 0
            },
            headerRight: () => (
                <MaterialCommunityIcons
                    style={{ marginRight: 15 }}
                    size={25}
                    name='filter-outline'
                    onPress={() => alert('This is a button!')}
                />
            ),
        },
    },
    UserDetails: {
        screen: UserDetailsScreen
    }
}, {
    defaultNavigationOptions: {
        mode: 'modal',
        headerTitleStyle: {
            fontWeight: '100',
            fontSize: 17
        },
    }
})

const PosterNavigator = createStackNavigator({
    Posters: PosterListScreen,
    PosterDetails: {
        screen: PosterDetailsScreen
    }
}, {
    defaultNavigationOptions: {
        mode: 'modal',
        headerTitleStyle: {
            fontWeight: '100',
            fontSize: 17
        },
    }
})

const NotificationNavigator = createStackNavigator({
    Notifications: NotificationListScreen,
}, {
    defaultNavigationOptions: {
        mode: 'modal',
        headerTitleStyle: {
            fontWeight: '100',
            fontSize: 17
        },
    }
})

const AccountNavigator = createStackNavigator({
    Account: {
        screen: AccountScreen,
        navigationOptions: {
            headerShown: false
        }
    },
}, {
    defaultNavigationOptions: {
        mode: 'modal',
        headerTitleStyle: {
            fontWeight: '100',
            fontSize: 17
        },
    }
})

const MainNavigator = createBottomTabNavigator(
    {
        Users: UserNavigator,
        Posters: PosterNavigator,
        Home: HomeNavigator,
        Notification: NotificationNavigator,
        Profile: AccountNavigator
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state;
                let IconComponent = MaterialCommunityIcons;
                let iconName;
                if (routeName === 'Home') {
                    iconName = focused
                        ? 'home'
                        : 'home';
                } else if (routeName === 'Users') {
                    iconName = focused ? 'account-group' : 'account-group';
                } else if (routeName === 'Posters') {
                    iconName = focused ? 'post' :
                        'post'
                } else if (routeName === 'Notification') {
                    iconName = focused ? 'bell' :
                        'bell'
                } else if (routeName === 'Profile') {
                    iconName = focused ? 'account' :
                        'account'
                }

                // You can return any component that you like here!
                return <IconComponent name={iconName} size={25} color={tintColor} />;
            },
        }),
        tabBarOptions: {
            activeTintColor: 'orange',
            inactiveTintColor: 'gray',
        },
        swipeEnabled: true,
        animationEnabled: true,
        initialRouteName: 'Home'
    }
)

export default createAppContainer(MainNavigator)