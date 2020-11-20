import React, { useState } from 'react';
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
  PermissionsAndroid,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as yup from 'yup';
import { Formik } from 'formik';
import theme from '../config/theme';
import { AuthContext } from '../context/authContext';
import DatePicker from 'react-native-datepicker';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { Snackbar } from 'react-native-paper';

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
  { label: 'Afganistan', value: 'afganistan' },
  { label: 'India', value: 'india' },
  { label: 'USA', value: 'usa' },
  { label: 'UK', value: 'uk' },
];

const EditProfileScreen = (props) => {
  const auth = React.useContext(AuthContext);
  const [image, setImage] = useState('');
  const type = props.navigation.getParam('type');

  const [dob, setDob] = useState('');
  const [country, setCountry] = useState('india');
  const [gender, setGender] = useState('Male');
  const [selectedItems, setSelectedItems] = useState();
  const [userInfo, setUserInfo] = useState({
    image: {},
    location: {},
  });
  const [visible, setVisible] = useState(false);
  const [msg, setMsg] = useState('');


  const initialProfileValues = {
    name: userInfo.name,
    email: userInfo.email,
    bio: userInfo.bio || '',
    phone: userInfo.phone || '',
    dob: '',
    country: userInfo.location !== undefined ? userInfo.location.country : 'India',
    state: userInfo.location !== undefined ? userInfo.location.state : '',
    place: userInfo.location !== undefined ? userInfo.location.place : '',
    education: userInfo.education || '',
    gender: userInfo.gender || '',
  }

  const profileSchema = yup.object({
    name: yup.string().required('Enter your name'),
    bio: yup.string().required('Please fill this field'),
    phone: yup.string().required('Enter phone number'),
    email: yup.string().required('Enter email address'),
    state: yup.string().required('Enter state of residence'),
    place: yup.string().required('Enter your city'),
    education: yup.string().required('Enter your Higher education'),
    gender: yup.string().required('Select Gender'),
    country: yup.string().required('Country is Required'),
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
        setMsg("Something went wrong. Try again!")
        setVisible(!visible);
      }
      setUserInfo(userData.data.user);
      setDob(userData.data.user.dob)
    };
    getUserDetails();
  }, []);

  const onSelectedItemsChange = (selectedItem) => {
    console.log(selectedItem);
    setSelectedItems(selectedItem);
  };

  const saveUserInfo = async (values, { setSubmitting }) => {
    console.log("user info", values);
    if (dob === '') {
      alert('Please enter your Date of Birth');
      setSubmitting(false);
      return;
    }
    values.dob = dob;
    values.gender = gender;
    values.country = country;
    values.languages = selectedItems.toString();
    console.log('Form data: ', values);
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
    setMsg("User details updated successfully")
    setVisible(!visible);
  };

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'starzhubs needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        chooseFile();
        //console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const chooseFile = () => {
    var options = {
      title: 'Select Image',
      customButtons: [
        { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      maxWidth: 500,
      maxHeight: 500,
      quality: 0.2,
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      //console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else if (response.uri === '') {
        setIsImage(true);
      } else {
        setImage(response.uri);
        console.log('image uri: ', response.uri);
        uploadAvatar(response.uri);
      }
    });
  };

  const uploadAvatar = async (imgurl) => {
    if (imgurl === '') {
      setSubmitting(false);
      alert('Please choose an Image');

      return;
    }
    const image_uri = imgurl;
    let fileType = image_uri.substring(image_uri.lastIndexOf('.') + 1);
    console.log('Type:', fileType);
    var formData = new FormData();
    formData.append('imageType', 'avatar');
    formData.append('avatar', {
      uri: image_uri,
      name: `photo.${fileType}`,
      type: `image/${fileType}`,
    });
    const requestOptions = {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + auth.token,
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    };
    try {
      const uploadRes = await fetch(
        `http://13.232.190.226/api/user/avatar`,
        requestOptions,
      );
      const uploadResData = await uploadRes.json();
      if (!uploadResData.success) {
        setMsg("Something went wrong. Try again!")
        setVisible(!visible);
        return;
      }
      setMsg("Profile image uploaded successfully")
      setVisible(!visible);

    } catch (error) {
      console.error('error', error);
    }
  };

  const onDismissSnackBar = () => {
    setVisible(false);
  };

  return (
    <View style={styles.container}>
      <Snackbar visible={visible} duration={5000} onDismiss={onDismissSnackBar}>
        {msg}
      </Snackbar>
      <ScrollView>
        {userInfo.image !== undefined && image === '' && (
          <Image
            style={{
              height: 180,
              width: 180,
              borderRadius: 100,
              marginBottom: 20,
              marginTop: 15,
              alignSelf: 'center',
              backgroundColor: 'gray',
            }}
            source={{
              uri: `http://13.232.190.226/api/user/avatar/${userInfo.image.avatar}`,
            }}
          />
        )}
        {image !== '' && (
          <Image
            style={{
              height: 180,
              width: 180,
              borderRadius: 100,
              marginBottom: 20,
              marginTop: 15,
              alignSelf: 'center',
              backgroundColor: 'gray',
            }}
            source={{
              uri: image,
            }}
          />
        )}
        {userInfo.image === undefined && <Icon />}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={requestCameraPermission}
          style={{
            position: 'absolute',
            top: 159,
            left: 240,
          }}>
          <Icon name="photo-camera" size={35} color={theme.$primaryColor} />
        </TouchableOpacity>
        <Formik
          enableReinitialize={true}
          initialValues={initialProfileValues}
          validationSchema={profileSchema}
          onSubmit={(values, { setSubmitting }) =>
            saveUserInfo(values, { setSubmitting })
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
                    defaultValue={initialProfileValues.name}
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
                    borderColor: '#e6e6e6',
                  }}>
                  <DatePicker
                    style={{
                      backgroundColor: 'white',
                      borderRadius: 10,
                      width: '80%',
                      paddingVertical: 5,
                      borderColor: '#e6e6e6',
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
                {/* Gender */}
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
                    borderColor: '#e6e6e6',
                  }}>
                  <Icon name="people-alt" size={20} color={theme.$primaryColor} />
                  <Picker
                    selectedValue={gender}
                    style={{ height: 50, width: '100%', borderColor: '#e6e6e6' }}
                    onValueChange={(itemValue, itemIndex) =>
                      setGender(itemValue)
                    }>
                    <Picker.Item label="Female" value="female" />
                    <Picker.Item label="Male" value="male" />
                    <Picker.Item label="Transgender" value="transgender" />
                  </Picker>
                </View>
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
                    defaultValue={initialProfileValues.email}
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
                    keyboardType="numeric"
                    placeholder={'Phone'}
                    onChangeText={handleChange('phone')}
                    onBlur={handleBlur('phone')}
                    defaultValue={initialProfileValues.phone}
                  />
                </View>

                {/* Country */}
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
                    borderColor: '#e6e6e6',
                  }}>
                  <Icon
                    name="location-pin"
                    size={20}
                    color={theme.$primaryColor}
                  />
                  <Picker
                    selectedValue={country}
                    style={{ height: 50, width: '100%', borderColor: '#e6e6e6' }}
                    onValueChange={(itemValue, itemIndex) =>
                      setCountry(itemValue)
                    }>
                    {countries.map((c) => (
                      <Picker.Item label={c.label} value={c.value} />
                    ))}
                  </Picker>
                </View>

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
                      defaultValue={initialProfileValues.state}
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
                      borderColor: errors.place ? 'red' : '#e6e6e6',
                    }}>
                    <Icon
                      name="location-pin"
                      size={20}
                      color={theme.$primaryColor}
                    />
                    <TextInput
                      style={styles.inputField}
                      placeholder={'City'}
                      onChangeText={handleChange('place')}
                      onBlur={handleBlur('place')}
                      defaultValue={initialProfileValues.place}
                    />
                  </View>
                </View>

                {/* Higher education */}
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
                    borderColor: errors.education ? 'red' : '#e6e6e6',
                  }}>
                  <Icon name="book" size={20} color={theme.$primaryColor} />
                  <TextInput
                    style={styles.inputField}
                    placeholder={'Higher Education'}
                    onChangeText={handleChange('education')}
                    onBlur={handleBlur('education')}
                    defaultValue={initialProfileValues.education}
                  />
                </View>

                {/* Languages */}
                <View
                  style={{
                    alignSelf: 'center',
                    borderRadius: 10,
                    width: '90%',
                    paddingLeft: 8,
                    paddingRight: 8,
                    marginTop: 12,
                  }}>
                  <SectionedMultiSelect
                    items={languages}
                    IconRenderer={Icon}
                    uniqueKey="id"
                    subKey="children"
                    selectText="Languages known"
                    showDropDowns={true}
                    readOnlyHeadings={true}
                    onSelectedItemsChange={onSelectedItemsChange}
                    selectedItems={selectedItems}
                    style={{ padding: 0 }}
                  />
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
                    defaultValue={initialProfileValues.bio}
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
    // textTransform: 'lowercase',
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
    marginBottom: 20,
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
