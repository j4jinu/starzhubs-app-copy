import React, { useContext, useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import WebView from 'react-native-webview';
import theme from '../config/theme';
import { AuthContext } from '../context/authContext';
import SIcon from 'react-native-vector-icons/Fontisto';
import ImageViewer from 'react-native-image-zoom-viewer';
import AIcon from 'react-native-vector-icons/AntDesign';

const MediaDetailsScreen = (props) => {
  const auth = useContext(AuthContext);
  const mediaFile = props.navigation.getParam('mediaFile');
  const mediaType = props.navigation.getParam('mediaType');
  const caption = props.navigation.getParam('caption');
  const description = props.navigation.getParam('description');
  const status = props.navigation.getParam('status');
  const user = props.navigation.getParam('user');
  const [enlargeModal, setEnlargeModal] = useState(false);
  const deviceWidth = Dimensions.get('window').width;
  const [showModal, setshowModal] = useState(false);
  const [imageIndex, setimageIndex] = useState(0);
  const images = [
    {
      url: `http://13.232.190.226/api/user/view/media/?${mediaFile}`,
      props: {
        source: `http://13.232.190.226/api/user/view/media/?${mediaFile}`,
      },
    },
  ];
  const footerModal = () => {
    return (
      <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: '10%' }}>
        <View style={{ flexDirection: 'column', width: '100%' }}>
          <Text style={{ color: 'white', textAlign: 'center', textAlignVertical: 'center', width: '100%' }}>Swipe down to close</Text>
          <AIcon name="arrowdown" size={20} color="white" style={{ alignSelf: 'center' }} />
        </View>
      </View>
    )
  }

  return (
    <>
      <Modal visible={showModal} transparent={true}>
        <ImageViewer
          imageUrls={images}
          enableSwipeDown
          onSwipeDown={() => setshowModal(false)}
          renderFooter={footerModal}
        />
      </Modal>
      <Modal transparent visible={enlargeModal} animationType="slide">
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#000000d2'
          }}
        >
          <View
            style={{
              margin: 5,
              borderRadius: 3,
              width: '95%',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: theme.$primaryColorText,
                  marginLeft: 15,
                  color: theme.$primaryColorText,
                  fontSize: 17,
                }}>
              </Text>
              <TouchableOpacity onPress={() => setEnlargeModal(false)} style={{ flexDirection: 'row' }}>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: 'bold',
                    marginRight: 12,
                    color: 'white',
                    marginTop: 5
                  }}>
                  close
                </Text>
                <SIcon name="close" size={22} color='white' style={{ marginRight: 12 }} />
              </TouchableOpacity>
            </View>
            <View
              style={{
                justifyContent: 'center',
                paddingHorizontal: 15,
                paddingVertical: 15,
              }}>
              <Image
                style={{ width: '100%', height: deviceWidth / 2 }}
                resizeMode="cover"
                source={{
                  uri: `http://13.232.190.226/api/user/view/media/?${mediaFile}`,
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
      {mediaType === 'video' ? (
        <WebView
          javaScriptEnabled={true}
          domStorageEnabled={true}
          source={{
            uri:
              'https://www.youtube.com/embed/' +
              mediaFile.substring(mediaFile.lastIndexOf('=') + 1),
          }}
        />
      ) : (
          <TouchableOpacity
            onPress={() => {
              setimageIndex(0);
              setshowModal(true);
            }}>
            <Image
              style={{ width: '100%', height: deviceWidth / 2 }}
              source={{
                uri: `http://13.232.190.226/api/user/view/media/?${mediaFile}`,
              }}
            />
          </TouchableOpacity>
        )}
      <View style={{ backgroundColor: 'white' }}>
        <Text style={styles.title}>{caption}</Text>
        <Text style={styles.content}>{description}</Text>
        {status === 1
          ? user._id !== auth.userId && (
            <View style={styles.authorInfo}>
              <Image
                style={{
                  width: 45,
                  height: 45,
                  borderRadius: 100,
                }}
                source={{
                  uri: `http://13.232.190.226/api/user/avatar/${user.image.avatar}`,
                }}
              />
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate('UserDetails', {
                    userId: user._id,
                  })
                }>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    marginLeft: 10,
                  }}>
                  <Text style={{ fontSize: 9 }}>{'Posted By '}</Text>
                  <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                    {user.name}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          )
          : null}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    marginHorizontal: 15,
    marginVertical: 8,
    lineHeight: 17,
    fontSize: 13,
    lineHeight: 18,
  },
  media: {
    width: '100%',
    height: 400,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 10,
    marginHorizontal: 15,
  },
  authorInfo: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    padding: 8,
    marginTop: 5,
    marginHorizontal: 5,
    flexDirection: 'row',
    borderRadius: theme.$borderRadius,
  },
});
export default MediaDetailsScreen;
