import React, { useState } from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import PosterListActive from '../components/PosterListActive';
import PosterListExpired from '../components/PosterListExpired';
import PosterListPending from '../components/PosterListPending';
import PosterListRejected from '../components/PosterListRejected';
import UserMediaSection from '../components/UserMediaSection';
import UserPosterSection from '../components/UserPosterSection';
import UserTalentSection from '../components/UserTalentSection';

const posters = [
    { id: 'h', name: 'Poster A', image: 'https://deadline.com/wp-content/uploads/2030/10/AP_20210337197617-e1603795015914.jpg?w=681&h=383&crop=1' },
    { id: 'f', name: 'Poster B', image: 'https://upload.wikimedia.org/wikipedia/commons/7/79/Johnny_Depp_Deauville_2019.jpg' },
    { id: 'l', name: 'Poster C', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQAs-E4jTq8f50vjVirikRNtW3ggDySwb2A5g&usqp=CAU' },
    { id: 'r', name: 'Poster D', image: 'https://ca-times.brightspotcdn.com/dims4/default/60d39e3/2147483647/strip/true/crop/2047x1151+0+0/resize/840x472!/quality/90/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F63%2F26%2Fb97131a2a20b0a8b805c0defa552%2Fla-1533757303-22e1u7m67i-snap-image' },
    { id: 'a', name: 'Poster E', image: 'https://img.theweek.in/content/dam/week/news/entertainment/images/2019/4/25/Johnny-Depp-dating.jpg' }
]

const MyPostersScreen = () => {
    const [content, setContent] = useState('A')
    return (
        <View style={styles.container}>
            <View
                style={styles.row}
            >
                <TouchableOpacity
                    onPress={() => setContent('A')}
                    activeOpacity={0.7}
                    style={{
                        borderColor: content === 'A' ? 'orange' : '#f6f6f6',
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
                            color: content === 'A' ? 'orange' : '#000',
                        }}
                    >
                        Active
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setContent('P')}
                    activeOpacity={0.7}
                    style={{
                        borderColor: content === 'P' ? 'orange' : '#f6f6f6',
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
                            color: content === 'P' ? 'orange' : '#000',
                        }}
                    >
                        Pending
                        </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setContent('E')}
                    activeOpacity={0.7}
                    style={{
                        borderColor: content === 'E' ? 'orange' : '#f6f6f6',
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
                            color: content === 'E' ? 'orange' : '#000',
                        }}
                    >
                        Expired
                        </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setContent('R')}
                    activeOpacity={0.7}
                    style={{
                        borderColor: content === 'R' ? 'orange' : '#f6f6f6',
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
                            color: content === 'R' ? 'orange' : '#000',
                        }}
                    >
                        Rejected
                        </Text>
                </TouchableOpacity>
            </View>
            {content === 'A' && <PosterListActive />}
            {content === 'P' && <PosterListPending />}
            {content === 'E' && <PosterListExpired />}
            {content === 'R' && <PosterListRejected />}
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