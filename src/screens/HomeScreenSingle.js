import React, { useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    FlatList,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import Swiper from 'react-native-swiper';
import HomePortfolioList from '../components/HomePortfolioList';
const HomeScreenSingle = (props) => {
    const [isLoading, setIsLoading] = React.useState(true)
    const [poster, setPoster] = React.useState([])
    const [users, setUsers] = React.useState([])
    const [media, setMedia] = React.useState([])

    useEffect(() => {
        const fetchHomeData = async () => {
            try {
                let response = await fetch(`http://13.232.190.226/api/poster/random`)
                let usersResponse = await fetch(`http://13.232.190.226/api/talent/filter/5f5b2b8e96b2173a30948ac6`, {
                    method: 'PATCH'
                })
                let mediaResponse = await fetch(`http://13.232.190.226/api/talent/random`)
                let userData = await usersResponse.json()
                userData.success ? setUsers(userData.data.users) : setUsers([])
                let mediaData = await mediaResponse.json()
                mediaData.success ? setMedia(mediaData.talents) : setMedia([])
                let resData = await response.json()
                resData.success ? setPoster(resData.data.posters) : setPoster([])
                console.warn(userData);
                setIsLoading(false)
            } catch (error) {
                console.error(error);
                setIsLoading(false)
            }
        }
        fetchHomeData()
    }, [])
    return (
        <View style={styles.container}>
            <ScrollView>
                <Swiper height={200} showsButtons={false}>
                    {poster.map(p => (
                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={() => props.navigation.navigate('PosterDetails', {
                                posterId: p._id,
                                title: p.poster,
                                image: p.image,
                                description: p.description,
                                endDate: p.endDate,
                                startDate: p.startDate

                            })}
                        >

                            <Image
                                style={{ width: '100%', height: 300, resizeMode: 'cover' }}
                                source={{
                                    uri: `http://13.232.190.226/api/poster/view/${p.image}`,
                                }}
                            />
                        </TouchableOpacity>
                    ))}
                </Swiper>
                <HomePortfolioList users={users} navigation={props.navigation} />
                <View style={{ backgroundColor: '#f4ece7', marginVertical: 15 }}>
                    <Text style={{
                        textAlign: 'center',
                        fontStyle: 'italic',
                        fontWeight: 'bold',
                        paddingHorizontal: 15,
                        marginVertical: 15
                    }}>
                        "We understands the needs and importance of the roles designed, and the time spent by the artists in the industry to fill a perfect character in an appropriate place"
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    wrapper: {
        height: 300
    },
})

export default HomeScreenSingle;