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
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import theme from '../config/theme'

const LoginScreen = (props) => {

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
                <View style={styles.inputFieldBackground}>
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
                    />
                </View>
                <View style={styles.inputFieldBackground}>
                    <Icon
                        name='lock'
                        size={20}
                        color={theme.$primaryColor}
                    />
                    <TextInput
                        secureTextEntry={true}
                        style={styles.inputField}
                        placeholder={'Password'}
                    />
                </View>
                <TouchableOpacity
                    onPress={() => props.navigation.navigate('PasswordRecovery')}
                >
                    <Text style={styles.forgotText}>
                        Forgot Password?
                        </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.loginBtn}
                    onPress={() => props.navigation.navigate('Home')}
                >
                    <Text style={styles.loginBtnText}>
                        LOG IN
                        </Text>
                </TouchableOpacity>
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
        marginVertical: 8,
        paddingLeft: 8,
        paddingRight: 8,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3,
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