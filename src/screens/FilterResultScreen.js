import React, {useEffect, useState} from 'react';
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
const FilterResultScreen = (props) => {
  const filter = props.navigation.getParam('filter');
  const [data, setData] = useState([]);
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    const getCategory = () => {
      fetch('http://13.232.190.226/api/category')
        .then((response) => response.json())
        .then((json) => {
          setData(json.categories);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    getCategory();
  }, []);

  return (
    <View style={{flex: 1, paddingVertical: '6%'}}>
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
        data={filter}
        keyExtractor={({id}, index) => id}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('UserDetails', {
                userId: item._id,
              });
            }}>
            <View style={styles.listItem}>
              <View
                style={{
                  borderRadius: 4,
                  backgroundColor: 'gray',
                  borderWidth: 1,
                  borderColor: 'grey',
                  padding: 2,
                  transform: [{skewY: '5deg'}],
                }}>
                <Image
                  style={{width: 100, height: 100, alignItems: 'flex-start'}}
                  source={{
                    uri:
                      item.image !== undefined
                        ? `http://13.232.190.226/api/user/avatar/${item.image.avatar}`
                        : '',
                  }}
                />
              </View>
              <View style={{flex: 1, flexDirection: 'column', marginLeft: 25}}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 18,
                    color: '#222',
                    alignSelf: 'flex-start',
                  }}>
                  {item.name}
                </Text>
                <Text style={{fontSize: 12, alignSelf: 'flex-start'}}>
                  {item.location !== undefined ? item.location.place : ''}{' '}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: 'gray',
                    alignSelf: 'center',
                    top: 7,
                  }}>
                  {item.bio.substring(0, 120) + '...'}
                </Text>
                {/* <Text style={{fontSize:18,color:"gray",alignSelf:"center"}} >{item.education}</Text>  */}
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
    marginTop: 30,
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
    width: '90%',
    flex: 1,
    alignSelf: 'center',
    flexDirection: 'row',
    borderRadius: 3,
    elevation: 7,
    // borderWidth:1,

    // borderColor:"orange",
  },
});
export default FilterResultScreen;
