import React from 'react';
import {View, Text} from 'react-native';
const PosterRequestScreen = (props) => {
  const posterId = props.navigation.getParam('posterId');
  return (
    <View>
      <Text>{posterId}</Text>
    </View>
  );
};

export default PosterRequestScreen;
