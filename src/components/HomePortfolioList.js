import React from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import UserGridItem from '../components/UserGridItem';
import theme from '../config/theme';

const renderGridItem = (user) => {
  return (
    <UserGridItem
      name={user.item.name}
      onSelect={() => props.navigation.navigate('UserDetails')}
    />
  );
};

const HomePortfolioList = (props) => {
  return (
    <FlatList
      style={{ backgroundColor: '#fafafa', paddingHorizontal: 6, marginBottom: 5 }}
      keyExtractor={(item, index) => item.id}
      data={props.users.slice(0, 6)}
      renderItem={({ item }) => (
        <UserGridItem
          userId={item._id}
          name={item.name}
          location={item.location}
          image={item.image}
          navigation={props.navigation}
        />
      )}
      numColumns={2}
      ListHeaderComponent={
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 10,
            backgroundColor: "white",
            paddingVertical: 15,
          }}>
          <Text style={styles.title}>Trending Profiles</Text>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => props.navigation.navigate('UsersList')}>
            <Text style={{ color: 'white' }}>View More</Text>
          </TouchableOpacity>
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.$primaryColor,
  },
  btn: {
    backgroundColor: theme.$primaryColor,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: theme.$borderRadius,
  },
});

export default HomePortfolioList;
