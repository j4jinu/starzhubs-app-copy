import React, { useContext, useState } from 'react';
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
  ToastAndroid
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as yup from 'yup';
import { Formik } from 'formik';
import { AuthContext } from '../context/authContext';
import theme from '../config/theme';
import WebView from 'react-native-webview';
import { Snackbar } from 'react-native-paper';

const mediaSchema = yup.object({
  caption: yup.string().required('Enter caption about this media'),
  description: yup.string().required('Enter description'),
});

const EditMediaScreen = (props) => {
  const talentId = props.navigation.getParam('talentId');
  const mediaId = props.navigation.getParam('mediaId');
  const mediaFile = props.navigation.getParam('mediaFile');
  const caption = props.navigation.getParam('caption');
  const description = props.navigation.getParam('description');
  const mediaType = props.navigation.getParam('mediaType');
  const auth = useContext(AuthContext);
  const [visible, setVisible] = useState(false);

  const editMedia = async (values, { setSubmitting }) => {
    var formData = new FormData();
    formData.append('talentId', talentId);
    formData.append('description', values.description);
    formData.append('title', values.caption);
    const requestOptions = {
      method: 'PUT',
      headers: {
        Authorization: 'Bearer ' + auth.token,
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    };
    try {
      const uploadRes = await fetch(
        `http://13.232.190.226/api/talent/media/${mediaId}`,
        requestOptions,
      );
      const uploadResData = await uploadRes.json();
      if (!uploadResData.success) {
        alert(uploadResData.message);
        return;
      }

      props.navigation.navigate('Account')
      showToastWithGravityAndOffset()
    } catch (error) {
      console.error('error', error);
    }
  };


  const showToastWithGravityAndOffset = () => {
    ToastAndroid.showWithGravityAndOffset(
      " Media Details Updated Successfully.Check Your Media Screen.",
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      50,
      100
    );
  };
  return (
    <View style={styles.container}>

      <ScrollView>
        <Formik
          initialValues={{
            caption: caption,
            description: description,
          }}
          validationSchema={mediaSchema}
          onSubmit={(values, { setSubmitting }) =>
            editMedia(values, { setSubmitting })
          }>
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
                {mediaType === 'image' ? (
                  <Image
                    style={{
                      width: '100%',
                      height: 220,
                      resizeMode: 'cover',
                    }}
                    source={{
                      uri: `http://13.232.190.226/api/user/view/media/?${mediaFile}`,
                    }}
                  />
                ) : (
                    <View
                      style={{
                        lex: 1,
                        alignSelf: 'center',
                        width: '90%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 200,
                        marginHorizontal: 3,
                        marginVertical: 3,
                        marginTop: 10,
                      }}>
                      <View
                        style={{
                          lex: 1,
                          alignSelf: 'center',
                          width: '100%',
                          height: 200,
                          marginHorizontal: 3,
                          marginVertical: 3,
                          marginTop: 10,
                        }}>
                        <WebView
                          javaScriptEnabled={true}
                          domStorageEnabled={true}
                          source={{
                            uri:
                              'https://www.youtube.com/embed/' +
                              mediaFile.substring(mediaFile.lastIndexOf('=') + 1),
                          }}
                        />
                      </View>
                    </View>
                  )}
                <View
                  style={{
                    alignSelf: 'center',
                    width: '90%',
                    paddingLeft: 8,
                    paddingRight: 8,
                    marginTop: '5%',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Text style={{ color: 'red' }}>
                    You can update only the caption and description , not the
                    media file!
                </Text>
                </View>
                <View
                  style={{
                    alignSelf: 'center',
                    borderWidth: 1,
                    borderRadius: 10,
                    width: '90%',
                    paddingLeft: 8,
                    paddingRight: 8,
                    marginTop: '5%',
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
                    defaultValue={caption}
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
                    defaultValue={description}
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
                {!isSubmitting && (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.registerBtn}
                    onPress={handleSubmit}>
                    <Text style={styles.registerBtnText}>UPLOAD</Text>
                  </TouchableOpacity>
                )}
                {isSubmitting && (
                  <ActivityIndicator
                    style={{ marginTop: 10 }}
                    size={'large'}
                    color={theme.$primaryColor}
                  />
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
    backgroundColor: 'white',
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
  imageBtn: {
    width: '90%',
    borderWidth: 1,
    borderColor: theme.$primaryColor,
    alignSelf: 'center',
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  inputField: {
    alignSelf: 'center',
    width: '90%',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 8,
  },
  registerBtn: {
    alignSelf: 'center',
    width: '90%',
    backgroundColor: theme.$primaryColor,
    padding: 5,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },
  registerBtnText: {
    fontSize: 18,
    marginVertical: 5,
    color: 'white',
    fontFamily: 'montserrat-medium',
    textTransform: 'uppercase',
  },
});

export default EditMediaScreen;
