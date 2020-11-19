import React, { useState, useEffect, useContext } from 'react';
import { View, Image, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
import EIcon from 'react-native-vector-icons/FontAwesome5';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Snackbar } from 'react-native-paper';
import { AuthContext } from '../context/authContext';
import theme from '../config/theme';
const ServiceDetailsScreen = (props) => {

  const serviceId = props.navigation.getParam('serviceId')
  const auth = useContext(AuthContext);
  const [services, setServices] = useState({})
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false);


  useEffect(() => {
    const getServiceDetails = () => {
      fetch(`http://13.232.190.226/api/services/${serviceId}`, {
        method: 'PATCH',

      })
        .then(response => response.json())
        .then(response => {
          setServices(response.services)


        })
        .catch(error => {
        });
    }
    getServiceDetails()
  }, [])

  const initialValues = { message: '' };
  const validationSchema = Yup.object({ message: Yup.string().required('Enter your feedback') });

  const handleSubmit = (values) => {
    setLoading(true);
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + auth.token,
      },
      body: JSON.stringify({ message: values.message }),
    };

    fetch(`http://13.232.190.226/api/services/${serviceId}`, requestOptions)
      .then((response) => response.json())
      .then(
        (response) => {
          if (response.success === true) {
            setLoading(false);
            setVisible(!visible)
            // props.navigation.navigate('OurServices')
            // props.navigation.goBack()
          } else {
            setVisible(!visible)
          }
          setLoading(false);
        },
        (error) => {
          setLoading(false);
          alert(response.message);
        }
      );
  };

  const onDismissSnackBar = () => {
    setVisible(false);
  };


  return (
    <View style={styles.container}>
      <Snackbar style={{ marginBottom: 10 }} visible={visible}
        duration={7000}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Back',
          onPress: () => {
            props.navigation.navigate('OurServices')
          },
        }}>
        Thanks for your feedback</Snackbar>
      <ScrollView>
        <View style={{ alignItems: "center", flexDirection: 'column', width: '100%', }}>
          <View style={{ marginTop: 30 }}>
            <Text style={{ fontSize: 28, color: "orange", fontWeight: "bold", }}>{services.title}</Text>
          </View>

          <View style={styles.img}>
            <Image
              source={{ uri: services.image === undefined ? null : `http://13.232.190.226/api/services/view/${services.image}` }}
              style={{ borderRadius: 50, height: 200, width: 200, }}
            />
          </View>

          <View style={{ flexDirection: "row", marginRight: "10%", marginLeft: "10%" }}>
            <Icon name="infocirlce" size={15} color={theme.$primaryColor} style={{ marginTop: 4, marginRight: "4%" }} />
            <Text style={{ textAlign: "justify", alignSelf: "center" }}>{services.description}</Text>
          </View>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => { handleSubmit(values); }}
          >
            {({ values, handleChange, handleBlur, errors, handleSubmit, touched, }) => (
              <View style={{ width: '80%', marginLeft: '7%' }}>
                <View style={styles.inputView}>
                  <EIcon name='pen' size={20} color={theme.$primaryColor} style={{ marginTop: "-6%", marginLeft: "3%" }} />
                  <TextInput
                    style={styles.inputText}
                    placeholder="Send Your Feedback"
                    placeholderTextColor="#003f5c"
                    keyboardType="default"
                    autoCapitalize="sentences"
                    numberOfLines={5}
                    multiline={true}
                    onChangeText={handleChange("message")}
                    onBlur={handleBlur("message")}
                  />
                </View>
                {touched.message && errors.message && (
                  <Text style={{ fontSize: 13, color: 'red', alignSelf: 'center', marginBottom: 2 }}>{errors.message}</Text>
                )}

                <TouchableOpacity style={styles.Btn} onPress={handleSubmit}>
                  <Text style={styles.BtnText}>{loading ? (<ActivityIndicator size="small" color="#fff" />) : ('Submit')}</Text>
                </TouchableOpacity>
              </View>
              // </Fragment>
            )}
          </Formik>

        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //   margin:'5%',
  },
  posterTitle: {
    fontSize: 18,
    color: 'orange',
    fontWeight: 'bold',
    alignItems: "center",
  },

  error: {
    color: "red",
    fontSize: 10,
    marginTop: 6,
  },
  img: {
    marginTop: "2%",
    marginBottom: "8%",
  },
  inputView: {
    width: "100%",
    marginTop: "7%",
    justifyContent: "flex-start",
    padding: 5,
    borderColor: "grey",
    borderWidth: 1,
    marginBottom: 5
  },
  inputText: {
    width: "100%",
  },
  Btn: {
    width: "100%",
    backgroundColor: "#fd9242",
    borderRadius: 10,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: '5%'
  },
  BtnText: {
    color: "white",
    fontWeight: 'bold'
  }
})
export default ServiceDetailsScreen