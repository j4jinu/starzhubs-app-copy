import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const UserGridItem = (props) => {
  const { image, location, talents, userId } = props;
  return (
    <>
      <ScrollView>
        {
          <TouchableOpacity
            style={styles.gridItem}
            onPress={() =>
              props.navigation.navigate('UserDetails', {
                userId: props.userId,
              })
            }
            activeOpacity={0.7}>
            <View style={styles.container}>
              <Image
                style={{ width: '100%', height: '75%', resizeMode: 'cover' }}
                source={{
                  uri: props.image
                    ? `http://13.232.190.226/api/user/avatar/${props.image.avatar}`
                    : '',
                }}
              />
              <Text style={styles.gridItemText}>{props.name}</Text>
              <Text style={{ marginLeft: 10, marginTop: 1 }}>
                {props.location !== undefined ? props.location.place : ''},{' '}
                {props.location !== undefined ? props.location.state : ''}
              </Text>
            </View>
          </TouchableOpacity>
        }
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 10,

  },
  gridItem: {
    flex: 1,
    width: 200,
    height: 250,
    borderColor: '#e9e9e9',
    borderWidth: 1,
    backgroundColor: 'white',
    marginHorizontal: 1,
    marginVertical: 1,


  },
  gridItemText: {
    fontFamily: 'montserrat-medium',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
    marginLeft: 10,
  },
});

export default UserGridItem;
