import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
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
              style={{ width: '100%', height: deviceWidth / 2 }}
              resizeMode="cover"
              source={{
                uri: `http://13.233.216.36:3000/api/user/view/media/?${props.media[0].file}`,
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
          {props.user[0] !== undefined && (
            <Text style={styles.mediaAuthor}>{props.user[0].name}</Text>
          )}
          <Text style={styles.mediaTitle}>{props.media[0].caption}</Text>
          <Text numberOfLines={3} style={styles.mediaDescription}>
            {props.media[0].description}
          </Text>
        </TouchableOpacity>
      </>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  gridItem: {
    width: '99%',
    backgroundColor: 'white',
    marginHorizontal: 3,
    marginVertical: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 3.26,
    shadowRadius: 5,
    elevation: 1,
    marginBottom: 10,
    paddingBottom: 10,
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
    color: 'black',
    fontSize: 17,
    marginVertical: 5,
    marginHorizontal: 10,
  },
  mediaDescription: {
    color: theme.$primaryColorText,
    fontSize: 13,
    marginHorizontal: 10,
  },
  mediaAuthor: {
    color: theme.$primaryColor,
    fontSize: 15,
    marginHorizontal: 10,
    marginTop: 10,
  },
});

export default MediaItem;
