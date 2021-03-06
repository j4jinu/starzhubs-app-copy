import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
} from 'react-native';
import { useSelector } from 'react-redux';
import PosterGridItem from '../components/PosterGridItem';
import { AuthContext } from '../context/authContext';

const PosterListScreen = (props) => {
  const auth = useContext(AuthContext);
  const [posters, setPosters] = useState([]);

  useEffect(() => {
    getPosters();
  }, []);
  
  const getPosters = async (status) => {
    try {
      const response = await fetch(`http://13.233.216.36:3000/api/poster`, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + auth.token,
        },
      });
      const posterData = await response.json();
      posterData.success ? setPosters(posterData.data.posters) : setPosters([]);
    } catch (error) {
      alert('Something went wrong.');
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fafafa' }}>
      <FlatList
        style={{ backgroundColor: '#white' }}
        keyExtractor={(item) => item.id}
        data={posters}
        renderItem={({ item }) => (
          <PosterGridItem
            id={item._id}
            poster={item.title}
            image={item.image}
            endDate={item.endDate}
            startDate={item.startDate}
            userId={item.userId}
            description={item.description}
            navigation={props.navigation}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 10,
    marginVertical: 10,
  },
});

export default PosterListScreen;
