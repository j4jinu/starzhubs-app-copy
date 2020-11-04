import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import theme from '../config/theme';

const AuthLoadingScreen = (props) => {
    const login = true
    useEffect(() => {
        props.navigation.navigate(login ? 'App' : 'Auth');
    })
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator
                size={'large'}
                color={theme.$primaryColor}
            />
        </View>
    );
};

export default AuthLoadingScreen;