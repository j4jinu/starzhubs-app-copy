import React, { useState, useContext, useEffect, Fragment } from 'react';
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
  Alert,
  ImageBackground,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Cicon from 'react-native-vector-icons/MaterialIcons';
import Gicon from 'react-native-vector-icons/FontAwesome';
import Eicon from 'react-native-vector-icons/FontAwesome5';
import ImagePicker from 'react-native-image-picker';
import { Rating, AirbnbRating } from 'react-native-elements';
import { Snackbar } from 'react-native-paper';
import { AuthContext } from '../context/authContext';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Icon from 'react-native-vector-icons/MaterialIcons';
import theme from '../config/theme';
import { ScrollView } from 'react-native-gesture-handler';

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
  const [selectedValue, setSelectedValue] = useState();
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
  const [level, setLevel] = useState(2);
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
    description: '',
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
      fetch(`https://api.starzhubs.com/api/user/talent`, requestOptions)
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
      fetch('https://api.starzhubs.com/api/category', {
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



  const handleSubmit = (values, { setSubmitting }) => {
    setLoading(true);
    // console.warn(JSON.stringify(values));
    // if (industries.length === 0) {
    //     alert("Choose atleast one industry")
    //     return
    // }
    // setOpenBackdrop(true)
    if (selectedValue === undefined || selectedValue === '') {
      Alert.alert(
        '',
        'Select anyone of the category',
        [
          {
            text: 'Ok',
            style: 'cancel',
          },
        ],
        { cancelable: false },
      );
      setLoading(false)
      setSubmitting(false);
      return;
    }
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
      setLoading(false)
      setSubmitting(false);
      return;
    }
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

    fetch(`https://api.starzhubs.com/api/user/talent`, requestOptions)
      .then((response) => response.json())
      .then(
        (response) => {
          if (response.success === true) {
            setLoading(false);
            // const msg =
            //   'New Talent added successfully. Check your profile page and add medias.';
            // setMessage(msg);
            // setVisible(!visible);

            props.navigation.navigate('Account');
            showToastWithGravityAndOffset()
          } else {
            // alert(response.message);
            props.navigation.navigate('Account');
            showToast()


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
  const showToast = () => {
    ToastAndroid.show("Talent already added by the user", ToastAndroid.SHORT);
  };

  const showToastWithGravityAndOffset = () => {
    ToastAndroid.showWithGravityAndOffset(
      "New Talent added successfully.",
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      50,
      100
    );
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
        `https://api.starzhubs.com/api/user/avatar`,
        requestOptions,
      );
      const uploadResData = await uploadRes.json();
      if (!uploadResData.success) {
        setMsg('Something went wrong. Try again!');
        setVisible(!visible);
        return;
      }
      alert(uploadResData.message);
      setMessage('Image uploaded successfully');
      setVisible(!visible);
    } catch (error) {
      console.error('error', error);
    }
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
      console.warn(err);
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
        // imgurl = response.uri;
        uploadAvatar(imgType, response.uri);
      }
    });
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

    <ScrollView>
      <View style={styles.container}>
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
                    borderRadius: 10,
                    width: '90%',
                    paddingLeft: 8,
                    paddingRight: 8,
                    marginTop: 8,
                    flexDirection: 'row',
                    alignItems: 'center',
                    // marginBottom: 5,
                    borderColor: errors.link ? 'red' : 'gray',
                  }}>
                  <Cicon
                    name="merge-type"
                    size={20}
                    style={{
                      color: '#fd9242',
                    }}
                  />
                  <Picker
                    selectedValue={selectedValue}
                    style={{
                      height: 50,
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
                {errors.talentId?<Text style={styles.error}>{errors.talentId}</Text>:null}

                <View
                  style={{
                    alignSelf: 'center',
                    borderWidth: 1,
                    borderRadius: 10,
                    width: '90%',
                    paddingLeft: 8,
                    paddingRight: 8,
                    marginTop: 8,
                    alignItems: 'center',
                    borderColor: errors.link ? 'red' : 'gray',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    paddingLeft: '5%',
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
                    defaultRating={2}
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
                    borderRadius: 10,
                    width: '90%',
                    paddingLeft: 8,
                    paddingRight: 8,
                    marginTop: 8,
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderColor: errors.link ? 'red' : 'gray',
                  }}>
                  <View style={{ width: '7%' }}>
                    <Gicon
                      name="industry"
                      size={15}
                      style={{ color: '#fd9242', marginTop: -10 }}
                    />
                  </View>

                  <View style={{ width: '93%', }}>
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
                {errors.industry?<Text style={styles.error}>{errors.industry}</Text>:null}
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
                    borderColor: errors.experience ? 'red' : 'gray',
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
                    placeholder="Experience"
                    placeholderTextColor="#003f5c"
                    keyboardType="numeric"
                    autoCapitalize="sentences"
                    // defaultValue={user.email}
                    onChangeText={handleChange('experience')}
                    onBlur={handleBlur('experience')}
                  />
                </View>
                {errors.experience?<Text style={styles.error}>{errors.experience}</Text>:null}
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
                    borderColor: errors.projects ? 'red' : 'gray',
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
                    placeholder="No.of Projects"
                    placeholderTextColor="#003f5c"
                    keyboardType="numeric"
                    autoCapitalize="sentences"
                    // defaultValue={user.email}
                    onChangeText={handleChange('projects')}
                    onBlur={handleBlur('projects')}
                  />
                </View>
                {errors.projects?<Text style={styles.error}>{errors.projects}</Text>:null}
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
                  <Cicon
                    name="class"
                    size={15}
                    style={{
                      color: '#fd9242',
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
                {errors.description?<Text style={styles.error}>{errors.description}</Text>:null}
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
                          // paddingLeft: 30,
                          marginTop: 10,
                        }}>
                        <TouchableOpacity
                          onPress={() => {
                            requestCameraPermission('head_shot');
                          }}>
                          <ImageBackground
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
                              justifyContent:'center',
                            }}
                          >
                            <Image
                              source={
                                require('../assets/add-button.png')
                              }
                              style={{
                                alignSelf: 'center',
                                height: 60,
                                width: 60
                              }}
                            />
                            <Text style={{alignSelf:'center', fontSize:12,marginTop:5}}>Upload Head Shot</Text>
                          </ImageBackground>
                        </TouchableOpacity>
                      </View>
                      <View
                        style={{
                          paddingLeft: 30,
                          marginTop: 10,
                        }}>
                        <TouchableOpacity
                          onPress={() => requestCameraPermission('left_profile')}>
                          <ImageBackground
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
                            justifyContent:'center',
                          }}
                        >
                         <Image
                              source={
                                require('../assets/add-button.png')
                              }
                              style={{
                                alignSelf: 'center',
                                height: 60,
                                width: 60
                              }}
                            />
                            <Text style={{alignSelf:'center', fontSize:12,marginTop:5}}>Upload Left Side Shot</Text> 
                        </ImageBackground>
                        </TouchableOpacity>
                      </View>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                      }}>
                      <View
                        style={{
                          // paddingLeft: 30,
                          marginTop: 10,
                          marginBottom: 20,
                        }}>
                        <TouchableOpacity
                          onPress={() =>
                            requestCameraPermission('right_profile')
                          }>
                          <ImageBackground
                          source={
                            !rightimg
                              ? require('../assets/right_profile.jpg')
                              : {
                                  uri: rightimg,
                                }
                          }
                          style={{
                            borderRadius: 50,
                            height: 140,
                            width: 140,
                            justifyContent:'center',
                          }}
                        >
                          <Image
                              source={
                                require('../assets/add-button.png')
                              }
                              style={{
                                alignSelf: 'center',
                                height: 60,
                                width: 60
                              }}
                            />
                            <Text style={{alignSelf:'center', fontSize:12,marginTop:5}}>Upload Right Side Shot</Text>
                        </ImageBackground>
                        </TouchableOpacity>
                      </View>
                      <View
                        style={{
                          paddingLeft: 30,
                          marginTop: 10,
                        }}>
                        <TouchableOpacity
                          onPress={() => requestCameraPermission('fullsize')}>
                          <ImageBackground
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
                            justifyContent:'center',
                          }}
                        >
                          <Image
                              source={require('../assets/add-button.png')}
                              style={{
                                alignSelf: 'center',
                                height: 60,
                                width: 60
                              }}
                            />
                            <Text style={{alignSelf:'center', fontSize:12,marginTop:5}}>Upload Full Size Shot</Text>
                        </ImageBackground>
                        </TouchableOpacity>
                      </View>
                    </View>
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
                    borderColor: errors.bodyType ? 'red' : 'gray',
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

                    {errors.bodyType?<Text style={styles.error}>{errors.bodyType}</Text>:null}
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
                    borderColor: errors.complexion ? 'red' : 'gray',
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
                    {errors.complexion?<Text style={styles.error}>{errors.complexion}</Text>:null}
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
                    borderColor: errors.height ? 'red' : 'gray',
                  }}>
                      <TextInput
                        style={styles.inputText}
                        placeholder="Height (CMs)"
                        placeholderTextColor="#003f5c"
                        keyboardType="numeric"
                        autoCapitalize="sentences"
                        // defaultValue={user.email}
                        onChangeText={handleChange('height')}
                        onBlur={handleBlur('height')}
                      />
                    </View>
                    {errors.height?<Text style={styles.error}>{errors.height}</Text>:null}
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
                    borderColor: errors.weight ? 'red' : 'gray',
                  }}>
                      <TextInput
                        style={styles.inputText}
                        placeholder="Weight (KGs)"
                        placeholderTextColor="#003f5c"
                        keyboardType="numeric"
                        autoCapitalize="sentences"
                        // defaultValue={user.email}
                        onChangeText={handleChange('weight')}
                        onBlur={handleBlur('weight')}
                      />
                    </View>
                    {errors.weight?<Text style={styles.error}>{errors.weight}</Text>:null}
                  </Fragment>
                )}

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
      </View>
    </ScrollView>  );
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
    //marginBottom: -15,
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
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 10,
    width: '90%',
    paddingLeft: 8,
    paddingRight: 8,

    flexDirection: 'row',
    marginTop: '5%',
    justifyContent: 'flex-start',
  },
  inputTextDes: {
    width: '100%',
    color: '#000000',
    marginLeft: 15,
    marginBottom: 5,
    marginTop: 5,
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
});
