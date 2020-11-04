import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux'
import AppNavigator from './src/navigation/AppNavigator';
import AuthNavigator from './src/navigation/AuthNavigator';
import MainNavigator from './src/navigation/MainNavigator';
import posterReducer from './src/store/reducers/posterReducer';

// const rootReducer = combineReducers({
//   posters: posterReducer
// })

// const store = createStore(rootReducer)

const App = () => {
  return <AppNavigator />
};

export default App;
