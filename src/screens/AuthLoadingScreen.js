import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useContext, useEffect} from 'react';
import {ActivityIndicator, Image, View} from 'react-native';
import theme from '../config/theme';
import {AuthContext} from '../context/authContext';

const AuthLoadingScreen = (props) => {
  useEffect(() => {
    setTimeout(() => {
      getLoginStatus();
    }, 3000);
  }, []);

  const getLoginStatus = async () => {
    const userData = await AsyncStorage.getItem('userData');
    props.navigation.navigate(userData ? 'App' : 'Auth');
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Image
        source={require('../assets/starz.png')}
        style={{height: 60, width: 60, marginBottom: 15}}
      />
      <ActivityIndicator size={'small'} color={theme.$primaryColor} />
    </View>
  );
};

export default AuthLoadingScreen;
