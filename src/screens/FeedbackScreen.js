import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as yup from 'yup';
import { Formik } from 'formik';
import Icon from 'react-native-vector-icons/Ionicons';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import EIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import EmIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MoIcon from 'react-native-vector-icons/FontAwesome';
import Cicon from 'react-native-vector-icons/MaterialIcons';
import { Snackbar } from 'react-native-paper';
import theme from '../config/theme';
const FeedbackScreen = ({ navigation }) => {
  const [visible, setVisible] = useState(false);
  const loginValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Please enter valid email')
      .required('Email is Required'),
    name: yup.string().required('Name is Required'),
    message: yup.string().required('Message is Required'),
  });
  const handleSubmit = (values, { resetForm }) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    };
    fetch(`http://13.233.216.36:3000/api/user/contact`, requestOptions)
      .then((response) => response.json())
      .then(
        (response) => {
          if (response.success === true) {
            setVisible(!visible);
            resetForm({ values: '' });
          } else {
            alert(response.message);
          }
        },
        (error) => {
          alert('Failed: ' + error);
        },
      );
  };
  const onDismissSnackBar = () => {
    setVisible(false);
  };

  return (
    <ScrollView>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View
          style={{
            alignItems: 'center',
            marginTop: '10%',
            marginBottom: '5%',
          }}>
          <Image
            source={require('../assets/contactus.png')}
            style={{ width: '80%' }}
          />
        </View>
        <View
          style={{
            width: '100%',
            paddingHorizontal: '5%',
          }}>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
            }}>
            <Cicon
              name="location-on"
              size={23}
              color={theme.$primaryColor}
              style={{
                marginRight: '2%',
                marginTop: '1%',
              }}
            />
            <View style={{ flexDirection: 'column' }}>
              <Text style={{ color: 'gray' }}>Unnichira</Text>
              <Text style={{ color: 'gray' }}>Koonamthai,Edappally,</Text>
              <Text style={{ color: 'gray' }}>Ernakulam,Kerala682024</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', width: '100%', marginTop: '3%' }}>
            <MoIcon
              name="mobile-phone"
              size={25}
              color={theme.$primaryColor}
              style={{
                marginRight: '2%',
                marginTop: '1%',
              }}
            />
            <View style={{ flexDirection: 'column' }}>
              <Text style={{ marginLeft: '7%', color: 'gray' }}>
                +91 89218 13557
              </Text>
              <Text style={{ marginLeft: '7%', color: 'gray' }}>
                For any queries
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', width: '100%', marginTop: '3%' }}>
            <EmIcon
              name="email-open"
              size={20}
              color={theme.$primaryColor}
              style={{
                marginRight: '2%',
                marginTop: '1%',
              }}
            />
            <View
              style={{
                flexDirection: 'column',
                marginBottom: '5%',
              }}>
              <Text
                style={{
                  marginLeft: '5%',
                  color: 'gray',
                }}>
                info@starzhubs.com
              </Text>
              <Text
                style={{
                  marginLeft: '5%',
                  color: 'gray',
                }}>
                Write us anytime.
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            alignItems: 'center',
            paddingHorizontal: '5%',
          }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              marginTop: 20,
              alignSelf: 'flex-start',
              color: theme.$primaryColorText,
            }}>
            Queries? Write to us
          </Text>
          <Snackbar
            visible={visible}
            duration={5000}
            onDismiss={onDismissSnackBar}
            action={{}}>
            Enquiry has been submitted
          </Snackbar>
          <Formik
            validationSchema={loginValidationSchema}
            initialValues={{
              name: '',
              email: '',
              message: '',
            }}
            onSubmit={handleSubmit}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              isValid,
            }) => (
              <>
                <View
                  style={{
                    alignSelf: 'center',
                    borderWidth: 1,
                    borderRadius: 5,
                    width: '100%',
                    marginTop: 12,
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderColor: errors.name ? 'red' : '#e6e6e6',
                  }}>
                  <Icon
                    name="ios-person"
                    size={18}
                    color={theme.$primaryColor}
                    style={{
                      marginLeft: '3%',
                    }}
                  />
                  <TextInput
                    name="name"
                    style={styles.inputField}
                    placeholder="Name"
                    placeholderTextColor="#B1A9A4"
                    onChangeText={handleChange('name')}
                    onBlur={handleBlur('name')}
                    value={values.name}
                  />
                </View>
                {errors.name && (
                  <Text
                    style={{
                      alignSelf: 'flex-start',
                      marginHorizontal: 5,
                      color: 'red',
                    }}>
                    {errors.name}
                  </Text>
                )}
                <View
                  style={{
                    alignSelf: 'center',
                    borderWidth: 1,
                    borderRadius: 5,
                    width: '100%',
                    marginTop: 12,
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderColor: errors.email ? 'red' : '#e6e6e6',
                  }}>
                  <EIcon
                    name="email"
                    size={18}
                    color={theme.$primaryColor}
                    style={{
                      marginLeft: '3%',
                    }}
                  />
                  <TextInput
                    name="email"
                    style={styles.inputField}
                    placeholder="Email"
                    placeholderTextColor="#B1A9A4"
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    keyboardType="email-address"
                  />
                </View>
                {errors.email && (
                  <Text
                    style={{
                      alignSelf: 'flex-start',
                      marginHorizontal: 5,
                      color: 'red',
                    }}>
                    {errors.email}
                  </Text>
                )}
                <View
                  style={{
                    alignSelf: 'center',
                    borderWidth: 1,
                    borderRadius: 5,
                    width: '100%',
                    marginTop: 12,
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderColor: errors.message ? 'red' : '#e6e6e6',
                  }}>
                  <MIcon
                    name="message"
                    size={18}
                    color={theme.$primaryColor}
                    style={{
                      marginLeft: '3%',
                    }}
                  />
                  <TextInput
                    name="message"
                    style={styles.inputField}
                    placeholder="Message"
                    numberOfLines={4}
                    multiline={true}
                    placeholderTextColor="#B1A9A4"
                    onChangeText={handleChange('message')}
                    onBlur={handleBlur('message')}
                    value={values.message}
                    secureTextEntry
                  />
                </View>
                {errors.message && (
                  <Text
                    style={{
                      alignSelf: 'flex-start',
                      marginHorizontal: 5,
                      color: 'red',
                    }}>
                    {errors.message}
                  </Text>
                )}
                <TouchableOpacity
                  onPress={handleSubmit}
                  disabled={!isValid}
                  style={styles.SignupBtn}>
                  <Text style={{ color: 'white', textAlign: 'center' }}>
                    Submit
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </Formik>
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  SignupBtn: {
    width: 80,
    backgroundColor: theme.$primaryColor,
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    marginTop: 10,
    alignSelf: 'flex-end',
  },
  inputField: {
    alignSelf: 'center',
    width: '90%',
    paddingTop: 10,
    paddingLeft: 8,
    fontFamily: 'montserrat-regular',
  },
});
export default FeedbackScreen;
