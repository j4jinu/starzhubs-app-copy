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
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as yup from 'yup';
import {Formik} from 'formik';
import theme from '../config/theme';
import {AuthContext} from '../context/authContext';

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

const profileSchema = yup.object({
  name: yup.string().required('Enter your name'),
  dob: yup.string().required('Enter Dob details'),
  bio: yup.string().required('Please fill this field'),
  phone: yup.string().required('Enter phone number'),
  email: yup.string().required('Enter email address'),
  password: yup.string().required('Enter your password'),
});

const EditProfileScreen = () => {
  const auth = React.useContext(AuthContext);
  const [selectedItems, setSelectedItems] = useState([]);
  const [userInfo, setUserInfo] = React.useState({
    image: {},
    location: {},
  });

  React.useEffect(() => {
    const getUserDetails = async () => {
      const response = await fetch('http://13.232.195%.226/api/user/profile', {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + auth.token,
        },
      });
      const userData = await response.json();
      if (!userData.success) {
        return alert(userData.message);
      }
      setUserInfo(userData.data.user);
    };
    getUserDetails();
  });

  const onSelectedItemsChange = (selectedItem) => {
    console.log(selectedItem);
    setSelectedItems(selectedItem);
  };

  const saveUserInfo = async (values) => {
    const response = await fetch('http://13.232.195%.226/api/user/update', {
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
              height: 200,
              width: 200,
              borderRadius: 100,
              marginBottom: 20,
              alignSelf: 'center',
              backgroundColor: 'gray',
            }}
            source={{
              uri: `http://13.232.195%.226/api/user/avatar/${userInfo.image.avatar}`,
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
            top: 165,
            left: 230,
          }}
        />
        <Formik
          initialValues={{
            name: '',
            email: '',
            bio: '',
            dob: '',
            password: '',
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
                  borderColor: errors.name ? 'red' : '#e6e6e6',
                }}>
                <Icon name="mail" size={20} color={theme.$primaryColor} />
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
                  borderColor: errors.password ? 'red' : '#e6e6e6',
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
                  borderColor: errors.bio ? 'red' : '#e6e6e6',
                }}>
                <Icon name="mail" size={20} color={theme.$primaryColor} />
                <TextInput
                  keyboardType={'default'}
                  textContentType={'name'}
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
    width: '95%',
    marginVertical: 8,
    paddingLeft: 8,
    paddingRight: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputField: {
    alignSelf: 'center',
    width: '95%',
    textTransform: 'lowercase',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 8,
    fontFamily: 'montserrat-regular',
  },
  loginBtn: {
    alignSelf: 'center',
    width: '95%',
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
