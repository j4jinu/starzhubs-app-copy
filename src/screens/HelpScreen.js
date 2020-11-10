import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
const HelpScreen = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<ScrollView>
				<View
					style={{
						width: '100%',
						alignItems: 'center',
						marginTop: '5%',
					}}
				>
					<Image
						// source={require("../assets/img.png")}
						source={require('../assets/aboutus.png')}
					/>
				</View>
				<View
					style={{
						flexDirection: 'row',
						width: '95%',
						marginTop: '10%',
						paddingHorizontal:"5%"
					}}
				>
					<Icon
						name="ios-information-circle"
						size={20}
						color="#F98644"
						
					/>
					<Text
						style={{
							marginLeft: 10,
							textAlign: 'justify',
							fontSize: 13,
							lineHeight: 20,
							color: 'gray',
						}}
					>
						StarzHubs is an online platform
						realizing the dreams of budding
						and seasoned artists by
						rendering them an opportunity to
						showcase their skills and get
						hired by the recruiters from all
						forms of arts. This is an ideal
						place for both the amateur and
						experienced artists to hire
						individuals for their project,
						be it big or small, according to
						their needs.
					</Text>
				</View>
				<View
					style={{
						width: '100%',
						marginTop: '5%',
						paddingHorizontal: '6%',
					}}
				>
					<Text style={styles.textmotive}>
						MOTIVE
					</Text>
				</View>
				<View
					style={{
						flexDirection: 'row',
						marginTop: '3%',
						paddingHorizontal: '5%',
						width: '95%',
						marginBottom: '10%',
					}}
				>
					<Icon
						name="ios-information-circle"
						size={20}
						color="#F98644"
					/>
					<Text
						style={{
							marginLeft: 10,
							textAlign: 'justify',
							fontSize: 13,
							lineHeight: 20,
							color: 'gray',
						}}
					>
						StarzHubs understands the needs
						and importance of the roles
						designed, and the time spent by
						the artists in the industry to
						fill a perfect character in an
						appropriate place. Hence, we
						aspire to build a strong network
						of artists of all levels in all
						forms of arts, facilitating
						every member of this community
						with ample opportunities to
						realize their dreams.
					</Text>
				</View>
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: 'white',
	},
	text: {
		fontWeight: 'bold',
		color: '#F98644',
		fontSize: 20,
	},
	textmotive: {
		fontSize: 15,
		color: '#F98644',
	},
});
export default HelpScreen;
