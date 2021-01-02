import React, { useContext, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Image,
  ActivityIndicator,
  Alert,
  ToastAndroid
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import WebView from 'react-native-webview';
import theme from '../config/theme';
import { AuthContext } from '../context/authContext';

const MyMediaScreen = (props) => {
  const media = props.navigation.getParam('media')
  const talentId = props.navigation.getParam('talentId')
  const userId = props.navigation.getParam('userId')
  const auth = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [talents, setTalents] = useState([]);
  const [isNoMedia, setNoMedia] = useState(false);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator color={theme.$primaryColor} size={'large'} />
      </View>
    );
  }

  const confirmDelete = (tid, mid) =>
    Alert.alert(
      '',
      'Are you sure to delete this media?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => onDelteMedia(tid, mid),
        },
      ],
      { cancelable: false },
  );

  const onDelteMedia = (talentId, mediaId) => {
    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + auth.token,
      },
      body: JSON.stringify({
        talentId: talentId,
      }),
    };
    fetch(`http://13.233.216.36:3000/api/talent/media/${mediaId}`, requestOptions)
      .then((response) => response.json())
      .then(
        (response) => {
          if (response.success === true) {
            props.navigation.navigate('MyMedia');
            showToastWithGravityAndOffset()
          } else {
            alert(response.message);
          }
        },
        (error) => {
          alert('Something went wrong. Try again later.');
        },
      );
  };

  const showToastWithGravityAndOffset = () => {
    ToastAndroid.showWithGravityAndOffset(
      "Media deleted successfully",
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      50,
      100
    );
  };

  if (media.length === 0) {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: "100%",
          marginTop: "35%"
        }}>
        <Image source={require("../assets/broke.png")}
          style={{ width: "41%", height: 160, marginHorizontal: 100, marginTop: "5%" }} />
        <Text style={{ fontSize: 18, color: 'tomato' }}> No Medias Added Yet.</Text>
      </View>
    )
  }

  else {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container}>
            <>
              <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
                {media.map((m) => (
                  <>
                    <View style={styles.gridItem}>
                      {m.fileType === 'image' ? (
                        <Image
                          style={{
                            width: '100%',
                            height: 220,
                            resizeMode: 'cover',
                          }}
                          source={{
                            uri: `http://13.233.216.36:3000/api/user/view/media/?${m.file}`,
                          }}
                        />
                      ) : (
                          <WebView
                            javaScriptEnabled={true}
                            domStorageEnabled={true}
                            source={{
                              uri:
                                'https://www.youtube.com/embed/' +
                                m.file.substring(m.file.lastIndexOf('=') + 1),
                            }}
                          />
                        )}
                      <View style={{
                        flexDirection: 'row',
                        backgroundColor: 'black', marginTop: '-10%',
                        opacity: 0.7, width: '100%'
                      }}
                      >
                        <TouchableOpacity
                          style={{
                            borderRightWidth: 1, borderRightColor: 'white',
                            width: '50%', alignItems: 'center', justifyContent: 'center', paddingVertical: 10
                          }}
                          onPress={() =>
                            props.navigation.navigate('EditMedia', {
                              talentId: talentId,
                              mediaFile: m.file,
                              mediaType: m.fileType,
                              caption: m.caption,
                              description: m.description,
                              mediaId: m._id,
                            })
                          }
                          >
                          <Text style={{ color: 'white', fontWeight: "bold", textTransform: 'uppercase' }}>Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={{
                            borderRightWidth: 1, borderRightColor: 'white',
                            width: '50%', alignItems: 'center', justifyContent: 'center'
                          }}
                          onPress={() => confirmDelete(talentId, m._id)}
                        >
                          <Text style={{ color: 'white', fontWeight: "bold", textTransform: 'uppercase' }}>Delete</Text>
                        </TouchableOpacity>
                      </View>
                      <View style={{ flexDirection: 'row', width: '100%' }}>
                        <View style={{ width: '100%', flexDirection: 'column' }}>
                          <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={() =>
                              props.navigation.navigate('MediaDetails', {
                                mediaFile: m.file,
                                mediaType: m.fileType,
                                caption: m.caption,
                                description: m.description,
                                user: userId,
                                status: 0
                              })
                            }>
                            <Text style={styles.mediaTitle}>{m.caption}</Text>
                            <Text
                              style={styles.mediaDescription}
                              numberOfLines={3}
                              >
                              {m.description.substring(0, 100)}...
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </>
                ))}
              </View>
            </>
        </ScrollView>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingBottom: 25,
  },
  gridItem: {
    alignSelf: 'center',
    width: '98%',
    height: 300,
    backgroundColor: '#f1f1f1',
    marginHorizontal: 3,
    marginVertical: 3,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 3.26,
    shadowRadius: 5,
    elevation: 5,
    borderRadius: 2,
    marginTop: 10,
    marginBottom: 15,
  },
  gridItemText: {
    fontFamily: 'montserrat-medium',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
    marginLeft: 10,
  },
  mediaTitle: {
    fontWeight: 'bold',
    color: theme.$primaryColorText,
    fontSize: 18,
    marginVertical: 5,
    marginHorizontal: 10,
    textTransform: 'uppercase'
  },
  mediaDescription: {
    color: theme.$primaryColorText,
    fontSize: 14,
    marginHorizontal: 10,
    marginBottom: 10,
  },
});

export default MyMediaScreen;
