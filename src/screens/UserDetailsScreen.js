import React, {useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  ScrollView,
  TouchableOpacity,
  Modal,
  Alert,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AIcon from 'react-native-vector-icons/AntDesign';
import Swiper from 'react-native-swiper';
import ImageViewer from 'react-native-image-zoom-viewer';
import theme from '../config/theme';
import UserTalentSection from '../components/UserTalentSection';
import UserMediaSection from '../components/UserMediaSection';
import UserPosterSection from '../components/UserPosterSection';
import Moment from 'moment';
import {AuthContext} from '../context/authContext';
import * as yup from 'yup';
import {Formik} from 'formik';
import {Snackbar} from 'react-native-paper';

const UserDetailsScreen = (props) => {
  const auth = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const userId = props.navigation.getParam('userId');
  const [user, setUser] = useState({image: {}});
  const [talents, setTalents] = useState([]);
  const [posters, setPosters] = useState([]);
  const [userLocation, setUserLocation] = useState({});
  const [content, setContent] = useState('T');
  const [isRequestModal, setRequestModal] = useState(false);
  const [loggedUser, setLoggedUser] = useState([]);
  const [checked, setChecked] = useState([]);
  const [isFriends, setIsFriends] = useState({details: {}});
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState();
  const [categoryId, setCategoryId] = useState('');
  const [showModal, setshowModal] = useState(false);
  const [imageIndex, setimageIndex] = useState(0);
  const [actorMode, setActorMode] = useState(false);
  const images = [];

  if (user.image !== undefined) {
    if (user.image.avatar !== undefined) {
      images.push({
        url: `http://13.232.190.226/api/user/avatar/${user.image.avatar}`,
        props: {
          source: `http://13.232.190.226/api/user/avatar/${user.image.avatar}`,
        },
      });
    }
    if (user.image.head_shot !== undefined) {
      images.push({
        url: `http://13.232.190.226/api/user/avatar/${user.image.head_shot}`,
        props: {
          source: `http://13.232.190.226/api/user/avatar/${user.image.head_shot}`,
        },
      });
    }
    if (user.image.left_profile !== undefined) {
      images.push({
        url: `http://13.232.190.226/api/user/avatar/${user.image.left_profile}`,
        props: {
          source: `http://13.232.190.226/api/user/avatar/${user.image.left_profile}`,
        },
      });
    }
    if (user.image.right_profile !== undefined) {
      images.push({
        url: `http://13.232.190.226/api/user/avatar/${user.image.right_profile}`,
        props: {
          source: `http://13.232.190.226/api/user/avatar/${user.image.right_profile}`,
        },
      });
    }
    if (user.image.fullsize !== undefined) {
      images.push({
        url: `http://13.232.190.226/api/user/avatar/${user.image.fullsize}`,
        props: {
          source: `http://13.232.190.226/api/user/avatar/${user.image.fullsize}`,
        },
      });
    }
  }

  useEffect(() => {
    const getUserDetails = () => {
      fetch(`http://13.232.190.226/api/user/${userId}`, {
        method: 'PATCH',
        headers: {
          Authorization: 'Bearer ' + auth.token,
        },
      })
        .then((response) => response.json())
        .then((response) => {
          setUser(response.data.user);
          setTalents(response.data.talents);
          setUserLocation(response.data.user.location);
          setPosters(response.data.posters);
          checkActorMode(response.data.talents);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
        });
    };
    getUserDetails();
  }, []);

  useEffect(() => {
    checkFriendship();
  }, []);

  useEffect(() => {
    getLoggedUser();
  }, []);

  const checkActorMode = (talents) => {
    talents.forEach((talent) => {
      const category = talent.category;
      if (category.title === 'Actor' || category.title === 'Model') {
        setActorMode(true);
        return;
      }
    });
  };

  const getLoggedUser = () => {
    fetch(`http://13.232.190.226/api/user/profile`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + auth.token,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setLoggedUser(response.data.user);
      })
      .catch((error) => {});
  };

  const calculateAge = (dob) => {
    var dobYear = Moment(user.dob).format('YYYY');
    var today = new Date();
    var toYear = Moment(today).format('YYYY');
    var dobMonth = Moment(user.dob).format('MM');
    var toMonth = Moment(today).format('MM');
    var dobDate = Moment(user.dob).format('DD');
    var toDate = Moment(today).format('DD');
    var age = toYear - dobYear;
    var m = toMonth - dobMonth;
    if (m < 0 || (m === 0 && toDate < dobDate)) {
      age--;
    }
    return age;
  };

  const checkFriendship = () => {
    fetch(`http://13.232.190.226/api/user/connection/status/${userId}`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + auth.token,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setIsFriends(response.data);
      })
      .catch((error) => {});
  };

  const handleRequest = () => {
    if (loggedUser.isAdminApproved === 0) {
      Alert.alert(
        '',
        'Only Admin Approved User Can Sent Request. Your Profile is Under Validation.',
        [
          {
            text: 'Ok',
            style: 'cancel',
          },
        ],
        {cancelable: false},
      );
    } else {
      setRequestModal(true);
    }
  };

  const initValues = {
    notes: '',
  };

  const validation = yup.object({
    notes: yup.string().required('Please say something'),
  });

  const handleSubmit = (values) => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + auth.token,
      },
      body: JSON.stringify({
        talents: checked,
        notes: values.notes,
        userId: userId,
      }),
    };
    fetch(`http://13.232.190.226/api/talent/req/user`, requestOptions)
      .then((response) => response.json())
      .then(
        (response) => {
          if (response.success === true) {
            checkFriendship();
            setRequestModal(false);
            const msg = 'Request Sent Successfully';
            setMessage(msg);
            setVisible(!visible);
          } else {
            const msg = 'Something went wrong. Try again!';
            setMessage(msg);
            setVisible(!visible);
          }
        },
        (error) => {
        },
      );
  };

  const handleToggle = (value) => {
    const newChecked = [...checked];
    const currentIndex = checked.indexOf(value);
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  const cancelRequest = () => {
    Alert.alert(
      'Cancel Request',
      'Do you want to cancel this request?',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => requestDeleteHandler(isFriends.details._id),
        },
      ],
      {cancelable: false},
    );
  };

  const requestDeleteHandler = (requestId) => {
    fetch(`http://13.232.190.226/api/talent/req/reject/${requestId}`, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + auth.token,
      },
    })
      .then((response) => response.json())
      .then(
        (response) => {
          if (response.success === true) {
            checkFriendship();
            const msg = 'Request Cancelled Successfully';
            setMessage(msg);
            setVisible(!visible);
          } else {
            const msg = 'Something went wrong. Try again!';
            setMessage(msg);
            setVisible(!visible);
          }
        },
        (error) => {
          alert('Failed: ' + error);
        },
      );
  };

  const handleClickOpenDecline = () => {
    Alert.alert(
      'Remove Connection',
      'Are you sure to remove this connection?',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {text: 'Yes', onPress: () => unfriendRequest(isFriends.details._id)},
      ],
      {cancelable: false},
    );
  };

  const handleRecievedRequest = () => {
    Alert.alert(
      'Respond To Request',
      "How you'd like to respond to this request?",
      [
        {
          text: 'Do Later',
          style: 'cancel',
        },
        {
          text: 'Decline',
          onPress: () => unfriendRequest(isFriends.details._id),
          style: 'cancel',
        },
        {text: 'Accept', onPress: () => approveRequest(isFriends.details._id)},
      ],
      {cancelable: false},
    );
  };

  const approveRequest = (requestId) => {
    fetch(`http://13.232.190.226/api/talent/user/approve/${requestId}/1`, {
      method: 'PUT',
      headers: {
        Authorization: 'Bearer ' + auth.token,
      },
    })
      .then((response) => response.json())
      .then(
        (response) => {
          if (response.success === true) {
            checkFriendship();
            const msg = 'Request Approved Successfully';
            setMessage(msg);
            setVisible(!visible);
          } else {
            const msg = 'Something went wrong. Try again!';
            setMessage(msg);
            setVisible(!visible);
          }
        },
        (error) => {
          alert('Failed: ' + error);
        },
      );
  };

  const unfriendRequest = (requestId) => {
    fetch(`http://13.232.190.226/api/talent/req/reject/${requestId}`, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + auth.token,
      },
    })
      .then((response) => response.json())
      .then(
        (response) => {
          if (response.success === true) {
            checkFriendship();
            const msg = 'Connection Removed Successfully';
            setMessage(msg);
            setVisible(!visible);
          } else {
            const msg = 'Something went wrong. Try again!';
            setMessage(msg);
            setVisible(!visible);
          }
        },
        (error) => {
          alert('Failed: ' + error);
        },
      );
  };

  const onDismissSnackBar = () => {
    setVisible(false);
  };

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
        }}>
        <ActivityIndicator size={'large'} color={theme.$primaryColor} />
      </View>
    );
  }

  const footerModal = () =>{
    return(
      <View style={{width:'100%', flexDirection:'row', alignItems:'center',justifyContent:'center', marginBottom:'10%'}}>
        <View style={{ flexDirection:'column', width:'100%'}}>
          <Text style={{color:'white',textAlign:'center', textAlignVertical:'center', width:'100%' }}>Swipe down to close</Text>
          <AIcon name="arrowdown" size={20} color="white" style={{alignSelf:'center'}} />
        </View>
      </View>
    )
  }

  return (
    <>
      <Snackbar visible={visible} duration={7000} onDismiss={onDismissSnackBar}>
        {message}
      </Snackbar>
      <View style={styles.container}>
        <ScrollView>
          <Swiper height={300} showsPagination={true}>
            {user.image && user.image.avatar !== undefined && (
              <TouchableOpacity
                onPress={() => {
                  setimageIndex(0);
                  setshowModal(true);
                }}>
                <Image
                  key={user.image.avatar}
                  style={{width: '100%', height: 300, resizeMode: 'cover'}}
                  source={{
                    uri: `http://13.232.190.226/api/user/avatar/${user.image.avatar}`,
                    cache: 'reload',
                  }}
                />
              </TouchableOpacity>
            )}
            {user.image && user.image.head_shot !== undefined && (
              <TouchableOpacity
                onPress={() => {
                  setimageIndex(1);
                  setshowModal(true);
                }}>
                <Image
                  style={{width: '100%', height: 300, resizeMode: 'cover'}}
                  source={{
                    uri: `http://13.232.190.226/api/user/avatar/${user.image.head_shot}`,
                  }}
                />
              </TouchableOpacity>
            )}
            {user.image && user.image.left_profile !== undefined && (
              <TouchableOpacity
                onPress={() => {
                  setimageIndex(2);
                  setshowModal(true);
                }}>
                <Image
                  style={{width: '100%', height: 300, resizeMode: 'cover'}}
                  source={{
                    uri: `http://13.232.190.226/api/user/avatar/${user.image.left_profile}`,
                  }}
                />
              </TouchableOpacity>
            )}
            {user.image && user.image.right_profile !== undefined && (
              <TouchableOpacity
                onPress={() => {
                  setimageIndex(3);
                  setshowModal(true);
                }}>
                <Image
                  style={{width: '100%', height: 300, resizeMode: 'cover'}}
                  source={{
                    uri: `http://13.232.190.226/api/user/avatar/${user.image.right_profile}`,
                  }}
                />
              </TouchableOpacity>
            )}
            {user.image && user.image.fullsize !== undefined && (
              <TouchableOpacity
                onPress={() => {
                  setimageIndex(4);
                  setshowModal(true);
                }}>
                <Image
                  style={{width: '100%', height: 300, resizeMode: 'cover'}}
                  source={{
                    uri: `http://13.232.190.226/api/user/avatar/${user.image.fullsize}`,
                  }}
                />
              </TouchableOpacity>
            )}
          </Swiper>
          {userId !== auth.userId &&
            user.isAdminApproved !== 0 &&
            user.isAdminApproved !== 2 && (
              <>
                {isFriends.type === 'sent' &&
                  (isFriends.status === 'AdminPending' ||
                    isFriends.status === 'Pending') && (
                    <TouchableOpacity
                      style={styles.requestedBtn}
                      onPress={cancelRequest}
                      activeOpacity={0.7}>
                      <Icon
                        name="account-arrow-right"
                        size={25}
                        color={'white'}
                      />
                      <Text
                        style={{
                          color: 'white',
                          paddingLeft: '3%',
                          fontWeight: 'bold',
                        }}>
                        Request Sent
                      </Text>
                    </TouchableOpacity>
                  )}
                {isFriends.status === 'Strangers' && (
                  <TouchableOpacity
                    style={styles.requestBtn}
                    onPress={handleRequest}
                    activeOpacity={0.7}>
                    <Icon name="account-plus" size={25} color={'white'} />
                  </TouchableOpacity>
                )}
                {isFriends.status === 'Connected' && (
                  <TouchableOpacity
                    style={styles.requestBtn}
                    onPress={handleClickOpenDecline}
                    activeOpacity={0.7}>
                    <Icon name="account-check" size={25} color={'white'} />
                  </TouchableOpacity>
                )}
                {isFriends.type === 'received' &&
                  isFriends.status === 'Pending' && (
                    <TouchableOpacity
                      style={styles.requestBtn}
                      onPress={handleRecievedRequest}
                      activeOpacity={0.7}>
                      <Icon
                        name="account-arrow-left"
                        size={25}
                        color={'white'}
                      />
                    </TouchableOpacity>
                  )}
              </>
            )}
          <Text style={styles.personName}>{user.name}</Text>
          <Text style={styles.otherText}>
            {user.gender}, {calculateAge(user.dob)} yrs,{' '}
            {Moment(user.dob).format('DD/MM/YYYY')}
          </Text>
          <Text style={styles.otherText}>
            {userLocation === undefined
              ? null
              : (userLocation.place, userLocation.state)}
          </Text>
          <Text style={styles.otherText}>{user.bio}</Text>
          {actorMode && (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginVertical: 15,
                backgroundColor: '#fff',
                paddingVertical: 8,
              }}>
              <View>
                <Text style={styles.subtitle}>Height</Text>
                <Text>{user.height}</Text>
              </View>
              <View>
                <Text style={styles.subtitle}>Weight</Text>
                <Text>{user.weight}</Text>
              </View>
              <View>
                <Text style={styles.subtitle}>Complexion</Text>
                <Text>{user.complexion}</Text>
              </View>
              <View>
                <Text style={styles.subtitle}>Body</Text>
                <Text>{user.bodyType}</Text>
              </View>
            </View>
          )}
          {isFriends.status === 'Connected' && (
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: '#fff',
                paddingVertical: 8,
                paddingLeft: '6%',
              }}>
              <View style={{width: '50%'}}>
                <Text style={styles.subtitle}>Email</Text>
                <Text>{user.email}</Text>
              </View>
              <View>
                <Text style={styles.subtitle}>Contact no</Text>
                <Text>{user.phone}</Text>
              </View>
            </View>
          )}
          <View style={styles.row}>
            <TouchableOpacity
              onPress={() => setContent('T')}
              activeOpacity={0.7}
              style={{
                borderColor: content === 'T' ? 'orange' : '#eee',
                borderBottomWidth: 3,
                paddingVertical: 5,
                paddingHorizontal: 8,
                paddingBottom: 12,
                width: '24%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{fontWeight: 'bold'}}>Talents</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setContent('M')}
              activeOpacity={0.7}
              style={{
                borderColor: content === 'M' ? 'orange' : '#eee',
                borderBottomWidth: 3,
                paddingVertical: 5,
                paddingHorizontal: 8,
                paddingBottom: 12,
                width: '24%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{fontWeight: 'bold'}}>Media</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setContent('P')}
              activeOpacity={0.7}
              style={{
                borderColor: content === 'P' ? 'orange' : '#eee',
                borderBottomWidth: 3,
                paddingVertical: 5,
                paddingHorizontal: 8,
                paddingBottom: 12,
                width: '24%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{fontWeight: 'bold'}}>Posters</Text>
            </TouchableOpacity>
          </View>
          {content === 'T' && (
            <UserTalentSection
              talents={talents}
              navigation={props.navigation}
            />
          )}
          {content === 'M' && (
            <UserMediaSection talents={talents} navigation={props.navigation} />
          )}
          {content === 'P' && (
            <UserPosterSection
              user={user}
              posters={posters}
              navigation={props.navigation}
            />
          )}
        </ScrollView>

        {/* Request Modal */}

        <Modal transparent visible={isRequestModal} animationType="slide">
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#000000aa',
            }}
            onPress={() => setVisible(false)}>
            <View
              style={{
                margin: 5,
                backgroundColor: 'white',
                borderRadius: 3,
                width: '95%',
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderBottomWidth: 1,
                  paddingVertical: 12,
                  backgroundColor: '#f5f5f5',
                  borderColor: 'gray',
                }}>
                <Text
                  style={{
                    color: theme.$primaryColorText,
                    marginLeft: 15,
                    color: theme.$primaryColorText,
                    fontSize: 17,
                  }}>
                  Request Talents
                </Text>
                <TouchableOpacity onPress={() => setRequestModal(false)}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: 'bold',
                      marginRight: 12,
                    }}>
                    X
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  paddingHorizontal: 15,
                  paddingVertical: 15,
                  width: '100%',
                }}>
                <View style={{marginBottom: 5}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      width: '100%',
                    }}>
                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}>
                      {talents.map((item) => (
                        <TouchableOpacity
                          key={item._id}
                          onPress={() => {
                            handleToggle(item._id);
                          }}
                          style={
                            checked.indexOf(item._id) === -1
                              ? styles.categoryItem
                              : styles.categoryItemActive
                          }>
                          <Text
                            style={
                              checked.indexOf(item._id) === -1
                                ? {color: theme.$primaryColorText}
                                : {color: 'white'}
                            }>
                            {item.category.title}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>
                </View>
                <View style={{width: '100%'}}>
                  <Formik
                    initialValues={initValues}
                    validationSchema={validation}
                    onSubmit={(values) => {
                      handleSubmit(values);
                    }}>
                    {({
                      values,
                      handleChange,
                      errors,
                      setFieldTouched,
                      touched,
                      isValid,
                      handleSubmit,
                    }) => (
                      <View
                        style={{
                          marginTop: 10,
                          width: '100%',
                        }}>
                        <TextInput
                          style={{
                            borderWidth: 1,
                            borderColor: 'orange',
                            borderRadius: 4,
                            paddingLeft: 10,
                            width: '100%',
                          }}
                          underlineColorAndroid="transparent"
                          placeholder="Message"
                          numberOfLines={6}
                          multiline={true}
                          onChangeText={handleChange('notes')}
                          onBlur={() => setFieldTouched('notes')}
                        />
                        {touched.notes && errors.notes && (
                          <Text
                            style={{
                              fontSize: 14,
                              color: 'tomato',
                              alignSelf: 'flex-start',
                              marginTop: 5,
                            }}>
                            {errors.notes}
                          </Text>
                        )}
                        <View
                          style={{
                            marginTop: 20,
                            width: '100%',
                            alignItems: 'center',
                          }}>
                          <TouchableOpacity
                            style={{
                              borderRadius: 8,
                              paddingHorizontal: 12,
                              paddingVertical: 12,
                              width: '100%',
                              backgroundColor: theme.$primaryColor,
                              alignItems: 'center',
                            }}
                            onPress={handleSubmit}>
                            <Text style={{color: 'white', fontWeight: 'bold'}}>
                              Send Request
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    )}
                  </Formik>
                </View>
              </View>
            </View>
          </View>
        </Modal>
        <Modal visible={showModal} transparent={true}>
          <ImageViewer
            imageUrls={images}
            enableSwipeDown
            onSwipeDown={() => setshowModal(false)}
            renderFooter={footerModal}
          />
        </Modal>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  requestBtn: {
    backgroundColor: theme.$primaryColor,
    borderRadius: 100,
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    alignSelf: 'flex-end',
    marginTop: -25,
    marginRight: 15,
  },
  requestedBtn: {
    backgroundColor: theme.$primaryColor,
    borderRadius: 10,
    height: 50,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    alignSelf: 'flex-end',
    marginTop: -25,
    marginRight: 15,
    flexDirection: 'row',
  },
  personName: {
    fontWeight: 'bold',
    fontSize: 18,
    color: theme.$primaryColorText,
    marginLeft: 15,
    marginTop: 5,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#eee',
    paddingVertical: 5,
    paddingHorizontal: 8,
  },
  subtitle: {
    fontWeight: 'bold',
    color: theme.$primaryColorText,
  },
  otherText: {
    marginHorizontal: 15,
    marginVertical: 1,
    fontSize: 14,
    color: theme.$primaryColorText,
  },
  wrapper: {height: 300},
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  categoryItem: {
    backgroundColor: 'white',
    borderRadius: 50,
    borderColor: theme.$primaryColorText,
    borderWidth: 1,
    marginHorizontal: 5,
    paddingHorizontal: 15,
    paddingVertical: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryItemActive: {
    backgroundColor: theme.$primaryColor,
    borderRadius: 50,
    marginHorizontal: 5,
    paddingHorizontal: 15,
    paddingVertical: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputField: {
    alignSelf: 'center',
    width: '90%',
    textTransform: 'lowercase',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 8,
    fontFamily: 'montserrat-regular',
  },
});

export default UserDetailsScreen;
