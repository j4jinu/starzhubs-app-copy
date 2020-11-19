import React, {useContext, useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import UserGridItem from '../components/UserGridItem';
import theme from '../config/theme';
import {AuthContext} from '../context/authContext';

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
        console.log(categoryData);
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
        alert(userData.message);
      } catch (error) {
        alert('Something went wrong. Try again later.');
      }
    };
    getUsers();
  }, [categoryId]);

  if (loading) {
    return (
      <ActivityIndicator
        style={{marginTop: 20}}
        color={theme.$primaryColor}
        size={'large'}
      />
    );
  }
  return (
    <View>
      <ScrollView horizontal>
        {category.map((c) => (
          <TouchableOpacity
            style={c._id === categoryId ? styles.chipActive : styles.chips}
            onPress={() => {
              setCategoryId(c._id);
            }}>
            <Text>{c.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <FlatList
        style={{backgroundColor: '#fafafa', marginTop: 20}}
        keyExtractor={(item, index) => item.id}
        data={users}
        renderItem={({item}) => (
          <UserGridItem
            userId={item._id}
            name={item.name}
            locaton={item.locaton}
            image={item.image}
            navigation={props.navigation}
          />
        )}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  chips: {
    borderColor: 'gray',
    color: theme.$primaryColorText,
    borderWidth: 1,
    marginVertical: 5,
    marginHorizontal: 5,
    borderRadius: 100,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  chipActive: {
    borderColor: theme.$primaryColor,
    backgroundColor: theme.$primaryColor,
    color: 'white',
    borderWidth: 1,
    marginVertical: 5,
    marginHorizontal: 5,
    borderRadius: 100,
    paddingHorizontal: 10,
    paddingVertical: 8,
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
