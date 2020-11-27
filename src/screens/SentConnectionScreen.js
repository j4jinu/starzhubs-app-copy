import React, { useContext, useEffect, useState } from 'react';
import { FlatList, Text, View, Image } from 'react-native';
import BuddyRequestItem from '../components/BuddyRequestItem';
import theme from '../config/theme';
import { AuthContext } from '../context/authContext';

const SentConnectionScreen = () => {
  const auth = useContext(AuthContext);
  const [isFriends, setIsFriends] = useState([]);
  useEffect(() => {
    getConnectionRequests();
  });
  const getConnectionRequests = () => {
    fetch(`http://13.232.190.226/api/talent/req/sent`, {
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

  if (isFriends === undefined) {
    return (
      <View style={{ alignItems: 'center', marginTop: '35%' }}>
        <Text style={{ color: theme.$primaryColor, fontWeight: 'bold' }}>
          No Requests
          </Text>
        <Image
          source={require('../assets/broke.png')}
          style={{ width: "41%", height: 160, marginHorizontal: 100, marginTop: "5%" }}
        />
      </View>
    );
  }

  return (
    <FlatList
      style={{ backgroundColor: '#efefef' }}
      keyExtractor={(item) => item.id}
      data={isFriends}
      extraData={getConnectionRequests}
      renderItem={({ item }) =>
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
