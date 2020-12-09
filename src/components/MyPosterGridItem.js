import React, { useContext, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  View,
  Alert,
  ToastAndroid,
} from 'react-native';
import theme from '../config/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Moment from 'moment';
import { AuthContext } from '../context/authContext';
import { Snackbar } from 'react-native-paper';
const MyPosterGridItem = (props) => {
  const { userId } = props;
  const auth = useContext(AuthContext);
  const [visible, setVisible] = useState(false);
  const [user, setUser] = useState({ image: {} });
  const confirmDelete = (pid) =>
    Alert.alert(
      'Delete poster',
      'Are you sure to delete this poster',
      [
        {
          text: 'CANCEL',
          style: 'cancel',
        },
        {
          text: 'DELETE',
          onPress: () => posterDeleteHandler(pid),
        },
      ],
      { cancelable: false },
    );
  const posterDeleteHandler = (id) => {
    const requestOptions = {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + auth.token,
      },
    };
    fetch(`http://13.232.190.226/api/poster/${id}`, requestOptions)
      .then((response) => response.json())
      .then(
        (response) => {
          if (response.success === true) {
            showToastWithGravityAndOffset();
            props.getPosters();
          } else {
            alert(error);
          }
        },
        (error) => {
          alert('Something went wrong. Try again later.');
        },
      );
  };
  const showToastWithGravityAndOffset = () => {
    ToastAndroid.showWithGravityAndOffset(
      ' Poster Deleted successfully',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      50,
      100,
    );
  };
  return (
    <>
      <View style={styles.containerSnackbar}></View>
      <TouchableOpacity
        style={styles.gridItem}
        onPress={() =>
          props.navigation.navigate('UserPosterDetails', {
            posterId: props.id,
            title: props.poster,
            image: props.image,
            description: props.description,
            endDate: props.endDate,
            startDate: props.startDate,
            user: userId,
          })
        }
        activeOpacity={0.7}>
        <View style={styles.container}>
          <Image
            style={{
              width: '100%',
              height: 200,
              borderTopLeftRadius: 10,
              borderTopLeftRadius: 10,
            }}
            resizeMode={'cover'}
            source={{
              uri: `http://13.232.190.226/api/poster/view/${props.image}`,
            }}
          />
          <View style={styles.owner}>
            <Image
              style={{
                width: 30,
                height: 30,
                borderRadius: 100,
              }}
              source={{
                uri:
                  userId.image === undefined
                    ? `https://img.dtnext.in/Articles/2020/Jun/202006031350583978_Prithviraj-Sukumaran-tests-negative-for-COVI
                                    D19_SECVPF.gif`
                    : `http://13.232.190.226/api/user/avatar/${userId.image.avatar}`,
              }}
            />

            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                //paddingHorizontal: 15,
              }}>
              <View style={styles.ownerDetails}>
                <Text style={{ fontSize: 13 }}>{userId.name}</Text>
                <Text style={{ fontSize: 10, color: 'gray' }}>
                  {Moment(props.endDate).format('DD/MM/YYYY')}
                </Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                {props.status === 'expired' ||
                  props.status === 'rejected' ? null : (
                    <TouchableOpacity
                      style={{
                        padding: 10,
                        backgroundColor: '#f2f2f2',
                        borderRadius: 100,
                        marginHorizontal: 5,
                      }}
                      onPress={() =>
                        props.navigation.navigate('EditPoster', {
                          posterId: props.id,
                          title: props.poster,
                          image: props.image,
                          description: props.description,
                          endDate: props.endDate,
                          startDate: props.startDate,
                          user: userId,
                        })
                      }>
                      <Icon name="edit" size={25} color="blue" />
                    </TouchableOpacity>
                  )}
                <TouchableOpacity
                  style={{
                    padding: 10,
                    backgroundColor: '#f2f2f2',
                    borderRadius: 100,
                    marginHorizontal: 5,
                  }}
                  onPress={() => confirmDelete(props.id)}>
                  <Icon name="delete" size={25} color="red" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <Text style={styles.title}>{props.poster}</Text>
          <Text
            numberOfLines={4}
            style={{
              marginHorizontal: 15,
              color: theme.$primaryColorText,
              marginTop: 5,
              lineHeight: 20,
            }}>
            {props.description}
          </Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  containerSnackbar: {
    flex: 1,
    // justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  gridItem: {
    flex: 1,
    width: '95%',
    borderRadius: 10,
    alignSelf: 'center',
    borderRadius: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: 'gray',
    // shadowColor: "#000",
    // shadowOffset: {
    //     width: 0,
    //     height: 3,
    // },
    // shadowOpacity: 0.26,
    // shadowRadius: 1,
    // elevation: 1,
    paddingBottom: 20,
  },
  gridItemText: {
    fontFamily: 'montserrat-medium',
    fontSize: 16,
  },
  owner: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginTop: 10,
    marginLeft: 15,
  },
  ownerDetails: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 15,
    marginTop: '-6%',
  },
  title: {
    alignSelf: 'flex-start',
    marginLeft: 15,
    marginTop: 10,
    fontSize: 17,
    fontWeight: 'bold',
    color: theme.$primaryColorText,
  },
});

export default MyPosterGridItem;
