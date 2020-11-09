import React from 'react';
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'

import HomeTopTabNavigator from "./HomeTopTabNavigator";
import PortfolioListScreen from '../screens/PortfolioListScreen';
import PosterListScreen from '../screens/PosterListScreen';
import NotificationListScreen from '../screens/NotificationListScreen';
import AccountScreen from '../screens/AccountScreen';
import UserDetailsScreen from '../screens/UserDetailsScreen';
import PosterDetailsScreen from '../screens/PosterDetailsScreen';
import SearchScreen from '../screens/SearchScreen';
import theme from '../config/theme';
import FilterScreen from '../screens/FilterScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import FriendScreen from '../screens/FriendScreen';
import HomePosterList from '../components/HomePosterList';
import MyConnectionScreen from '../screens/MyConnectionScreen';
import PendingConnectionScreen from '../screens/PendingConnectionScreen';
import SentConnectionScreen from '../screens/SentConnectionScreen';
import BuddyTopNavigator from './BuddyTopNavigator';
import MediaDetailsScreen from '../screens/MediaDetailsScreen';
import HelpScreen from '../screens/HelpScreen';
import PoliciesScreen from '../screens/PoliciesScreen';
import FeedbackScreen from '../screens/FeedbackScreen';

const HomeNavigator = createStackNavigator({
    Portfolio: {
        screen: HomeTopTabNavigator,
        navigationOptions: ({ navigate, navigation }) => ({
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
                    onPress={() => navigation.navigate('Filter')}
                />
            ),
        })
    },
    UserDetails: {
        screen: UserDetailsScreen
    },
    PosterDetails: {
        screen: PosterDetailsScreen
    },
    Filter: {
        screen: FilterScreen
    },
    MediaDetails: {
        screen: MediaDetailsScreen
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
        navigationOptions: ({ navigate, navigation }) => ({
            headerStyle: {
                elevation: 0,
                shadowOpacity: 0
            },
            headerRight: () => (
                <MaterialCommunityIcons
                    style={{ marginRight: 15 }}
                    size={25}
                    name='filter-outline'
                    onPress={() => navigation.navigate('Filter')}
                />
            ),
        }),
    },
    UserDetails: {
        screen: UserDetailsScreen,
    },
    Filter: {
        screen: FilterScreen
    },
}, {
    defaultNavigationOptions: {
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
    Edit: {
        screen: EditProfileScreen
    },
    Help: {
        screen: HelpScreen,
        navigationOptions: {
            title: 'Help'
        }
    },
    Policy: {
        screen: PoliciesScreen,
        navigationOptions: {
            title: 'Terms of Policy'
        }
    },
    Feedback: {
        screen: FeedbackScreen,
        navigationOptions: {
            title: 'Feedback'
        }
    }
}, {
    defaultNavigationOptions: {
        headerTitleStyle: {
            fontWeight: '100',
            fontSize: 17
        },
    }
})

const BuddyNavigator = createStackNavigator({
    Connections: {
        screen: BuddyTopNavigator,
        navigationOptions: {
            title: 'Friends',
            headerStyle: {
                elevation: 0,
                shadowOpacity: 0
            },
            headerTitleStyle: {
                fontWeight: '100',
                fontSize: 17
            },
        }
    },
    UserDetails: {
        screen: UserDetailsScreen,
    },
}, {
    defaultNavigationOptions: {
        headerTitleStyle: {
            fontWeight: '100',
            fontSize: 17
        },
    }
})

const FriendsNavigator = createMaterialTopTabNavigator(
    {
        Connections: MyConnectionScreen,
        Pending: PendingConnectionScreen,
        Sent: SentConnectionScreen,
    },
    {
        defaultNavigationOptions: {
            upperCaseLabel: false,
            activeTintColor: theme.$primaryColor,
            showIcon: true,
            showLabel: false,
            indicatorStyle: {
                activeTintColor: theme.$primaryColor
            },
            labelStyle: {
                fontSize: 14,
                fontWeight: 'bold'
            },
            tabBarOptions: {
                labelStyle: {
                    fontSize: 14,
                    textTransform: 'capitalize',
                    fontWeight: "bold"
                },
                activeTintColor: theme.$primaryColor,
                inactiveTintColor: 'gray',
                pressColor: 'gray',
                style: {
                    backgroundColor: 'white',
                    elevation: 0,
                    width: '90%'
                },
                indicatorStyle: {
                    backgroundColor: theme.$primaryColor
                },
            },
            tabsStyle: {
                backgroundColor: 'white',
                elevation: 0,
            },
            style: {
                backgroundColor: 'white'
            }
        }
    }
)

const MainNavigator = createBottomTabNavigator(
    {
        // Users: UserNavigator,
        // Posters: PosterNavigator,
        Home: HomeNavigator,
        Search: FilterScreen,
        Friends: BuddyNavigator,
        Notification: NotificationNavigator,
        Profile: AccountNavigator
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state;
                let IconComponent = Ionicons;
                let iconName;
                if (routeName === 'Home') {
                    iconName = focused
                        ? 'home'
                        : 'home-outline';
                } else if (routeName === 'Search') {
                    iconName = focused
                        ? 'search'
                        : 'search-outline';
                } else if (routeName === 'Friends') {
                    iconName = focused
                        ? 'ios-people'
                        : 'people-outline'
                } else if (routeName === 'Notification') {
                    iconName = focused
                        ? 'ios-notifications'
                        : 'ios-notifications-outline'
                } else if (routeName === 'Profile') {
                    iconName = focused
                        ? 'person'
                        : 'person-outline'
                }

                // You can return any component that you like here!
                return <IconComponent name={iconName} size={25} color={tintColor} />;
            },
        }),
        tabBarOptions: {
            activeTintColor: theme.$primaryColor,
            inactiveTintColor: 'gray',
        },
        swipeEnabled: true,
        animationEnabled: true,
        initialRouteName: 'Home',
    }
)

export default createAppContainer(MainNavigator)