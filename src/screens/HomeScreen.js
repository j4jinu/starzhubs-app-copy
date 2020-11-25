import React, { useEffect } from 'react';
import {
  View,
  FlatList,
  Image,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import UserGridItem from '../components/UserGridItem';
import Axios from 'axios';

const users = [
  { name: 'A', id: 1 },
  { name: 'B', id: 2 },
  { name: 'C', id: 3 },
  { name: 'D', id: 4 },
  { name: 'E', id: 5 },
  { name: 'F', id: 6 },
  { name: 'G', id: 7 },
  { name: 'H', id: 8 },
];

const category = [
  { id: 1, title: 'Actor' },
  { id: 2, title: 'Model' },
  { id: 3, title: 'Singer' },
];

const HomeScreen = (props) => {
  useEffect(() => {
    getRandomUsers();
  });

  const getRandomUsers = async () => {
    axios
      .get('http://13.232.190.226/api/talent/random')
      .then((response) => {
        // handle success
        console.warn(response);
      })
      .catch((error) => {
        // handle error
        console.warn(error);
      });
  };

  const renderCategoryGrid = (category) => {
    return (
      <TouchableOpacity>
        <View>
          <Text>{category.item.title}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderGridItem = (user) => {
    return (
      <UserGridItem
        name={user.item.name}
        onSelect={() => props.navigation.navigate('UserDetails')}
      />
    );
  };

  return (
    <ScrollView>
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <ScrollView horizontal>
          {category.map((cat) => (
            <TouchableOpacity style={styles.categoryGrid}>
              <View style={styles.categoryGridItem}>
                <Image
                  style={{
                    width: '100%',
                    height: 30,
                    resizeMode: 'center',
                    borderRadius: 10,
                  }}
                  source={{
                    uri:
                      'https://static.thenounproject.com/png/1041139-200.png',
                  }}
                />
                <Text>{cat.title}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gridItem: {
    flex: 1,
    margin: 15,
    height: 150,
  },
  categoryGrid: {
    flex: 1,
    height: 50,
    width: 80,
    borderWidth: 0.5,
    margin: 10,
  },
  categoryGridItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
});

export default HomeScreen;
