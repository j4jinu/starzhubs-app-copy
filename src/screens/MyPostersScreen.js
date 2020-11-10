import React, { useState } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, ActivityIndicator } from "react-native";
import PosterListActive from '../components/PosterListActive';
import PosterListExpired from '../components/PosterListExpired';
import PosterListPending from '../components/PosterListPending';
import PosterListRejected from '../components/PosterListRejected';
import UserMediaSection from '../components/UserMediaSection';
import UserPosterSection from '../components/UserPosterSection';
import UserTalentSection from '../components/UserTalentSection';
import theme from '../config/theme'
const MyPostersScreen = () => {
    const [posters, setPosters] = useState([]);
    const[isLoading, setLoading]=useState(false);
	const [isActivePosters, setActivePosters] = useState(true);
	const [isPendingPosters, setPendingPosters] = useState(false);
	const [isExpiredPosters, setExpiredPosters] = useState(false);
	const [isRejectedPosters, setRejectedPosters] = useState(false);
const getActivePosters = () => {
        setLoading(true);
        setActivePosters(true);
        setPendingPosters(false);
		setExpiredPosters(false);
		setRejectedPosters(false);
		fetch('http://13.232.190.226/api/poster/me', {
			method: 'GET',
			headers: {
				Authorization: 'Bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Zjk5NGM2ZGYxNjY0YTdiMTJhZmMyYTIiLCJpYXQiOjE2MDUwMDc4NDh9.S0tIESP3jQzJokHaI8usiJ0Rj-snfStHdW-O6evAiY0",
			},
		})
			.then((response) => response.json())
			.then((response) => {
				if (response.success) {
                    setLoading(false);
					setPosters(response.data.posters);
				} else {
					setPosters([]);
				}
			})
			.catch((error) => {});
    };
const getPendingPosters = () => {
    setLoading(true);
    setActivePosters(false);
    setPendingPosters(true);
    setExpiredPosters(false);
    setRejectedPosters(false);
		fetch('http://13.232.190.226/api/poster/pending', {
			method: 'GET',
			headers: {
				Authorization: 'Bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Zjk5NGM2ZGYxNjY0YTdiMTJhZmMyYTIiLCJpYXQiOjE2MDUwMDc4NDh9.S0tIESP3jQzJokHaI8usiJ0Rj-snfStHdW-O6evAiY0",
			},
		})
			.then((response) => response.json())
			.then((response) => {
				console.warn(response);
				if (response.success) {
                    setLoading(false);
					setPosters(response.data.posters);
				} else {
					setPosters([]);
				}
			})
			.catch((error) => {});
	};
const getExpiredPosters = () => {
    setLoading(true);
    setActivePosters(false);
    setPendingPosters(false);
    setExpiredPosters(true);
    setRejectedPosters(false);
		
		fetch('http://13.232.190.226/api/poster/expired', {
			method: 'GET',
			headers: {
				Authorization: 'Bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Zjk5NGM2ZGYxNjY0YTdiMTJhZmMyYTIiLCJpYXQiOjE2MDUwMDc4NDh9.S0tIESP3jQzJokHaI8usiJ0Rj-snfStHdW-O6evAiY0",
			},
		})
			.then((response) => response.json())
			.then((response) => {
				if (response.success) {
                    setLoading(false);
					setPosters(response.data.posters);
				} else {
					setPosters([]);
				}
			})
			.catch((error) => {});
	};
const getRejectedPosters = () => {
    setLoading(true);
    setActivePosters(false);
    setPendingPosters(false);
    setExpiredPosters(false);
    setRejectedPosters(true);
		fetch('http://13.232.190.226/api/poster/denied', {
			method: 'GET',
			headers: {
				Authorization: 'Bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Zjk5NGM2ZGYxNjY0YTdiMTJhZmMyYTIiLCJpYXQiOjE2MDUwMDc4NDh9.S0tIESP3jQzJokHaI8usiJ0Rj-snfStHdW-O6evAiY0",
			},
		})
			.then((response) => response.json())
			.then((response) => {
				if (response.success) {
                    setLoading(false);
					setPosters(response.data.posters);
				} else {
					setPosters([]);
				}
			})
			.catch((error) => {});
	};

    return (
        <View style={styles.container}>
            <View
                style={styles.row}
            >
                <TouchableOpacity
                    onPress={getActivePosters}
                    activeOpacity={0.7}
                    style={{
                        borderColor: isActivePosters ? 'orange' : '#f6f6f6',
                        borderBottomWidth: 3,
                        paddingVertical: 5,
                        paddingHorizontal: 8,
                        paddingBottom: 12,
                        width: '24%',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Text
                        style={{
                            fontWeight: 'bold',
                            color: isActivePosters ? 'orange' : '#000',
                        }}
                    >
                        Active
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={getPendingPosters}
                    activeOpacity={0.7}
                    style={{
                        borderColor: isPendingPosters ? 'orange' : '#f6f6f6',
                        borderBottomWidth: 3,
                        paddingVertical: 5,
                        paddingHorizontal: 8,
                        paddingBottom: 12,
                        width: '24%',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Text
                        style={{
                            fontWeight: 'bold',
                            color:isPendingPosters ? 'orange' : '#000',
                        }}
                    >
                        Pending
                        </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={getExpiredPosters}
                    activeOpacity={0.7}
                    style={{
                        borderColor: isExpiredPosters ? 'orange' : '#f6f6f6',
                        borderBottomWidth: 3,
                        paddingVertical: 5,
                        paddingHorizontal: 8,
                        paddingBottom: 12,
                        width: '24%',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Text
                        style={{
                            fontWeight: 'bold',
                            color: isExpiredPosters? 'orange' : '#000',
                        }}
                    >
                        Expired
                        </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={getRejectedPosters}
                    activeOpacity={0.7}
                    style={{
                        borderColor: isRejectedPosters ? 'orange' : '#f6f6f6',
                        borderBottomWidth: 3,
                        paddingVertical: 5,
                        paddingHorizontal: 8,
                        paddingBottom: 12,
                        width: '24%',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Text
                        style={{
                            fontWeight: 'bold',
                            color:isRejectedPosters ? 'orange' : '#000',
                        }}
                    >
                        Rejected
                        </Text>
                </TouchableOpacity>
            </View>
            {isLoading && (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size={'large'} color={theme.$primaryColor} />
            </View>
            )}
            {isActivePosters && <PosterListActive getPosters={getActivePosters} posters= {posters} />}
            {isPendingPosters && <PosterListPending getPosters={getPendingPosters} posters= {posters} />}
            {isExpiredPosters && <PosterListExpired getPosters={getExpiredPosters} posters= {posters} />}
            {isRejectedPosters && <PosterListRejected getPosters={getRejectedPosters} posters= {posters} />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f6f6f6',
        paddingVertical: 5,
        paddingHorizontal: 8
    },
})

export default MyPostersScreen;