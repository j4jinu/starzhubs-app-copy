import React, { useState, useContext, useEffect } from 'react';
import {
	View,
	Alert,
	Image,
	Text,
	StyleSheet,
	ScrollView,
	TouchableOpacity,
	PermissionsAndroid,
	TextInput,
} from 'react-native';
import * as Yup from 'yup';
import { Formik } from 'formik';
import ImagePicker from 'react-native-image-picker';
import DatePicker from 'react-native-datepicker';
import Moment from 'moment';
import Cicon from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../context/authContext';
import { Snackbar } from 'react-native-paper';

const EditPosterScreen = (props) => {
	const posterId = props.navigation.getParam('posterId');
	const title = props.navigation.getParam('title');
	const img = props.navigation.getParam('image');
	const description = props.navigation.getParam('description');
	const edDate = props.navigation.getParam('endDate');
	const stDate = props.navigation.getParam('startDate');
	const auth = useContext(AuthContext);
	const [message, setMessage] = useState();
	const [image, setImage] = useState(
		`http://13.232.190.226/api/poster/view/${img}`,
	);
	const [startDate, setStartDate] = useState(
		Moment(stDate).format('DD/MM/YYYY'),
	);
	const [endDate, setEndDate] = useState(Moment(edDate).format('DD/MM/YYYY'));
	const [isStartDate, setIsStartDate] = useState(false);
	const [isEndDate, setIsEndDate] = useState(false);
	const [isImage, setIsImage] = useState(false);
	const [visible, setVisible] = useState(false);
	const [sDate, setSDate] = useState(Moment(stDate).format('DD/MM/YYYY'));
	const [eDate, setEDate] = useState(Moment(edDate).format('DD/MM/YYYY'));

	const posterInitValues = {
		title: title,
		description: description,
	};
	const posterValidation = Yup.object().shape({
		title: Yup.string().required('Please give a title'),
		description: Yup.string().required('Please provide poster description'),
	});

	const handleSubmit = (values) => {
		if (startDate === '') {
			setIsStartDate(true);
		} else {
			setStartDate(false);
		}
		if (endDate === '') {
			setIsEndDate(true);
		} else {
			setEndDate(false);
		}
		if (image === null) {
			setIsImage(true);
		} else {
			setIsImage(false);
		}

		var formData = new FormData();
		formData.append('title', values.title);
		formData.append('description', values.description);
		formData.append('startDate', startDate);
		formData.append('endDate', endDate);
		const uri = image;
		let fileType = uri.substring(uri.lastIndexOf('.') + 1);
		formData.append('poster', {
			uri,
			name: `photo.${fileType}`,
			type: `image/${fileType}`,
		});
		const requestOptions = {
			method: 'PUT',
			headers: {
				Authorization: 'Bearer ' + auth.token,
				'Content-Type': 'multipart/form-data',
			},
			body: formData,
		};
		console.warn(formData);
		fetch(`http://13.232.190.226/api/poster/${posterId}`, requestOptions)
			.then((response) => response.json())
			.then(
				(response) => {
					if (response.success === true) {
						const msg = 'Poster Edited Successfully.....';
						setMessage(msg);
						setVisible(!visible);
						setStartDate('');
						setEndDate('');
						setImage(null);

						props.navigation.navigate('MyPosters');
					} else {
						alert('Error: ', response);
					}
				},
				(error) => {
					alert('Poster upload failed: ' + error);
				},
			);
	};

	const requestCameraPermission1 = async () => {
		try {
			const granted = await PermissionsAndroid.request(
				PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
			);
			if (granted === PermissionsAndroid.RESULTS.GRANTED) {
				chooseFile();
			} else {
				console.warn('Camera permission denied');
			}
		} catch (err) {
			console.warn(err);
		}
	};
	// const pickImage = async () => {
	//  let result = await ImagePicker.launchImageLibrary({
	//   mediaType: ImagePicker.MediaTypeOptions.All,
	//   allowsEditing: true,
	//   aspect: [4, 3],
	//   quality: 1,
	//  });
	//  if(result.uri===''){ setIsImage(true) }
	//  else{setIsImage(false);setImage(result.uri)}
	// };
	const pickImage = {
		title: 'Select Avatar',
	};
	ImagePicker.launchImageLibrary(pickImage, (response) => {
		console.log('response', response);
		if (response.didCancel) {
			console.log('User cancelled image picker');
		} else if (response.error) {
			console.log('ImagePicker Error: ', response.error);
		} else if (response.customButton) {
			console.log('User tapped custom button: ', response.customButton);
		} else {
			const source = { uri: response.uri };
			setImage({
				avatarSource: source,
			});
		}
	});

	const handleStartDate = (date) => {
		setSDate(date);
		if (date === '') {
			setIsStartDate(true);
		} else {
			setStartDate(Moment(date, 'DD-MM-YYYY').format('yyyy-MM-DD'));
			setIsStartDate(false);
		}
	};
	const handleEndDate = (date) => {
		console.warn('Picked: ', date);
		setEDate(date);
		if (date === '') {
			setIsStarDate(true);
		} else {
			const endDateFormat = Moment(date, 'DD-MM-YYYY').format('yyyy-MM-DD');
			setEndDate(endDateFormat);
			setIsEndDate(false);
		}
	};
	const onDismissSnackBar = () => {
		setVisible(false);
	};

	const requestCameraPermission = async () => {
		try {
			const granted = await PermissionsAndroid.request(
				PermissionsAndroid.PERMISSIONS.CAMERA,
				{
					title: 'Cool Photo App Camera Permission',
					message:
						'Cool Photo App needs access to your camera ' +
						'so you can take awesome pictures.',
					buttonNeutral: 'Ask Me Later',
					buttonNegative: 'Cancel',
					buttonPositive: 'OK',
				},
			);
			if (granted === PermissionsAndroid.RESULTS.GRANTED) {
				console.log('You can use the camera');
			} else {
				console.log('Camera permission denied');
			}
		} catch (err) {
			console.warn(err);
		}
	};

	const chooseFile = () => {
		var options = {
			title: 'Select Image',
			customButtons: [
				{ name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
			],
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
				let source = response;
				// You can also display the image using data:
				// let source = { uri: 'data:image/jpeg;base64,' + response.data };
				// this.setState({
				//   filePath: source,
				// });
				console.log('source: ', source);
			}
		});
	};

	return (
		<>
			<ScrollView>
				<View style={styles.container}>
					<Snackbar
						visible={visible}
						duration={7000}
						onDismiss={onDismissSnackBar}>
						{message}
					</Snackbar>

					<View style={{ justifyContent: 'center' }}>
						<View>
							<Formik
								initialValues={posterInitValues}
								validationSchema={posterValidation}
								onSubmit={(values) => {
									handleSubmit(values);
								}}>
								{({
									values,
									handleChange,
									handleBlur,
									errors,
									handleSubmit,
									touched,
								}) => (
										<View
											style={{ marginLeft: 25, marginRight: 25, marginTop: 10 }}>
											{image && (
												<Image
													source={{ uri: image }}
													style={{ width: '100%', height: 200, marginBottom: 10 }}
												/>
											)}
											<TouchableOpacity
												style={styles.imageBtn}
												onPress={requestCameraPermission}>
												<Text style={{ color: 'white' }}> Choose Image</Text>
											</TouchableOpacity>
											{isImage && (
												<Text
													style={{
														fontSize: 13,
														color: 'red',
														alignSelf: 'center',
														marginTop: 1,
													}}>
													Choose a poster image
												</Text>
											)}
											<View
												style={{
													borderWidth: 1,
													borderColor: 'gray',
													borderRadius: 8,
													paddingLeft: 2,
													marginTop: 5,
													marginBottom: 5,
													width: '100%',
													paddingHorizontal: '7%',
													flexDirection: 'row',
													alignItems: 'center',
												}}>
												<Cicon
													name="subtitles"
													size={25}
													style={{ color: 'tomato', marginRight: '2%' }}
												/>
												<TextInput
													style={{ paddingVertical: 5 }}
													underlineColorAndroid="transparent"
													defaultValue={title}
													placeholder="Title"
													onChangeText={handleChange('title')}
													onBlur={handleBlur('title')}
												/>
											</View>
											{touched.title && errors.title && (
												<Text
													style={{
														fontSize: 13,
														color: 'red',
														alignSelf: 'center',
														marginTop: -10,
													}}>
													{errors.title}
												</Text>
											)}
											<View
												style={{
													borderWidth: 1,
													borderColor: 'gray',
													borderRadius: 8,
													paddingLeft: 2,
													marginTop: 5,
													marginBottom: 5,
													width: '100%',
													paddingHorizontal: '8%',
													flexDirection: 'row',
													alignItems: 'center',
												}}>
												<Icon
													name="ios-information-circle"
													size={25}
													style={{ color: 'tomato', marginRight: '2%' }}
												/>
												<TextInput
													underlineColorAndroid="transparent"
													placeholder="Description"
													defaultValue={description}
													numberOfLines={6}
													multiline={true}
													onChangeText={handleChange('description')}
													onBlur={handleBlur('description')}
												/>
											</View>

											{touched.description && errors.description && (
												<Text
													style={{
														fontSize: 13,
														color: 'red',
														alignSelf: 'center',
														marginTop: -1,
													}}>
													{errors.description}
												</Text>
											)}
											<DatePicker
												style={{
													borderWidth: 1,
													borderColor: 'gray',
													borderRadius: 8,
													paddingLeft: 3,
													width: '100%',
													marginTop: 5,
													marginBottom: 5,
												}}
												date={sDate}
												mode="date"
												placeholder="Start Date"
												format="DD/MM/YYYY"
												minDate={Moment().format('DD/MM/YYYY')}
												// maxDate="01-01-2019"
												confirmBtnText="Confirm"
												cancelBtnText="Cancel"
												iconComponent={
													<Cicon
														name="date-range"
														size={23}
														style={{
															position: 'absolute',
															left: 0,
															top: 8,
															color: 'tomato',
														}}
													/>
												}
												customStyles={{
													dateInput: {
														borderWidth: 0,
														marginLeft: '10%',
														alignItems: 'flex-start',
													},
												}}
												onDateChange={(date) => {
													handleStartDate(date);
												}}
											/>
											{isStartDate && (
												<Text
													style={{
														fontSize: 13,
														color: 'red',
														alignSelf: 'center',
														marginTop: 1,
													}}>
													Choose Start Date
												</Text>
											)}

											<DatePicker
												style={{
													borderWidth: 1,
													borderColor: 'gray',
													borderRadius: 8,
													paddingLeft: 3,
													width: '100%',
													marginTop: 5,
													marginBottom: 5,
												}}
												date={eDate}
												mode="date"
												placeholder="End Date"
												format="DD/MM/YYYY"
												minDate={sDate}
												// maxDate="01-01-2019"
												confirmBtnText="Confirm"
												cancelBtnText="Cancel"
												iconComponent={
													<Cicon
														name="date-range"
														size={23}
														style={{
															position: 'absolute',
															left: 0,
															top: 8,
															color: 'tomato',
														}}
													/>
												}
												customStyles={{
													dateInput: {
														borderWidth: 0,
														marginLeft: '10%',
														alignItems: 'flex-start',
													},
												}}
												onDateChange={(date) => {
													handleEndDate(date);
												}}
											/>
											{isEndDate && (
												<Text
													style={{
														fontSize: 13,
														color: 'red',
														alignSelf: 'center',
														marginTop: 1,
													}}>
													Choose End Date
												</Text>
											)}

											<View
												style={{
													marginTop: 10,
													width: '100%',
													alignItems: 'center',
												}}>
												<TouchableOpacity
													style={{
														borderRadius: 2,
														backgroundColor: 'tomato',
														padding: 10,
														width: '50%',
														alignItems: 'center',
														borderRadius: 20,
													}}
													onPress={handleSubmit}>
													<Text
														style={{
															color: 'white',
															fontWeight: 'bold',
														}}>
														Update Poster
                        </Text>
												</TouchableOpacity>
											</View>
										</View>
									)}
							</Formik>
						</View>
					</View>
				</View>
			</ScrollView>
		</>
	);
};
export default EditPosterScreen;
const styles = StyleSheet.create({
	container: {
		flex: 1,
		margin: '5%',
	},
	posterTitle: {
		fontSize: 18,
		color: 'orange',
		fontWeight: 'bold',
	},
	iconDiv: {
		marginTop: 20,
		flexDirection: 'row',
		width: '100%',
	},
	iconInnerDiv: {
		width: '25%',
	},
	statusBtn: {
		flexDirection: 'column',
		alignItems: 'center',
	},
	statusBtnActive: {
		flexDirection: 'column',
		alignItems: 'center',
		borderBottomColor: '#663300',
		borderBottomWidth: 2,
	},
	posterRow: {
		elevation: 5,
		borderRadius: 4,
		paddingVertical: 10,
		paddingHorizontal: 10,
		width: '100%',
		backgroundColor: 'white',
		marginRight: 20,
		alignItems: 'center',
		flexDirection: 'row',
	},
	error: {
		color: 'red',
		fontSize: 10,
		marginTop: '2%',
	},
	sendBtn: {
		elevation: 5,
		borderRadius: 4,
		paddingVertical: 10,
		paddingHorizontal: 5,
		backgroundColor: 'orange',
		marginRight: 20,
		alignItems: 'center',
	},
	imageBtn: {
		elevation: 5,
		borderRadius: 18,
		paddingVertical: 8,
		paddingHorizontal: 5,
		backgroundColor: 'tomato',
		alignItems: 'center',
		marginBottom: 10,
	},
});
