import React, { useEffect, useState } from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { ActivityIndicator } from 'react-native-paper';
import PosterListActive from '../components/PosterListActive';
import PosterListExpired from '../components/PosterListExpired';
import PosterListPending from '../components/PosterListPending';
import PosterListRejected from '../components/PosterListRejected';
import UserMediaSection from '../components/UserMediaSection';
import UserPosterSection from '../components/UserPosterSection';
import UserTalentSection from '../components/UserTalentSection';
import theme from '../config/theme';
const posters = [
    { id: 'h', name: 'Poster A', image: 'https://deadline.com/wp-content/uploads/2030/10/AP_20210337197617-e1603795015914.jpg?w=681&h=383&crop=1' },
    { id: 'f', name: 'Poster B', image: 'https://upload.wikimedia.org/wikipedia/commons/7/79/Johnny_Depp_Deauville_2019.jpg' },
    { id: 'l', name: 'Poster C', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQAs-E4jTq8f50vjVirikRNtW3ggDySwb2A5g&usqp=CAU' },
    { id: 'r', name: 'Poster D', image: 'https://ca-times.brightspotcdn.com/dims4/default/60d39e3/2147483647/strip/true/crop/2047x1151+0+0/resize/840x472!/quality/90/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F63%2F26%2Fb97131a2a20b0a8b805c0defa552%2Fla-1533757303-22e1u7m67i-snap-image' },
    { id: 'a', name: 'Poster E', image: 'https://img.theweek.in/content/dam/week/news/entertainment/images/2019/4/25/Johnny-Depp-dating.jpg' }
]

const MyPostersScreen = (props) => {
    const [content, setContent] = useState('me')
    const [loading, setLoading] = useState(false)
    const [posters, setPosters] = useState([])
    useEffect(() => {
        const getPosters = async (status) => {
            try {
                const response = await fetch(`http://13.232.190.226/api/poster/${content}`, {
                    method: 'GET',
                    headers: {
                        Authorization: 'Bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Zjk5NGM2ZGYxNjY0YTdiMTJhZmMyYTIiLCJpYXQiOjE2MDUwMDc4NDh9.S0tIESP3jQzJokHaI8usiJ0Rj-snfStHdW-O6evAiY0",
                    },
                })
                const posterData = await response.json()
                posterData.success ? setPosters(posterData.data.posters) : null
            } catch (error) {
                alert('Something went wrong.')
            }
        }
        getPosters();
    }, [content])
    return (
        <View style={styles.container}>
            <View
                style={styles.row}
            >
                <TouchableOpacity
                    onPress={() => setContent('me')}
                    activeOpacity={0.7}
                    style={{
                        borderColor: content === 'me' ? 'orange' : '#f6f6f6',
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
                            color: content === 'me' ? 'orange' : '#000',
                        }}
                    >
                        Active
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setContent('pending')}
                    activeOpacity={0.7}
                    style={{
                        borderColor: content === 'pending' ? 'orange' : '#f6f6f6',
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
                            color: content === 'pending' ? 'orange' : '#000',
                        }}
                    >
                        Pending
                        </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setContent('expired')}
                    activeOpacity={0.7}
                    style={{
                        borderColor: content === 'expired' ? 'orange' : '#f6f6f6',
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
                            color: content === 'expired' ? 'orange' : '#000',
                        }}
                    >
                        Expired
                        </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setContent('denied')}
                    activeOpacity={0.7}
                    style={{
                        borderColor: content === 'denied' ? 'orange' : '#f6f6f6',
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
                            color: content === 'denied' ? 'orange' : '#000',
                        }}
                    >
                        Rejected
                        </Text>
                </TouchableOpacity>
            </View>
            {loading && (
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <ActivityIndicator size='small' color={theme.$primaryColor} />
                </View>
            )}
            {content === 'me' && <PosterListActive
            posters= {posters} 
            navigation={props.navigation}
            />
            }
            {content === 'pending' && <PosterListPending 
            posters= {posters} 
            navigation={props.navigation}
             />}
            {content === 'expired' && <PosterListExpired 
            posters= {posters} 
            navigation={props.navigation}
             />}
            {content === 'denied' && <PosterListRejected
            posters= {posters} 
            navigation={props.navigation}
             />}
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