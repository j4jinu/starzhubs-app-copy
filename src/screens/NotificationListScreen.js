import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  FlatList,
  Image,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import NotificationItem from '../components/NotificationItem';
import { AuthContext } from '../context/authContext';
import Moment from 'moment';
import theme from '../config/theme';

const NotificationListScreen = (props) => {
  const auth = useContext(AuthContext);
  const [alerts, setAlerts] = useState([]);
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    getNotifications();
  }, []);
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
        //alert(resData.message);
        return;
      }
      setLoading(false)
      setAlerts(resData.data.notifications);

    } catch (error) {
      alert('Something went wrong. Try again later.');
    }
  };
  if (isLoading) {
    return (
      <ActivityIndicator
        style={{ marginTop: 20 }}
        color={theme.$primaryColor}
        size={'large'}
      />
    );
  }
  if (alerts.length === 0) {
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
        /><Text style={{ fontSize: 18, color: 'tomato' }}>
          No new Notification.
  </Text>
      </View>
    )
  }
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

const renderGridItem = (alerts, props) => {
  var dateofvisit = Moment(alerts.item.createdAt);
  var today = Moment();
  var d = today.diff(dateofvisit, 'days');
  return (
    <NotificationItem
      title={alerts.item.title}
      notification={alerts.item.notification}
      nDate={d}
      onSelect={() => props.navigation.navigate('UserDetails')}
    />
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
