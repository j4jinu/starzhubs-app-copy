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
      console.log("poster request",userData.requests);
    } catch (error) { }
  };

  return (
    <View style={{ flex: 1 }}>
      {/* <View style={{height: 90}} >
             <ScrollView horizontal>
                <View style={{flexDirection:"row"}}>
                {filter.map((d) => (
                <TouchableOpacity 
                onPress={()=> {getUser(d._id)}}
                  style={styles.actor}> 
                  <Text style = {{color:'blue',textAlign:"center",paddingTop:10,fontWeight:"bold"}}>{d.title}</Text>
                </TouchableOpacity>
                ))}
                </View> 
            </ScrollView>
            </View> */}
        <FlatList
            data={requests}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
          <TouchableOpacity
            // onPress={() => {
            //   props.navigation.navigate('UserDetails', {
            //     userId: item._id,
            //   });
            // }}
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
                {/* <Image
                  style={{ width: 100, height: 100, alignItems: 'flex-start' }}
                  source={{
                    uri:
                      item.posterId.image !== undefined
                        ?`http://13.232.190.226/api/poster/view/${item.posterId.image}`
                        : '',
                  }}
                /> */}
              </View>
              <View style={{ flex: 1, flexDirection: 'column', marginLeft: 25 }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 18,
                    color: '#222',
                    alignSelf: 'flex-start',
                  }}>
                  {item.title}
                </Text>
                {/* <Text style={{ fontSize: 12, alignSelf: 'flex-start' }}>
                  {item.location !== undefined ? item.location.place : ''}{' '}
                </Text> */}
                <Text
                  style={{
                    fontSize: 12,
                    color: 'gray',
                    alignSelf: 'center',
                    top: 7,
                  }}>
                  {/* {item.posterId.description.substring(0, 120) + '...'} */}
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
    width: '96%',
    marginHorizontal: 5,
    flex: 1,
    alignSelf: 'center',
    flexDirection: 'row',
    borderRadius: 3,
    elevation: 3,
  },
});
export default MyPosterRequests;
