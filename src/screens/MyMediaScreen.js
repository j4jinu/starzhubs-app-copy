import React, {useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import WebView from 'react-native-webview';
import MediaGrid from '../components/MediaGrid';
import theme from '../config/theme';
import {AuthContext} from '../context/authContext';

const MyMediaScreen = (props) => {
  const auth = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [talents, setTalents] = useState([]);

  useEffect(() => {
    const getTalents = async () => {
      try {
        const res = await fetch('http://13.232.190.226/api/user/talent', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });
        const resData = await res.json();
        if (!resData.success) {
          setLoading(false);
          alert(resData.message);
          return;
        } else {
          setTalents(resData.data.talents);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        alert('Something went wrong. Try again later.');
      }
    };
    getTalents();
  }, []);

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

  return (
    <ScrollView style={styles.container}>
      {talents.map((t) => (
        <>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 10,
              paddingVertical: 8,
              marginTop: 10,
            }}>
            <Text style={{fontWeight: 'bold', fontSize: 17}}>
              {t.category.title}
            </Text>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() =>
                  props.navigation.navigate('Photo', {
                    talentId: t._id,
                  })
                }
                style={{
                  backgroundColor: 'white',
                  borderRadius: theme.$borderRadius,
                  borderWidth: 1,
                  borderColor: '#e6e6e6',
                  paddingHorizontal: 8,
                  paddingVertical: 3,
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginRight: 10,
                }}>
                <Icon
                  style={{marginRight: 10}}
                  name="camera"
                  size={15}
                  color={theme.$primaryColor}
                />
                <Text style={{fontSize: 14}}>Photo</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() =>
                  props.navigation.navigate('Video', {
                    talentId: t._id,
                  })
                }
                style={{
                  backgroundColor: 'white',
                  borderRadius: theme.$borderRadius,
                  borderWidth: 1,
                  borderColor: '#e6e6e6',
                  paddingHorizontal: 8,
                  paddingVertical: 3,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Icon
                  style={{marginRight: 10}}
                  name="video-camera"
                  size={15}
                  color={theme.$primaryColor}
                />
                <Text style={{fontSize: 14}}>Video</Text>
              </TouchableOpacity>
            </View>
          </View>
          {t.media.map((m) => (
            <TouchableOpacity
              style={styles.gridItem}
              activeOpacity={0.7}
              onPress={() =>
                props.navigation.navigate('MediaDetails', {
                  media: m.file,
                })
              }>
              {m.fileType === 'image' ? (
                <Image
                  style={{width: '100%', height: 220, resizeMode: 'cover'}}
                  source={{
                    uri: `http://13.232.190.226/api/user/view/media/?${m.file}`,
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
              {/* <Image
                                     style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
                                     source={{
                                         uri: props.image
                                     }}
                                 /> */}
              <Text style={styles.mediaTitle}>{m.caption}</Text>
              <Text style={styles.mediaDescription} numberOfLines={3}>
                {m.caption}
              </Text>
            </TouchableOpacity>
          ))}
        </>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingBottom: 25,
  },
  gridItem: {
    flex: 1,
    alignSelf: 'center',
    width: '95%',
    height: 300,
    backgroundColor: '#f1f1f1',
    marginHorizontal: 3,
    marginVertical: 3,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 3.26,
    shadowRadius: 5,
    elevation: 5,
    borderRadius: 8,
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
  },
  mediaDescription: {
    color: theme.$primaryColorText,
    fontSize: 14,
    marginHorizontal: 10,
    marginBottom: 10,
  },
});

export default MyMediaScreen;
