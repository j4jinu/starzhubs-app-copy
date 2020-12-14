import React from 'react';
import { Modal } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

const images = [
  {
    url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460',
    props: {
      source: require('../assets/starz.png'),
    },
  },
  {
    url: '',
    props: {
      source: require('../assets/starz.png'),
    },
  },
];
const ImageViewScreen = (props) => {
  return (
    <Modal visible={true} transparent={true}>
      <ImageViewer imageUrls={images} />
    </Modal>
  );
};
export default ImageViewScreen;
