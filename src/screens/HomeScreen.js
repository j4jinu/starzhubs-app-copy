import React, { useEffect } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import UserGridItem from '../components/UserGridItem';
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
      .get('http://13.233.216.36:3000/api/talent/random')
      .then((response) => {
      })
      .catch((error) => {
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
