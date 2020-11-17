import React, {useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  ScrollView,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import WebView from 'react-native-webview';
import MediaGrid from '../components/MediaGrid';
import theme from '../config/theme';
import {AuthContext} from '../context/authContext';

const posters = [
  {
    id: 'h',
    name: 'Poster A',
    image:
      'https://deadline.com/wp-content/uploads/2030/10/AP_20210337197617-e1603795015914.jpg?w=681&h=383&crop=1',
  },
  {
    id: 'f',
    name: 'Poster B',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/7/79/Johnny_Depp_Deauville_2019.jpg',
  },
  {
    id: 'l',
    name: 'Poster C',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQAs-E4jTq8f50vjVirikRNtW3ggDySwb2A5g&usqp=CAU',
  },
  {
    id: 'r',
    name: 'Poster D',
    image:
      'https://ca-times.brightspotcdn.com/dims4/default/60d39e3/2147483647/strip/true/crop/2047x1151+0+0/resize/840x472!/quality/90/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F63%2F26%2Fb97131a2a20b0a8b805c0defa552%2Fla-1533757303-22e1u7m67i-snap-image',
  },
  {
    id: 'a',
    name: 'Poster E',
    image:
      'https://img.theweek.in/content/dam/week/news/entertainment/images/2019/4/25/Johnny-Depp-dating.jpg',
  },
];

const MyMediaScreen = (props) => {
  const auth = useContext(AuthContext);
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
          alert(resData.message);
          return;
        }
        setTalents(resData.data.talents);
      } catch (error) {
        alert('Something went wrong. Try again later.');
      }
    };
    getTalents();
  }, []);
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
            }}>
            <Text style={{fontWeight: 'bold', fontSize: 17}}>
              {t.category.title}
            </Text>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => props.navigation.navigate('Photo')}
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
                onPress={() => props.navigation.navigate('Video')}
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
