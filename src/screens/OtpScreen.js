import React, { useContext } from 'react';
import { Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import theme from '../config/theme';
import { AuthContext } from '../context/authContext';

const OtpScreen = (props) => {
    const auth = useContext(AuthContext)
    const { otp, userId } = props.navigation.getParam()

    const submitOtp = async () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                otp: values.otp,
                userId: userId,
            }),
        };
        const response = await fetch(`https://api.starzhubs.com/api/user`, requestOptions)
        const resData = await response.json()
        if (!resData.success) {
            alert(resData.message)
            return
        }
        auth.login(
            resData.data.userId,
            resData.data.token
        )
        props.navigation.navigate('Edit')
    }

    return (
        <View style={styles.container}>
            <Text style={{
                marginTop: 30,
                fontSize: 16,
                marginBottom: 10,
                marginLeft: '5%'
            }}>Enter OTP received in your email</Text>
            <View
                style={{
                    alignSelf: 'center',
                    borderWidth: 1,
                    borderColor: 'gray',
                    borderRadius: 10,
                    width: '90%',
                    paddingLeft: 8,
                    paddingRight: 8,
                    marginTop: 8,
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
            >
                <Icon
                    name='user'
                    size={20}
                    color={theme.$primaryColor}
                />
                <TextInput
                    textContentType={'name'}
                    style={styles.inputField}
                    placeholder={'OTP'}
                />
            </View>
            <TouchableOpacity
                activeOpacity={0.8}
                style={styles.registerBtn}
            >
                <Text style={styles.registerBtnText}>
                    Submit
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    inputField: {
        alignSelf: 'center',
        width: '100%',
        textTransform: 'lowercase',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 8,
        fontFamily: 'montserrat-regular'
    },
    registerBtn: {
        width: '90%',
        backgroundColor: theme.$primaryColor,
        padding: 8,
        borderRadius: 8,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 8
    },
    registerBtnText: {
        fontSize: 18,
        marginVertical: 5,
        color: 'white',
        fontFamily: 'montserrat-medium',
        textTransform: 'uppercase'
    },
})

export default OtpScreen;