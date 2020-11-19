import React, {useContext, useEffect, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import BuddyRequestItem from '../components/BuddyRequestItem';
import {AuthContext} from '../context/authContext';

const SentConnectionScreen = () => {
  const auth = useContext(AuthContext);
  const [isFriends, setIsFriends] = useState([]);
  useEffect(() => {
    getConnectionRequests();
  });
  const getConnectionRequests = () => {
    fetch(`http://13.232.190.226/api/talent/req/approved`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + auth.token,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setIsFriends(response.data.connections);
      })
      .catch((error) => {
        alert(error);
      });
  };
  return (
    <FlatList
      style={{backgroundColor: '#efefef'}}
      keyExtractor={(item) => item.id}
      data={isFriends}
      extraData={getConnectionRequests}
      renderItem={({item}) =>
        item.fromUser._id === auth.userId ? (
          <BuddyRequestItem
            id={item._id}
            name={item.toUser.name}
            image={item.toUser.image}
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
