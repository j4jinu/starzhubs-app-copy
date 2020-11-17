import React, { useContext } from 'react';
import { Text, View, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import * as yup from 'yup'
import { Formik } from 'formik';
import theme from '../config/theme';
import { AuthContext } from '../context/authContext';

otpSchema = yup.object({
    otp: yup.string()
        .required('Enter OTP')
})

const OtpScreen = (props) => {
    const auth = useContext(AuthContext)
    const userId = props.navigation.getParam('userId')

    const submitOtp = async (values) => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                otp: values.otp,
                userId: userId,
            }),
        };
        const response = await fetch(`http://13.232.190.226/api/user`, requestOptions)
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
            <Formik
                initialValues={{
                   otp: ''
                }}
                validationSchema={otpSchema}
                onSubmit={(values, { setSubmitting }) => submitOtp(values, { setSubmitting })}
            >
                {({
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    touched,
                    errors,
                    values
                }) => (
                        <>
                            <View
                                style={{
                                    alignSelf: 'center',
                                    borderWidth: 1,
                                    borderRadius: 10,
                                    width: '90%',
                                    paddingLeft: 8,
                                    paddingRight: 8,
                                    marginTop: 8,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    borderColor: errors.otp ? 'red' : 'gray'
                                }}
                            >
                                <Icon
                                    name='user'
                                    size={20}
                                    color={theme.$primaryColor}
                                />
                                <TextInput
                                    style={styles.inputField}
                                    placeholder={'OTP'}
                                    onChangeText={handleChange('otp')}
                                    onBlur={handleBlur('otp')}
                                    value={values.otp}
                                />
                            </View>
                            {touched.otp && errors.otp && <Text style={styles.errorText}>
                                {touched.otp && errors.otp}
                            </Text>}
                            {!isSubmitting &&
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    style={styles.registerBtn}
                                    onPress={handleSubmit}
                                >
                                    <Text style={styles.registerBtnText}>
                                        Submit
                                    </Text>
                                </TouchableOpacity>
                            }
                            {isSubmitting && <ActivityIndicator style={{ marginTop: 10 }} size={'large'} color={theme.$primaryColor} />}
                        </>
                    )}
            </Formik>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    errorText: {
        marginHorizontal: '8%',
        color: 'red'
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