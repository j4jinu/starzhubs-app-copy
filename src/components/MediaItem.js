import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import WebView from 'react-native-webview';
import theme from '../config/theme';

const MediaItem = (props) => {
  if (props.media.length === 0) {
    return null;
  }

  return (
    <>
      <TouchableOpacity
        style={styles.gridItem}
        activeOpacity={0.7}
        onPress={() =>
          props.navigation.navigate('MediaDetails', {
            media: props.media[0].file,
          })
        }>
        {props.media[0].fileType === 'image' ? (
          <Image
            style={{width: '100%', height: '60%', resizeMode: 'cover'}}
            source={{
              uri: `http://13.232.190.226/api/user/view/media/?${props.media[0].file}`,
            }}
          />
        ) : (
          <WebView
            javaScriptEnabled={true}
            domStorageEnabled={true}
            source={{
              uri:
                'https://www.youtube.com/embed/' +
                props.media[0].file.substring(
                  props.media[0].file.lastIndexOf('=') + 1,
                ),
            }}
          />
        )}
        {/* <Image
                            style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
                            source={{
                                uri: props.image
                            }}
                        /> */}
        <Text style={styles.mediaTitle}>{props.media[0].caption}</Text>
        <Text style={styles.mediaDescription} numberOfLines={3}>
          {props.media[0].caption}
        </Text>
        <Text style={{color: theme.$primaryColorText, marginLeft: 10}}>
          Posted by:{' '}
          {props.user[0] !== undefined && (
            <Text style={styles.mediaAuthor}>{props.user[0].name}</Text>
          )}
          {props.user !== undefined && (
            <Text style={styles.mediaAuthor}>{props.user.name}</Text>
          )}
        </Text>
      </TouchableOpacity>
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
    alignSelf: 'center',
    width: '95%',
    height: 300,
    backgroundColor: 'white',
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
  mediaAuthor: {
    color: theme.$primaryColor,
    fontSize: 16,
    marginHorizontal: 10,
  },
});

export default MediaItem;
