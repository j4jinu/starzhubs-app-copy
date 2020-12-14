import React, { useEffect, useState } from 'react';
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
const FilterResultScreen = (props) => {
  const filter = props.navigation.getParam('filter');
  const [data, setData] = useState([]);
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    const getCategory = () => {
      fetch('http://13.232.190.226/api/category')
        .then((response) => response.json())
        .then((json) => {
          setData(json.categories);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    getCategory();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#fafafa' }}>
      <FlatList
        data={filter}
        keyExtractor={({ id }, index) => id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('UserDetails', {
                userId: item._id,
              });
            }}>
            <View style={styles.listItem}>
              <View
                style={{
                  borderRadius: 100,
                  backgroundColor: 'gray',
                }}>
                <Image
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 100,
                    alignItems: 'flex-start',
                  }}
                  source={{
                    uri:
                      item.image !== undefined
                        ? `http://13.232.190.226/api/user/avatar/${item.image.avatar}`
                        : '',
                  }}
                />
              </View>
              <View style={{ flex: 1, flexDirection: 'column', marginLeft: 25 }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 18,
                    color: '#222',
                    alignSelf: 'flex-start',
                  }}>
                  {item.name}
                </Text>
                <Text style={{ fontSize: 12, alignSelf: 'flex-start' }}>
                  {item.location !== undefined ? item.location.place : ''}{' '}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: 'gray',

                    top: 7,
                  }}>
                  {item.bio.length > 120
                    ? item.bio.substring(0, 120) + '...'
                    : item.bio}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  actor: {
    marginLeft: 10,
    height: 40,
    width: 150,
    borderWidth: 1,
    borderColor: 'orange',
    borderRadius: 20,
  },
  listItem: {
    margin: 5,
    padding: 13,
    backgroundColor: '#FFF',
    width: '95%',
    marginHorizontal: 5,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    borderRadius: 8,
    marginVertical: 5,
    elevation: 3,
  },
});
export default FilterResultScreen;
