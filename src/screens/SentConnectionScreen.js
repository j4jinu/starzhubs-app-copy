import React, {useContext, useEffect, useState} from 'react';
import {FlatList, Text, View, Image, ActivityIndicator} from 'react-native';
import BuddyRequestItem from '../components/BuddyRequestItem';
import theme from '../config/theme';
import {AuthContext} from '../context/authContext';

const SentConnectionScreen = (props) => {
  const auth = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [isFriends, setIsFriends] = useState([]);

  const unsubscribe = props.navigation.addListener('didFocus', () => {
    getConnectionRequests();
  });

  useEffect(() => {
    getConnectionRequests();
    unsubscribe;
  }, []);

  const getConnectionRequests = () => {
    fetch(`http://13.233.216.36:3000/api/talent/req/sent`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + auth.token,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setIsFriends(response.data.requests);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert(error);
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

  if (isFriends.length === 0) {
    return (
      <View style={{alignItems: 'center', marginTop: '35%'}}>
        <Text style={{color: '#F98644', fontWeight: 'bold'}}>
          No Sent Items
        </Text>
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
