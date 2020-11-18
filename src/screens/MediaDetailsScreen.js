import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import WebView from 'react-native-webview';
const MediaDetailsScreen = (props) => {
  const mediaFile = props.navigation.getParam('mediaFile');
  const mediaType = props.navigation.getParam('mediaType');
  const caption = props.navigation.getParam('caption');
  const description = props.navigation.getParam('description');
  return (
    <View>
      {mediaType === 'image' ? (
        <Image
          style={styles.media}
          source={{
            uri: `http://13.232.190.226/api/user/view/media/?${mediaFile}`,
          }}
        />
      ) : (
        <WebView
          javaScriptEnabled={true}
          domStorageEnabled={true}
          source={{
            uri:
              'https://www.youtube.com/embed/' +
              mediaFile.substring(mediaFile.lastIndexOf('=') + 1),
          }}
        />
      )}

      <Text style={styles.title}>{caption}</Text>
      <Text style={styles.content}>{description}</Text>
    </View>
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
});

export default MediaDetailsScreen;
