import * as React from 'react';
import {
    ScrollView,
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    TextInput,
    Image,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Formik } from 'formik';
import * as yup from 'yup';
import theme from '../config/theme';
import { AuthContext } from '../context/authContext';

const loginSchema = yup.object({
    username: yup.string()
        .required('Enter email address'),
    password: yup.string()
        .required('Enter your password')
})

const LoginScreen = (props) => {
    const auth = React.useContext(AuthContext)
    const loginUser = async (values) => {
        const loginResponse = await fetch('http://13.232.190.226/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(values)
        })
        const loginData = await loginResponse.json()
        if (!loginData.success) {
            return alert(loginData.message)
        }
        auth.login(loginData.data.userId, loginData.data.token)
        props.navigation.navigate('Home')
    }
    return (
        <ScrollView>
            <View>
                <Image
                    style={styles.logo}
                    source={{
                        uri: 'https://starzhubs.com/assets/images/starzhubs_logo.png'
                    }}
                />
                <Text style={styles.welcomeText}>
                    Welcome to StarZHubs
                    </Text>
                <Formik
                    initialValues={{ username: 'jinu@promasoft.net', password: '123' }}
                    validationSchema={loginSchema}
                    onSubmit={values => loginUser(values)}
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
                                        borderColor: errors.username ? 'red' : '#e6e6e6'
                                    }}
                                >
                                    <Icon
                                        name='mail'
                                        size={20}
                                        color={theme.$primaryColor}
                                    />
                                    <TextInput
                                        keyboardType={'email-address'}
                                        textContentType={'emailAddress'}
                                        style={styles.inputField}
                                        placeholder={'Email address'}
                                        onChangeText={handleChange('username')}
                                        onBlur={handleBlur('username')}
                                        value={values.username}
                                    />
                                </View>
                                <Text style={styles.errorText}>
                                    {touched.username && errors.username}
                                </Text>
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
                                        borderColor: errors.password ? 'red' : '#e6e6e6'
                                    }}
                                >
                                    <Icon
                                        name='lock'
                                        size={20}
                                        color={theme.$primaryColor}
                                    />
                                    <TextInput
                                        secureTextEntry={true}
                                        style={styles.inputField}
                                        placeholder={'Password'}
                                        onChangeText={handleChange('password')}
                                        onBlur={handleBlur('password')}
                                        value={values.password}
                                    />
                                </View>
                                <Text style={styles.errorText}>
                                    {touched.password && errors.password}
                                </Text>
                                <TouchableOpacity
                                    onPress={() => props.navigation.navigate('PasswordRecovery')}
                                >
                                    <Text style={styles.forgotText}>
                                        Forgot Password?
                                    </Text>
                                </TouchableOpacity>
                                {!isSubmitting &&
                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        style={styles.loginBtn}
                                        onPress={handleSubmit}
                                    >
                                        <Text style={styles.loginBtnText}>
                                            LOG IN
                                    </Text>
                                    </TouchableOpacity>
                                }
                                {isSubmitting && <ActivityIndicator size={'large'} color={theme.$primaryColor} />}
                            </>
                        )}
                </Formik>
                <View style={styles.registerLayout}>
                    <Text style={styles.registerLayoutText1}>
                        New to Starzhubs?
                        </Text>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => props.navigation.navigate('Signup')}
                    >
                        <Text style={styles.registerLayoutText2}>
                            Create an Account
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: 'white',
    },
    errorText: {
        marginHorizontal: '8%',
        color: 'red'
    },
    forgotText: {
        color: 'purple',
        alignSelf: 'flex-end',
        marginRight: '8%',
        fontWeight: 'bold',
        marginTop: 5,
        marginBottom: 12,
        fontSize: 14,
        fontFamily: 'montserrat-medium'
    },
    logo: {
        width: '50%',
        height: 100,
        alignSelf: 'center',
        marginTop: 20,
        resizeMode: 'center'
    },
    inputFieldBackground: {
        alignSelf: 'center',
        borderColor: '#e6e6e6',
        borderWidth: 1,
        borderRadius: 10,
        width: '90%',
        paddingLeft: 8,
        paddingRight: 8,
        marginTop: 8,
        flexDirection: 'row',
        alignItems: 'center',
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
    loginBtn: {
        alignSelf: 'center',
        width: '90%',
        backgroundColor: theme.$primaryColor,
        padding: 5,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginBtnText: {
        fontSize: 18,
        marginVertical: 5,
        color: 'white',
        fontFamily: 'montserrat-medium'
    },
    registerLayout: {
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: 15
    },
    registerLayoutText1: {
        color: 'black',
        fontSize: 14,
        marginRight: 5,
        fontFamily: 'montserrat-regular'
    },
    registerLayoutText2: {
        color: theme.$primaryColor,
        fontSize: 14,
        fontWeight: 'bold',
        fontFamily: 'montserrat-regular'
    },
    welcomeText: {
        color: theme.$primaryColor,
        fontSize: 22,
        marginTop: 50,
        marginBottom: 20,
        alignSelf: 'center',
        fontFamily: 'montserrat-medium'
    }
})

export default LoginScreen;