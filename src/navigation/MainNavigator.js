import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
} from 'react-navigation-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeTopTabNavigator from './HomeTopTabNavigator';
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
import MediaDetailsScreen from '../screens/MediaDetailsScreen';
import HelpScreen from '../screens/HelpScreen';
import PoliciesScreen from '../screens/PoliciesScreen';
import FeedbackScreen from '../screens/FeedbackScreen';
import EditTalentScreen from '../screens/EditTalentScreen';
import MyPostersScreen from '../screens/MyPostersScreen';
import MyMediaScreen from '../screens/MyMediaScreen';
import EditPosterScreen from '../screens/EditPosterScreen';
import TalentListScreen from '../screens/TalentListScreen';
import AddTalentScreen from '../screens/AddTalentScreen';
import CreatePosterScreen from '../screens/CreatePosterScreen';
import HomeScreenSingle from '../screens/HomeScreenSingle';
import PhotoUploadScreen from '../screens/PhotoUploadScreen';
import VideoUploadScreen from '../screens/VideoUploadScreen.js';
import FilterResultScreen from '../screens/FilterResultScreen';
import PosterRequestScreen from '../screens/PosterRequestScreen';
import ServiceScreen from '../screens/ServiceScreen';
import ServiceDetailsScreen from '../screens/ServiceDetailsScreen';
import BuddyTopNavigator from './BuddyTopNavigator';
import EditMediaScreen from '../screens/EditMediaScreen';
import MediaListSceen from '../screens/MediaListScreen';
import MyPosterRequests from '../screens/MyPosterRequests';

const HomeNavigator = createStackNavigator(
  {
    Portfolio: {
      screen: HomeScreenSingle,
      navigationOptions: ({ navigate, navigation }) => ({
        title: 'Explore',
        headerTitleStyle: {
          fontWeight: '100',
          fontSize: 16,
        },
      }),
    },
    UserDetails: {
      screen: UserDetailsScreen,
      navigationOptions: {
        title: 'User Details',
      },
    },
    PosterDetails: {
      screen: PosterDetailsScreen,
      navigationOptions: {
        title: 'Poster Details',
      },
    },
    EditPoster: {
      screen: EditPosterScreen,
      navigationOptions: {
        title: 'Edit Poster',
      },
    },
    Filter: {
      screen: FilterScreen,
      title: '',
    },
    FilterResult: {
      screen: FilterResultScreen,
      navigationOptions: {
        title: 'Filter Result',
      },
    },
    MediaDetails: {
      screen: MediaDetailsScreen,
      navigationOptions: {
        title: 'Media Details',
      },
    },
    UsersList: {
      screen: PortfolioListScreen,
      title: 'Trending profiles',
    },
    MediaList: {
      screen: MediaListSceen,
      title: 'Trending media',
    },
  },
  {
    defaultNavigationOptions: {
      headerTitleStyle: {
        fontWeight: '100',
        fontSize: 16,
      },
    },
  },
);

const UserNavigator = createStackNavigator(
  {
    Users: {
      screen: PortfolioListScreen,
      navigationOptions: ({ navigate, navigation }) => ({
        headerRight: () => (
          <MaterialCommunityIcons
            style={{ marginRight: 15 }}
            size={25}
            name="filter-outline"
            onPress={() => navigation.navigate('Filter')}
          />
        ),
      }),
    },
    UserDetails: {
      screen: UserDetailsScreen,
      navigationOptions: {
        title: 'User Details',
      },
    },
    Filter: {
      screen: FilterScreen,
      title: '',
    },
  },
  {
    defaultNavigationOptions: {
      headerTitleStyle: {
        fontWeight: '100',
        fontSize: 16,
      },
    },
  },
);

const PosterNavigator = createStackNavigator(
  {
    Posters: PosterListScreen,
    PosterDetails: {
      screen: PosterDetailsScreen,
      navigationOptions: {
        title: 'Poster Details',
      },
    },
    PosterRequest: {
      screen: PosterRequestScreen,
      navigationOptions: {
        title: 'Poster Request',
      },
    },
    EditPoster: {
      screen: EditPosterScreen,
      navigationOptions: {
        title: 'Edit Poster',
      },
    },
    CreatePosters: {
      screen: CreatePosterScreen,
      title: '',
    },
    UserDetails: {
      screen: UserDetailsScreen,
      navigationOptions: {
        title: 'User Details',
      },
    },
  },
  {
    defaultNavigationOptions: {
      headerTitleStyle: {
        fontWeight: '100',
        fontSize: 16,
      },
    },
  },
);

const NotificationNavigator = createStackNavigator(
  {
    Notifications: NotificationListScreen,
  },
  {
    defaultNavigationOptions: {
      headerTitleStyle: {
        fontWeight: '100',
        fontSize: 16,
      },
    },
  },
);

const AccountNavigator = createStackNavigator(
  {
    Account: {
      screen: AccountScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    Edit: {
      screen: EditProfileScreen,
      navigationOptions: {
        title: 'Edit Profile',
      },
    },
    OurServices: {
      screen: ServiceScreen,
      navigationOptions: {
        title: 'Services',
      },
    },
    ServiceDetails: {
      screen: ServiceDetailsScreen,
      navigationOptions: {
        title: 'Services',
      },
    },
    Talents: {
      screen: TalentListScreen,
      navigationOptions: {
        title: 'Your Talents',
      },
    },
    EditTalents: {
      screen: EditTalentScreen,
      navigationOptions: {
        title: 'Edit Talents',
      },
    },
    AddTalents: {
      screen: AddTalentScreen,
      navigationOptions: {
        title: 'Add Talents',
      },
    },
    Help: {
      screen: HelpScreen,
      navigationOptions: {
        title: 'Help',
      },
    },
    Policy: {
      screen: PoliciesScreen,
      navigationOptions: {
        title: 'Terms of Policy',
      },
    },
    Feedback: {
      screen: FeedbackScreen,
      navigationOptions: {
        title: 'Feedback',
      },
    },
    MyPosters: {
      screen: MyPostersScreen,
      navigationOptions: {
        title: 'Your posters',
      },
    },
    MyPosterRequest: {
      screen: MyPosterRequests,
      navigationOptions: {
        title: 'Your poster requests',
      },
    },
    MyMedia: {
      screen: MyMediaScreen,
      navigationOptions: {
        title: 'Your media',
      },
    },
    MediaDetails: {
      screen: MediaDetailsScreen,
      navigationOptions: {
        title: 'Media Details',
      },
    },
    Photo: {
      screen: PhotoUploadScreen,
      navigationOptions: {
        title: 'Upload a photo',
      },
    },
    Video: {
      screen: VideoUploadScreen,
      navigationOptions: {
        title: 'Upload a video',
      },
    },
    MyBuddy: {
      screen: BuddyTopNavigator,
      navigationOptions: {
        title: 'Your connections',
      },
    },
    EditPoster: {
      screen: EditPosterScreen,
      navigationOptions: {
        title: 'Edit Poster',
      },
    },
    UserPosterDetails: {
      screen: PosterDetailsScreen,
      navigationOptions: {
        title: 'Poster Details',
      },
    },
    EditMedia: {
      screen: EditMediaScreen,
      navigationOptions: {
        title: 'Update Media',
      },
    },
    CreatePosters: {
      screen: CreatePosterScreen,
      navigationOptions: {
        title: 'Create Poster',
      },
    },
    UserDetails: {
      screen: UserDetailsScreen,
      navigationOptions: {
        title: 'User Details',
      },
    },
  },
  {
    defaultNavigationOptions: {
      headerTitleStyle: {
        fontWeight: '100',
        fontSize: 16,
      },
    },
  },
);

const BuddyNavigator = createStackNavigator(
  {
    Connections: {
      screen: BuddyTopNavigator,
      navigationOptions: {
        title: 'Friends',
        headerTitleStyle: {
          fontWeight: '100',
          fontSize: 16,
        },
      },
    },
    UserDetails: {
      screen: UserDetailsScreen,
      navigationOptions: {
        title: 'User Details',
      },
    },
  },
  {
    defaultNavigationOptions: {
      headerTitleStyle: {
        fontWeight: '100',
        fontSize: 16,
      },
    },
  },
);

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
        activeTintColor: theme.$primaryColor,
      },
      labelStyle: {
        fontSize: 14,
        fontWeight: 'bold',
      },
      tabBarOptions: {
        labelStyle: {
          fontSize: 14,
          textTransform: 'capitalize',
          fontWeight: 'bold',
        },
        activeTintColor: theme.$primaryColor,
        inactiveTintColor: 'gray',
        pressColor: 'gray',
        style: {
          backgroundColor: 'white',
          width: '90%',
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
      },
    },
  },
);

const MainNavigator = createBottomTabNavigator(
  {
    // Users: UserNavigator,
    Posters: PosterNavigator,
    Search: FilterScreen,
    Home: HomeNavigator,
    // Friends: BuddyNavigator,
    Notification: NotificationNavigator,
    Profile: AccountNavigator,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'Home') {
          iconName = focused ? 'home' : 'home-outline';
        } else if (routeName === 'Search') {
          iconName = focused ? 'search' : 'search-outline';
        } else if (routeName === 'Posters') {
          iconName = focused ? 'albums' : 'albums-outline';
        } else if (routeName === 'Friends') {
          iconName = focused ? 'ios-people' : 'people-outline';
        } else if (routeName === 'Notification') {
          iconName = focused
            ? 'ios-notifications'
            : 'ios-notifications-outline';
        } else if (routeName === 'Profile') {
          iconName = focused ? 'person' : 'person-outline';
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
  },
);

export default createAppContainer(MainNavigator);
