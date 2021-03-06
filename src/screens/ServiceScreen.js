import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Card} from 'react-native-paper';
import theme from '../config/theme';
import {AuthContext} from '../context/authContext';

const ServiceScreen = ({navigation}) => {
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
    fetch(`http://13.233.216.36:3000/api/services/`, requestOptions)
      .then((response) => response.json())
      .then(
        (response) => {
          if (response.success === true) {
            setService(response.services);
          } else {
          }
        },
        (error) => {
        },
      );
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{width: '100%', flexWrap: 'wrap', flexDirection: 'row'}}>
          {service.map((s) => (
            <Card style={styles.cardleft}>
              <TouchableOpacity
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                }}
                onPress={() => {
                  navigation.navigate('ServiceDetails', {
                    serviceId: s._id,
                    serviceName: s.title,
                  });
                }}>
                <Image
                  source={{
                    uri: `http://13.233.216.36:3000/api/services/view/${s.image}`,
                  }}
                  style={{
                    borderRadius: 50,
                    height: 50,
                    width: 50,
                    alignSelf: 'center',
                  }}
                />
                <View
                  style={{
                    marginHorizontal: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 15,
                  }}>
                  <Text
                    style={{
                      color: theme.$primaryColorText,
                      textTransform: 'capitalize',
                      fontSize: 15,
                      fontWeight: 'bold',
                      textAlign: 'center',
                    }}>
                    {s.title}
                  </Text>
                </View>
              </TouchableOpacity>
            </Card>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: '3%',
    paddingHorizontal: '3%',
    backgroundColor: '#fff',
  },
  cardleft: {
    elevation: 1,
    marginTop: '1%',
    width: '47%',
    height: 150,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: '1%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default ServiceScreen;
