import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  Alert,
  Image,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  PermissionsAndroid,
  TextInput,
  ToastAndroid,
} from 'react-native';
import * as Yup from 'yup';
import { Formik } from 'formik';
import ImagePicker from 'react-native-image-picker';
import DatePicker from 'react-native-datepicker';
import Moment from 'moment';
import Cicon from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../context/authContext';
import theme from '../config/theme';
const CreatePosterScreen = (props, { navigation }) => {
  const auth = useContext(AuthContext);
  const [message, setMessage] = useState();
  const [image, setImage] = useState();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isStartDate, setIsStartDate] = useState(false);
  const [isEndDate, setIsEndDate] = useState(false);
  const [isImage, setIsImage] = useState(false);
  const [sDate, setSDate] = useState();
  const [eDate, setEDate] = useState();
  const posterInitValues = {
    title: '',
    description: '',
  };
  const posterValidation = Yup.object().shape({
    title: Yup.string().required('Please give a title'),
    description: Yup.string().required('Please provide poster description'),
  });
  const handleSubmit = async (values, { setSubmitting }) => {
    if (startDate === '') {
      setIsStartDate(true);
      setSubmitting(false);
      return;
    } else {
      setIsStartDate(false);
    }
    if (endDate === '') {
      setIsEndDate(true);
      setSubmitting(false);
      return;
    } else {
      setIsEndDate(false);
    }
    if (image === undefined) {
      setIsImage(true);
      setSubmitting(false);
      return;
    } else {
      setIsImage(false);
    }
    var formData = new FormData();
    formData.append('title', values.title);
    formData.append('description', values.description);
    formData.append('startDate', startDate);
    formData.append('endDate', endDate);
    const image_uri = image;
    let fileType = image_uri.substring(image_uri.lastIndexOf('.') + 1);
    formData.append('poster', {
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
        `http://13.233.216.36:3000/api/poster`,
        requestOptions,
      );
      const uploadResData = await uploadRes.json();
      if (!uploadResData.success) {
        alert(uploadResData.message);
        return;
      }
      props.navigation.navigate('MyPosters', {
        content: 'pending'
      });
      showToastWithGravityAndOffset();
    } catch (error) {
      console.error('error', error);
    }
  };
  const showToastWithGravityAndOffset = () => {
    ToastAndroid.showWithGravityAndOffset(
      'New Poster created successfully',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      50,
      100,
    );
  };
  const handleStartDate = (date) => {
    setSDate(date);
    if (date === '') {
      setIsStartDate(true);
    } else {
      setStartDate(Moment(date, 'DD-MM-YYYY').format('yyyy-MM-DD'));
      setIsStartDate(false);
    }
  };
  const handleEndDate = (date) => {
    setEDate(date);
    if (date === '') {
      setIsStarDate(true);
    } else {
      setEndDate(Moment(date, 'DD-MM-YYYY').format('yyyy-MM-DD'));
      setIsEndDate(false);
    }
  };
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Starzhubs App Camera Permission',
          message:
            'Starzhubs App needs access to your camera ' +
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
      if (response.didCancel) {
      } else if (response.error) {
      } else if (response.customButton) {
        alert(response.customButton);
      } else if (response.uri === '') {
      } else {
        setImage(response.uri);
      }
    });
  };
  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <View>
            <Formik
              initialValues={posterInitValues}
              validationSchema={posterValidation}
              onSubmit={(values, { setSubmitting }) =>
                handleSubmit(values, { setSubmitting })
              }>
              {({
                values,
                handleChange,
                handleBlur,
                errors,
                handleSubmit,
                touched,
              }) => (
                  <View
                    style={{ marginLeft: 25, marginRight: 25, marginTop: 10 }}>
                    {image && (
                      <Image
                        source={{ uri: image }}
                        style={{ width: '100%', height: 200, marginBottom: 10 }}
                      />
                    )}
                    <TouchableOpacity
                      style={styles.imageBtn}
                      onPress={requestCameraPermission}>
                      <Text style={{ color: 'white', fontWeight: "bold" }}> Choose Image</Text>
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
                        backgroundColor: 'white',
                        width: '100%',
                        paddingLeft: 3,
                        paddingRight: 8,
                        marginTop: 8,
                        flexDirection: 'row',
                        alignItems: 'center',
                        borderColor: errors.projects ? 'red' : '#e6e6e6',
                      }}>
                      <Cicon
                        name="subtitles"
                        size={15}
                        style={{ color: theme.$primaryColor, marginRight: '2%' }}
                      />
                      <TextInput
                        style={{ paddingVertical: 5, width: '100%' }}
                        underlineColorAndroid="transparent"
                        placeholder="Title"
                        onChangeText={handleChange('title')}
                        onBlur={handleBlur('title')}
                      />
                    </View>
                    {touched.title && errors.title && (
                      <Text
                        style={{
                          fontSize: 13,
                          color: 'red',
                          alignSelf: 'center',
                          marginTop: -2,
                        }}>
                        {errors.title}
                      </Text>
                    )}
                    <View
                      style={{
                        alignSelf: 'center',
                        backgroundColor: 'white',
                        width: '100%',
                        paddingLeft: 3,
                        paddingRight: 8,
                        marginTop: 8,
                        flexDirection: 'row',
                        alignItems: 'center',
                        borderColor: errors.projects ? 'red' : '#e6e6e6',
                      }}>
                      <Icon
                        name="ios-information-circle"
                        size={15}
                        style={{ color: theme.$primaryColor, marginRight: '2%' }}
                      />
                      <TextInput
                        style={{ paddingVertical: 5, width: '100%' }}
                        underlineColorAndroid="transparent"
                        placeholder="Description"
                        numberOfLines={6}
                        multiline={true}
                        onChangeText={handleChange('description')}
                        onBlur={handleBlur('description')}
                      />
                    </View>

                    {touched.description && errors.description && (
                      <Text
                        style={{
                          fontSize: 13,
                          color: 'red',
                          alignSelf: 'center',
                          marginTop: -1,
                        }}>
                        {errors.description}
                      </Text>
                    )}
                    <DatePicker
                      style={{
                        backgroundColor: 'white',
                        alignSelf: 'center',
                        width: '100%',
                        paddingLeft: 3,
                        borderColor: errors.projects ? 'red' : '#e6e6e6',
                        marginTop: 8,
                      }}
                      date={sDate}
                      mode="date"
                      placeholder="Start Date"
                      format="DD/MM/YYYY"
                      minDate={Moment().format('DD/MM/YYYY')}
                      maxDate={eDate}
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      iconComponent={
                        <Cicon
                          name="date-range"
                          size={15}
                          style={{
                            position: 'absolute',
                            left: 0,
                            alignSelf: "center",
                            color: theme.$primaryColor,
                          }}
                        />
                      }
                      customStyles={{
                        dateInput: {
                          borderWidth: 0,
                          marginLeft: '7%',
                          alignItems: 'flex-start',
                        },
                      }}
                      onDateChange={(date) => {
                        handleStartDate(date);
                      }}
                    />
                    {isStartDate && (
                      <Text
                        style={{
                          fontSize: 13,
                          color: 'red',
                          alignSelf: 'center',
                          marginTop: 1,
                        }}>
                        Choose Start Date
                      </Text>
                    )}
                    <DatePicker
                      style={{
                        backgroundColor: 'white',
                        alignSelf: 'center',
                        width: '100%',
                        paddingLeft: 3,
                        borderColor: errors.projects ? 'red' : '#e6e6e6',
                        marginTop: 8,
                      }}
                      date={eDate}
                      mode="date"
                      placeholder="End Date"
                      format="DD/MM/YYYY"
                      minDate={sDate}
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      iconComponent={
                        <Cicon
                          name="date-range"
                          size={15}
                          style={{
                            position: 'absolute',
                            left: 0,
                            alignSelf: "center",
                            color: theme.$primaryColor,
                          }}
                        />
                      }
                      customStyles={{
                        dateInput: {
                          borderWidth: 0,
                          marginLeft: '7%',
                          alignItems: 'flex-start',
                        },
                      }}
                      onDateChange={(date) => {
                        handleEndDate(date);
                      }}
                    />
                    {isEndDate && (
                      <Text
                        style={{
                          fontSize: 13,
                          color: 'red',
                          alignSelf: 'center',
                          marginTop: 1,
                        }}>
                        Choose End Date
                      </Text>
                    )}
                    <View
                      style={{
                        marginTop: 10,
                        width: '100%',
                        alignItems: 'center',
                      }}>
                      <TouchableOpacity
                        style={{
                          borderRadius: 2,
                          backgroundColor: theme.$primaryColor,
                          padding: 10,
                          width: '100%',
                          alignItems: 'center',
                          borderRadius: 8,
                          marginBottom: 15
                        }}
                        onPress={handleSubmit}>
                        <Text
                          style={{
                            color: 'white',
                            fontWeight: 'bold',
                          }}>
                          Create Poster
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
            </Formik>
          </View>
        </View>
      </ScrollView>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  posterTitle: {
    fontSize: 18,
    color: theme.$primaryColor,
    fontWeight: 'bold',
  },
  iconDiv: {
    marginTop: 20,
    flexDirection: 'row',
    width: '100%',
  },
  iconInnerDiv: {
    width: '25%',
  },
  statusBtn: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  statusBtnActive: {
    flexDirection: 'column',
    alignItems: 'center',
    borderBottomColor: '#663300',
    borderBottomWidth: 2,
  },
  posterRow: {
    elevation: 5,
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: '100%',
    backgroundColor: 'white',
    marginRight: 20,
    alignItems: 'center',
    flexDirection: 'row',
  },
  error: {
    color: 'red',
    fontSize: 10,
    marginTop: '2%',
  },
  sendBtn: {
    elevation: 5,
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 5,
    backgroundColor: 'orange',
    marginRight: 20,
    alignItems: 'center',
  },
  imageBtn: {
    elevation: 5,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 5,
    backgroundColor: theme.$primaryColor,
    alignItems: 'center',
    marginBottom: 8,
    marginTop: 10
  },
});

export default CreatePosterScreen;
