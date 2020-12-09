import React, { useContext, useEffect, useState } from 'react';
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { AuthContext } from '../context/authContext';
import theme from '../config/theme';
const MyPosterRequests = (props) => {
    const auth = useContext(AuthContext)
  const [data, setData] = useState([]);
  const [requests, setRequests] = useState([]);
  useEffect(() => {
    getPosterRequest();
  }, []);

  const getPosterRequest = async () => {
    try {
      let response = await fetch(`http://13.232.190.226/api/user/poster/request/sent`, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + auth.token,
        },
      });
      let userData = await response.json();
      setRequests(userData.requests);
      console.log("poster request",userData);
    } catch (error) { }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView >
        {requests !== undefined ? (
        <FlatList
            data={requests}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
          item.posterId !==null ? (    
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('PosterDetails', {
                posterId: item.posterId._id,
                title: item.posterId.title,
                image: item.posterId.image,
                description: item.posterId.description,
                endDate: item.posterId.endDate,
                startDate: item.posterId.startDate,
                user: item.posterId.userId,
                status:'sent_request'
              })
            }}
            >
              <View style={styles.listItem}>
                <View
                  style={{
                    borderRadius: 3,
                    backgroundColor: 'gray',
                    borderWidth: 1,
                    borderColor: 'grey',
                    padding: 2,
                    transform: [{ skewY: '5deg' }],
                  }}>
                    <Image
                      style={{ width: 100, height: 100, alignItems: 'flex-start' }}
                      source={{
                        uri:
                          item.posterId.image !== undefined
                            ?`http://13.232.190.226/api/poster/view/${item.posterId.image}`
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
                    {item.posterId.title}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      color: 'gray',
                      alignSelf: 'center',
                      top: 7,
                    }}>
                    {item.posterId.description.substring(0, 200) + '...'}
                  </Text>
                  <View style={styles.authorInfo}>
                    <Image
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: 100,
                      }}
                      source={{
                        uri: `http://13.232.190.226/api/user/avatar/${item.posterId.userId.image.avatar}`,
                      }}
                    />
                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'column',
                          justifyContent: 'center',
                          marginLeft: 10,
                        }}>
                        <Text style={{ fontSize: 13 }}>{'Posted By'}</Text>
                        <Text style={{ fontSize: 13, fontWeight: 'bold' }}>
                          {item.posterId.userId.name}
                        </Text>
                      </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
            ):(null
              // <View style={styles.listItem}>
              //   <Text>This poster is deleted or currently unavailable</Text>
              // </View>
            )
          )}
      />
      ):(
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: "100%",
            flex: 1,
          }}>
          <Image source={require("../assets/broke.png")}
            style={{ width: "41%", height: 160, marginHorizontal: 100, marginTop: "5%" }} />
            <Text style={{ fontSize: 18, color: 'tomato' }}>Sorry, No Requests</Text>
        </View>
      )}
      </ScrollView>
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
    width: '96%',
    marginHorizontal: 5,
    flex: 1,
    alignSelf: 'center',
    flexDirection: 'row',
    borderRadius: 3,
    elevation: 3,
  },
  authorInfo: {
    backgroundColor: 'white',
    // marginHorizontal: 10,
    // padding: 8,
    marginTop: 15,
    flexDirection: 'row',
    alignItems:'flex-end'
  },

});
export default MyPosterRequests;
