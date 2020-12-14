import React, { useContext, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { color } from 'react-native-reanimated';
import UserGridItem from '../components/UserGridItem';
import theme from '../config/theme';
import { AuthContext } from '../context/authContext';

const PortfolioListScreen = (props) => {
  const auth = useContext(AuthContext);
  const [category, setCategory] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryId, setCategoryId] = useState('');

  useEffect(() => {
    const getCategoiries = async () => {
      try {
        const response = await fetch('http://13.232.190.226/api/category');
        const categoryData = await response.json();
        if (categoryData.success) {
          setCategory(categoryData.categories);
          setCategoryId(categoryData.categories[0]._id);
          setLoading(false);
          return;
        }
        alert(categoryData.message);
      } catch (error) {
        setLoading(false);
        alert('Something went wrong. Try again later.');
      }
    };
    getCategoiries();
  }, []);

  useEffect(() => {
    const getUsers = async () => {
      if (!categoryId) {
        return;
      }
      try {
        const userResponse = await fetch(
          `http://13.232.190.226/api/talent/filter/${categoryId}`,
          {
            method: 'PATCH',
            headers: {
              Authorization: 'Bearer ' + auth.token,
            },
          },
        );
        const userData = await userResponse.json();
        if (userData.success) {
          setUsers(userData.data.users);
          return;
        }
        // alert(userData.message);
        setUsers([]);
      } catch (error) {
        alert('Something went wrong. Try again later.');
      }
    };
    getUsers();
  }, [categoryId]);

  if (loading) {
    return (
      <ActivityIndicator
        style={{ marginTop: 20 }}
        color={theme.$primaryColor}
        size={'large'}
      />
    );
  }
  
  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginTop: 12, height: 40 }}>
        {category.map((c) => (
          <TouchableOpacity
            style={c._id === categoryId ? styles.chipActive : styles.chips}
            onPress={() => {
              setCategoryId(c._id);
            }}>
            <Text
              style={
                c._id === categoryId
                  ? { color: 'white', fontSize: 12 }
                  : { color: 'black', fontSize: 12 }
              }>
              {c.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {users.length > 0 && (
        <FlatList
          style={{
            backgroundColor: '#fafafa',
            marginTop: 5,
            marginBottom: 30,
          }}
          keyExtractor={(item, index) => item.id}
          data={users}
          renderItem={({ item }) => (
            <UserGridItem
              userId={item._id}
              name={item.name}
              location={item.location}
              image={item.image}
              navigation={props.navigation}
            />
          )}
          numColumns={2}
        />
      )}
      {users.length === 0 && (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: '30%',
          }}>
          <Text style={{ fontSize: 18, color: 'tomato', marginTop: 10 }}>
            Sorry, No users available.
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
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  chips: {
    borderColor: 'gray',
    color: theme.$primaryColorText,
    borderWidth: 1,
    height: 30,
    marginHorizontal: 5,
    borderRadius: 100,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  chipActive: {
    borderColor: theme.$primaryColor,
    backgroundColor: theme.$primaryColor,
    color: 'white',
    height: 30,
    borderWidth: 1,
    marginHorizontal: 5,
    borderRadius: 100,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.$primaryColorText,
  },
  btn: {
    backgroundColor: theme.$primaryColor,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: theme.$borderRadius,
  },
});

export default PortfolioListScreen;
