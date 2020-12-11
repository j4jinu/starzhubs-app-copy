import React, {useContext, useEffect, useState} from 'react';
import {FlatList, Text, View, Image} from 'react-native';
import BuddyRequestItem from '../components/BuddyRequestItem';
import theme from '../config/theme';
import {AuthContext} from '../context/authContext';

const SentConnectionScreen = (props) => {
  const auth = useContext(AuthContext);
  const [isFriends, setIsFriends] = useState([]);
  const unsubscribe = props.navigation.addListener('didFocus', () => {
    console.log('focussed');
    getConnectionRequests();
  });

  useEffect(() => {
    getConnectionRequests();
<<<<<<< HEAD
=======
    unsubscribe;
>>>>>>> d1d768ae77d493c33c55d4df6bc6f6052c3be516
  }, []);
  const getConnectionRequests = () => {
    fetch(`http://13.232.190.226/api/talent/req/sent`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + auth.token,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setIsFriends(response.data.requests);
        console.log('sent req', response.data.requests);
      })
      .catch((error) => {
        alert(error);
      });
  };

  if (isFriends.length === 0) {
    return (
      <View style={{ alignItems: 'center', marginTop: '35%' }}>
        <Text style={{ color: '#F98644', fontWeight: 'bold' }}>No Sent Items</Text>
        <Image
          source={require('../assets/broke.png')}
          style={{
            width: '41%',
            height: 160,
            marginHorizontal: 100,
            marginTop: '5%',
          }}
        />
      </View>
    );
  }

  return (
    <FlatList
      style={{backgroundColor: '#fff'}}
      keyExtractor={(item) => item.id}
      data={isFriends}
      extraData={getConnectionRequests}
      renderItem={({item}) =>
        item.fromUser === auth.userId ? (
          <BuddyRequestItem
            reqId={item._id}
            name={item.toUser.name}
            image={item.toUser.image}
            getConnectionRequests={getConnectionRequests}
            navigation={props.navigation}
            onSelect={() =>
              props.navigation.navigate('UserDetails', {
                userId: item.toUser._id,
              })
            }
          />
        ) : null
      }
    />
  );
};

export default SentConnectionScreen;
