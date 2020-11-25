import React, {useState, useContext, useEffect, Fragment} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Picker,
  Alert,
  Image,
  PermissionsAndroid,
  ScrollView
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import Cicon from 'react-native-vector-icons/MaterialIcons';
import Gicon from 'react-native-vector-icons/FontAwesome';
import Eicon from 'react-native-vector-icons/FontAwesome5';
// import * as ImagePicker from 'expo-image-picker';
import {Rating, AirbnbRating} from 'react-native-elements';
// import MultiSelect from 'react-native-multiple-select';
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

const EditTalentScreen = (props) => {
  const talentId = props.navigation.getParam('talentId');
  const category = props.navigation.getParam('category');
  const industry = props.navigation.getParam('industry');
  const userId = props.navigation.getParam('userId');
  const films = props.navigation.getParam('films');
  const years = props.navigation.getParam('years');
  const description = props.navigation.getParam('description');
  const levels = props.navigation.getParam('levels');
  const auth = useContext(AuthContext);
  const [selectedValue, setSelectedValue] = useState('');
  const [industryValue, setIndustryValue] = useState();
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
  const [user, setUser] = useState({image: {}});

  const initialTalentValues = {
    talentId: talentId,
    level: levels,
    experience: years,
    industry: industry,
    films: films,
    description: description,
    // height:''
  };

  const phoneRegExp = /^[0-9]*$/;
  const talentValidationSchema = Yup.object({
    talentId: Yup.string().required('Select one category'),
    level: Yup.string().required('Select your level'),
    industry: Yup.string().required('Select one industry'),
    experience: Yup.string()
      .matches(phoneRegExp, 'Invalid input')
      .required('Enter experience details'),
    films: Yup.string()
      .matches(phoneRegExp, 'Invalid input')
      .required('Enter no. of projects'),
    description: Yup.string().required('Enter talent  details'),
  });

  useEffect(()=> {
    userInfo();
})

const userInfo = ()=>{
  if (talentId === '5fbd408388613013dcef63c4') {
    fetch(`http://13.232.190.226/api/user/${userId}`, {
      method: 'PATCH',
      headers: {
        Authorization: 'Bearer ' + auth.token,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setUser(response.data.user);
        setbodyTypeValue(response.data.user.bodyType)
        setcomplexionValue(response.data.user.complexion)
        // setHeadImage(user.image && user.image.head_shot !== undefined?user.image.head_shot:null)
        console.log("userdetail",headimg);
      })
    .catch((error) => {});
    setIsProfileImageMode(true);
    // setTalent(tid);
    // return;
  } else {
    setIsProfileImageMode(false);
    // setTalent(tid);
    // return;
  }
}    

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
      fetch('http://13.232.190.226/api/category', {
        method: 'GET',
      })
        .then((response) => response.json())
        .then((response) => {
          setCategories(response.categories);
        })
        .catch((error) => {});
    };
    getCategory();
  }, []);

  const handleSubmit = (values, {setSubmitting}) => {
    values.level = level;
    values.industry = selectedItems;
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
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + auth.token,
      },
      body: JSON.stringify({
        chars: {
          industry: values.industry,
          films: values.films,
          years: values.experience,
        },
        description: values.description || '',
        level: values.level,
      }),
    };
    fetch(
      `http://13.232.190.226/api/talent/user/${talentId}`,
      requestOptions,
    )
      .then((response) => response.json())
      .then(
        (response) => {
          if (response.success === true) {
            setMessage('Data updated successfully');
            setVisible(true);
            props.navigation.navigate('Account')
          } else {
            setMessage('Something went wrong. Try again !');
            setVisible(true);
          }
        },
        (error) => {},
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
        {name: 'customOptionKey', title: 'Choose Photo from Custom Option'},
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
        `http://13.232.190.226/api/user/avatar`,
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

  const handleLevelChange = (rating) => {
    setLevel(rating);
  };
  const onDismissSnackBar = () => {
    setVisible(false);
  };
  const onSelectedItemsChange = (selectedItems) => {
    setSelectedItems(selectedItems);
  };
  return (
    <ScrollView>
    <View style={styles.container}>
      <Snackbar visible={visible} duration={7000} onDismiss={onDismissSnackBar}>
        {message}
      </Snackbar>
      <Formik
        enableReinitialize={true}
        initialValues={initialTalentValues}
        validationSchema={talentValidationSchema}
        onSubmit={(values, {setSubmitting}) =>
          handleSubmit(values, {setSubmitting})
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
                marginTop: '6%',
                flexDirection: 'row',
                alignItems: 'center',
                borderColor: errors.link ? 'red' : 'gray',
              }}>
              <Cicon name="merge-type" size={20} style={{color: '#fd9242'}} />
              <Text
                style={{color: 'black', paddingVertical: 15, marginLeft: 15}}>
                {category}
              </Text>
            </View>
            <Text style={styles.error}>{errors.talentId}</Text>

            <View
              style={{
                alignSelf: 'center',
                borderWidth: 1,
                borderRadius: 10,
                width: '90%',
                paddingLeft: 8,
                paddingRight: 8,
                marginTop: '3%',
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
                borderRadius: 10,
                width: '90%',
                paddingLeft: 8,
                paddingRight: 8,
                marginTop: '3%',
                flexDirection: 'row',
                alignItems: 'center',
                borderColor: errors.link ? 'red' : 'gray',
              }}>
              <View style={{width: '10%'}}>
                <Gicon
                  name="industry"
                  size={15}
                  style={{color: '#fd9242', marginTop: -10}}
                />
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

            <View
              style={{
                alignSelf: 'center',
                borderWidth: 1,
                borderRadius: 10,
                width: '90%',
                paddingLeft: 8,
                paddingRight: 8,
                marginTop: '3%',
                flexDirection: 'row',
                alignItems: 'center',
                borderColor: errors.link ? 'red' : 'gray',
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
                // defaultValue={user.email}
                onChangeText={handleChange('experience')}
                onBlur={handleBlur('experience')}
              />
            </View>

            <Text style={styles.error}>{errors.years}</Text>

            <View
              style={{
                alignSelf: 'center',
                borderWidth: 1,
                borderRadius: 10,
                width: '90%',
                paddingLeft: 8,
                paddingRight: 8,
                marginTop: '3%',
                flexDirection: 'row',
                alignItems: 'center',
                borderColor: errors.link ? 'red' : 'gray',
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
                // defaultValue={user.email}
                onChangeText={handleChange('experience')}
                onBlur={handleBlur('experience')}
              />
            </View>
            <Text style={styles.error}>{errors.films}</Text>
            <View
              style={{
                alignSelf: 'center',
                borderWidth: 1,
                borderRadius: 10,
                width: '90%',
                paddingLeft: 8,
                paddingRight: 8,
                marginTop: '3%',
                flexDirection: 'row',
                alignItems: 'center',
                borderColor: errors.link ? 'red' : 'gray',
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
                defaultValue={description}
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
{/* {user.image && user.image.head_shot !== undefined && (
              <Image
                style={{width: '100%', height: 300, resizeMode: 'cover'}}
                source={{
                  uri: `http://13.232.190.226/api/user/avatar/${user.image.head_shot}`,
                }}
              />
            )} */}


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
                        onPress={() =>
                          requestCameraPermission('right_profile')
                        }>
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

                  <Text style={styles.error}>{errors.bodyType}</Text>
                  <View style={styles.inputView}>
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
                  <Text style={styles.error}>{errors.complexion}</Text>
                  <View style={styles.inputView}>
                    <TextInput
                      // style={styles.inputText}
                      placeholder="Height (CMs)"
                      placeholderTextColor="#003f5c"
                      keyboardType="text"
                      autoCapitalize="sentences"
                      defaultValue={user.height}
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
                      keyboardType="text"
                      autoCapitalize="sentences"
                      defaultValue={user.weight}
                      onChangeText={handleChange('weight')}
                      onBlur={handleBlur('weight')}
                    />
                  </View>
                  <Text style={styles.error}>{errors.weight}</Text>
                </Fragment>
              )}            
            <TouchableOpacity style={styles.registerBtn} onPress={handleSubmit}>
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
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginBottom: -15,
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
