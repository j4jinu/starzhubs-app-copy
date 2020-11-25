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
import {AuthContext} from '../context/authContext';
import theme from '../config/theme';
import WebView from 'react-native-webview';
import {Snackbar} from 'react-native-paper';

const mediaSchema = yup.object({
  link: yup.string().required('Enter your YouTube video link'),
  caption: yup.string().required('Enter caption about this media'),
  description: yup.string().required('Enter description'),
});

const VideoUploadScreen = (props) => {
  const talentId = props.navigation.getParam('talentId');
  const auth = useContext(AuthContext);
  const [ytLink, setYtLink] = useState('');
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState();

  const transformYoutubeLinks = (text) => {
    const fullreg = /(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([^& \n<]+)(?:[^ \n<]+)?/g;
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([^& \n<]+)(?:[^ \n<]+)?/g;
    const match = text.match(fullreg);
    if (match && match.length > 0) {
      for (var i = 0; i < match.length; i++) {
        let matchParts = match[i].split(regex);
        console.log(
          'match part: ',
          'https://www.youtube.com/watch?v=' + matchParts[1],
        );
        setYtLink(matchParts[1]);
      }
    }
  };

  const uploadMedia = async (values, {resetForm}) => {
    let text = values.link;
    const fullreg = /(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([^& \n<]+)(?:[^ \n<]+)?/g;
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([^& \n<]+)(?:[^ \n<]+)?/g;
    const match = text.match(fullreg);
    if (match && match.length > 0) {
      values.talentId = talentId;
      values.link = 'https://www.youtube.com/watch?v=' + ytLink;
      try {
        const response = await fetch(
          'http://13.232.190.226/api/talent/upload/media',
          {
            method: 'POST',
            headers: {
              Authorization: 'Bearer ' + auth.token,
              'Content-type': 'application/json',
            },
            body: JSON.stringify(values),
          },
        );
        const resData = await response.json();
        if (resData.success) {
          const msg = 'Video Uploaded Successfully. Check Your Media Screen.';
          setMessage(msg);
          setVisible(!visible);
          setYtLink('');
          resetForm({values: ''});
          props.navigation.navigate('Account')
        } else {
          const msg = 'Something went wrong. Try again!';
          setMessage(msg);
          setVisible(!visible);
        }
      } catch (error) {}
    } else {
      alert('Invalid youtube Link');
    }
  };

  const onDismissSnackBar = () => {
    setVisible(false);
  };

  return (
    <View style={styles.container}>
      <Snackbar visible={visible} duration={5000} onDismiss={onDismissSnackBar}>
        {message}
      </Snackbar>
      <ScrollView>
        <Formik
          initialValues={{
            caption: '',
            description: '',
          }}
          validationSchema={mediaSchema}
          onSubmit={(values, {setSubmitting, resetForm}) =>
            uploadMedia(values, {setSubmitting, resetForm})
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
                {ytLink !== '' ? (
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
                        uri: 'https://www.youtube.com/embed/' + ytLink,
                      }}
                    />
                  </View>
                ) : (
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color: 'black',
                      fontSize: 20,
                    }}>
                    Preview not available
                  </Text>
                )}
              </View>
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
                  borderColor: errors.link ? 'red' : 'gray',
                }}>
                <Icon name="mail" size={20} color={theme.$primaryColor} />
                <TextInput
                  keyboardType={'default'}
                  style={styles.inputField}
                  placeholder={'Link'}
                  onChangeText={handleChange('link')}
                  onBlur={handleBlur('link')}
                  value={values.link}
                  onEndEditing={(e) =>
                    transformYoutubeLinks(e.nativeEvent.text)
                  }
                />
              </View>
              {touched.link && errors.link && (
                <Text style={styles.errorText}>
                  {touched.link && errors.link}
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
                  borderColor: errors.caption ? 'red' : 'gray',
                }}>
                <Icon name="mail" size={20} color={theme.$primaryColor} />
                <TextInput
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
                  placeholder={'Description'}
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
                  <Text style={styles.registerBtnText}>Upload</Text>
                </TouchableOpacity>
              )}
              {isSubmitting && (
                <ActivityIndicator
                  style={{marginTop: 10}}
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

export default VideoUploadScreen;
