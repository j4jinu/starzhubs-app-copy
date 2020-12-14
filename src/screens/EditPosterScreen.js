import React, { useState, useContext } from 'react';
import {
  View,
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
import { Snackbar } from 'react-native-paper';
import theme from '../config/theme';

const EditPosterScreen = (props) => {
  const posterId = props.navigation.getParam('posterId');
  const title = props.navigation.getParam('title');
  const img = props.navigation.getParam('image');
  const description = props.navigation.getParam('description');
  const edDate = props.navigation.getParam('endDate');
  const stDate = props.navigation.getParam('startDate');
  const auth = useContext(AuthContext);
  const [message, setMessage] = useState();
  const [image, setImage] = useState(
    `http://13.232.190.226/api/poster/view/${img}`,
  );
  const [startDate, setStartDate] = useState(
    Moment(stDate).format('YYYY/MM/DD'),
  );
  const [endDate, setEndDate] = useState(Moment(edDate).format('YYYY/MM/DD'));
  const [isStartDate, setIsStartDate] = useState(false);
  const [isEndDate, setIsEndDate] = useState(false);
  const [isImage, setIsImage] = useState(false);
  const [visible, setVisible] = useState(false);
  const [sDate, setSDate] = useState(Moment(stDate).format('DD/MM/YYYY'));
  const [eDate, setEDate] = useState(Moment(edDate).format('DD/MM/YYYY'));

  const posterInitValues = {
    title: title,
    description: description,
  };
  const posterValidation = Yup.object().shape({
    title: Yup.string().required('Please give a title'),
    description: Yup.string().required('Please provide poster description'),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    if (startDate === '') {
      setIsStartDate(true);
    } else {
      setIsStartDate(false);
    }
    if (endDate === '') {
      setIsEndDate(true);
    } else {
      setIsEndDate(false);
    }
    if (image === null) {
      setIsImage(true);
    } else {
      setIsImage(false);
    }
    const ed = Moment(endDate, 'DD-MM-YYYY').format('yyyy-MM-DD');
    setEndDate(ed);
    const sd = Moment(startDate, 'DD-MM-YYYY').format('yyyy-MM-DD');
    setStartDate(sd);
    var formData = new FormData();
    formData.append('title', values.title);
    formData.append('description', values.description);
    formData.append('startDate', startDate);
    formData.append('endDate', endDate);
    const requestOptions = {
      method: 'PUT',
      headers: {
        Authorization: 'Bearer ' + auth.token,
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    };
    try {
      const uploadRes = await fetch(
        `http://13.232.190.226/api/poster/${posterId}`,
        requestOptions,
      );
      const uploadResData = await uploadRes.json();
      if (!uploadResData.success) {
        alert(uploadResData.message);
        return;
      }
      props.navigation.goBack();
      showToastWithGravityAndOffset();
    } catch (error) {
    }
  };

  const handleStartDate = (date) => {
    setSDate(date);
    setStartDate(date);
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
  const onDismissSnackBar = () => {
    setVisible(false);
  };
  const showToastWithGravityAndOffset = () => {
    ToastAndroid.showWithGravityAndOffset(
      'Poster Edited Successfully',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      50,
      100,
    );
  };
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Starzhubs App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
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
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
      } else if (response.error) {
      } else if (response.customButton) {
        alert(response.customButton);
      } else {
        setImage(response.uri);
      }
    });
  };

  return (
    <>
      <View style={styles.container}>
        <Snackbar
          style={{ marginBottom: 10 }}
          visible={visible}
          duration={7000}
          onDismiss={onDismissSnackBar}>
          {message}
        </Snackbar>
        <ScrollView>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <View>
              <Formik
                initialValues={posterInitValues}
                validationSchema={posterValidation}
                onSubmit={(values, { setSubmitting, resetForm }) =>
                  handleSubmit(values, { setSubmitting, resetForm })
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
                        <Text style={{ color: 'white' }}> Choose Image</Text>
                      </TouchableOpacity>
                      {isImage && (
                        <Text
                          style={{
                            fontSize: 13,
                            color: 'red',
                            alignSelf: 'center',
                            marginTop: 1,
                          }}>
                          Choose a poster image
                        </Text>
                      )}
                      <View
                        style={{
                          alignSelf: 'center',
                          borderWidth: 1,
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
                          style={{ color: theme.$primaryColor, marginRight: '2%', alignSelf: 'center' }}
                        />
                        <TextInput
                          style={{ paddingVertical: 5, width: '100%' }}
                          underlineColorAndroid="transparent"
                          defaultValue={title}
                          placeholder="Title"
                          onChangeText={handleChange('title')}
                          onBlur={handleBlur('title')}
                          value={values.title}
                        />
                      </View>
                      {touched.title && errors.title && (
                        <Text
                          style={{
                            fontSize: 13,
                            color: 'red',
                            alignSelf: 'center',
                            marginTop: -3,
                            marginBottom: -7
                          }}>
                          {errors.title}
                        </Text>
                      )}
                      <View
                        style={{
                          alignSelf: 'center',
                          borderWidth: 1,
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
                          style={{ color: theme.$primaryColor, marginRight: '2%', alignSelf: 'center' }}
                        />
                        <TextInput
                          style={{ width: '100%' }}
                          underlineColorAndroid="transparent"
                          placeholder="Description"
                          defaultValue={description}
                          numberOfLines={6}
                          multiline={true}
                          onChangeText={handleChange('description')}
                          onBlur={handleBlur('description')}
                          value={values.description}
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
                          borderWidth: 1,
                          backgroundColor: 'white',
                          alignSelf: 'center',
                          width: '100%',
                          paddingLeft: 3,
                          borderColor: errors.projects ? 'red' : '#e6e6e6',
                          marginTop: 5,
                          marginBottom: 5,

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
                              alignSelf: 'center',
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
                          borderWidth: 1,
                          backgroundColor: 'white',
                          alignSelf: 'center',
                          width: '100%',
                          paddingLeft: 3,
                          borderColor: errors.projects ? 'red' : '#e6e6e6',
                          marginTop: 5,
                          marginBottom: 5,
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
                              color: theme.$primaryColor,
                              alignSelf: 'center',
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
                          }}
                          onPress={handleSubmit}>
                          <Text
                            style={{
                              color: 'white',
                              fontWeight: 'bold',
                            }}>
                            Update Poster
                        </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
              </Formik>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
};
export default EditPosterScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  posterTitle: {
    fontSize: 18,
    color: 'orange',
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
    marginBottom: 10,
  },
});
