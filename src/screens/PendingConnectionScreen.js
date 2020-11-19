import React, {useContext, useEffect, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import BuddyRequestItem from '../components/BuddyRequestItem';
import {AuthContext} from '../context/authContext';
const PendingConnectionScreen = (props) => {
  const auth = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  useEffect(() => {
    getRequests();
  }, []);

  const getRequests = () => {
    fetch('http://13.232.190.226/api/talent/req/received', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + auth.token,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setRequests(response.data.requests);
        setUserImages(response.data.requests.fromUser.image);
        console.log("rqs",response.data.requests)
      })
      .catch((error) => {
        alert(response.message);
      });
  };
  if(requests===[]){
    return(
      <View style={{alignItems:'center', marginTop:'8%'}}>
        <Text style={{color:theme.$primaryColor, fontWeight:'bold'}}>No Requests</Text>
      </View>
    )
  }
  return (
    <FlatList
      style={{backgroundColor: '#efefef'}}
      keyExtractor={(item) => item.id}
      data={requests}
      renderItem={({item}) => (
        <BuddyRequestItem
          reqId={item._id}
          name={item.fromUser.name}
          image={item.fromUser.image}
          talent={item.talent}
          userId={item.fromUser._id}
          reqType="received"
          navigation={props.navigation}
        />
      )}
    />
  );
};

export default PendingConnectionScreen;
