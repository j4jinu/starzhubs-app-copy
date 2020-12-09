import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Card } from 'react-native-paper';
import { AuthContext } from '../context/authContext';
const ServiceScreen = ({ navigation }) => {
  const auth = useContext(AuthContext);
  const [service, setService] = useState([]);

  useEffect(() => {
    getServices();
  }, []);

  const getServices = () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + auth.token,
      },
    };
    fetch(`http://13.232.190.226/api/services/`, requestOptions)
      .then((response) => response.json())
      .then(
        (response) => {
          if (response.success === true) {
            setService(response.services);
          } else {
            console.warn(response.message);
          }
        },
        (error) => {
          console.warn('Service fetch failed: ' + error);
        },
      );
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={{ width: '100%', flexWrap: 'wrap', flexDirection: 'row' }}>
          {service.map((s) => (
            <Card style={styles.cardleft}>
              <TouchableOpacity
              style={{justifyContent:'center', alignItems:'center', height:'100%'}}
                onPress={() => {
                  navigation.navigate('ServiceDetails', {
                    serviceId: s._id,
                    serviceName: s.title,
                  });
                }}>
                {/* <View style={styles.img}> */}
                  <Image
                    source={{
                      uri: `http://13.232.190.226/api/services/view/${s.image}`,
                    }}
                    style={{
                      borderRadius: 50,
                      height: 50,
                      width: 50,
                      alignSelf: 'center',
                    }}
                  />
                {/* </View> */}
                <View
                  style={{
                    marginLeft: '5%',
                    marginBottom: '5%',
                    alignItems: 'center',
                  }}>
                  <Text style={{ color: 'brown' }}>{s.title}</Text>
                </View>
              </TouchableOpacity>
            </Card>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: '3%',
    paddingHorizontal: '3%',
    backgroundColor: "#f1f1f1",
    // alignItems:'center',
    
  },
  cardleft: {
    elevation: 1,
    marginTop: '1%',
    width: '47%',
    height:150,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: '1%',
    alignItems: 'center',
    justifyContent:'center',
  },
  img: {
    // marginTop: '8%',
    // marginBottom: '8%',
  },
});
export default ServiceScreen;
