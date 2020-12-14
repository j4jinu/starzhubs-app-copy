import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import LoginScreen from "../screens/LoginScreen";
import OtpScreen from "../screens/OtpScreen";
import SignupScreen from "../screens/SignupScreen";

const AuthNavigator = createStackNavigator({
    Login: {
        screen: LoginScreen,
        navigationOptions: {
            headerShown: false
        }
    },
    Signup: {
        screen: SignupScreen,
        navigationOptions: {
            title: ''
        }
    },
    otp: {
        screen: OtpScreen,
        navigationOptions: {
            title: ''
        }
    },
    PasswordRecovery: {
        screen: ForgotPasswordScreen,
        navigationOptions: {
            title: ''
        }
    },
})

export default createAppContainer(AuthNavigator)