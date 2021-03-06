import React, { useState, useContext, useEffect, Fragment } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
  Image,
  ToastAndroid,
  PermissionsAndroid,
  ScrollView,
  ImageBackground
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Cicon from 'react-native-vector-icons/MaterialIcons';
import Gicon from 'react-native-vector-icons/FontAwesome';
import Eicon from 'react-native-vector-icons/FontAwesome5';
import { AirbnbRating } from 'react-native-elements';
import { Snackbar } from 'react-native-paper';
import { AuthContext } from '../context/authContext';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Icon from 'react-native-vector-icons/MaterialIcons';
import theme from '../config/theme';
import ImagePicker from 'react-native-image-picker';

const industryNames = [
  {
    name: 'Industry',
    id: 0,
    children: [
      {
        id: 'Assameese',
        name: 'Assameese',
      },
      {
        id: 'Bengali',
        name: 'Bengali',
      },
      {
        id: 'Gujarathi',
        name: 'Gujarathi',
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
        id: 'Malayalam',
        name: 'Malayalam',
      },
      {
        id: 'Marathi',
        name: 'Marathi',
      },
      {
        id: 'Punjabi',
        name: 'Punjabi',
      },
      {
        id: 'Tamil',
        name: 'Tamil',
      },
      {
        id: 'Telugu',
        name: 'Telugu',
      },
    ],
  },
];

const EditTalentScreen = (props) => {
  const talentId = props.navigation.getParam('talentId');
  const category = props.navigation.getParam('category');
  const industry = props.navigation.getParam('industry');
  const films = props.navigation.getParam('films');
  const years = props.navigation.getParam('years');
  const description = props.navigation.getParam('description');
  const levels = props.navigation.getParam('levels');
  const auth = useContext(AuthContext);
  const [value, setValue] = useState('first');
  const [talent, setTalent] = useState();
  const [categories, setCategories] = useState([]);
  const [isProfileImageMode, setIsProfileImageMode] = useState(false);
  const [industries, setIndustries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedItems, setSelectedItems] = useState(industry);
  const [level, setLevel] = useState(levels);
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState();
  const [bodyTypeValue, setbodyTypeValue] = useState();
  const [labels, setlabels] = useState();
  const [complexionValue, setcomplexionValue] = useState();
  const [imageType, setImageType] = useState();
  const [headimg, setHeadImage] = useState();
  const [rightimg, setRightImage] = useState();
  const [leftimg, setLeftImage] = useState();
  const [fullsizeimg, setFullImage] = useState();
  const [user, setUser] = useState({ image: {} });
  const initialTalentValues = {
    talentId: talentId,
    level: levels,
    experience: years,
    films: films,
    description: description,
  };
  const phoneRegExp = /^[0-9]*$/;
  const talentValidationSchema = Yup.object({
    talentId: Yup.string().required('Select one category'),
    level: Yup.string().required('Select your level'),
    experience: Yup.string()
      .matches(phoneRegExp, 'Invalid input')
      .required('Enter experience details'),
    films: Yup.string()
      .matches(phoneRegExp, 'Invalid input')
      .required('Enter no. of projects'),
    description: Yup.string().required('Enter talent  details'),
  });

  useEffect(() => {
    userInfo();
  });

  const userInfo = () => {
    if (category.toLowerCase() === 'actor') {
      setIsProfileImageMode(true);
      fetch(`http://13.233.216.36:3000/api/user/${auth.userId}`, {
        method: 'PATCH',
        headers: {
          Authorization: 'Bearer ' + auth.token,
        },
      })
        .then((response) => response.json())
        .then((response) => {
          setUser(response.data.user);
        })
        .catch((error) => { });
    } else {
      setIsProfileImageMode(false);
    }
  };

  useEffect(() => {
    const getUserTalents = () => {
      const requestOptions = {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + auth.token,
        },
      };
      fetch(`http://13.233.216.36:3000/api/user/talent`, requestOptions)
        .then((response) => response.json())
        .then(
          (response) => {
            if (response.success === true) {
              setTalent(response.data.talents);
            } else {
              alert('Error: ', response.message);
            }
          },
          (error) => {
            alert('Talent fetching failed: ' + error);
          },
        );
    };
    getUserTalents();
  }, []);

  useEffect(() => {
    const getCategory = () => {
      fetch('http://13.233.216.36:3000/api/category', {
        method: 'GET',
      })
        .then((response) => response.json())
        .then((response) => {
          setCategories(response.categories);
        })
        .catch((error) => { });
    };
    getCategory();
  }, []);

  const handleSubmit = (values, { setSubmitting }) => {
    values.level = level;
    if (selectedItems === undefined || selectedItems.length === 0) {
      Alert.alert(
        '',
        'Select atleast one industry',
        [
          {
            text: 'Ok',
            style: 'cancel',
          },
        ],
        { cancelable: false },
      );
      setSubmitting(false);
      return;
    }
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + auth.token,
      },
      body: JSON.stringify({
        chars: {
          industry: selectedItems,
          films: values.films,
          years: values.experience,
        },
        description: values.description || '',
        level: values.level,
      }),
    };
    fetch(`http://13.233.216.36:3000/api/talent/user/${talentId}`, requestOptions)
      .then((response) => response.json())
      .then(
        (response) => {
          if (response.success === true) {
            setMessage('Data updated successfully');
            setVisible(true);
            props.navigation.navigate('Talents');
            showToastWithGravityAndOffset1();
          } else {
            setMessage('Something went wrong. Try again !');
            setVisible(true);
          }
        },
        (error) => { },
      );
  };

  const requestCameraPermission = async (imgType) => {
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
        chooseFile(imgType);
      } else {
      }
    } catch (err) {
    }
  };
  const chooseFile = async (imgType) => {
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
        if (imgType === 'head_shot') {
          setHeadImage(response.uri);
        } else if (imgType === 'left_profile') {
          setLeftImage(response.uri);
        } else if (imgType === 'right_profile') {
          setRightImage(response.uri);
        } else {
          setFullImage(response.uri);
        }
        uploadAvatar(imgType, response.uri);
      }
    });
  };

  const uploadAvatar = async (imgType, imgurl) => {
    let image;
    if (imgType === 'head_shot') {
      image = headimg;
    } else if (imgType === 'left_profile') {
      image = leftimg;
    } else if (imgType === 'right_profile') {
      image = rightimg;
    } else {
      image = fullsizeimg;
    }
    const image_uri = imgurl;
    let fileType = image_uri.substring(image_uri.lastIndexOf('.') + 1);
    var formData = new FormData();
    formData.append('imageType', imgType);
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
        `http://13.233.216.36:3000/api/user/avatar`,
        requestOptions,
      );
      const uploadResData = await uploadRes.json();
      if (!uploadResData.success) {
        setMsg('Something went wrong. Try again!');
        setVisible(!visible);
        return;
      }
      showToastWithGravityAndOffset2()
    } catch (error) {
      console.error('error', error);
    }
  };

  const handleLevelChange = (rating) => {
    setLevel(rating);
  };
  const onDismissSnackBar = () => {
    setVisible(false);
  };
  const onSelectedItemsChange = (selectedItems) => {
    setSelectedItems(selectedItems);
  };
  const showToastWithGravityAndOffset1 = () => {
    ToastAndroid.showWithGravityAndOffset(
      ' Data updated successfully',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      50,
      100,
    );
  };
  const showToastWithGravityAndOffset2 = () => {
    ToastAndroid.showWithGravityAndOffset(
      ' Image uploaded successfully',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      50,
      100,
    );
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <Snackbar
          visible={visible}
          duration={7000}
          onDismiss={onDismissSnackBar}>
          {message}
        </Snackbar>
        <Formik
          enableReinitialize={true}
          initialValues={initialTalentValues}
          validationSchema={talentValidationSchema}
          onSubmit={(values, { setSubmitting }) =>
            handleSubmit(values, { setSubmitting })
          }>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            resetForm,
            values,
            errors,
          }) => (
              <React.Fragment>
                <View
                  style={{
                    alignSelf: 'center',
                    borderWidth: 1,
                    backgroundColor: 'white',
                    width: '90%',
                    paddingLeft: 10,
                    paddingRight: 10,
                    marginTop: 8,
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderColor: errors.link ? 'red' : '#e6e6e6',
                  }}>
                  <Cicon name="merge-type" size={20} style={{ color: '#fd9242' }} />
                  <Text
                    style={{ color: 'black', paddingVertical: 15, marginLeft: 15 }}>
                    {category}
                  </Text>
                </View>
                {errors.talentId ? (
                  <Text style={styles.error}>{errors.talentId}</Text>
                ) : null}
                <View
                  style={{
                    alignSelf: 'center',
                    borderWidth: 1,
                    backgroundColor: 'white',
                    width: '90%',
                    paddingLeft: 10,
                    paddingRight: 10,
                    paddingBottom: 10,
                    paddingTop: 10,
                    marginTop: 8,
                    alignItems: 'center',
                    borderColor: errors.link ? 'red' : '#e6e6e6',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                  }}>
                  <Text>Select Confidence Level</Text>

                  <AirbnbRating
                    reviews={[
                      'Beginner',
                      'Average',
                      'Good',
                      'Excellent',
                      'Experienced',
                    ]}
                    defaultRating={level}
                    size={20}
                    count={5}
                    showRating={false}
                    onFinishRating={handleLevelChange}
                    selectedColor={theme.$primaryColor}
                  />
                </View>
                <View
                  style={{
                    alignSelf: 'center',
                    borderWidth: 1,
                    backgroundColor: 'white',
                    width: '90%',
                    paddingLeft: 10,
                    paddingRight: 10,
                    marginTop: 8,
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderColor: errors.link ? 'red' : '#e6e6e6',
                  }}>
                  <View style={{ width: '7%' }}>
                    <Gicon
                      name="industry"
                      size={15}
                      style={
                        selectedItems.length === 0
                          ? styles.noIndustry
                          : styles.industry
                      }
                    />
                  </View>
                  <View
                    style={{ width: '96%', marginLeft: '-2%', paddingBottom: 12 }}>
                    <SectionedMultiSelect
                      items={industryNames}
                      IconRenderer={Icon}
                      uniqueKey="id"
                      subKey="children"
                      selectText="Select Industry"
                      showDropDowns={true}
                      expandDropDowns
                      showCancelButton
                      readOnlyHeadings={true}
                      onSelectedItemsChange={onSelectedItemsChange}
                      selectedItems={selectedItems}
                    />
                  </View>
                </View>
                {errors.industry ? (
                  <Text style={styles.error}>{errors.industry}</Text>
                ) : null}
                <View
                  style={{
                    alignSelf: 'center',
                    borderWidth: 1,
                    backgroundColor: 'white',
                    width: '90%',
                    paddingLeft: 8,
                    paddingRight: 8,
                    marginTop: 8,
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderColor: errors.experience ? 'red' : '#e6e6e6',
                  }}>
                  <Eicon
                    name="envelope-open-text"
                    size={15}
                    style={{
                      color: '#fd9242',
                    }}
                  />
                  <TextInput
                    style={styles.inputText}
                    defaultValue={String(years)}
                    placeholder="Experience"
                    placeholderTextColor="#003f5c"
                    keyboardType="numeric"
                    autoCapitalize="sentences"
                    onChangeText={handleChange('experience')}
                    onBlur={handleBlur('experience')}
                  />
                </View>
                {errors.experience ? (
                  <Text style={styles.error}>{errors.experience}</Text>
                ) : null}
                <View
                  style={{
                    alignSelf: 'center',
                    borderWidth: 1,
                    backgroundColor: 'white',
                    width: '90%',
                    paddingLeft: 8,
                    paddingRight: 8,
                    marginTop: 8,
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderColor: errors.films ? 'red' : '#e6e6e6',
                  }}>
                  <Eicon
                    name="envelope-open-text"
                    size={15}
                    style={{
                      color: '#fd9242',
                    }}
                  />
                  <TextInput
                    style={styles.inputText}
                    defaultValue={String(films)}
                    placeholder="No. of Projects"
                    placeholderTextColor="#003f5c"
                    keyboardType="numeric"
                    autoCapitalize="sentences"
                    onChangeText={handleChange('films')}
                    onBlur={handleBlur('films')}
                  />
                </View>
                {errors.films ? (
                  <Text style={styles.error}>{errors.films}</Text>
                ) : null}
                {isProfileImageMode && (
                  <Fragment>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        marginTop: 20,
                        marginBottom: 10,
                      }}>
                      <View
                        style={{
                          marginTop: 10,
                        }}>
                        <TouchableOpacity
                          onPress={() => {
                            requestCameraPermission('head_shot');
                          }}>
                          <ImageBackground
                            source={
                              !headimg &&
                                user.image &&
                                user.image.head_shot !== undefined ?
                                {
                                  uri: `http://13.233.216.36:3000/api/user/avatar/${user.image.head_shot}`
                                } :
                                !headimg && user.image.head_shot === undefined ?
                                  require('../assets/headshot.jpg') :
                                  { uri: headimg }
                            }
                            style={{
                              borderRadius: 50,
                              height: 140,
                              width: 140,
                              justifyContent: 'center',
                            }}>
                            <Image
                              source={require('../assets/add-button.png')}
                              style={{
                                alignSelf: 'center',
                                height: 60,
                                width: 60,
                              }}
                            />
                            <Text
                              style={{
                                alignSelf: 'center',
                                fontSize: 12,
                                marginTop: 5,
                              }}>
                              Upload Head Shot
                          </Text>
                          </ImageBackground>
                        </TouchableOpacity>
                      </View>
                      <View
                        style={{
                          paddingLeft: '2%',
                          paddingRight: '6%',
                          marginTop: 10,
                        }}>
                        <TouchableOpacity
                          onPress={() => requestCameraPermission('left_profile')}>
                          <ImageBackground
                            source={
                              !leftimg &&
                                user.image &&
                                user.image.left_profile !== undefined ?
                                {
                                  uri: `http://13.233.216.36:3000/api/user/avatar/${user.image.left_profile}`
                                } :
                                !leftimg && user.image.left_profile === undefined ?
                                  require('../assets/left_profile.jpg') :
                                  { uri: leftimg }
                            }
                            style={{
                              borderRadius: 50,
                              height: 140,
                              width: 140,
                              justifyContent: 'center',
                            }}>
                            <Image
                              source={require('../assets/add-button.png')}
                              style={{
                                alignSelf: 'center',
                                height: 60,
                                width: 60,
                              }}
                            />
                            <Text
                              style={{
                                alignSelf: 'center',
                                fontSize: 12,
                                marginTop: 5,
                              }}>
                              Upload Left Side Shot
                          </Text>
                          </ImageBackground>
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                      }}>
                      <View
                        style={{
                          marginTop: 10,
                          marginBottom: 20,
                        }}>
                        <TouchableOpacity
                          onPress={() =>
                            requestCameraPermission('right_profile')
                          }>
                          <ImageBackground
                            source={
                              !rightimg &&
                                user.image &&
                                user.image.right_profile !== undefined ?
                                {
                                  uri: `http://13.233.216.36:3000/api/user/avatar/${user.image.right_profile}`
                                } :
                                !rightimg && user.image.right_profile === undefined ?
                                  require('../assets/right_profile.jpg') :
                                  { uri: rightimg }
                            }
                            style={{
                              borderRadius: 50,
                              height: 140,
                              width: 140,
                              justifyContent: 'center',
                            }}>
                            <Image
                              source={require('../assets/add-button.png')}
                              style={{
                                alignSelf: 'center',
                                height: 60,
                                width: 60,
                              }}
                            />
                            <Text
                              style={{
                                alignSelf: 'center',
                                fontSize: 12,
                                marginTop: 5,
                              }}>
                              Upload Right Side Shot
                          </Text>
                          </ImageBackground>
                        </TouchableOpacity>
                      </View>
                      <View
                        style={{
                          paddingLeft: '2%',
                          paddingRight: '6%',
                          marginTop: 10,
                        }}>
                        <TouchableOpacity
                          onPress={() => requestCameraPermission('fullsize')}>
                          <ImageBackground
                            source={
                              !fullsizeimg &&
                                user.image &&
                                user.image.fullsize !== undefined ?
                                {
                                  uri: `http://13.233.216.36:3000/api/user/avatar/${user.image.fullsize}`
                                } :
                                !fullsizeimg && user.image.fullsize === undefined ?
                                  require('../assets/fullsize.jpg') :
                                  { uri: fullsizeimg }
                            }
                            style={{
                              borderRadius: 50,
                              height: 140,
                              width: 140,
                              justifyContent: 'center',
                            }}>
                            <Image
                              source={require('../assets/add-button.png')}
                              style={{
                                alignSelf: 'center',
                                height: 60,
                                width: 60,
                              }}
                            />
                            <Text
                              style={{
                                alignSelf: 'center',
                                fontSize: 12,
                                marginTop: 5,
                              }}>
                              Upload Full Size Shot
                          </Text>
                          </ImageBackground>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </Fragment>
                )}
                <View
                  style={{
                    alignSelf: 'center',
                    borderWidth: 1,
                    backgroundColor: 'white',
                    width: '90%',
                    paddingLeft: 8,
                    paddingRight: 8,
                    marginTop: 8,
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderColor: errors.description ? 'red' : '#e6e6e6',
                  }}>
                  <Eicon
                    name="envelope-open-text"
                    size={15}
                    style={{
                      color: '#fd9242',
                    }}
                  />
                  <TextInput
                    style={styles.inputTextDes}
                    defaultValue={description}
                    placeholder="Description"
                    placeholderTextColor="#003f5c"
                    keyboardType="email-address"
                    autoCapitalize="sentences"
                    numberOfLines={3}
                    multiline={true}
                    onChangeText={handleChange('description')}
                    onBlur={handleBlur('description')}
                  />
                </View>
                {errors.description ? (
                  <Text style={styles.error}>{errors.description}</Text>
                ) : null}
                <TouchableOpacity
                  style={styles.registerBtn}
                  onPress={handleSubmit}>
                  <Text style={styles.registerBtnText}>
                    {loading ? (
                      <ActivityIndicator size="small" color="#fff" />
                    ) : (
                        'Save Details'
                      )}
                  </Text>
                </TouchableOpacity>
              </React.Fragment>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  radio: {
    flexDirection: 'row',
    marginTop: 13,
  },
  radio2: {
    color: '#fff5ee',
    marginTop: 6,
  },
  error: {
    color: 'red',
    fontSize: 10,
    marginBottom: 0,
    alignSelf: 'center',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 50,
    color: '#fb5b5a',
    marginBottom: 40,
  },
  inputView: {
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 10,
    width: '90%',
    paddingLeft: 8,
    paddingRight: 8,
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  inputText: {
    width: '100%',
    color: '#000000',
    marginLeft: 15,
  },
  inputViewDes: {
    flexDirection: 'row',
    width: '80%',
    marginTop: '5%',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    borderRadius: 10,
  },
  inputTextDes: {
    width: '80%',
    color: '#000000',
    marginLeft: 15,
    marginBottom: 5,
  },
  noIndustry: {
    color: '#fd9242',
    marginTop: '-80%',
  },
  industry: {
    color: '#fd9242',
    marginTop: '-160%',
  },
  forgot: {
    color: 'white',
    fontSize: 11,
  },
  registerBtn: {
    alignSelf: 'center',
    width: '90%',
    backgroundColor: theme.$primaryColor,
    padding: 5,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: '5%',
  },
  registerBtnText: {
    fontSize: 18,
    marginVertical: 5,
    color: 'white',
    fontFamily: 'montserrat-medium',
    textTransform: 'uppercase',
  },
  loginText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
export default EditTalentScreen;
