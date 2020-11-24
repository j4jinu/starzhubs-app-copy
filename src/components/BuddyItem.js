import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import theme from '../config/theme';

const BuddyItem = (props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={props.onSelect}
      style={styles.container}>
      <Image
        style={{
          width: 75,
          height: 75,
          borderRadius: 100,
        }}
        source={{
          uri: `https://api.starzhubs.com/api/user/avatar/${props.image.avatar}`,
        }}
      />
      <View style={styles.details}>
        <Text
          style={{
            fontSize: 17,
            color: theme.$primaryColorText,
            fontWeight: 'bold',
          }}>
          {props.name}
        </Text>
        <Text style={{fontSize: 13, color: 'gray'}}>
          {props.location.place}, {props.location.state}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: theme.$borderRadius,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.26,
    shadowRadius: 3,
    elevation: 5,
  },
  details: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 10,
  },
});

export default BuddyItem;
