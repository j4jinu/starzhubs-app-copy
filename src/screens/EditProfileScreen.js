import React, {useState} from 'react';
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
import * as yup from 'yup';
import DropDownPicker from 'react-native-dropdown-picker';
import {Formik} from 'formik';
import theme from '../config/theme';
import {AuthContext} from '../context/authContext';
import DatePicker from 'react-native-datepicker';

const languages = [
  {
    id: 1,
    name: 'languages',
    children: [
      {
        id: 'Assamese',
        name: 'Assamese',
      },
      {
        id: 'Bengali',
        name: 'Bengali',
      },
      {
        id: 'English',
        name: 'English',
      },
      {
        id: 'Gujarati',
        name: 'Gujarati',
      },
      {
        id: 'Hindi',
        name: 'Hindi',
      },
      {
        id: 'Kannada',
        name: 'Kannada',
      },
      {
        id: 'Kashmiri',
        name: 'Kashmiri',
      },
      {
        id: 'Konkani',
        name: 'Konkani',
      },
      {
        id: 'Malayalam',
        name: 'Malayalam',
      },
      {
        id: 'Manipuri',
        name: 'Manipuri',
      },
      {
        id: 'Marathi',
        name: 'Marathi',
      },
      {
        id: 'Nepali',
        name: 'Nepali',
      },
      {
        id: 'Oriya/ Odia',
        name: 'Oriya/ Odia',
      },
      {
        id: 'Punjabi',
        name: 'Punjabi',
      },
      {
        id: 'Sanskrit',
        name: 'Sanskrit',
      },
      {
        id: 'Sindhi',
        name: 'Sindhi',
      },
      {
        id: 'Tamil',
        name: 'Tamil',
      },
      {
        id: 'Telugu',
        name: 'Telugu',
      },
      {
        id: 'Urdu',
        name: 'Urdu',
      },
      {
        id: 'Bodo',
        name: 'Bodo',
      },
      {
        id: 'Santhali',
        name: 'Santhali',
      },
      {
        id: 'Maithili',
        name: 'Maithili',
      },
      {
        id: 'Dogri',
        name: 'Dogri',
      },
    ],
  },
];

const countries = [
  {label: 'Afganistan', value: 'afganistan'},
  {label: 'India', value: 'india'},
  {label: 'USA', value: 'usa'},
  {label: 'UK', value: 'uk'},
];

const profileSchema = yup.object({
  name: yup.string().required('Enter your name'),
  dob: yup.string().required('Enter Dob details'),
  bio: yup.string().required('Please fill this field'),
  phone: yup.string().required('Enter phone number'),
  email: yup.string().required('Enter email address'),
  state: yup.string().required('Enter state of residence'),
  city: yup.string().required('Enter your city'),
});

const EditProfileScreen = () => {
  const auth = React.useContext(AuthContext);
  const [dob, setDob] = useState('');
  const [country, setCountry] = useState('india');
  const [selectedItems, setSelectedItems] = useState([]);
  const [userInfo, setUserInfo] = useState({
    image: {},
    location: {},
  });

  React.useEffect(() => {
    const getUserDetails = async () => {
      const userResponse = await fetch(
        'http://13.232.190.226/api/user/profile',
        {
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + auth.token,
          },
        },
      );
      const userData = await userResponse.json();
      if (!userData.success) {
        return alert(userData.message);
      }
      setUserInfo(userData.data.user);
    };
    getUserDetails();
  }, []);

  const onSelectedItemsChange = (selectedItem) => {
    console.log(selectedItem);
    setSelectedItems(selectedItem);
  };

  const saveUserInfo = async (values) => {
    const response = await fetch('http://13.232.190.226/api/user/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + auth.token,
      },
      body: JSON.stringify(values),
    });
    const resData = await response.json();
    if (!resData.success) {
      return alert(resData.message);
    }
    alert(resData.message);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {userInfo.image !== undefined && (
          <Image
            style={{
              height: 180,
              width: 180,
              borderRadius: 100,
              marginBottom: 20,
              alignSelf: 'center',
              backgroundColor: 'gray',
            }}
            source={{
              uri: `http://13.232.190.226/api/user/avatar/${userInfo.image.avatar}`,
            }}
          />
        )}
        {userInfo.image === undefined && <Icon />}
        <Icon
          name="photo-camera"
          size={35}
          color={theme.$primaryColor}
          style={{
            position: 'absolute',
            top: 140,
            left: 235,
          }}
        />
        <Formik
          initialValues={{
            name: '',
            email: '',
            bio: '',
            dob: '',
            country: country,
            state: '',
            city: '',
          }}
          validationSchema={profileSchema}
          onSubmit={(values) => saveUserInfo(values)}>
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
              {/* 
              Full name 
              */}
              <View
                style={{
                  alignSelf: 'center',
                  borderWidth: 1,
                  borderRadius: 10,
                  width: '90%',
                  paddingLeft: 8,
                  paddingRight: 8,
                  marginTop: 12,
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderColor: errors.name ? 'red' : '#e6e6e6',
                }}>
                <Icon name="person" size={20} color={theme.$primaryColor} />
                <TextInput
                  keyboardType={'default'}
                  textContentType={'name'}
                  style={styles.inputField}
                  placeholder={'Full name'}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                />
              </View>
              {/* 
              DoB
               */}
              <View
                style={{
                  alignSelf: 'center',
                  borderWidth: 1,
                  borderRadius: 10,
                  width: '90%',
                  paddingLeft: 8,
                  paddingRight: 8,
                  marginTop: 12,
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderColor: errors.name ? 'red' : '#e6e6e6',
                }}>
                <DatePicker
                  style={{
                    backgroundColor: 'white',
                    borderRadius: 10,
                    width: '80%',
                    paddingVertical: 5,
                  }}
                  date={dob}
                  mode="date"
                  placeholder="DOB"
                  format="YYYY-MM-DD"
                  // minDate="01-01-2016"
                  // maxDate="01-01-2019"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  iconComponent={
                    <Icon
                      name="date-range"
                      size={23}
                      style={{
                        position: 'absolute',
                        left: 0,
                        top: 8,
                        color: '#fd9242',
                      }}
                    />
                  }
                  customStyles={{
                    dateInput: {
                      borderWidth: 0,
                      marginLeft: '10%',
                      alignItems: 'flex-start',
                    },
                  }}
                  onDateChange={(date) => {
                    setDob(date);
                  }}
                />
              </View>
              {touched.dob && dob === '' && (
                <Text style={styles.errorText}>{errors.dob} </Text>
              )}
              {/* 
              Email address
               */}
              <View
                style={{
                  alignSelf: 'center',
                  borderWidth: 1,
                  borderRadius: 10,
                  width: '90%',
                  paddingLeft: 8,
                  paddingRight: 8,
                  marginTop: 12,
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderColor: errors.email ? 'red' : '#e6e6e6',
                }}>
                <Icon name="mail" size={20} color={theme.$primaryColor} />
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
              {/*
              Phone number 
               */}
              <View
                style={{
                  alignSelf: 'center',
                  borderWidth: 1,
                  borderRadius: 10,
                  width: '90%',
                  paddingLeft: 8,
                  paddingRight: 8,
                  marginTop: 12,
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderColor: errors.phone ? 'red' : '#e6e6e6',
                }}>
                <Icon
                  name="phone-android"
                  size={20}
                  color={theme.$primaryColor}
                />
                <TextInput
                  style={styles.inputField}
                  placeholder={'Phone'}
                  onChangeText={handleChange('phone')}
                  onBlur={handleBlur('phone')}
                  value={values.phone}
                />
              </View>

              {/* Country */}
              <DropDownPicker
                items={countries}
                defaultValue={country}
                containerStyle={{
                  alignSelf: 'center',
                  marginTop: 12,
                  height: 50,
                  borderRadius: 8,
                  width: '90%',
                }}
                style={{backgroundColor: 'white', borderRadius: 8}}
                itemStyle={{
                  justifyContent: 'flex-start',
                }}
                dropDownStyle={{backgroundColor: 'white', borderRadius: 8}}
                onChangeItem={(item) => setCountry(item.value)}
              />

              {/* State City */}
              <View
                style={{
                  flex: 1,
                  width: '95%',
                  alignSelf: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                }}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: '#e6e6e6',
                    borderRadius: 8,
                    marginHorizontal: 8,
                    marginTop: 12,
                    paddingHorizontal: 8,
                    borderColor: errors.state ? 'red' : '#e6e6e6',
                  }}>
                  <Icon
                    name="location-pin"
                    size={20}
                    color={theme.$primaryColor}
                  />
                  <TextInput
                    style={styles.inputField}
                    placeholder={'State'}
                    onChangeText={handleChange('state')}
                    onBlur={handleBlur('state')}
                    value={values.state}
                  />
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: '#e6e6e6',
                    borderRadius: 8,
                    marginHorizontal: 8,
                    marginTop: 12,
                    paddingHorizontal: 8,
                    borderColor: errors.city ? 'red' : '#e6e6e6',
                  }}>
                  <Icon
                    name="home-city"
                    size={20}
                    color={theme.$primaryColor}
                  />
                  <TextInput
                    style={styles.inputField}
                    placeholder={'City'}
                    onChangeText={handleChange('city')}
                    onBlur={handleBlur('city')}
                    value={values.city}
                  />
                </View>
              </View>

              {/*
              About user 
               */}
              <View
                style={{
                  alignSelf: 'center',
                  borderWidth: 1,
                  borderRadius: 10,
                  width: '90%',
                  paddingLeft: 8,
                  paddingRight: 8,
                  marginTop: 12,
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderColor: errors.bio ? 'red' : '#e6e6e6',
                }}>
                <Icon name="info" size={20} color={theme.$primaryColor} />
                <TextInput
                  keyboardType={'default'}
                  multiline
                  numberOfLines={4}
                  style={styles.inputField}
                  placeholder={'About yourself'}
                  onChangeText={handleChange('bio')}
                  onBlur={handleBlur('bio')}
                  value={values.bio}
                />
              </View>
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate('PasswordRecovery')
                }></TouchableOpacity>
              {!isSubmitting && (
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.loginBtn}
                  onPress={handleSubmit}>
                  <Text style={styles.loginBtnText}>SAVE</Text>
                </TouchableOpacity>
              )}
              {isSubmitting && (
                <ActivityIndicator size={'large'} color={theme.$primaryColor} />
              )}
            </>
          )}
        </Formik>
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
    marginHorizontal: 8,
    marginTop: 3,
    color: 'red',
  },
  forgotText: {
    color: 'purple',
    alignSelf: 'flex-end',
    marginRight: '8%',
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 12,
    fontSize: 14,
    fontFamily: 'montserrat-medium',
  },
  logo: {
    width: '50%',
    height: 100,
    alignSelf: 'center',
    marginTop: 20,
    resizeMode: 'center',
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
  inputField: {
    alignSelf: 'center',
    width: '90%',
    textTransform: 'lowercase',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 8,
    fontFamily: 'montserrat-regular',
  },
  loginBtn: {
    alignSelf: 'center',
    width: '90%',
    backgroundColor: theme.$primaryColor,
    padding: 5,
    borderRadius: 10,
    marginTop: 15,
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
    marginTop: 15,
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
    fontWeight: 'bold',
    fontFamily: 'montserrat-regular',
  },
  welcomeText: {
    color: theme.$primaryColor,
    fontSize: 22,
    marginTop: 50,
    marginBottom: 20,
    alignSelf: 'center',
    fontFamily: 'montserrat-medium',
  },
});

export default EditProfileScreen;
