import React, {useContext, useState} from 'react';
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
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as yup from 'yup';
import {Formik} from 'formik';
import ImagePicker from 'react-native-image-picker';
import {AuthContext} from '../context/authContext';
import theme from '../config/theme';

const mediaSchema = yup.object({
  caption: yup.string().required('Enter caption about this media'),
  description: yup.string().required('Enter description'),
});

const PhotoUploadScreen = (props) => {
  const talentId = props.navigation.getParam('talentId');
  const auth = useContext(AuthContext);

  const [image, setImage] = useState('');
  const [isImage, setIsImage] = useState(false);

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
    //console.log('choose file');
    var options = {
      title: 'Select Image',
      customButtons: [
        {name: 'customOptionKey', title: 'Choose Photo from Custom Option'},
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
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
        setIsImage(false);
        setImage(response.uri);
        console.log('image uri: ', response.uri);
      }
    });
  };

  const uploadMedia = async (values, {setSubmitting}) => {
    if (image === '') {
      alert('Please choose an Image');
      setSubmitting(false);
      return;
    }
    setisloading(true);
    const image_uri = image;
    let fileType = image_uri.substring(image_uri.lastIndexOf('.') + 1);
    var formData = new FormData();
    formData.append('talentId', talentId);
    formData.append('description', values.description);
    formData.append('caption', values.caption);
    formData.append('media', {
      image_uri,
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
        `http://13.232.190.226/api/talent/upload/media`,
        requestOptions,
      );
      const uploadResData = await uploadRes.json();
      if (!uploadResData.success) {
        alert(uploadResData.message);
        return;
      }
      alert(uploadResData.message);
      setImage(null);
    } catch (error) {
      console.error('error', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Formik
          initialValues={{
            caption: '',
            description: '',
          }}
          validationSchema={mediaSchema}
          onSubmit={(values, {setSubmitting}) =>
            uploadMedia(values, {setSubmitting})
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
              {image !== '' && (
                <Image
                  source={{uri: image}}
                  style={{width: '100%', height: 200, marginBottom: 10}}
                />
              )}
              <TouchableOpacity
                style={styles.imageBtn}
                onPress={requestCameraPermission}>
                <Text style={{color: theme.$primaryColor}}> Choose Image</Text>
              </TouchableOpacity>
              {isImage && (
                <Text
                  style={{
                    fontSize: 13,
                    color: 'red',
                    alignSelf: 'center',
                    marginTop: 1,
                  }}>
                  Choose a Poster image
                </Text>
              )}
              <View
                style={{
                  alignSelf: 'center',
                  borderWidth: 1,
                  borderRadius: 10,
                  width: '90%',
                  paddingLeft: 8,
                  paddingRight: 8,
                  marginTop: 8,
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderColor: errors.caption ? 'red' : 'gray',
                }}>
                <Icon name="mail" size={20} color={theme.$primaryColor} />
                <TextInput
                  keyboardType={'email-address'}
                  textContentType={'emailAddress'}
                  style={styles.inputField}
                  placeholder={'Caption'}
                  onChangeText={handleChange('caption')}
                  onBlur={handleBlur('caption')}
                  value={values.caption}
                />
              </View>
              {touched.caption && errors.caption && (
                <Text style={styles.errorText}>
                  {touched.caption && errors.caption}
                </Text>
              )}
              <View
                style={{
                  alignSelf: 'center',
                  borderWidth: 1,
                  borderRadius: 10,
                  width: '90%',
                  paddingLeft: 8,
                  paddingRight: 8,
                  marginTop: 8,
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderColor: errors.description ? 'red' : 'gray',
                }}>
                <Icon name="mail" size={20} color={theme.$primaryColor} />
                <TextInput
                  multiline
                  numberOfLines={4}
                  keyboardType={'email-address'}
                  textContentType={'emailAddress'}
                  style={styles.inputField}
                  placeholder={'description'}
                  onChangeText={handleChange('description')}
                  onBlur={handleBlur('description')}
                  value={values.description}
                />
              </View>
              {touched.description && errors.description && (
                <Text style={styles.errorText}>
                  {touched.description && errors.description}
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
                  style={{marginTop: 10}}
                  size={'large'}
                  color={theme.$primaryColor}
                />
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
    marginHorizontal: '5%',
    color: 'red',
  },
  inputFieldBackground: {
    alignSelf: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    width: '90%',
    paddingLeft: 8,
    paddingRight: 8,
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageBtn: {
    width: '90%',
    borderWidth: 1,
    borderColor: theme.$primaryColor,
    alignSelf: 'center',
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
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
    width: '90%',
    backgroundColor: theme.$primaryColor,
    padding: 5,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },
  registerBtnText: {
    fontSize: 18,
    marginVertical: 5,
    color: 'white',
    fontFamily: 'montserrat-medium',
    textTransform: 'uppercase',
  },
});

export default PhotoUploadScreen;
