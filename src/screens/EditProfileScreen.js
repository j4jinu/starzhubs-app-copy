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
  PermissionsAndroid,
  Alert,
  KeyboardAvoidingView,
  ToastAndroid,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as yup from 'yup';
import {Formik} from 'formik';
import theme from '../config/theme';
import {AuthContext} from '../context/authContext';
import DatePicker from 'react-native-datepicker';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import {Snackbar} from 'react-native-paper';

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
  {label: 'Afganistan', value: 'Afganistan'},
  {label: 'Albania', value: 'Albania'},
  {label: 'Algeria', value: 'Algeria'},
  {label: 'Andorra', value: 'Andorra'},
  {label: 'Angola', value: 'Angola'},
  {label: 'Anguilla', value: 'Anguilla'},
  {label: 'Argentina', value: 'Argentina'},
  {label: 'Armenia', value: 'Armenia'},
  {label: 'Aruba', value: 'Aruba'},
  {label: 'Australia', value: 'Australia'},
  {label: 'Azerbaijan', value: 'Azerbaijan'},
  {label: 'Bahamas', value: 'Bahamas'},
  {label: 'Bahrain', value: 'Bahrain'},
  {label: 'Bangladesh', value: 'Bangladesh'},
  {label: 'Barbados', value: 'Barbados'},
  {label: 'Belarus', value: 'Belarus'},
  {label: 'Belgium', value: 'Belgium'},
  {label: 'Belize', value: 'Belize'},
  {label: 'Benin', value: 'Benin'},
  {label: 'Bermuda', value: 'Bermuda'},
  {label: 'Bhutan', value: 'Bhutan'},
  {label: 'Bolivia', value: 'Bolivia'},
  {label: 'Bosnia', value: 'Bosnia'},
  {label: 'Botswana', value: 'Botswana'},
  {label: 'Brazil', value: 'Brazil'},
  {label: 'British Virgin Islands', value: 'British Virgin Islands'},
  {label: 'Brunei', value: 'Brunei'},
  {label: 'Burkina Faso', value: 'Burkina Faso'},
  {label: 'Burundi', value: 'Burundi'},
  {label: 'Cambodia', value: 'Cambodia'},
  {label: 'Cameroon', value: 'Cameroon'},
  {label: 'Cape Verde', value: 'Cape Verde'},
  {label: 'Cayman Islands', value: 'Cayman Islands'},
  {label: 'Chad', value: 'Chad'},
  {label: 'Chile', value: 'Chile'},
  {label: 'China', value: 'China'},
  {label: 'Colombia', value: 'Colombia'},
  {label: 'Congo', value: 'Congo'},
  {label: 'Cook Islands', value: 'Cook Islands'},
  {label: 'Costa Rica', value: 'Costa Rica'},
  {label: 'Cote D Ivoire', value: 'Cote D Ivoire'},
  {label: 'Croatia', value: 'Croatia'},
  {label: 'Cruise Ship', value: 'Cruise Ship'},
  {label: 'Cuba', value: 'Cuba'},
  {label: 'Cyprus', value: 'Cyprus'},
  {label: 'Czech Republic', value: 'Czech Republic'},
  {label: 'Denmark', value: 'Denmark'},
  {label: 'Djibouti', value: 'Djibouti'},
  {label: 'Dominica', value: 'Dominica'},
  {label: 'Ecuador', value: 'Ecuador'},
  {label: 'Egypt', value: 'Egypt'},
  {label: 'El Salvador', value: 'El Salvador'},
  {label: 'Equatorial Guinea', value: 'Equatorial Guinea'},
  {label: 'Estonia', value: 'Estonia'},
  {label: 'Ethiopia', value: 'Ethiopia'},
  {label: 'Falkland Islands', value: 'Falkland Islands'},
  {label: 'Faroe Islands', value: 'Faroe Islands'},
  {label: 'Fiji', value: 'Fiji'},
  {label: 'Finland', value: 'Finland'},
  {label: 'France', value: 'France'},
  {label: 'French Polynesia', value: 'French Polynesia'},
  {label: 'Gabon', value: 'Gabon'},
  {label: 'Gambia', value: 'Gambia'},
  {label: 'Georgia', value: 'Georgia'},
  {label: 'Germany', value: 'Germany'},
  {label: 'Ghana', value: 'Ghana'},
  {label: 'Gibraltar', value: 'Gibraltar'},
  {label: 'Greece', value: 'Greece'},
  {label: 'Greenland', value: 'Greenland'},
  {label: 'Grenada', value: 'Grenada'},
  {label: 'Guam', value: 'Guam'},
  {label: 'Guatemala', value: 'Guatemala'},
  {label: 'Guernsey', value: 'Guernsey'},
  {label: 'Hong Kong', value: 'Hong Kong'},
  {label: 'Hungary', value: 'Hungary'},
  {label: 'Iceland', value: 'Iceland'},
  {label: 'India', value: 'India'},
  {label: 'Indonesia', value: 'Indonesia'},
  {label: 'Iran', value: 'Iran'},
  {label: 'Ireland', value: 'Ireland'},
  {label: 'Italy', value: 'Italy'},
  {label: 'Japan', value: 'Japan'},
  {label: 'Kuwait', value: 'Kuwait'},
  {label: 'Latvia', value: 'Latvia'},
  {label: 'Liberia', value: 'Liberia'},
  {label: 'Malaysia', value: 'Malaysia'},
  {label: 'Malta', value: 'Malta'},
  {label: 'Malaysia', value: 'Malaysia'},
  {label: 'Mexico', value: 'Mexico'},
  {label: 'Nepal', value: 'Nepal'},
  {label: 'New Zealand', value: 'New Zealand'},
  {label: 'Pakistan', value: 'Pakistan'},
  {label: 'Peru', value: 'Peru'},
  {label: 'Qatar', value: 'Qatar'},
  {label: 'Russia', value: 'Russia'},
  {label: 'Saudi Arabia', value: 'Saudi Arabia'},
  {label: 'Singapore', value: 'Singapore'},
  {label: 'Zimbabwe', value: 'Zimbabwe'},
];

const EditProfileScreen = (props) => {
  const auth = React.useContext(AuthContext);
  const [image, setImage] = useState('');
  const type = props.navigation.getParam('type');

  const [dob, setDob] = useState('');
  const [country, setCountry] = useState('India');
  const [gender, setGender] = useState('');
  const [selectedItems, setSelectedItems] = useState();
  const [userInfo, setUserInfo] = useState({image: {}, location: {}});
  const [visible, setVisible] = useState(false);
  const [msg, setMsg] = useState('');
  const [actorMode, setActorMode] = useState(false);
  const [bodyTypeValue, setbodyTypeValue] = useState();
  const [complexionValue, setcomplexionValue] = useState();

  // const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0
  let initialProfileValues;
  initialProfileValues = {
    name: userInfo.name,
    bio: userInfo.bio || '',
    phone: userInfo.phone || '',
    email: userInfo.email || '',
    // dob: '',
    country:
      userInfo.location !== undefined ? userInfo.location.country : 'India',
    state: userInfo.location !== undefined ? userInfo.location.state : '',
    place: userInfo.location !== undefined ? userInfo.location.place : '',
    education: userInfo.education || '',
    // gender: userInfo.gender || '',
  };

  if (actorMode) {
    console.log('Actor mode');
    initialProfileValues.height = userInfo.height.toString() || 0;
    initialProfileValues.weight = userInfo.weight.toString() || 0;
    initialProfileValues.complexion = userInfo.complexion || '';
    initialProfileValues.bodyType = userInfo.bodyType || '';
  }
  const profileSchema = yup.object({
    name: yup.string().required('Enter your name'),
    bio: yup.string().required('Please fill this field'),
    phone: yup.string().required('Enter phone number'),
    state: yup.string().required('Enter state of residence'),
    place: yup.string().required('Enter your city'),
    education: yup.string().required('Enter your Higher education'),
    // gender: yup.string().required('Select Gender'),
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
        setMsg('Something went wrong. Try again!');
        setVisible(!visible);
      }
      setUserInfo(userData.data.user);
      setDob(userData.data.user.dob);
      setGender(userData.data.user.gender);
      if (userData.data.user.languages !== '') {
        var myString = userData.data.user.languages;
        const lng = myString.split(',');
        setSelectedItems(lng);
      }
      setbodyTypeValue(userData.data.user.bodyType);
      setcomplexionValue(userData.data.user.complexion);
      checkActorMode(userData.data.talents);
    };
    getUserDetails();
  }, []);

  const checkActorMode = (talents) => {
    talents.forEach((talent) => {
      const category = talent.category;
      category.forEach((c) => {
        if (c.title === 'Actor' || c.title === 'Model') {
          setActorMode(true);
          return;
        }
      });
    });
  };

  const onSelectedItemsChange = (selectedItem) => {
    setSelectedItems(selectedItem);
  };

  const saveUserInfo = async (values, {setSubmitting}) => {
    if (dob === undefined) {
      Alert.alert(
        '',
        'Enter your Date of Birth',
        [
          {
            text: 'Ok',
            style: 'cancel',
          },
        ],
        {cancelable: false},
      );
      // alert('Please enter your Date of Birth');
      setSubmitting(false);
      return;
    }
    if (gender === '') {
      Alert.alert(
        '',
        'Enter your gender',
        [
          {
            text: 'Ok',
            style: 'cancel',
          },
        ],
        {cancelable: false},
      );
      // alert('Enter your gender');
      setSubmitting(false);
      return;
    }
    if (selectedItems === undefined || selectedItems.length === 0) {
      Alert.alert(
        '',
        'Choose the languages you known',
        [
          {
            text: 'Ok',
            style: 'cancel',
          },
        ],
        {cancelable: false},
      );
      // alert('Please choose the languages you known');
      setSubmitting(false);
      return;
    }
    values.dob = dob;
    values.gender = gender;
    values.country = country;
    values.languages = selectedItems.toString();
    const response = await fetch('http://13.232.190.226/api/user/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + auth.token,
      },
      body: JSON.stringify(values),
    });
    console.log('user data', values);
    const resData = await response.json();
    if (!resData.success) {
      return alert(resData.message);
    }
    setMsg('User details updated successfully');
    showToastWithGravityAndOffset('User details updated successfully');
    type === 'signup'
      ? props.navigation.navigate('Talents')
      : props.navigation.navigate('Account');
  };

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Starzhubs App Camera Permission',
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
      } else {
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const chooseFile = () => {
    var options = {
      title: 'Select Image',
      customButtons: [
        {name: 'customOptionKey', title: 'Choose Photo from Custom Option'},
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      maxWidth: 500,
      maxHeight: 500,
      quality: 0.7,
    };
    ImagePicker.launchImageLibrary(options, (response) => {
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
      alert('Please choose an Image');
      setSubmitting(false);
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
        setMsg('Something went wrong. Try again!');
        showToastWithGravityAndOffset('Something went wrong. Try again!');
        return;
      }
      setMsg('Profile image uploaded successfully');
      showToastWithGravityAndOffset('Profile image uploaded successfully');
    } catch (error) {
      console.error('error', error);
    }
  };

  const showToastWithGravityAndOffset = (msg) => {
    ToastAndroid.showWithGravityAndOffset(
      msg,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      50,
      100,
    );
  };

  return (
    <View style={styles.container}>
      {/* <Snackbar visible={visible} duration={5000} onDismiss={onDismissSnackBar}>
        {msg}
      </Snackbar> */}
      <ScrollView keyboardShouldPersistTaps="always">
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
          onSubmit={(values, {setSubmitting}) =>
            saveUserInfo(values, {setSubmitting})
          }>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
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
              {touched.name && errors.name && (
                <Text style={styles.errorText}>
                  {touched.name && errors.name}
                </Text>
              )}
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
                    width: '100%',
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
                  itemStyle={{
                    backgroundColor: 'gray',
                    color: 'blue',
                    fontSize: 17,
                    fontWeight: 'normal',
                  }}
                  selectedValue={gender}
                  style={{height: 50, width: '100%', borderColor: '#e6e6e6'}}
                  onValueChange={(itemValue, itemIndex) =>
                    setGender(itemValue)
                  }>
                  <Picker.Item label="Female" value="Female" />
                  <Picker.Item label="Male" value="Male" />
                  <Picker.Item label="Transgender" value="Transgender" />
                </Picker>
              </View>
              {/* 
              Email address
               */}
              {/* <View
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
                  editable={false}
                  style={styles.inputField}
                  placeholder={'Email address'}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  defaultValue={initialProfileValues.email}
                />
              </View> */}
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
              {touched.phone && errors.phone && (
                <Text style={styles.errorText}>
                  {touched.phone && errors.phone}
                </Text>
              )}

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
                  // selectedValue={initialProfileValues.country!==null?initialProfileValues.country:country}
                  style={{height: 50, width: '100%', borderColor: '#e6e6e6'}}
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
                {touched.state && errors.state && (
                  <Text style={styles.errorText}>
                    {touched.state && errors.state}
                  </Text>
                )}
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
              {touched.place && errors.place && (
                <Text style={styles.errorText}>
                  {touched.place && errors.place}
                </Text>
              )}

              {/* Education */}

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
                <Icon
                  name="phone-android"
                  size={20}
                  color={theme.$primaryColor}
                />
                <TextInput
                  style={styles.inputField}
                  keyboardType={'default'}
                  placeholder={'Education'}
                  onChangeText={handleChange('education')}
                  onBlur={handleBlur('education')}
                  defaultValue={initialProfileValues.education}
                />
              </View>

              {touched.education && errors.education && (
                <Text style={styles.errorText}>
                  {touched.education && errors.education}
                </Text>
              )}

              {actorMode && (
                <>
                  {/* Height */}
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
                      borderColor: errors.height ? 'red' : '#e6e6e6',
                    }}>
                    <Icon name="book" size={20} color={theme.$primaryColor} />
                    <TextInput
                      style={styles.inputField}
                      placeholder={'Height(cm)'}
                      onChangeText={handleChange('height')}
                      onBlur={handleBlur('height')}
                      defaultValue={initialProfileValues.height}
                    />
                  </View>
                  {touched.height && errors.height && (
                    <Text style={styles.errorText}>
                      {touched.height && errors.height}
                    </Text>
                  )}
                  {/* Weight */}
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
                      borderColor: errors.height ? 'red' : '#e6e6e6',
                    }}>
                    <Icon name="book" size={20} color={theme.$primaryColor} />
                    <TextInput
                      style={styles.inputField}
                      placeholder={'Weight(Kg)'}
                      onChangeText={handleChange('weight')}
                      onBlur={handleBlur('weight')}
                      defaultValue={initialProfileValues.weight}
                    />
                  </View>
                  {touched.weight && errors.weight && (
                    <Text style={styles.errorText}>
                      {touched.weight && errors.weight}
                    </Text>
                  )}

                  {/* BodyType */}

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
                      borderColor: errors.height ? 'red' : '#e6e6e6',
                    }}>
                    <Picker
                      selectedValue={bodyTypeValue}
                      style={{
                        height: 50,
                        width: '100%',
                      }}
                      onValueChange={(itemValue, itemIndex) => {
                        setbodyTypeValue(itemValue);
                        setFieldValue('bodyType', itemValue);
                      }}>
                      <Picker.Item label="Select BodyType" value="0" />
                      <Picker.Item label="Athletic" value="Athletic" />
                      <Picker.Item
                        label="Average built"
                        value="Average built"
                      />
                      <Picker.Item label="Fat" value="Fat" />
                      <Picker.Item label="Hourglass" value="Hourglass" />
                      <Picker.Item label="Slim" value="Slim" />
                    </Picker>
                  </View>
                  {touched.bodyType && errors.bodyType && (
                    <Text style={styles.errorText}>
                      {touched.bodyType && errors.bodyType}
                    </Text>
                  )}

                  {/* SkinTone */}

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
                      borderColor: errors.complexion ? 'red' : '#e6e6e6',
                    }}>
                    <Picker
                      selectedValue={complexionValue}
                      style={{
                        height: 50,
                        width: '100%',
                      }}
                      onValueChange={(itemValue, itemIndex) => {
                        setcomplexionValue(itemValue);
                        setFieldValue('complexion', itemValue);
                      }}>
                      <Picker.Item label="Select Complexion" value="0" />
                      <Picker.Item label="Brown" value="Brown" />
                      <Picker.Item label="Dark" value="Dark" />
                      <Picker.Item label="Fair" value="Fair" />
                      <Picker.Item label="Wheatish" value="Wheatish" />
                    </Picker>
                  </View>

                  {/*
                      About user 
                      */}
                </>
              )}
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
                  expandDropDowns
                  showCancelButton
                  readOnlyHeadings={true}
                  onSelectedItemsChange={onSelectedItemsChange}
                  selectedItems={selectedItems}
                  style={{padding: 0}}
                />
              </View>

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
        {/* //</KeyboardAvoidingView> */}
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
    paddingLeft: '4%',
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
    width: '100%',
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
