import * as React from 'react';
import {
  ScrollView,
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
  username: yup.string().required('Enter email address'),
  password: yup.string().required('Enter your password'),
});
const LoginScreen = (props) => {
  const auth = React.useContext(AuthContext);
  const loginUser = async (values) => {
    const loginResponse = await fetch('https://api.starzhubs.com/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(values),
    });
    const loginData = await loginResponse.json();
    if (!loginData.success) {
      return alert(loginData.message);
    }
    auth.login(loginData.data.userId, loginData.data.token);
    props.navigation.navigate('Home');
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <Image style={styles.logo} source={require('../assets/starz.png')} />
        <Text style={styles.welcomeText}>Welcome</Text>
        <Text
          style={{
            color: '#000',
            marginLeft: 20,
            marginBottom: 20,
          }}>
          Sign in to your account
        </Text>
        <Formik
          initialValues={{ username: '', password: '' }}
          validationSchema={loginSchema}
          onSubmit={(values) => loginUser(values)}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            touched,
            errors,
            values,
          }) => (
              <>
                <View
                  style={{
                    alignSelf: 'center',
                    borderWidth: 1,
                    borderRadius: 8,
                    width: '90%',
                    paddingLeft: 8,
                    paddingRight: 8,
                    marginTop: 8,
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderColor: errors.username ? 'red' : 'gray',
                  }}>
                  <Icon name="mail" size={20} color={theme.$primaryColor} />
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
                {touched.username && errors.username && (
                  <Text style={styles.errorText}>
                    {touched.username && errors.username}
                  </Text>
                )}
                <View
                  style={{
                    alignSelf: 'center',
                    borderWidth: 1,
                    borderRadius: 8,
                    width: '90%',
                    paddingLeft: 8,
                    paddingRight: 8,
                    marginTop: 20,
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderColor: errors.password ? 'red' : 'gray',
                  }}>
                  <Icon name="lock" size={20} color={theme.$primaryColor} />
                  <TextInput
                    secureTextEntry={true}
                    style={styles.inputField}
                    placeholder={'Password'}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                  />
                </View>
                {touched.password && errors.password && (
                  <Text style={styles.errorText}>
                    {touched.password && errors.password}
                  </Text>
                )}
                <TouchableOpacity
                  onPress={() => props.navigation.navigate('PasswordRecovery')}>
                  <Text style={styles.forgotText}>Forgot Password?</Text>
                </TouchableOpacity>
                {!isSubmitting && (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.loginBtn}
                    onPress={handleSubmit}>
                    <Text style={styles.loginBtnText}>Sign In</Text>
                  </TouchableOpacity>
                )}
                {isSubmitting && (
                  <ActivityIndicator size={'large'} color={theme.$primaryColor} />
                )}
              </>
            )}
        </Formik>
        <View style={styles.registerLayout}>
          <Text style={styles.registerLayoutText1}>Don't have an account?</Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => props.navigation.navigate('Signup')}>
            <Text style={styles.registerLayoutText2}>Register</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  errorText: {
    marginHorizontal: '8%',
    color: 'red',
  },
  forgotText: {
    color: 'tomato',
    alignSelf: 'flex-end',
    marginRight: '8%',

    marginTop: 12,
    marginBottom: 12,
    fontSize: 14,
    fontFamily: 'montserrat-medium',
  },
  logo: {
    width: '20%',
    height: 100,
    alignSelf: 'flex-start',
    marginTop: 50,
    marginLeft: 20,
    resizeMode: 'center',
  },
  inputFieldBackground: {
    alignSelf: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
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
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 8,
    fontFamily: 'montserrat-regular',
  },
  loginBtn: {
    alignSelf: 'center',
    width: '90%',
    backgroundColor: theme.$primaryColor,
    borderRadius: 8,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginBtnText: {
    fontSize: 18,
    marginVertical: 5,
    color: 'white',
    fontFamily: 'montserrat-medium',
  },
  registerLayout: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 25,
  },
  registerLayoutText1: {
    color: 'black',
    fontSize: 14,
    marginRight: 5,
    fontFamily: 'montserrat-regular',
  },
  registerLayoutText2: {
    color: theme.$primaryColor,
    fontSize: 14,
    fontFamily: 'montserrat-regular',
  },
  welcomeText: {
    color: '#000',
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 25,
    alignSelf: 'flex-start',
    marginLeft: 20,
    fontFamily: 'montserrat-medium',
  },
});
export default LoginScreen;
