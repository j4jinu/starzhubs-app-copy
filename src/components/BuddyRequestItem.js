import React, { useContext } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import theme from '../config/theme';
import { AuthContext } from '../context/authContext';

const BuddyRequestItem = (props) => {
  const auth = useContext(AuthContext);

  const confirmApprove = () =>
    Alert.alert(
      '',
      'Are you sure to accept this request?',
      [
        {
          text: 'Cancel',
          // onPress: () => {navigation.navigate('My Media')},
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => requestHandler(),
        },
      ],
      { cancelable: false },
    );

  const confirmDelete = () =>
    Alert.alert(
      '',
      'Are you sure to delete this request?',
      [
        {
          text: 'No',
          // onPress: () => {navigation.navigate('My Media')},
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => unfriendRequest(),
        },
      ],
      { cancelable: false },
    );
  const unfriendRequest = () => {
    fetch(`http://13.232.190.226/api/talent/req/reject/${props.reqId}`, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + auth.token,
      },
    })
      .then((response) => response.json())
      .then(
        (response) => {
          if (response.success === true) {
            alert(response.message);
            props.getConnection()
          } else {
            alert(response.message);
          }
        },
        (error) => {
          alert('Failed: ' + error);
        },
      );
  };
  const requestHandler = () => {
    // console.warn(status)
    fetch(`http://13.232.190.226/api/talent/user/approve/${props.reqId}/1`, {
      method: 'PUT',
      headers: {
        Authorization: 'Bearer ' + auth.token,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        alert(response.message);
        props.getConnection()
        props.navigation.navigate('MyConnectionScreen', {
          // navigation: props.navigation,
        });
        
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
       onPress={props.onSelect}>
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
        <Image
          style={{
            width: 75,
            height: 75,
            borderRadius: 100,
          }}
          source={{
            uri: `http://13.232.190.226/api/user/avatar/${props.image.avatar}`,
          }}
        />
        <View style={styles.details}>
          <Text
            style={{
              fontSize: 17,
              marginBottom: 5,
              color: theme.$primaryColorText,
              fontWeight: 'bold',
            }}>
            {props.name}
          </Text>
          <Text style={{ fontSize: 13, color: 'gray', marginTop: 10 }}>
            {'Talent(s) Requested'}
          </Text>
          <Text style={{ fontSize: 15, color: theme.$primaryColorText }}>
            {props.talents}
          </Text>
        </View>
      </View>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          marginTop: 15,
        }}>
        {props.reqType === 'received' ? (
          <>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={confirmDelete}
              style={{
                alignItems: 'center',
                backgroundColor: 'white',
                borderColor: theme.$primaryColor,
                borderWidth: 1,
                paddingVertical: 5,
                paddingHorizontal: 20,
                marginRight: 8,
                borderRadius: theme.$borderRadius,
              }}>
              <Text style={{ color: theme.$primaryColorText }}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              style={{
                alignItems: 'center',
                backgroundColor: theme.$primaryColor,
                paddingVertical: 5,
                paddingHorizontal: 20,
                borderRadius: theme.$borderRadius,
              }}
              onPress={confirmApprove}>
              <Text style={{ color: 'white' }}>Accept</Text>
            </TouchableOpacity>
          </>
        ) : (
            <TouchableOpacity
              activeOpacity={0.7}
              style={{
                alignItems: 'center',
                backgroundColor: theme.$primaryColor,
                paddingVertical: 5,
                paddingHorizontal: 20,
                borderRadius: theme.$borderRadius,
              }}
              onPress={confirmDelete}>
              <Text style={{ color: 'white' }}>Cancel</Text>
            </TouchableOpacity>
          )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: theme.$borderRadius,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.26,
    shadowRadius: 3,
    elevation: 5,
  },
  details: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 10,
  },
});

export default BuddyRequestItem;
