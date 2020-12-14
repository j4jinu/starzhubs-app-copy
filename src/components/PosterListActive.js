import React, { useContext, useEffect, useState } from 'react';
import { FlatList, Text, View, Image, ActivityIndicator } from 'react-native';
import theme from '../config/theme';
import { AuthContext } from '../context/authContext';
import MyPosterGridItem from './MyPosterGridItem';
const PosterListActive = (props) => {
  const auth = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [posters, setPosters] = useState([]);
  const unsubscribe = props.navigation.addListener('didFocus', () => {
    getPosters();
  });

  useEffect(() => {
    getPosters();
    unsubscribe;
  }, []);
  const getPosters = async (status) => {
    setLoading(true);
    setPosters([]);
    try {
      const response = await fetch(`http://13.232.190.226/api/poster/me`, {
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
        <Text style={{ fontSize: 18, color: 'tomato' }}>No Active Posters.</Text>
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
        extraData={posters}
        renderItem={({ item }) => (
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
            status="active"
          />
        )}
      />
    </View>
  );
};

export default PosterListActive;
