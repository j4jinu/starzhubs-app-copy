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
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Swiper from 'react-native-swiper';
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
        })
        .catch((error) => {});
    };
    getUserDetails();
  }, []);

  useEffect(() => {
    checkFriendship();
  }, []);

  useEffect(() => {
    getLoggedUser();
  }, []);

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
        console.log('friends', isFriends);
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
          console.warn(error);
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
      'Decline Request',
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

  return (
    <>
      <Snackbar visible={visible} duration={7000} onDismiss={onDismissSnackBar}>
        {message}
      </Snackbar>

      <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
        <View style={styles.container}>
          <Swiper style={styles.wrapper} showsButtons={false}>
            {user.image && user.image.avatar !== undefined && (
              <Image
                key={user.image.avatar}
                style={{width: '100%', height: 300, resizeMode: 'cover'}}
                source={{
                  uri: `http://13.232.190.226/api/user/avatar/${user.image.avatar}`,
                  cache:'reload'
                }}
              />
            )}
            {user.image && user.image.head_shot !== undefined && (
              <Image
                style={{width: '100%', height: 300, resizeMode: 'cover'}}
                source={{
                  uri: `http://13.232.190.226/api/user/avatar/${user.image.head_shot}`,
                }}
              />
            )}
            {user.image && user.image.left_profile !== undefined && (
              <Image
                style={{width: '100%', height: 300, resizeMode: 'cover'}}
                source={{
                  uri: `http://13.232.190.226/api/user/avatar/${user.image.left_profile}`,
                }}
              />
            )}
            {user.image && user.image.right_profile !== undefined && (
              <Image
                style={{width: '100%', height: 300, resizeMode: 'cover'}}
                source={{
                  uri: `http://13.232.190.226/api/user/avatar/${user.image.right_profile}`,
                }}
              />
            )}
            {user.image && user.image.fullsize !== undefined && (
              <Image
                style={{width: '100%', height: 300, resizeMode: 'cover'}}
                source={{
                  uri: `http://13.232.190.226/api/user/avatar/${user.image.fullsize}`,
                }}
              />
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
                      style={styles.requestBtn}
                      onPress={cancelRequest}
                      activeOpacity={0.7}>
                      <Icon
                        name="account-arrow-right"
                        size={25}
                        color={'white'}
                      />
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
            {userLocation.place}, {userLocation.state}
          </Text>
          <Text style={styles.otherText}>{user.bio}</Text>
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
        </View>

        {/* Request Modal */}

        <Modal transparent visible={isRequestModal} animationType="slide">
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              // marginTop: 22,
              backgroundColor:'#000000aa'
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
              {/* <View style={{flexDirection: 'row-reverse', marginBottom: 40}}>
                <TouchableOpacity
                  onPress={() => setRequestModal(false)}
                  activeOpacity={0.7}>
                  <Icon name="close-circle" size={35} color={'black'} />
                </TouchableOpacity>
              </View> */}
              <View
                style={{
                  justifyContent: 'center',
                  paddingHorizontal: 15,
                  paddingVertical: 15,
                }}>
                {/* <View style={{alignItems: 'center', width: '100%'}}>
                  {/* <View style={{width: '100%', height: 'auto'}}>
                    <Image
                      style={{width: '100%', height: 200}}
                      source={{
                        uri:
                          user.image !== undefined
                            ? `http://13.232.190.226/api/user/avatar/${user.image.avatar}`
                            : 'https://img.dtnext.in/Articles/2020/Jun/202006031350583978_Prithviraj-Sukumaran-tests-negative-for-COVID19_SECVPF.gif',
                      }}
                    />
                  </View> 
                  <View style={{margin: 10}}>
                    <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                      {user.name}
                    </Text>
                  </View>
                </View> */}
                <View style={{marginBottom: 5}}>
                  <View
                    style={{
                      flexDirection: 'row',
                    }}>
                    {talents.map((item) => (
                      <TouchableOpacity
                        key={item._id}
                        onPress={() => {
                          // setChecked(item._id);
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
                          // value={values.notes}
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
      </ScrollView>
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
