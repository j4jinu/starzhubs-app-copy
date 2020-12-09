import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
} from 'react-native';
import WebView from 'react-native-webview';
import theme from '../config/theme';

const MediaItem = (props) => {
  const deviceWidth = Dimensions.get('window').width;

  if (props.user === null) {
    return null;
  } else {
    return (
      <>
        <TouchableOpacity
          style={styles.gridItem}
          activeOpacity={0.7}
          onPress={() =>
            props.navigation.navigate('MediaDetails', {
              mediaFile: props.media[0].file,
              mediaType: props.media[0].fileType,
              caption: props.media[0].caption,
              description: props.media[0].description,
              user: props.user[0] !== undefined ? props.user[0] : props.user,
              status: 1,
            })
          }>
          {props.media[0].fileType === 'image' ? (
            <Image
              style={{width: '100%', height: deviceWidth / 2}}
              // style={{ width: '100%', height: '60%', resizeMode: 'cover' }}
              resizeMode="cover"
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
          <Text style={styles.mediaDescription}>
            {props.media[0].description}
          </Text>
          <Text style={{color: theme.$primaryColorText, marginLeft: 10}}>
            Posted by:
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
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e9e9e9',
  },
  gridItem: {
    width: '99%',
    height: 300,
    backgroundColor: 'white',
    marginHorizontal: 3,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 3.26,
    shadowRadius: 5,
    elevation: 1,
    borderRadius: 2,
    marginBottom: 10,
    // elevation: 3,
    // borderRadius: 2,
    // marginBottom: "3%"
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
    // marginBottom: 10,
  },
  mediaAuthor: {
    color: theme.$primaryColor,
    fontSize: 16,
    marginHorizontal: 10,
  },
});

export default MediaItem;
