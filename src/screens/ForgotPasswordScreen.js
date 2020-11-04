import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import theme from '../config/theme';

const ForgotPasswordScreen = () => {
    const [loading, setLoading] = useState(false)
    const [otpReceived, setOtpReceived] = useState(true)

    if (!otpReceived) {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.title}>
                        Forgot your password?
                    </Text>
                    <Text style={{ alignSelf: 'center', textAlign: 'center', marginHorizontal: 40, marginBottom: 10 }}>
                        Please provide your registered email address so that we can help you reset your password.
                    </Text>
                    <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20, marginBottom: 25 }}>
                        <View style={styles.inputFieldBackground}>
                            <Icon
                                name='envelope'
                                size={20}
                                color={theme.$primaryColor}
                            />
                            <TextInput
                                keyboardType={'email-address'}
                                textContentType={'emailAddress'}
                                style={styles.inputField}
                                placeholder={'Email address'}
                            />
                        </View>
                        <TouchableOpacity
                            style={{
                                backgroundColor: theme.$primaryColor,
                                height: 45,
                                width: 45,
                                borderRadius: 100,
                                marginLeft: 10,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            {!loading && (
                                <Icon
                                    name='arrow-right'
                                    size={20}
                                    color={'white'}
                                />

                            )}
                            {loading && (

                                <ActivityIndicator size={30} color={'white'} />
                            )}
                        </TouchableOpacity>

                    </View>
                </View>

                <View style={styles.containerBackground1}>

                </View>
            </ScrollView>
        );
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>
                    Change password
                </Text>
                <Text style={{ alignSelf: 'center', textAlign: 'center', marginHorizontal: 40, marginBottom: 10 }}>
                    Please enter the OTP recieived on your email address.
            </Text>
                <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20, marginBottom: 25 }}>
                    <View style={styles.inputFieldBackground}>
                        <Icon
                            name='envelope'
                            size={20}
                            color={theme.$primaryColor}
                        />
                        <TextInput
                            style={styles.inputField}
                            placeholder={'OTP'}
                        />
                    </View>
                    <View style={styles.inputFieldBackground}>
                        <Icon
                            name='envelope'
                            size={20}
                            color={theme.$primaryColor}
                        />
                        <TextInput
                            style={styles.inputField}
                            placeholder={'New Password'}
                        />
                    </View>
                    <View style={styles.inputFieldBackground}>
                        <Icon
                            name='envelope'
                            size={20}
                            color={theme.$primaryColor}
                        />
                        <TextInput
                            style={styles.inputField}
                            placeholder={'Confirm Password'}
                        />
                    </View>
                    <TouchableOpacity
                        style={{
                            backgroundColor: theme.$primaryColor,
                            height: 45,
                            width: 45,
                            borderRadius: 100,
                            marginLeft: 10,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        {!loading && (
                            <Icon
                                name='check'
                                size={20}
                                color={'white'}
                            />

                        )}
                        {loading && (

                            <ActivityIndicator size={30} color={'white'} />
                        )}
                    </TouchableOpacity>

                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff',
        zIndex: 1,
        position: 'relative',
        borderBottomRightRadius: 50,
        paddingBottom: 25,
        zIndex: 1
    },
    containerBackground1: {
        backgroundColor: theme.$primaryColor,
        borderTopStartRadius: 50
    },
    title: {
        fontFamily: 'montserrat-medium',
        fontSize: 22,
        marginBottom: 15,
        alignSelf: 'center'
    },
    inputFieldBackground: {
        alignSelf: 'center',
        borderColor: '#e6e6e6',
        borderWidth: 1,
        borderRadius: 10,
        width: '90%',
        marginVertical: 8,
        paddingLeft: 8,
        paddingRight: 8,
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputField: {
        alignSelf: 'center',
        width: '90%',
        textTransform: 'lowercase',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 8,
        fontFamily: 'montserrat-regular'
    },

})

export default ForgotPasswordScreen;