import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import theme from '../config/theme';

const NotificationItem = (props) => {
  const divider = (
    <View style={{ width: '100%', height: 1, backgroundColor: '#e6e6e6' }} />
  );
  
  return (
    <>
      {
        <>
          <View
            style={styles.gridItem}
            onPress={props.onSelect}
            activeOpacity={0.7}>
            <View
              style={{ flexDirection: 'row', width: '100%', marginBottom: 5 }}>
              <View style={{ marginRight: 10 }}>
                <Icon
                  name="notifications"
                  size={20}
                  color={theme.$primaryColor}
                />
              </View>
              <View style={{ flexDirection: 'column' }}>
                <Text style={{ fontSize: 15, color: 'black', marginBottom: 3 }}>
                  {props.title}
                </Text>
                <Text
                  style={{ fontSize: 13, marginHorizontal: 1, color: 'dimgray' }}>
                  {props.notification}
                </Text>
                <Text style={{ fontSize: 12, color: 'silver', marginTop: 7 }}>
                  {props.nDate} days ago
                </Text>
              </View>
            </View>
          </View>
          {divider}
        </>
      }
    </>
  );
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
});

export default NotificationItem;
