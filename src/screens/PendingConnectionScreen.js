import React, { useContext, useEffect, useState } from 'react';
import { FlatList, Text, View, Image, ActivityIndicator } from 'react-native';
import BuddyRequestItem from '../components/BuddyRequestItem';
import theme from '../config/theme';
import { AuthContext } from '../context/authContext';
const PendingConnectionScreen = (props) => {
  const auth = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [requests, setRequests] = useState([]);
  const unsubscribe = props.navigation.addListener('didFocus', () => {
    getRequests();
  });

  useEffect(() => {
    getRequests();
    unsubscribe;
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
        setRequests(response.data.requests);
        setUserImages(response.data.requests.fromUser.image);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert(response.message);
      });
  };

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
          paddingTop: 50,
        }}>
        <ActivityIndicator size={'large'} color={theme.$primaryColor} />
      </View>
    );
  }

  if (requests.length === 0) {
    return (
      <View style={{ alignItems: 'center', marginTop: '35%' }}>
        <Text style={{ color: '#F98644', fontWeight: 'bold' }}>No Requests</Text>
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
          getRequests={getRequests}
          reqType="received"
          onSelect={() =>
            props.navigation.navigate('UserDetails', {
              userId: item.fromUser._id,
            })
          }
          getConnection={getRequests}
          navigation={props.navigation}
        />
      )}
    />
  );
};

export default PendingConnectionScreen;
