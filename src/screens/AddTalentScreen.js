import React, {useState, useContext, useEffect, Fragment} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Picker,
  Image,
  PermissionsAndroid,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import Cicon from 'react-native-vector-icons/MaterialIcons';
import Gicon from 'react-native-vector-icons/FontAwesome';
import Eicon from 'react-native-vector-icons/FontAwesome5';
import ImagePicker from 'react-native-image-picker';
import {Rating, AirbnbRating} from 'react-native-elements';
import {Snackbar} from 'react-native-paper';
import {AuthContext} from '../context/authContext';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Icon from 'react-native-vector-icons/MaterialIcons';
import theme from '../config/theme';

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

export default function AddTalentScreen(props) {
  const auth = useContext(AuthContext);
  const [selectedValue, setSelectedValue] = useState('');
  const [industryValue, setIndustryValue] = useState();
  const [value, setValue] = useState('first');
  const [talent, setTalent] = useState();
  const [categories, setCategories] = useState([]);
  const [isProfileImageMode, setIsProfileImageMode] = useState(false);
  const [industries, setIndustries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [bodyTypeValue, setbodyTypeValue] = useState();
  const [labels, setlabels] = useState();
  const [complexionValue, setcomplexionValue] = useState();
  const [imageType, setImageType] = useState();
  const [headimg, setHeadImage] = useState();
  const [rightimg, setRightImage] = useState();
  const [leftimg, setLeftImage] = useState();
  const [fullsizeimg, setFullImage] = useState();
  const [selectedItems, setSelectedItems] = useState([]);
  const [level, setLevel] = useState('');
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState();

  const initialTalentValues = {
    talentId: talent,
    // level: '',
    type: 'Aspirant',
    experience: '',
    // industry:[],
    projects: '',
    complexion: 'Brown',
    bodyType: 'Athletic',
    height: 0,
    weight: 0,
    description: 'description',
  };

  const phoneRegExp = /^[0-9]*$/;
  const talentValidationSchema = Yup.object({
    talentId: Yup.string().required('Select one category'),
    // level: Yup.string().required('Select your level'),
    // industry: Yup.string().required('Select one industry'),
    complexion: Yup.string().required('Select one complexion'),
    bodyType: Yup.string().required('Please choose one'),
    experience: Yup.string()
      .matches(phoneRegExp, 'Invalid input')
      .required('Enter experience details'),
    projects: Yup.string()
      .matches(phoneRegExp, 'Invalid input')
      .required('Enter no. of projects'),
    height: Yup.string().required('Enter height'),
    weight: Yup.string().required('Enter weight'),
    description: Yup.string().required('Enter talent  details'),
  });

  useEffect(() => {
    const getUserTalents = () => {
      const requestOptions = {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + auth.token,
        },
      };
      fetch(`http://13.232.190.226/api/user/talent`, requestOptions)
        .then((response) => response.json())
        .then(
          (response) => {
            if (response.success === true) {
              setTalent(response.data.talents);
              // setIsLoading(false)
            } else {
              alert('Error: ', response.message);
            }
            // setIsLoading(false)
          },
          (error) => {
            alert('Talent fetching failed: ' + error);
            // setIsLoading(false)
          },
        );
    };

    getUserTalents();
    // getUserTalents()
  }, []);
  useEffect(() => {
    const getCategory = () => {
      fetch('http://13.232.190.226/api/category', {
        method: 'GET',
      })
        .then((response) => response.json())
        .then((response) => {
          setCategories(response.categories);
          // handleBackdropClose()
        })
        .catch((error) => {
          // handleBackdropClose()
        });
    };
    getCategory();
  }, []);

  // const handleSubmit = (values) => {
  //   console.warn(values);

  // }

  const isProfileImageModeHandler = (tid) => {
    // var index = e.nativeEvent.target.selectedIndex;
    // const cat = e.nativeEvent.target[itemIndex].text.toLowerCase();
    if (tid === '5f5b2b8e96b2173a30948ac6' || tid === '') {
      setIsProfileImageMode(true);
      setTalent(tid);
      return;
    } else {
      setIsProfileImageMode(false);
      setTalent(tid);
      return;
    }
  };

  const resetForm = (values) => {
    values: '';
  };

  const handleSubmit = (values) => {
    setLoading(true);
    // console.warn(JSON.stringify(values));
    // if (industries.length === 0) {
    //     alert("Choose atleast one industry")
    //     return
    // }
    // setOpenBackdrop(true)
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + auth.token,
      },
      body: JSON.stringify({
        talentId: values.talentId,
        level: level,
        description: values.description,
        height: values.height,
        weight: values.weight,
        bodyType: values.bodyType,
        complexion: values.complexion,
        chars: {
          films: values.projects,
          years: values.experience,
          type: values.type,
          industry: selectedItems,
        },
      }),
    };

    fetch(`http://13.232.190.226/api/user/talent`, requestOptions)
      .then((response) => response.json())
      .then(
        (response) => {
          if (response.success === true) {
            setLoading(false);
            const msg =
              'New Talent added successfully. Check your profile page and add medias.';
            setMessage(msg);
            setVisible(!visible);
            // navigation.navigate('Account');
          } else {
            // alert(response.message);
            setMessage(response.message);
            setVisible(!visible);
          }
          setLoading(false);
        },
        (error) => {
          setLoading(false);
          alert(response.message);
        },
      );
  };

  const onDismissSnackBar = () => {
    setVisible(false);
  };

  const uploadAvatar = (imgType, imgurl) => {
    console.warn('URL', imgurl);
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
    const uri = imgurl;
    var formData = new FormData();
    formData.append('imageType', imgType);
    let fileType = uri.substring(uri.lastIndexOf('.') + 1);
    formData.append('avatar', {
      uri,
      name: `photo.${fileType}`,
      type: `image/${fileType}`,
    });

    const config = {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + auth.token,
      },
    };

    fetch(`http://13.232.190.226/api/user/avatar`, config)
      .then((response) => response.json())
      .then(
        (response) => {
          console.warn('Avatar upload: ', response);
          if (response.success === true) {
            alert(response.message);
          } else {
            alert(response.message);
          }
        },
        (error) => {
          alert('Upload failed: ' + error);
        },
      );
  };

  const requestCameraPermission = async (imgType) => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        pickImage(imgType);
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  // const requestCameraPermission = async (imgType) => {
  // console.warn(imgType);
  // try {
  // const granted = await PermissionsAndroid.request(
  // PermissionsAndroid.PERMISSIONS
  // .READ_EXTERNAL_STORAGE
  // );
  // if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  // pickImage(imgType);
  // } else {
  // console.warn('Camera permission denied');
  // }
  // } catch (err) {
  // console.warn(err);
  // }
  // };

  const pickImage = async (imgType) => {
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

    var imgurl;
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        if (imgType == 'head_shot') {
          console.warn(response.uri);
          setHeadImage(response.uri);
        } else if (imgType == 'left_profile') {
          setLeftImage(response.uri);
        } else if (imgType == 'right_profile') {
          setRightImage(response.uri);
        } else {
          setFullImage(response.uri);
        }
        imgurl = response.uri;
        uploadAvatar(imgType, imgurl);
      }
    });
    // let result = await ImagePicker.launchImageLibraryAsync({
    // mediaTypes: ImagePicker.MediaTypeOptions.All,
    // allowsEditing: true,
    // aspect: [4, 3],
    // quality: 1,
    // });
    // var imgurl;
    //     if (imgType == 'head_shot') {
    // console.warn(result.uri);
    //         setHeadImage(result.uri);
    //     } else if (imgType == 'left_profile') {
    //         setLeftImage(result.uri);
    //     } else if (imgType == 'right_profile') {
    //         setRightImage(result.uri);
    //     } else {
    //         setFullImage(result.uri);
    //     }
    // imgurl = result.uri;
    //     uploadAvatar(imgType, imgurl);
  };

  const handleLevelChange = (rating) => {
    setLevel(rating);
  };

  const onSelectedItemsChange = (selectedItems) => {
    setSelectedItems(selectedItems);
  };

  const handleReset = (resetForm) => {
    resetForm();
  };
  return (
    <View style={styles.container}>
      <Snackbar
        visible={visible}
        duration={7000}
        onDismiss={onDismissSnackBar}
        action={
          {
            // label: 'Undo',
            // onPress = () => onDismissSnackBar()
          }
        }>
        {message}
      </Snackbar>
      <Formik
        enableReinitialize={true}
        initialValues={initialTalentValues}
        validationSchema={talentValidationSchema}
        onSubmit={(values, actions) => {
          handleSubmit(values),
            actions.resetForm({
              values: {
                experience: '',
              },
            });
        }}>
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
            <View style={styles.inputView}>
              <Cicon
                name="merge-type"
                size={20}
                style={{
                  color: '#fd9242',
                  marginTop: '2%',
                }}
              />
              <Picker
                selectedValue={selectedValue}
                style={{
                  height: 20,
                  width: '100%',
                }}
                onValueChange={(itemValue, itemIndex) => {
                  setFieldValue('talentId', itemValue);
                  setSelectedValue(itemValue);
                  isProfileImageModeHandler(itemValue);
                }}>
                <Picker.Item label="Select Category" value="0" />
                {categories.map((cat) => (
                  <Picker.Item label={cat.title} value={cat._id} />
                ))}
              </Picker>
            </View>
            <Text style={styles.error}>{errors.talentId}</Text>

            <View
              style={{
                flexDirection: 'column',
                marginTop: '3%',
                marginLeft: '0%',
                paddingBottom: '2%',
                backgroundColor: 'white',
                // height: 70,
                width: '80%',
                borderRadius: 10,
              }}>
              <Text
                style={{
                  marginLeft: '5%',
                }}>
                Select Confidence Level
              </Text>

              <AirbnbRating
                count={11}
                reviews={[
                  'Terrible',
                  'Bad',
                  'Meh',
                  'OK',
                  'Good',
                  'Hmm...',
                  'Very Good',
                  'Wow',
                  'Amazing',
                  'Unbelievable',
                  'Jesus',
                ]}
                ratingColor={theme.$primaryColor}
                ratingBackgroundColor={theme.$primaryColor}
                defaultRating={11}
                size={20}
              />

              <Rating
                type="custom"
                startingValue={level}
                //tintColor="#f5f5f5"
                //tintColor="grey"
                ratingColor="orange"
                //ratingBackgroundColor='black'
                onFinishRating={handleLevelChange}
                style={{
                  marginLeft: '-25%',
                  marginTop: '1%',
                  marginBottom: '-3%',
                }}
              />
              <Text
                style={{
                  marginLeft: '5%',
                  marginTop: '3%',
                  fontSize: 12,
                  color: 'grey',
                }}>
                Swipe left or right
              </Text>
            </View>

            <View style={styles.inputView}>
              <View style={{width: '10%', marginTop: '6%'}}>
                <Gicon name="industry" size={15} style={{color: '#fd9242'}} />
              </View>

              <View style={{width: '90%', justifyContent: 'center'}}>
                <SectionedMultiSelect
                  items={industryNames}
                  IconRenderer={Icon}
                  uniqueKey="id"
                  subKey="children"
                  selectText="Select Industry"
                  showDropDowns={true}
                  readOnlyHeadings={true}
                  onSelectedItemsChange={onSelectedItemsChange}
                  selectedItems={selectedItems}
                />
              </View>
            </View>
            <Text style={styles.error}>{errors.industry}</Text>
            <View style={styles.inputView}>
              <Eicon
                name="envelope-open-text"
                size={15}
                style={{
                  color: '#fd9242',
                  marginTop: 5,
                }}
              />
              <TextInput
                style={styles.inputText}
                placeholder="Experience"
                placeholderTextColor="#003f5c"
                keyboardType="numeric"
                autoCapitalize="sentences"
                // defaultValue={user.email}
                onChangeText={handleChange('experience')}
                onBlur={handleBlur('experience')}
              />
            </View>
            <Text style={styles.error}>{errors.experience}</Text>
            <View style={styles.inputView}>
              <Eicon
                name="envelope-open-text"
                size={15}
                style={{
                  color: '#fd9242',
                  marginTop: 5,
                }}
              />
              <TextInput
                style={styles.inputText}
                placeholder="No.of Projects"
                placeholderTextColor="#003f5c"
                keyboardType="numeric"
                autoCapitalize="sentences"
                // defaultValue={user.email}
                onChangeText={handleChange('projects')}
                onBlur={handleBlur('projects')}
              />
            </View>
            <Text style={styles.error}>{errors.projects}</Text>
            <View style={styles.inputViewDes}>
              <Cicon
                name="class"
                size={15}
                style={{
                  color: '#fd9242',
                  marginTop: '6%',
                  marginLeft: 5,
                }}
              />
              <TextInput
                style={styles.inputTextDes}
                placeholder="Description"
                placeholderTextColor="#003f5c"
                keyboardType="email-address"
                autoCapitalize="sentences"
                numberOfLines={3}
                multiline={true}
                // defaultValue={user.email}
                onChangeText={handleChange('description')}
                onBlur={handleBlur('description')}
              />
            </View>

            {isProfileImageMode && (
              <Fragment>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 20,
                    marginBottom: 10,
                  }}>
                  <View
                    style={{
                      paddingLeft: 30,
                      marginTop: 10,
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        requestCameraPermission('head_shot');
                      }}>
                      <Image
                        source={
                          !headimg
                            ? require('../assets/headshot.jpg')
                            : {
                                uri: headimg,
                              }
                        }
                        style={{
                          borderRadius: 50,
                          height: 140,
                          width: 140,
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      paddingLeft: 30,
                      marginTop: 10,
                    }}>
                    <TouchableOpacity
                      onPress={() => requestCameraPermission('left_profile')}>
                      <Image
                        source={
                          !leftimg
                            ? require('../assets/left_profile.jpg')
                            : {
                                uri: leftimg,
                              }
                        }
                        style={{
                          borderRadius: 50,
                          height: 140,
                          width: 140,
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <View
                    style={{
                      paddingLeft: 30,
                      marginTop: 10,
                      marginBottom: 20,
                    }}>
                    <TouchableOpacity
                      onPress={() => requestCameraPermission('right_profile')}>
                      <Image
                        source={
                          !rightimg
                            ? require('../assets/right_profile.jpg')
                            : {
                                uri: rightimg,
                              }
                        }
                        //  {{uri:rightimg ===null ?`../../assets/right_profile.jpg`
                        //  :rightimg}}
                        //  source={require("../../assets/right_profile.jpg")}
                        style={{
                          borderRadius: 50,
                          height: 140,
                          width: 140,
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      paddingLeft: 30,
                      marginTop: 10,
                    }}>
                    <TouchableOpacity
                      onPress={() => requestCameraPermission('fullsize')}>
                      <Image
                        source={
                          !fullsizeimg
                            ? require('../assets/fullsize.jpg')
                            : {
                                uri: fullsizeimg,
                              }
                        }
                        //  source={require("../../assets/fullsize.jpg")}
                        style={{
                          borderRadius: 50,
                          height: 140,
                          width: 140,
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.inputView}>
                  <Picker
                    selectedValue={bodyTypeValue}
                    style={{
                      height: 20,
                      width: '100%',
                    }}
                    onValueChange={(itemValue, itemIndex) => {
                      setbodyTypeValue(itemValue);
                      setFieldValue('bodyType', itemValue);
                    }}>
                    <Picker.Item label="Select BodyType" value="0" />
                    <Picker.Item label="Athletic" value="Athletic" />
                    <Picker.Item label="Average built" value="Average built" />
                    <Picker.Item label="Fat" value="Fat" />
                    <Picker.Item label="Hourglass" value="Hourglass" />
                    <Picker.Item label="Slim" value="Slim" />
                  </Picker>
                </View>

                <Text style={styles.error}>{errors.bodyType}</Text>
                <View style={styles.inputView}>
                  <Picker
                    selectedValue={complexionValue}
                    style={{
                      height: 30,
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
                <Text style={styles.error}>{errors.complexion}</Text>
                <View style={styles.inputView}>
                  <TextInput
                    // style={styles.inputText}
                    placeholder="Height (CMs)"
                    placeholderTextColor="#003f5c"
                    keyboardType="numeric"
                    autoCapitalize="sentences"
                    // defaultValue={user.email}
                    onChangeText={handleChange('height')}
                    onBlur={handleBlur('height')}
                  />
                </View>
                <Text style={styles.error}>{errors.height}</Text>
                <View style={styles.inputView}>
                  <TextInput
                    // style={styles.inputText}
                    placeholder="Weight (KGs)"
                    placeholderTextColor="#003f5c"
                    keyboardType="numeric"
                    autoCapitalize="sentences"
                    // defaultValue={user.email}
                    onChangeText={handleChange('weight')}
                    onBlur={handleBlur('weight')}
                  />
                </View>
                <Text style={styles.error}>{errors.weight}</Text>
              </Fragment>
            )}

            <TouchableOpacity style={styles.loginBtn} onPress={handleSubmit}>
              <Text style={styles.loginText}>
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

      <TouchableOpacity style={{marginBottom: '10%'}}>
        <Text Style={{fontWeight: 'bold', color: 'black'}}>Skip</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
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
    marginBottom: -15,
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 50,
    color: '#fb5b5a',
    marginBottom: 40,
  },
  inputView: {
    flexDirection: 'row',
    width: '80%',
    marginBottom: '1%',
    justifyContent: 'flex-start',
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: '5%',
  },
  inputText: {
    // height: 50,
    width: '100%',
    color: '#000000',
    marginLeft: 15,
  },
  inputViewDes: {
    flexDirection: 'row',
    width: '80%',
    // height: 40,
    marginTop: '5%',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    borderRadius: 10,
  },
  inputTextDes: {
    // height: 50,
    width: '100%',
    color: '#000000',
    marginLeft: 15,
    marginBottom: 5,
  },
  forgot: {
    color: 'white',
    fontSize: 11,
  },
  loginBtn: {
    width: '50%',
    backgroundColor: '#fd9242',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
    paddingBottom: 15,
    paddingTop: 15,
  },
  loginText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
