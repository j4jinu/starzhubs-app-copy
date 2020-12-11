import React, { useContext, useEffect, useState } from 'react';
import { FlatList, Text, View, Image } from 'react-native';
import BuddyRequestItem from '../components/BuddyRequestItem';
import { AuthContext } from '../context/authContext';
const PendingConnectionScreen = (props) => {
  const auth = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  useEffect(() => {
    getRequests();
  }, []);

  const getRequests = () => {
    fetch('http://13.232.190.226/api/talent/req/received', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + auth.token,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log('rqs', response.data.requests);
        setRequests(response.data.requests);
        setUserImages(response.data.requests.fromUser.image);
      })
      .catch((error) => {
        alert(response.message);
      });
  };
  if (requests.length === 0) {
    return (
      <View style={{ alignItems: 'center', marginTop: '35%' }}>
        <Text style={{ color: '#F98644', fontWeight: 'bold' }}>No Requests</Text>
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
      data={requests}
      renderItem={({ item }) => (
        <BuddyRequestItem
          reqId={item._id}
          name={item.fromUser.name}
          image={item.fromUser.image}
          talent={item.talent}
          userId={item.fromUser._id}
          reqType="received"
          // navigation={props.navigation}
          onSelect={() =>
            props.navigation.navigate('UserDetails', {
              userId: item.fromUser._id
            })
          }
          getConnection = {getRequests}
          navigation={props.navigation}
        />
      )}
    />
  );
};

export default PendingConnectionScreen;
