import React, { useContext, useEffect, useState } from 'react'
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
import { AuthContext } from '../context/authContext';
const MyPostersScreen = (props) => {
    const auth =useContext(AuthContext)
    const [content, setContent] = useState('me')
    const [loading, setLoading] = useState(false)
    const [posters, setPosters] = useState([])
    useEffect(() => {
        const getPosters = async (status) => {
            setLoading(true)
            setPosters([])
            console.log(content);
            try {
                const response = await fetch(`http://13.232.190.226/api/poster/${content}`, {
                    method: 'GET',
                    headers: {
                   Authorization: 'Bearer ' + auth.token,
                },
                })
                const posterData = await response.json()
                posterData.success ? setPosters(posterData.data.posters) : null
                // console.log("posters",posters)
                setLoading(false)
            } catch (error) {
                setLoading(false)
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
                    onPress={() => {
                        setLoading(true);
                        setContent('me')
                    }}
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
                    onPress={() => {setLoading(true); setContent('pending')}}
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
                    onPress={() => {setLoading(true); setContent('expired')}}
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
                    onPress={() => {setLoading(true); setContent('denied')}}
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
            {content === 'me' && !loading && <PosterListActive
            posters= {posters} 
            navigation={props.navigation}
            />
            }
            {content === 'pending' && !loading && <PosterListPending 
            posters= {posters} 
            navigation={props.navigation}
             />}
            {content === 'expired' && !loading && <PosterListExpired 
            posters= {posters} 
            navigation={props.navigation}
             />}
            {content === 'denied' && !loading && <PosterListRejected
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