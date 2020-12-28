import React, {useContext, useEffect, useState} from 'react';
import {Text, View, Image, ActivityIndicator} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {AuthContext} from '../context/authContext';
import MyPosterGridItem from './MyPosterGridItem';
import theme from '../config/theme';

const PosterListPending = (props) => {
  const unsubscribe = props.navigation.addListener('didFocus', () => {
    getPosters();
  });

  useEffect(() => {
    getPosters();
    unsubscribe;
  }, []);

  const auth = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [posters, setPosters] = useState([]);

  const getPosters = async (status) => {
    setPosters([]);
    try {
      const response = await fetch(`http://13.233.216.36:3000/api/poster/pending`, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + auth.token,
        },
      });
      const posterData = await response.json();
      posterData.success ? setPosters(posterData.data.posters) : null;
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert('Something went wrong.');
    }
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

  if (posters.length === 0) {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 25,
          marginTop: '35%',
        }}>
        <Text style={{fontSize: 18, color: 'tomato'}}>No Pending Posters.</Text>
        <Image
          source={require('../assets/box.png')}
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
    <View>
      <FlatList
        keyExtractor={(item) => item.id}
        data={posters}
        renderItem={({item}) => (
          <MyPosterGridItem
            id={item._id}
            poster={item.title}
            image={item.image}
            endDate={item.endDate}
            startDate={item.startDate}
            description={item.description}
            userId={item.userId}
            getPosters={getPosters}
            navigation={props.navigation}
            status="pending"
          />
        )}
      />
    </View>
  );
};

export default PosterListPending;
