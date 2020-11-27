import React, {useContext, useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {AuthContext} from '../context/authContext';
import MyPosterGridItem from './MyPosterGridItem';

const PosterListExpired = (props) => {
  const auth = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [posters, setPosters] = useState([]);

  useEffect(() => {
    getPosters();
  }, []);
  const getPosters = async (status) => {
    setLoading(true);
    setPosters([]);
    try {
      const response = await fetch(`http://13.232.190.226/api/poster/expired`, {
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

  if (posters.length === 0) {
    return (
      <Text
        style={{
          fontSize: 16,
          marginTop: 20,
          fontWeight: 'bold',
          color: 'tomato',
          textAlign: 'center',
        }}>
        No Expired Posters
      </Text>
    );
  }
  return (
    <View>
      <FlatList
        keyExtractor={(item) => item.id}
        data={posters}
        renderItem={({item}) => (
          <MyPosterGridItem
            id={item.id}
            poster={item.name}
            image={item.image}
            endDate={item.endDate}
            startDate={item.startDate}
            description={item.description}
            userId={item.userId}
            navigation={props.navigation}
            getPosters={getPosters}
          />
        )}
      />
    </View>
  );
};
export default PosterListExpired;
