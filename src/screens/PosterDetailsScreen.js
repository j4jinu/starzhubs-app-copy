import React, { useState, useContext, useEffect } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  TextInput,
  Alert,
  Dimensions,
} from 'react-native';
import { useSelector } from 'react-redux';
import theme from '../config/theme';
import Moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DIcon from 'react-native-vector-icons/MaterialIcons';
import AIcon from 'react-native-vector-icons/AntDesign';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { AuthContext } from '../context/authContext';
import { Snackbar } from 'react-native-paper';
const PosterDetailsScreen = (props) => {
  const auth = useContext(AuthContext);
  const posterId = props.navigation.getParam('posterId');
  const title = props.navigation.getParam('title');
  const image = props.navigation.getParam('image');
  const description = props.navigation.getParam('description');
  const endDate = props.navigation.getParam('endDate');
  const startDate = props.navigation.getParam('startDate');
  const [selectedPoster, setSelectedPoster] = useState([]);
  const user = props.navigation.getParam('user');
  const [isRequestModal, setRequestModal] = useState(false);
  const [msg, setmsg] = useState();
  const [visible, setVisible] = useState(false);
  const [enlargeModal, setEnlargeModal] = useState(false)
  const deviceWidth = Dimensions.get('window').width;

  const initialValues = {
    notes: `I'm very much inetersted in your post`,
  };
  const validation = Yup.object({
    notes: Yup.string().required('Please enter  some introductory text'),
  });
  useEffect(() => {
    getPosterById();
  }, []);
  const getPosterById = () => {
    fetch(`http://13.232.190.226/api/poster/${posterId}`, {
      method: 'PATCH',
      headers: {
        Authorization: 'Bearer ' + auth.token,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setSelectedPoster(response.data.poster.requests);
      })
      .catch((error) => { });
  };
  const onSubmitRequest = () => {
    fetch(`http://13.232.190.226/api/poster/req/${posterId}`, {
      method: 'POST',
      headers: {
        'Content-type': 'Application/json',
        Authorization: 'Bearer ' + auth.token,
      },
      body: JSON.stringify({ notes: 'hai' }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log("response", response.success)
        if (response.success === false) {
          Alert.alert('Alert', 'You have already sent a request', [
            {
              Text: 'OK',
              onPress: () => props.navigation.navigate('Posters'),
            },
          ]);
        }

        else {
          props.navigation.navigate('PosterRequest', {
            posterId: posterId,
            image: image,
            description: description,
          });
        }
      })
      .catch((error) => {
        alert(error);
      });
  };
  const updatePosterReq = (id, status) => {
    console.log(id);
    Alert.alert(
      `${status === 1 ? 'Approve' : 'Delete'} Request`,
      `Are you sure to ${status === 1 ? 'Approve' : 'Reject'} this request?`,
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => posterRequestHandler(id, status),
        },
      ],
      { cancelable: false },
    );
  };

  const posterRequestHandler = (id, status) => {
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + auth.token,
      },
      body: JSON.stringify({
        status: status,
      }),
    };
    fetch(`http://13.232.190.226/api/poster/req/${id}`, requestOptions)
      .then((response) => response.json())
      .then(
        (response) => {
          console.log(response);
          if (response.success) {
            if (status === 1) {
              setmsg('Request approved');
            } else {
              setmsg('Request Rejected');
            }
            setVisible(!visible);
            getPosterById();
          } else {
            props.close();
            alert('Error: ' + response.message);
          }
        },
        (error) => {
          alert('Poster updation failed: ' + error);
        },
      );
  };
  const onDismissSnackBar = () => {
    setVisible(false);
  };
  return (
    <>
      <Snackbar visible={visible} duration={7000} onDismiss={onDismissSnackBar}>
        {msg}
      </Snackbar>
      <ScrollView>
        <View style={styles.container}>
          <TouchableOpacity onPress={() => setEnlargeModal(true)}>
            <Image
              style={{
                width: deviceWidth,
                height: deviceWidth / 2,
                backgroundColor: '#e6e6e6',
              }}
              resizeMode="cover"
              source={{
                uri: `http://13.232.190.226/api/poster/view/${image}`,
              }}
            />
          </TouchableOpacity>
          <View style={styles.posterInfo}>
            <Text style={styles.title} numberOfLines={2}>
              {title}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginHorizontal: 5,
                marginVertical: 15,
              }}>
              <View>
                <Text style={{ fontSize: 12 }}>
                  Starts : {Moment(startDate).format('DD/MM/YYYY')}
                </Text>
              </View>
              <View>
                <Text style={{ fontSize: 12 }}>
                  Ends: {Moment(endDate).format('DD/MM/YYYY')}
                </Text>
              </View>
            </View>
            <Text style={{ fontWeight: 'bold', marginHorizontal: 5 }}>
              {'Description'}
            </Text>
            <Text style={styles.description}>{description}</Text>
          </View>
          {user._id === auth.userId ? null : (
            <View style={styles.authorInfo}>
              <Image
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 100,
                }}
                source={{
                  uri: `http://13.232.190.226/api/user/avatar/${user.image.avatar}`,
                }}
              />

              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate('UserDetails', {
                    userId: user._id,
                  })
                }>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    marginLeft: 10,
                  }}>
                  <Text style={{ fontSize: 13 }}>{'Posted By'}</Text>
                  <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                    {user.name}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
          {user._id === auth.userId ? (
            <>
              <View>
                <Text
                  style={{
                    color: theme.$primaryColorText,
                    fontSize: 17,
                    fontWeight: 'bold',
                    marginLeft: 15,
                    marginTop: 20,
                  }}>
                  Requests:
                </Text>
              </View>
              {selectedPoster.length === 0 ? (
                <View
                  style={{
                    backgroundColor: 'white',
                    marginHorizontal: 15,
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                    marginHorizontal: 10,
                    marginTop: 10,
                    paddingVertical: 15,
                    paddingHorizontal: 10,
                    borderRadius: theme.$borderRadius,
                  }}>
                  <Text style={{ color: '', fontSize: 15 }}>
                    No Request to this poster
                  </Text>
                </View>
              ) : (
                  selectedPoster.map((s) => (
                    <View style={styles.authorInfo}>
                      <TouchableOpacity
                        onPress={() =>
                          props.navigation.navigate('UserDetails', {
                            userId: s.requestBy._id,
                          })
                        }
                        style={{ flexDirection: 'row', width: '70%' }}>
                        <Image
                          style={{
                            width: 50,
                            height: 50,
                            borderRadius: 100,
                          }}
                          source={{
                            uri: `http://13.232.190.226/api/user/avatar/${s.requestBy.image.avatar}`,
                            // uri: `http://13.232.190.226/api/user/avatar/${user.image.avatar}`,
                          }}
                        />

                        <View
                          style={{
                            flex: 1,
                            flexDirection: 'column',
                            justifyContent: 'center',
                            marginLeft: 10,
                          }}>
                          <Text style={{ fontSize: 13 }}>{'Requested By'}</Text>
                          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                            {s.requestBy.name}
                          </Text>
                        </View>
                      </TouchableOpacity>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'flex-end',
                          width: '30%',
                        }}>
                        <TouchableOpacity
                          style={{
                            padding: 10,
                            backgroundColor: '#f2f2f2',
                            borderRadius: 100,
                            marginHorizontal: 5,
                          }}
                          onPress={() => updatePosterReq(s._id, 1)}>
                          <AIcon name="check" size={25} color="green" />
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={{
                            padding: 10,
                            backgroundColor: '#f2f2f2',
                            borderRadius: 100,
                            marginHorizontal: 5,
                          }}
                          onPress={() => updatePosterReq(s._id, 2)}>
                          <DIcon name="delete" size={25} color="red" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))
                )}
            </>
          ) : null}
          {user._id === auth.userId ? null : (
            <TouchableOpacity
              onPress={onSubmitRequest}
              activeOpacity={0.7}
              style={styles.requestBtn}>
              <Text style={{ fontSize: 17, color: 'white' }}>
                {'Show Interest'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>

      {/* Poster image modal */}

      <Modal transparent visible={enlargeModal} animationType="slide">
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            // marginTop: 22,
            backgroundColor: '#000000aa'
          }}
        // onPress={() => setVisible(false)}
        >
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
                paddingVertical: 5,
              }}>
              <Text
                style={{
                  color: theme.$primaryColorText,
                  marginLeft: 15,
                  color: theme.$primaryColorText,
                  fontSize: 17,
                }}>

              </Text>
              <TouchableOpacity onPress={() => setEnlargeModal(false)}>
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
                paddingHorizontal: 5,
                paddingVertical: 5,
              }}>
              <Image
                // style={styles.media}
                style={{
                  width: '100%',
                  height: deviceWidth / 2,
                  backgroundColor: '#e6e6e6',
                }}
                source={{
                  uri: `http://13.232.190.226/api/poster/view/${image}`,
                }}
              />
            </View>
          </View>
        </View>
      </Modal>

    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20,
  },
  description: {
    marginHorizontal: 5,
    marginVertical: 5,
    lineHeight: 20,
  },
  posterInfo: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginHorizontal: 10,
    padding: 8,
    marginTop: -10,
    borderRadius: theme.$borderRadius,
  },
  authorInfo: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginHorizontal: 10,
    padding: 8,
    marginTop: 10,
    flexDirection: 'row',
    borderRadius: theme.$borderRadius,
  },
  requestBtn: {
    backgroundColor: theme.$primaryColor,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginHorizontal: 10,
    padding: 12,
    marginTop: 15,
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: theme.$borderRadius,
  },
  title: {
    fontSize: 22,
    textTransform: 'capitalize',
    color: theme.$primaryColor,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    fontSize: 10,
    marginHorizontal: '20%',
  },
  media: {
    width: '100%',
    height: 400,
  },

});

export default PosterDetailsScreen;
