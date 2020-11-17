import React, { Fragment, Component } from 'react';
import ImagePicker from 'react-native-image-picker';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  Button,
  Dimensions,
  TouchableOpacity
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const options = {
  title: 'Select Avatar',
  customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};
export default class AddTalentScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filepath: {
        data: '',
        uri: ''
      },
      fileData: '',
      fileUri: ''
    }
  }

  chooseImage = () => {
    let options = {
      title: 'Select Image',
      customButtons: [
        { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
      ],
      storageOptions: {
        skipBackup: true,
		path: 'images',
		quality: 0.5,
      },
    };
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = { uri: response.uri };

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        // alert(JSON.stringify(response));s
        // console.log('response', JSON.stringify(response));
        this.setState({
          filePath: response,
          fileData: response.data,
          fileUri: response.uri
		});
		this.uploadAvatar('head_shot', this.state.fileUri);
      }
    });
  }


  uploadAvatar = (imgType, imgurl) => {
    console.warn("URL",imgurl);
	// 	let image;
	// 	if (imgType === 'head_shot') {
	// 		image = headimg;
	// 	} else if (imgType === 'left_profile') {
	// 		image = leftimg;
	// 	} else if (imgType === 'right_profile') {
	// 		image = rightimg;
	// 	} else {
	// 		image = fullsizeimg;
    // }
    const uri = imgurl;
		var formData = new FormData();
		formData.append('imageType', imgType);
		let fileType = uri.substring(uri.lastIndexOf('.') + 1);
		formData.append('avatar', {
			uri,
			name: `photo.${fileType}`,
			type: `image/${fileType}`,
		});

		const config = {
			method: 'POST',
			body: formData,
			headers: {
				'Content-Type': 'multipart/form-data',
				Authorization: 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Zjk5NGM2ZGYxNjY0YTdiMTJhZmMyYTIiLCJpYXQiOjE2MDU1MjU1MjN9.wPp9Q6M6xGtFlENY3xf0i0wBQcv-c40SFRBfE8D27ms',
			},
		};

		fetch(`http://13.232.190.226/api/user/avatar`, config)
			.then((response) => response.json())
			.then(
				(response) => {
					console.warn(
						'Avatar upload: ',
						response
					);
					if (response.success === true) {
						alert(response.message);
					} else {
						alert(response.message);
					}
				},
				(error) => {
					alert('Upload failed: ' + error);
				}
			);
    };  

  launchCamera = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchCamera(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = { uri: response.uri };
        console.log('response', JSON.stringify(response));
        this.setState({
          filePath: response,
          fileData: response.data,
          fileUri: response.uri
        });
      }
    });

  }

  launchImageLibrary = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = { uri: response.uri };
        console.log('response', JSON.stringify(response));
        this.setState({
          filePath: response,
          fileData: response.data,
          fileUri: response.uri
        });
      }
    });

  }

  renderFileData() {
    if (this.state.fileData) {
      return <Image source={{ uri: 'data:image/jpeg;base64,' + this.state.fileData }}
        style={styles.images}
      />
    } 
  }

  renderFileUri() {
    if (this.state.fileUri) {
      return <Image
        source={{ uri: this.state.fileUri }}
        style={styles.images}
      />
    } 
  }
  render() {
    return (
      <Fragment>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <View style={styles.body}>
            <Text style={{textAlign:'center',fontSize:20,paddingBottom:10}} >Pick Images from Camera & Gallery</Text>
            <View style={styles.ImageSections}>
              <View>
                {this.renderFileData()}
                <Text  style={{textAlign:'center'}}>Base 64 String</Text>
              </View>
              <View>
                {this.renderFileUri()}
                <Text style={{textAlign:'center'}}>File Uri</Text>
              </View>
            </View>

            <View style={styles.btnParentSection}>
              <TouchableOpacity onPress={this.chooseImage} style={styles.btnSection}  >
                <Text style={styles.btnText}>Choose File</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={this.launchCamera} style={styles.btnSection}  >
                <Text style={styles.btnText}>Directly Launch Camera</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={this.launchImageLibrary} style={styles.btnSection}  >
                <Text style={styles.btnText}>Directly Launch Image Library</Text>
              </TouchableOpacity>
            </View>

          </View>
        </SafeAreaView>
      </Fragment>
    );
  }
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },

  body: {
    backgroundColor: Colors.white,
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 1,
    height: Dimensions.get('screen').height - 20,
    width: Dimensions.get('screen').width
  },
  ImageSections: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 8,
    justifyContent: 'center'
  },
  images: {
    width: 150,
    height: 150,
    borderColor: 'black',
    borderWidth: 1,
    marginHorizontal: 3
  },
  btnParentSection: {
    alignItems: 'center',
    marginTop:10
  },
  btnSection: {
    width: 225,
    height: 50,
    backgroundColor: '#DCDCDC',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    marginBottom:10
  },
  btnText: {
    textAlign: 'center',
    color: 'gray',
    fontSize: 14,
    fontWeight:'bold'
  }
});