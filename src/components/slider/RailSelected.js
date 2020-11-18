import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import theme from '../../config/theme';

const RailSelected = () => {
  return <View style={styles.root} />;
};

export default memo(RailSelected);

const styles = StyleSheet.create({
  root: {
    height: 4,
    backgroundColor: theme.$primaryColor,
    borderRadius: 2,
  },
});
