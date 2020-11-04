import React from 'react';
import { StyleSheet, Text, Image, View, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Swiper from 'react-native-swiper'
import theme from '../config/theme';

const avatars = [
    { id: 'h', image: 'https://deadline.com/wp-content/uploads/2030/10/AP_20210337197617-e1603795015914.jpg?w=681&h=383&crop=1' },
    { id: 'f', image: 'https://upload.wikimedia.org/wikipedia/commons/7/79/Johnny_Depp_Deauville_2019.jpg' },
    { id: 'l', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQAs-E4jTq8f50vjVirikRNtW3ggDySwb2A5g&usqp=CAU' },
    { id: 'r', image: 'https://ca-times.brightspotcdn.com/dims4/default/60d39e3/2147483647/strip/true/crop/2047x1151+0+0/resize/840x472!/quality/90/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F63%2F26%2Fb97131a2a20b0a8b805c0defa552%2Fla-1533757303-22e1u7m67i-snap-image' },
    { id: 'a', image: 'https://img.theweek.in/content/dam/week/news/entertainment/images/2019/4/25/Johnny-Depp-dating.jpg' }
]

const UserDetailsScreen = () => {
    return (
        <ScrollView>
            <View style={styles.container}>
                <Swiper
                    style={styles.wrapper}
                    showsButtons={false}
                >
                    {avatars.map(a => (
                        <Image
                            key={a.id}
                            style={{ width: '100%', height: 230, resizeMode: 'cover' }}
                            source={{
                                uri: a.image
                            }}
                        />

                    ))}
                </Swiper>
                <TouchableOpacity style={styles.requestBtn}>
                    <Icon
                        name="account-arrow-right"
                        size={20}
                        color={'white'}
                    />
                </TouchableOpacity>

            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    requestBtn: {
        backgroundColor: theme.$primaryColor,
        borderRadius: 100,
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        alignSelf: 'flex-end',
        marginTop: -20,
        marginRight: 15
    },
    wrapper: { height: 230 },
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB'
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5'
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9'
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    }
})

export default UserDetailsScreen;