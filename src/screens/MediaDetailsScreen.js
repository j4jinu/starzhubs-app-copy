import React, { useContext, useState } from 'react';
import {Image, StyleSheet, Text, View, Modal, TouchableOpacity, ScrollView} from 'react-native';
import WebView from 'react-native-webview';
import Icon from 'react-native-vector-icons/FontAwesome';
import theme from '../config/theme';
import { AuthContext } from '../context/authContext';

const MediaDetailsScreen = (props) => {
  const auth = useContext(AuthContext);
  const mediaFile = props.navigation.getParam('mediaFile');
  const mediaType = props.navigation.getParam('mediaType');
  const caption = props.navigation.getParam('caption');
  const description = props.navigation.getParam('description');
  const user = props.navigation.getParam('user');
  const status = props.navigation.getParam('status');
  const [enlargeModal,setEnlargeModal] = useState(false)


  return (
    // <View>
    <>
      <Modal transparent visible={enlargeModal} animationType="slide">
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              // marginTop: 22,
              backgroundColor:'#000000aa'
            }}
            onPress={() => setEnlargeModal(false)}
          >
            <View
              style={{
                margin: 5,
                backgroundColor: 'white',
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
                  // borderBottomWidth: 1,
                  paddingVertical: 12,
                  // backgroundColor: '#f5f5f5',
                  // borderColor: 'gray',
                }}>
                <Text
                  style={{
                    color: theme.$primaryColorText,
                    marginLeft: 15,
                    color: theme.$primaryColorText,
                    fontSize: 17,
                  }}>
                  
                </Text>
                <TouchableOpacity onPress={() => setEnlargeModal(false)}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: 'bold',
                      marginRight: 12,
                    }}>
                    X
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  paddingHorizontal: 15,
                  paddingVertical: 15,
                }}>
                <Image
          style={styles.media}
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
        <TouchableOpacity onPress={()=>setEnlargeModal(true)}>
        <Image
          style={styles.media}
          source={{
            uri: `http://13.232.190.226/api/user/view/media/?${mediaFile}`,
          }}
        />
        </TouchableOpacity>
      )}
      <ScrollView>
        <Text style={styles.title}>{caption}</Text>
        <Text style={styles.content}>{description}</Text>
        {status===1?
          user._id !== auth.userId  && (
            <View style={styles.authorInfo}>
              <Image
                style={{
                  width: 50,
                  height: 50,
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
                  <Text style={{fontSize: 13}}>{'Posted By'}</Text>
                  <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                    {user.name}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          )
          :null
          }

      </ScrollView>



{/* Enlarge Modal */}


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
  },
  media: {
    width: '100%',
    height: 400,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
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
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginHorizontal: 10,
    padding: 8,
    marginTop: 10,
    flexDirection: 'row',
    borderRadius: theme.$borderRadius,
  },

});

export default MediaDetailsScreen;
