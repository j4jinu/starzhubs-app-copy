import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ScrollView } from 'react-native-gesture-handler';
import theme from '../config/theme';
const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [isEmailMode, setIsEmailMode] = useState(true);
  const [isSuccessMode, setIsSuccessMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const passRegExp = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$';
  const emailRegExp = /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))|[ \t]$/;
  const forgotPwdValues = {
    email: '',
  };
  const forgotPwdValidation = yup.object({
    email: yup
      .string()
      .matches(emailRegExp, 'Invalid Email Address')
      .required('Enter a valid email address'),
  });
  const initialValuesReset = {
    otp: '',
    newPassword: '',
    confirmPassword: '',
  };
  const validationSchemaReset = yup.object({
    otp: yup.number().integer('Invalid OTP').required('Enter the OTP'),
    newPassword: yup
      .string()
      .matches(passRegExp, 'Atleast one uppercase one lowercase and  one digit')
      .max(8, ({ max }) => `Password should not be  more than ${max} `)
      .required('Enter Password'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('newPassword'), null], "Passwords don't match")

      .required('Enter Confirm Password'),
  });
  const onResetSubmit = async (values) => {
    setEmail(values.email);
    const options = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(values),
    };
    try {
      const otpRes = await fetch(
        'https://api.starzhubs.com/api/auth/reset',
        options,
      );
      const otpData = await otpRes.json();
      if (otpData.success) {
        setIsEmailMode((prevMode) => !prevMode);
      } else {
        alert('Failed: ' + otpData.message);
      }
    } catch (error) {
      alert('Something went wrong');
    }
  };
  const onRecoverySubmit = async (values) => {
    values.email = email;
    const options = {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(values),
    };
    try {
      const resetRes = await fetch(
        'https://api.starzhubs.com/api/auth/reset',
        options,
      );
      const resetData = await resetRes.json();
      if (resetData.success) {
        setIsSuccessMode((prevMode) => !prevMode);
      } else {
        alert('Failed: ' + resetData.message);
      }
    } catch (error) {
      alert('Something went wrong');
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        {isEmailMode && (
          <Formik
            initialValues={forgotPwdValues}
            validationSchema={forgotPwdValidation}
            onSubmit={(values) => {
              onResetSubmit(values);
            }}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              touched,
              errors,
              values,
            }) => (
                <React.Fragment>
                  <Image
                    source={require('../assets/lock.png')}
                    style={{
                      height: 60,
                      width: '15%',
                      marginBottom: '10%',
                      alignSelf: 'center',
                      marginTop: 30,
                    }}
                  />
                  <Text
                    style={{
                      color: '#fd9242',
                      marginBottom: 15,
                      alignSelf: 'center',
                      fontFamily: 'montserrat-medium',
                      fontSize: 22,
                    }}>
                    Forgot Password?
                </Text>
                  <Text
                    style={{
                      textAlign: 'center',
                      marginHorizontal: 40,
                      marginBottom: 10,
                    }}>
                    Please provide your registered email address so that we can
                    help you reset your password.
                </Text>
                  <View
                    style={{
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <View
                      style={{
                        alignSelf: 'center',
                        borderColor: '#e6e6e6',
                        borderWidth: 1,
                        borderRadius: 8,
                        width: '90%',
                        marginHorizontal: 15,
                        marginVertical: 8,
                        paddingLeft: 8,
                        paddingRight: 8,
                        flexDirection: 'row',
                        alignItems: 'center',
                        borderColor: errors.email ? 'red' : 'gray',
                      }}>
                      <Icon
                        name="envelope"
                        size={20}
                        color={theme.$primaryColor}
                      />
                      <TextInput
                        style={styles.inputField}
                        keyboardType={'email-address'}
                        placeholder="Enter Email"
                        placeholderTextColor="grey"
                        autoCapitalize="sentences"
                        autoCorrect
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
                      />
                    </View>
                    {touched.email && errors.email && (
                      <Text style={styles.errorText}>
                        {touched.email && errors.email}
                      </Text>
                    )}
                  </View>
                  <TouchableOpacity
                    style={{
                      backgroundColor: theme.$primaryColor,
                      padding: 10,
                      marginLeft: 10,
                      width: 80,
                      borderRadius: 8,
                      alignSelf: 'flex-end',
                      marginRight: '5%',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    onPress={handleSubmit}>
                    {!loading && (
                      <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                        Submit
                      </Text>
                    )}
                    {loading && <ActivityIndicator size={30} color={'white'} />}
                  </TouchableOpacity>
                </React.Fragment>
              )}
          </Formik>
        )}
        {!isEmailMode && !isSuccessMode && (
          <Formik
            initialValues={initialValuesReset}
            validationSchema={validationSchemaReset}
            onSubmit={(values) => {
              onRecoverySubmit(values);
            }}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
                <React.Fragment>
                  <Text style={styles.title}>Change password</Text>
                  <Text
                    style={{
                      alignSelf: 'flex-start',
                      marginHorizontal: '5%',
                      marginBottom: 20,
                    }}>
                    Please enter the OTP recieived in your email address.
                </Text>
                  <View
                    style={{
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: 25,
                    }}>
                    <View
                      style={{
                        alignSelf: 'center',
                        borderColor: '#e6e6e6',
                        borderWidth: 1,
                        borderRadius: 8,
                        width: '90%',
                        marginVertical: 8,
                        paddingLeft: 8,
                        paddingRight: 8,
                        flexDirection: 'row',
                        alignItems: 'center',
                        borderColor: errors.otp ? 'red' : 'gray',
                      }}>
                      <Icon
                        name="envelope"
                        size={20}
                        color={theme.$primaryColor}
                      />
                      <TextInput
                        style={styles.inputField}
                        placeholder={'OTP'}
                        placeholderTextColor="grey"
                        autoCapitalize="sentences"
                        autoCorrect
                        onChangeText={handleChange('otp')}
                        keyboardType={'number-pad'}
                        onBlur={handleBlur('otp')}
                        value={values.otp}
                      />
                    </View>
                    {touched.otp && errors.otp && (
                      <Text style={styles.errorText}>
                        {touched.otp && errors.otp}
                      </Text>
                    )}
                    <View
                      style={{
                        alignSelf: 'center',
                        borderColor: '#e6e6e6',
                        borderWidth: 1,
                        borderRadius: 8,
                        width: '90%',
                        marginVertical: 8,
                        paddingLeft: 8,
                        paddingRight: 8,
                        flexDirection: 'row',
                        alignItems: 'center',
                        borderColor: errors.newPassword ? 'red' : 'gray',
                      }}>
                      <Icon name="lock" size={20} color={theme.$primaryColor} />
                      <TextInput
                        secureTextEntry
                        style={styles.inputField}
                        placeholder={'Password'}
                        placeholderTextColor="grey"
                        onChangeText={handleChange('newPassword')}
                        onBlur={handleBlur('newPassword')}
                        value={values.newPassword}
                      />
                    </View>
                    {touched.newPassword && errors.newPassword && (
                      <Text style={styles.errorText}>
                        {touched.newPassword && errors.newPassword}
                      </Text>
                    )}
                    <View
                      style={{
                        alignSelf: 'center',
                        borderColor: '#e6e6e6',
                        borderWidth: 1,
                        borderRadius: 8,
                        width: '90%',
                        marginVertical: 8,
                        paddingLeft: 8,
                        paddingRight: 8,
                        flexDirection: 'row',
                        alignItems: 'center',
                        borderColor: errors.confirmPassword ? 'red' : 'gray',
                      }}>
                      <Icon name="lock" size={20} color={theme.$primaryColor} />
                      <TextInput
                        secureTextEntry
                        style={styles.inputField}
                        placeholder={'Confirm Password'}
                        placeholderTextColor="grey"
                        onChangeText={handleChange('confirmPassword')}
                        onBlur={handleBlur('confirmPassword')}
                        value={values.confirmPassword}
                      />
                    </View>
                    {touched.confirmPassword && errors.confirmPassword && (
                      <Text style={styles.errorText}>
                        {touched.confirmPassword && errors.confirmPassword}
                      </Text>
                    )}
                    <TouchableOpacity
                      onPress={handleSubmit}
                      style={{
                        backgroundColor: theme.$primaryColor,
                        width: 80,
                        padding: 10,
                        borderRadius: 8,
                        alignItems: 'center',
                        justifyContent: 'center',
                        alignSelf: 'flex-end',
                        marginTop: 10,
                        marginRight: '5%',
                      }}>
                      {!loading && (
                        <Text
                          style={{
                            color: '#fff',
                            fontSize: 16,
                          }}>
                          Submit
                        </Text>
                      )}
                      {loading && <ActivityIndicator size={30} color={'white'} />}
                    </TouchableOpacity>
                  </View>
                </React.Fragment>
              )}
          </Formik>
        )}
        {isSuccessMode && (
          <React.Fragment>
            <View style={{justifyContent:'center', flex:1, alignItems:'center'}}>
            <Image
              source={require('../assets/checked.png')}
              style={{
                height: 70,
                width: '20%',
                marginBottom: '10%',
                tintColor: 'green',
                marginTop: '40%',
              }}
            />

            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Login');
              }}>
              <Text>Your password has been changed</Text>
            </TouchableOpacity>
            </View>
          </React.Fragment>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  title: {
    fontFamily: 'montserrat-medium',
    fontSize: 20,
    marginTop: 10,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginLeft: '5%',
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
  },
  inputView: {
    flexDirection: 'row',
    width: '80%',
    height: 50,
    marginBottom: 20,
    justifyContent: 'flex-start',
    padding: 10,
    borderBottomColor: 'orange',
    borderBottomWidth: 1,
  },
  inputField: {
    alignSelf: 'center',
    width: '90%',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 8,
    fontFamily: 'montserrat-regular',
  },
  forgotBtn: {
    width: '50%',
    backgroundColor: '#fd9242',
    borderRadius: 25,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  forgotText: {
    color: 'white',
  },
  errorText: {
    alignSelf: 'flex-start',
    marginHorizontal: '5%',
    color: 'red',
    marginTop: -5,
  },
});
export default ForgotPasswordScreen;
