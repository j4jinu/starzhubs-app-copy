import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import WebView from 'react-native-webview';

const MediaGrid = (props) => {
  if (props.media.length === 0) {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 25,
          marginTop: "5%",
          marginLeft: "25%"
        }}>
        <Text style={{ fontSize: 18, color: 'tomato' }}>
          No Media files.
</Text>
        <Image
          source={require('../assets/broke.png')}
          style={{ width: "90%", height: 160, marginHorizontal: 100, marginTop: "5%" }}
        />
      </View>
    )
  }
  return (
    <>
      {props.media.map((media) => (
        <TouchableOpacity
          style={styles.gridItem}
          activeOpacity={0.7}
          onPress={() =>
            props.navigation.navigate('MediaDetails', {
              mediaFile: media.file,
              mediaType: media.fileType,
              caption: media.caption,
              description: media.description,
            })
          }>
          <View style={styles.container}>
            {media.fileType === 'image' ? (
              <Image
                style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
                source={{
                  uri: `https://api.starzhubs.com/api/user/view/media/?${media.file}`,
                }}
              />
            ) : (
                <WebView
                  javaScriptEnabled={true}
                  domStorageEnabled={true}
                  source={{
                    uri:
                      'https://www.youtube.com/embed/' +
                      media.file.substring(media.file.lastIndexOf('=') + 1),
                  }}
                />
              )}
            {/* <Image
                            style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
                            source={{
                                uri: props.image
                            }}
                        /> */}
          </View>
        </TouchableOpacity>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e9e9e9',
  },
  gridItem: {
    flex: 1,
    width: 200,
    height: 150,
    backgroundColor: '#f1f1f1',
    marginHorizontal: 3,
    marginVertical: 3,
  },
  gridItemText: {
    fontFamily: 'montserrat-medium',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
    marginLeft: 10,
  },
});

export default MediaGrid;
