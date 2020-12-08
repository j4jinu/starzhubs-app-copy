import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  FlatList,
  Image,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import NotificationItem from '../components/NotificationItem';
import {AuthContext} from '../context/authContext';

const posters = [
  {name: 'A', id: '1'},
  {name: 'B', id: '2'},
  {name: 'C', id: '3'},
  {name: 'D', id: '4'},
  {name: 'E', id: '5'},
  {name: 'F', id: '6'},
  {name: 'G', id: '7'},
  {name: 'H', id: '8'},
];

const renderGridItem = (alerts) => {
  return (
    <NotificationItem
      title={alerts.item.title}
      descripion={alerts.descripion}
      onSelect={() => props.navigation.navigate('UserDetails')}
    />
  );
};

const NotificationListScreen = () => {
  const auth = useContext(AuthContext);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const getNotifications = async () => {
      try {
        const res = await fetch(`http://13.232.190.226/api/alert`, {
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + auth.token,
          },
        });
        const resData = await res.json();
        if (!resData.success) {
          alert(resData.message);
          return;
        }
        setAlerts(resData.data.notifications);
      } catch (error) {
        alert('Something went wrong. Try again later.');
      }
    };
    getNotifications();
  });
  return (
    <>
      <FlatList
        keyExtractor={(item, index) => item.id}
        data={alerts}
        renderItem={renderGridItem}
      />
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 10,
    marginVertical: 10,
  },
});

export default NotificationListScreen;
