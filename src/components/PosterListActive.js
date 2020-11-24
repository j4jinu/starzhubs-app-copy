import React, {useContext, useEffect, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import {AuthContext} from '../context/authContext';
import MyPosterGridItem from './MyPosterGridItem';
const PosterListActive = (props) => {
  const auth = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [posters, setPosters] = useState([]);

  useEffect(() => {
    getPosters();
  }, []);
  const getPosters = async (status) => {
    // setLoading(true);
    setPosters([]);
    try {
      const response = await fetch(`https://api.starzhubs.com/api/poster/me`, {
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
        No Active Posters
      </Text>
    );
  }
  return (
    <View>
      <FlatList
        keyExtractor={(item) => item.id}
        data={posters}
        extraData={posters}
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
          />
        )}
      />
    </View>
  );
};

export default PosterListActive;
