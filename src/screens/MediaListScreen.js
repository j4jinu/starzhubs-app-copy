import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, Image ,ScrollView} from 'react-native';
import {
  FlatList,
  
  TouchableOpacity,
} from 'react-native-gesture-handler';
import { color } from 'react-native-reanimated';
import MediaItem from '../components/MediaItem';
import UserGridItem from '../components/UserGridItem';
import theme from '../config/theme';
import { AuthContext } from '../context/authContext';

const MediaListSceen = (props) => {
  const auth = useContext(AuthContext);
  const [category, setCategory] = useState([]);
  const [users, setUsers] = useState([]);
  const [media, setMedia] = useState([]);
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
      console.log("catid",categoryId);
      setLoading(true)
      if (!categoryId) {
        setLoading(false)
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
          setMedia(userData.data.medias);
          console.log("usersmedia",userData.data.medias);
          setLoading(false)
          return;
        }
        // alert(userData.message);
        setLoading(false)
        setMedia([]);
      } catch (error) {
        console.log(error);
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
    <View style={{flexDirection:'column', flex:1}}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginVertical: 10,}}>
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
      {media.length > 0 && (
        <FlatList
          style={{paddingHorizontal:'2%',}}
          keyExtractor={(item, index) => item.id}
          data={media}
          renderItem={({ item }) => (
            <MediaItem
              media={item.media}
              user={item.userId}
              navigation={props.navigation}
            />
          )}
        />
      )}
      {media.length === 0 && (
        <View
          style={{
            // justifyContent: 'center',
            alignItems: 'center',
            width: "100%",
            flex: 6,
          }}>
          <>
          <Image source={require("../assets/broke.png")}
            style={{ width: "41%", height: 160, marginHorizontal: 100, marginTop: "5%" }} />
            <Text style={{ fontSize: 18, color: 'tomato' }}>Sorry, No media.</Text>
        </>
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
    marginVertical: 5,
    marginHorizontal: 5,
    borderRadius: 100,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  chipActive: {
    borderColor: theme.$primaryColor,
    backgroundColor: theme.$primaryColor,
    color: 'white',
    borderWidth: 1,
    marginVertical: 5,
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

export default MediaListSceen;
