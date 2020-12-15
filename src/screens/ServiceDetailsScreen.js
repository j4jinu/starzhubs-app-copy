import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {Snackbar} from 'react-native-paper';
import {AuthContext} from '../context/authContext';
import theme from '../config/theme';

const ServiceDetailsScreen = (props) => {
  const serviceId = props.navigation.getParam('serviceId');
  const auth = useContext(AuthContext);
  const [services, setServices] = useState({});
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const getServiceDetails = () => {
      fetch(`https://api.starzhubs.com/api/services/${serviceId}`, {
        method: 'PATCH',
      })
        .then((response) => response.json())
        .then((response) => {
          setServices(response.services);
        })
        .catch((error) => {});
    };
    getServiceDetails();
  }, []);

  const initialValues = {message: ''};
  const validationSchema = Yup.object({
    message: Yup.string().required('Pleaase write a mssage'),
  });

  const handleSubmit = (values) => {
    setLoading(true);
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + auth.token,
      },
      body: JSON.stringify({message: values.message}),
    };
    fetch(`https://api.starzhubs.com/api/services/${serviceId}`, requestOptions)
      .then((response) => response.json())
      .then(
        (response) => {
          if (response.success === true) {
            setLoading(false);
            setVisible(!visible);
            showToastWithGravityAndOffset();
            props.navigation.navigate('OurServices');
          } else {
            setVisible(!visible);
          }
          setLoading(false);
        },
        (error) => {
          setLoading(false);
          alert(response.message);
        },
      );
  };

  const onDismissSnackBar = () => {
    setVisible(false);
  };

  const showToastWithGravityAndOffset = () => {
    ToastAndroid.showWithGravityAndOffset(
      '  Thanks for your feedback!',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      50,
      100,
    );
  };

  return (
    <View style={styles.container}>
      <Snackbar
        style={{marginBottom: 10}}
        visible={visible}
        duration={4000}
        onDismiss={onDismissSnackBar}>
        Thanks for your feedback
      </Snackbar>
      <ScrollView>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'column',
            width: '100%',
          }}>
          <View style={styles.img}>
            <Image
              source={{
                uri:
                  services.image === undefined
                    ? null
                    : `https://api.starzhubs.com/api/services/view/${services.image}`,
              }}
              style={{borderRadius: 50, height: 180, width: 180}}
            />
          </View>
          <View style={{marginBottom: 15}}>
            <Text
              style={{
                fontSize: 20,
                textTransform: 'capitalize',
                color: theme.$primaryColor,
                fontWeight: 'bold',
              }}>
              {services.title}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginRight: '10%',
              marginLeft: '10%',
            }}>
            <Text
              style={{
                textAlign: 'center',
                alignSelf: 'center',
                color: theme.$primaryColorText,
              }}>
              {services.description}
            </Text>
          </View>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              handleSubmit(values);
            }}>
            {({
              values,
              handleChange,
              handleBlur,
              errors,
              handleSubmit,
              touched,
            }) => (
              <View style={{width: '90%', marginLeft: 0}}>
                <View style={styles.inputView}>
                  <TextInput
                    style={styles.inputText}
                    placeholder="Mention Your Requirements"
                    placeholderTextColor="#003f5c"
                    keyboardType="default"
                    autoCapitalize="sentences"
                    numberOfLines={5}
                    multiline={true}
                    onChangeText={handleChange('message')}
                    onBlur={handleBlur('message')}
                  />
                </View>
                {touched.message && errors.message && (
                  <Text
                    style={{
                      fontSize: 13,
                      color: 'red',
                      alignSelf: 'flex-start',
                      marginBottom: 2,
                    }}>
                    {errors.message}
                  </Text>
                )}
                <TouchableOpacity style={styles.Btn} onPress={handleSubmit}>
                  <Text style={styles.BtnText}>
                    {loading ? (
                      <ActivityIndicator size="small" color="#fff" />
                    ) : (
                      'SUBMIT'
                    )}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 1,
    backgroundColor: '#fff',
  },
  posterTitle: {
    fontSize: 18,
    color: theme.$primaryColor,
    fontWeight: 'bold',
    alignItems: 'center',
  },
  error: {
    color: 'red',
    fontSize: 10,
    marginTop: 6,
  },
  img: {
    marginTop: '10%',
    marginBottom: '8%',
  },
  inputView: {
    width: '100%',
    marginTop: '7%',
    justifyContent: 'flex-start',
    padding: 5,
    borderColor: '#707070',
    backgroundColor: '#F6F6F6',
    borderRadius: 8,
    marginBottom: 5,
  },
  inputText: {
    width: '100%',
  },
  Btn: {
    width: '30%',
    backgroundColor: '#fd9242',
    marginLeft: '70%',
    height: 40,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '5%',
  },
  BtnText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
export default ServiceDetailsScreen;
