import React, {useContext, useState} from 'react';
import {
  ScrollView,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as yup from 'yup';
import {Formik} from 'formik';
import ImagePicker from 'react-native-image-picker';
import {AuthContext} from '../context/authContext';
import theme from '../config/theme';

const mediaSchema = yup.object({
  caption: yup.string().required('Enter caption about this media'),
  description: yup.string().required('Enter description'),
});

const PhotoUploadScreen = () => {
  const auth = useContext(AuthContext);
  const [image, setImage] = useState('');

  const uploadMedia = async (values) => {
    alert(values);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Formik
          initialValues={{
            caption: '',
            description: '',
          }}
          validationSchema={mediaSchema}
          onSubmit={(values) => uploadMedia(values)}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            touched,
            errors,
            values,
          }) => (
            <>
              <View
                style={{
                  alignSelf: 'center',
                  borderWidth: 1,
                  borderRadius: 10,
                  width: '90%',
                  paddingLeft: 8,
                  paddingRight: 8,
                  marginTop: 8,
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderColor: errors.caption ? 'red' : 'gray',
                }}>
                <Icon name="mail" size={20} color={theme.$primaryColor} />
                <TextInput
                  keyboardType={'email-address'}
                  textContentType={'emailAddress'}
                  style={styles.inputField}
                  placeholder={'Caption'}
                  onChangeText={handleChange('caption')}
                  onBlur={handleBlur('caption')}
                  value={values.caption}
                />
              </View>
              {touched.caption && errors.caption && (
                <Text style={styles.errorText}>
                  {touched.caption && errors.caption}
                </Text>
              )}
              <View
                style={{
                  alignSelf: 'center',
                  borderWidth: 1,
                  borderRadius: 10,
                  width: '90%',
                  paddingLeft: 8,
                  paddingRight: 8,
                  marginTop: 8,
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderColor: errors.description ? 'red' : 'gray',
                }}>
                <Icon name="mail" size={20} color={theme.$primaryColor} />
                <TextInput
                  multiline
                  numberOfLines={4}
                  keyboardType={'email-address'}
                  textContentType={'emailAddress'}
                  style={styles.inputField}
                  placeholder={'description'}
                  onChangeText={handleChange('description')}
                  onBlur={handleBlur('description')}
                  value={values.description}
                />
              </View>
              {touched.description && errors.description && (
                <Text style={styles.errorText}>
                  {touched.description && errors.description}
                </Text>
              )}
            </>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errorText: {
    marginHorizontal: '5%',
    color: 'red',
  },
  inputFieldBackground: {
    alignSelf: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    width: '90%',
    paddingLeft: 8,
    paddingRight: 8,
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputField: {
    alignSelf: 'center',
    width: '90%',
    textTransform: 'lowercase',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 8,
  },
});

export default PhotoUploadScreen;
