import React from 'react';
import { ScrollView, View, TouchableOpacity, StyleSheet, TextInput, Text, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'

const SignupScreen = (props) => {
    return (
        <ScrollView style={styles.container}>
            <View>
                <Text style={styles.title}>Create an Account</Text>
                <View style={styles.inputFieldBackground}>
                    <Icon
                        name='user'
                        size={20}
                        color={'orange'}
                    />
                    <TextInput
                        textContentType={'name'}
                        style={styles.inputField}
                        placeholder={'Full Name'}
                    />
                </View>
                <View style={styles.inputFieldBackground}>
                    <Icon
                        name='envelope'
                        size={20}
                        color={'orange'}
                    />
                    <TextInput
                        keyboardType={'email-address'}
                        textContentType={'emailAddress'}
                        style={styles.inputField}
                        placeholder={'Email address'}
                    />
                </View>
                <View style={styles.inputFieldBackground}>
                    <Icon
                        name='phone'
                        size={20}
                        color={'orange'}
                    />
                    <TextInput
                        keyboardType={'number-pad'}
                        style={styles.inputField}
                        placeholder={'Phone Number'}
                    />
                </View>
                <View style={styles.inputFieldBackground}>
                    <Icon
                        name='lock'
                        size={20}
                        color={'orange'}
                    />
                    <TextInput
                        secureTextEntry={true}
                        style={styles.inputField}
                        placeholder={'New Password'}
                    />
                </View>
                <View style={styles.inputFieldBackground}>
                    <Icon
                        name='lock'
                        size={20}
                        color={'orange'}
                    />
                    <TextInput
                        secureTextEntry={true}
                        style={styles.inputField}
                        placeholder={'Confirm Password'}
                    />
                </View>
                <TouchableOpacity
                    style={styles.registerBtn}
                >
                    <Text
                        style={styles.registerBtnText}
                    >
                        Register
                        </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        zIndex: 1,
        backgroundColor: 'white',

    },
    inputFieldBackground: {
        alignSelf: 'center',
        borderColor: '#e6e6e6',
        borderWidth: 1,
        borderRadius: 8,
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
    registerBtn: {
        alignSelf: 'center',
        width: '90%',
        backgroundColor: 'orange',
        padding: 5,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5
    },
    registerBtnText: {
        fontSize: 18,
        marginVertical: 5,
        color: 'white',
        fontFamily: 'montserrat-medium',
        textTransform: 'uppercase'
    },
    title: {
        fontFamily: 'montserrat-medium',
        fontWeight: 'bold',
        fontSize: 22,
        alignSelf: 'flex-start',
        marginBottom: 10,
        marginLeft: '5%'
    }
})

export default SignupScreen;