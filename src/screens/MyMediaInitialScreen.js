import React, { useContext, useEffect, useState } from 'react';
import {StyleSheet, Text, View, ActivityIndicator, FlatList, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import theme from '../config/theme';
import { AuthContext } from '../context/authContext';

const divider = (
  <View style={{ width: '100%', height: 1, backgroundColor: '#e6e6e6' }} />
);


const MyMediaInitialScreen = (props) => {

  const auth = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [talents, setTalents] = useState([]);
  const [isNoMedia, setNoMedia] = useState(false);
  const unsubscribe = props.navigation.addListener('didFocus', () => {
    getTalents();
  });

  useEffect(() => {
    getTalents();
    unsubscribe;
  }, []);

  const getTalents = async () => {
    try {
      const res = await fetch('http://13.233.216.36:3000/api/user/talent', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      const resData = await res.json();
      if (!resData.success) {
        setLoading(false);
        alert(resData.message);
        return;
      } else {
        setTalents(resData.data.talents);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <ActivityIndicator
        style={{ marginTop: 20 }}
        color={theme.$primaryColor}
        size={'large'}
      />
    );
  }

  if (talents.length === 0) {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 25,
          marginTop: "35%"
        }}>
        <Image
          source={require('../assets/empty.png')}
          style={{ width: "41%", height: 160, marginHorizontal: 100, marginTop: "5%" }}
        />
          <Text style={{ fontSize: 18, color: 'tomato' }}>
            No Medias Added Yet!
          </Text>
      </View>
    )
  }

  return(
    <FlatList
        keyExtractor={(item, index) => item.id}
        data={talents}
        renderItem={({ item }) => (
          <>
          <View
            style={styles.gridItem}
            >
            <TouchableOpacity
              style={{ flexDirection: 'row', width: '100%', marginBottom: 5, paddingHorizontal:'5%' }}
              onPress={() => props.navigation.navigate('MyMediaList',{
                media:item.media,
                talentId:item._id,
                userId:item.userId
              })}
              activeOpacity={0.7}
            >
              <Icon
                name="category"
                size={30}
                color={theme.$primaryColor}          
              />
              <View style={styles.details}>
                <Text
                  style={{
                    fontSize: 15,
                    color: theme.$primaryColorText,
                    fontWeight: 'bold',
                    marginLeft:'3%'
                  }}>
                  {item.category.title}
                </Text>
                <Text style={{fontSize: 12, color: 'gray',marginLeft:'3%'}}>
                  {item.media.length} Medias
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          {divider}
        </>
      
        )}
      />
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  gridItem: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
    marginBottom: 2,
    marginHorizontal: 5,
  },
  gridItemText: {
    fontFamily: 'montserrat-medium',
    marginHorizontal: 5,
    fontSize: 16,
  },
  details: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 10,
  },

});

export default MyMediaInitialScreen;
