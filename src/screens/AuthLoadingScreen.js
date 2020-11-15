import React, { useContext, useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import theme from '../config/theme';
import { AuthContext } from '../context/authContext';

const AuthLoadingScreen = (props) => {
    const auth = useContext(AuthContext)
    useEffect(() => {
        props.navigation.navigate(auth.token !== '' ? 'App' : 'Auth');
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