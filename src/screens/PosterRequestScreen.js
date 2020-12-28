import React, { useState, useContext, useEffect } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { AuthContext } from '../context/authContext';

const PosterRequestScreen = (props) => {
  const auth = useContext(AuthContext);
  const posterId = props.navigation.getParam('posterId');
  const image = props.navigation.getParam('image');
  const initialValues = {
    notes: `I'm very much inetersted in your post`,
  };
  const validation = Yup.object({
    notes: Yup.string().required('Please enter  some introductory text'),
  });

  const onSubmitRequest = (values) => {
    fetch(`http://13.233.216.36:3000/api/poster/req/${posterId}`, {
      method: 'POST',
      headers: {
        'Content-type': 'Application/json',
        Authorization: 'Bearer ' + auth.token,
      },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then((response) => {
        Alert.alert('Success', 'Request Sent Successfully ', [
          {
            Text: 'OK',
            onPress: () => props.navigation.goBack(),
          },
        ]);
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          alignItems: 'center',
          width: '100%',
        }}>
        <View>
          <Image
            style={{ width: 375, height: 250 }}
            source={{
              uri: `http://13.233.216.36:3000/api/poster/view/${image}`,
            }}
          />
        </View>
      </View>
      <View>
        <Formik
          initialValues={initialValues}
          validationSchema={validation}
          onSubmit={(values) => {
            onSubmitRequest(values);
          }}>
          {({
            values,
            handleChange,
            handleBlur,
            errors,
            setFieldTouched,
            handleSubmit,
          }) => (
              <>
                <View
                  style={{
                    alignSelf: 'center',
                    borderWidth: 1,
                    borderRadius: 10,
                    width: '95%',
                    paddingLeft: 8,
                    paddingRight: 8,
                    marginTop: 12,
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderColor: errors.notes ? 'red' : '#e6e6e6',
                  }}>
                  <TextInput
                    style={{
                      alignItems: 'center',
                    }}
                    underlineColorAndroid="transparent"
                    placeholder="Message"
                    numberOfLines={3}
                    multiline={true}
                    defaultValue={initialValues.notes}
                    onChangeText={handleChange('notes')}
                    onBlur={handleBlur('notes')}
                  />
                </View>
                <Text style={styles.error}>{errors.notes}</Text>

                <View
                  style={{
                    marginTop: 50,
                    width: '100%',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    style={{
                      borderRadius: 20,
                      backgroundColor: 'tomato',
                      padding: 10,
                      width: '50%',
                      alignItems: 'center',
                      marginVertical: '-5%',
                    }}
                    onPress={handleSubmit}>
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>
                      Send Request
                  </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
        </Formik>
      </View>
    </View>
  );
};

export default PosterRequestScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginHorizontal: '20%',
  },
});
