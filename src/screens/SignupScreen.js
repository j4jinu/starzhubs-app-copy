import React, { useState } from 'react';
import {
  ScrollView,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Text,
  ActivityIndicator,
} from 'react-native';
import * as yup from 'yup';
import { Formik } from 'formik';
import Icon from 'react-native-vector-icons/FontAwesome';
import theme from '../config/theme';
import EIcon from 'react-native-vector-icons/Entypo';

const emailRegExp = /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))|[ \t]$/;
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const passRegExp = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$';

const profileSchema = yup.object({
  name: yup.string().required('Enter your name'),
  phone: yup.string().required('Enter phone number'),
  email: yup
    .string()
    .matches(emailRegExp, 'Invalid Email Address')
    .required('Enter Your Email ID'),
  phone: yup
    .string()
    .min(10, ({ min }) => `Phone Number must be at least ${min} characters`)
    .max(10, ({ max }) => `Phone Number should not be  more ${max} characters`)
    .matches(phoneRegExp, 'Phone number is not valid')
    .required('Enter Your Phone Number'),
  password: yup
    .string()
    .min(8, ({ min }) => `Password must be atleast ${min} characters, atleast one uppercase one lowercase and  one digit`)
    .matches(passRegExp, 'Atleast one uppercase one lowercase and  one digit')
    .max(20, ({ max }) => `Password should not be  more than ${max} `)
    .required('Enter Password'),
  confPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], "Passwords don't match")

    .required('Enter password again'),
});

const SignupScreen = (props) => {
  const [eyeopen, seteyeopen] = useState({ icon: "eye-with-line", password: true });
  const [eyeopenconfirm, seteyeopenconfirm] = useState({ iconconfirm: "eye-with-line", passwordconfirm: true });
  const register = async (values, { setSubmitting }) => {
    if (values.password !== values.confPassword) {
      setSubmitting(false);
      alert('Passords do not match. Try again.');
      return;
    }
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: values.email,
        name: values.name,
        phone: values.phone,
        password: values.password,
      }),
    };
    try {
      const response = await fetch(
        `http://13.233.216.36:3000/api/user/otp`,
        requestOptions,
      );
      const responseData = await response.json();
      if (responseData.success) {
        props.navigation.navigate('otp', {
          userId: responseData.data.userId,
        });
      } else {
        alert(responseData.message);
      }
    } catch (error) {
      alert(
        'We are unable to process your request now. Please try again later.',
      );
    }
  };
  const handleEyeChange = () => {
    seteyeopen(prevState => ({
      icon: prevState.icon === "eye" ? "eye-with-line" : "eye",
      password: !prevState.password
    }));

  }
  const handleEyeChangeConfirm = () => {
    seteyeopenconfirm(prevState => ({
      iconconfirm: prevState.iconconfirm === "eye" ? "eye-with-line" : "eye",
      passwordconfirm: !prevState.passwordconfirm
    }));

  }
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Create an Account</Text>
        <Formik
          initialValues={{
            name: '',
            email: '',
            phone: '',
            password: '',
            confPassword: '',
          }}
          validationSchema={profileSchema}
          onSubmit={(values, { setSubmitting }) =>
            register(values, { setSubmitting })
          }>
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
                  borderRadius: 10,
                  width: '95%',
                  paddingLeft: 8,
                  paddingRight: 8,
                  marginTop: 8,
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderColor: errors.name ? 'red' : 'gray',
                }}>
                <Icon name="user" size={20} color={theme.$primaryColor} />
                <TextInput
                  autoCapitalize
                  textContentType={'name'}
                  style={styles.inputField}
                  placeholder={'Full Name'}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                />
              </View>
              {touched.name && errors.name && (
                <Text style={styles.errorText}>
                  {touched.name && errors.name}
                </Text>
              )}
              <View
                style={{
                  alignSelf: 'center',
                  borderWidth: 1,
                  borderRadius: 10,
                  width: '95%',
                  paddingLeft: 8,
                  paddingRight: 8,
                  marginTop: 12,
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderColor: errors.email ? 'red' : 'gray',
                }}>
                <Icon name="envelope" size={20} color={theme.$primaryColor} />
                <TextInput
                  keyboardType={'email-address'}
                  textContentType={'emailAddress'}
                  style={styles.inputField}
                  placeholder={'Email address'}
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
              <View
                style={{
                  alignSelf: 'center',
                  borderWidth: 1,
                  borderRadius: 10,
                  width: '95%',
                  paddingLeft: 8,
                  paddingRight: 8,
                  marginTop: 12,
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderColor: errors.phone ? 'red' : 'gray',
                }}>
                <Icon name="phone" size={20} color={theme.$primaryColor} />
                <TextInput
                  keyboardType={'number-pad'}
                  style={styles.inputField}
                  placeholder={'Phone Number'}
                  onChangeText={handleChange('phone')}
                  onBlur={handleBlur('phone')}
                  value={values.phone}
                />
              </View>
              {touched.phone && errors.phone && (
                <Text style={styles.errorText}>
                  {touched.phone && errors.phone}
                </Text>
              )}
              <View
                style={{
                  alignSelf: 'center',
                  borderWidth: 1,
                  borderRadius: 10,
                  width: '95%',
                  paddingLeft: 8,
                  paddingRight: 8,
                  marginTop: 12,
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderColor: errors.password ? 'red' : 'gray',
                }}>
                <Icon name="lock" size={20} color={theme.$primaryColor} />
                <TextInput
                  secureTextEntry={eyeopen.password ? true : false}
                  style={styles.inputField}
                  placeholder={'New Password'}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                />
                <EIcon name={eyeopen.icon} onPress={() => handleEyeChange()} size={20} color="black" />
              </View>
              {touched.password && errors.password && (
                <Text style={styles.errorText}>
                  {touched.password && errors.password}
                </Text>
              )}
              <View
                style={{
                  alignSelf: 'center',
                  borderWidth: 1,
                  borderRadius: 10,
                  width: '95%',
                  paddingLeft: 8,
                  paddingRight: 8,
                  marginTop: 12,
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderColor: errors.confPassword ? 'red' : 'gray',
                }}>
                <Icon name="lock" size={20} color={theme.$primaryColor} />
                <TextInput
                  secureTextEntry={eyeopenconfirm.passwordconfirm ? true : false}
                  style={styles.inputField}
                  placeholder={'Confirm Password'}
                  onChangeText={handleChange('confPassword')}
                  onBlur={handleBlur('confPassword')}
                  value={values.confPassword}
                />
                <EIcon name={eyeopenconfirm.iconconfirm} onPress={() => handleEyeChangeConfirm()} size={20} color="black" />
              </View>
              {touched.confPassword && errors.confPassword && (
                <Text style={styles.errorText}>
                  {touched.confPassword && errors.confPassword}
                </Text>
              )}
              {!isSubmitting && (
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.registerBtn}
                  onPress={handleSubmit}>
                  <Text style={styles.registerBtnText}>REGISTER</Text>
                </TouchableOpacity>
              )}
              {isSubmitting && (
                <ActivityIndicator
                  style={{ marginTop: 10 }}
                  size={'large'}
                  color={theme.$primaryColor}
                />
              )}
            </>
          )}
        </Formik>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
          }}>
          <Text>Already have an account?</Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => props.navigation.navigate('Login')}>
            <Text
              style={{ fontSize: 17, marginTop: 8, color: theme.$primaryColor }}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    zIndex: 1,
    backgroundColor: 'white',
  },
  errorText: {
    marginHorizontal: '5%',
    color: 'red',
  },
  inputFieldBackground: {
    alignSelf: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    width: '95%',
    marginVertical: 8,
    paddingLeft: 8,
    paddingRight: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputField: {
    alignSelf: 'center',
    width: '90%',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 8,
  },
  registerBtn: {
    alignSelf: 'center',
    width: '95%',
    backgroundColor: theme.$primaryColor,
    padding: 5,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12,
    marginTop: 25
  },
  registerBtnText: {
    fontSize: 18,
    marginVertical: 5,
    color: 'white',
    textTransform: 'capitalize',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    alignSelf: 'flex-start',
    marginBottom: 10,
    marginLeft: '3%',
  },
});

export default SignupScreen;
