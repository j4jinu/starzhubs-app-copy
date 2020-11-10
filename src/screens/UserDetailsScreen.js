import React, { useState } from 'react';
import { StyleSheet, Text, Image, View, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Swiper from 'react-native-swiper'
import theme from '../config/theme';
import UserTalentSection from '../components/UserTalentSection';
import UserMediaSection from '../components/UserMediaSection';
import UserPosterSection from '../components/UserPosterSection';

const avatars = [
    { id: 'h', image: 'https://deadline.com/wp-content/uploads/2030/10/AP_20210337197617-e1603795015914.jpg?w=681&h=383&crop=1' },
    { id: 'f', image: 'https://upload.wikimedia.org/wikipedia/commons/7/79/Johnny_Depp_Deauville_2019.jpg' },
    { id: 'l', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQAs-E4jTq8f50vjVirikRNtW3ggDySwb2A5g&usqp=CAU' },
    { id: 'r', image: 'https://ca-times.brightspotcdn.com/dims4/default/60d39e3/2147483647/strip/true/crop/2047x1151+0+0/resize/840x472!/quality/90/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F63%2F26%2Fb97131a2a20b0a8b805c0defa552%2Fla-1533757303-22e1u7m67i-snap-image' },
    { id: 'a', image: 'https://img.theweek.in/content/dam/week/news/entertainment/images/2019/4/25/Johnny-Depp-dating.jpg' }
]

const UserDetailsScreen = (props) => {
    const image = props.navigation.getParam('image')
    const name = props.navigation.getParam('name')
    const location = props.navigation.getParam('location')
    const [content, setContent] = useState('T')

    return (
        <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={styles.container}>
                <Swiper
                    style={styles.wrapper}
                    showsButtons={false}
                >
                    {avatars.map(a => (
                        <Image
                            key={a.id}
                            style={{ width: '100%', height: 300, resizeMode: 'cover' }}
                            source={{
                               uri: `http://13.232.190.226/api/user/avatar/${image.avatar}`
                            }}
                        />

                    ))}
                </Swiper>
                <TouchableOpacity style={styles.requestBtn}>
                    <Icon
                        name="account-arrow-right"
                        size={25}
                        color={'white'}
                    />
                </TouchableOpacity>
                <Text style={styles.personName}>
                    {name}
                </Text>
                <Text style={styles.otherText}>
                    {'Female, 02-10-1995'}
                </Text>
                <Text style={styles.otherText}>
                    {location.place}, {location.state}
                </Text>
                <Text style={styles.otherText}>
                    {'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'}
                </Text>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    marginVertical: 15,
                    backgroundColor: '#fff',
                    paddingVertical: 8
                }}>
                    <View>
                        <Text style={styles.subtitle}>Height</Text>
                        <Text>0</Text>
                    </View>
                    <View>
                        <Text style={styles.subtitle}>Weight</Text>
                        <Text>0</Text>
                    </View>
                    <View>
                        <Text style={styles.subtitle}>Complexion</Text>
                        <Text>0</Text>
                    </View>
                    <View>
                        <Text style={styles.subtitle}>Body</Text>
                        <Text>0</Text>
                    </View>
                </View>
                <View
                    style={styles.row}
                >
                    <TouchableOpacity
                        onPress={() => setContent('T')}
                        activeOpacity={0.7}
                        style={{
                            borderColor: content === 'T' ? 'orange' : '#eee',
                            borderBottomWidth: 3,
                            paddingVertical: 5,
                            paddingHorizontal: 8,
                            paddingBottom: 12,
                            width: '24%',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Text style={{ fontWeight: 'bold' }}>
                            Talents
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setContent('M')}
                        activeOpacity={0.7}
                        style={{
                            borderColor: content === 'M' ? 'orange' : '#eee',
                            borderBottomWidth: 3,
                            paddingVertical: 5,
                            paddingHorizontal: 8,
                            paddingBottom: 12,
                            width: '24%',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Text style={{ fontWeight: 'bold' }}>
                            Media
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setContent('P')}
                        activeOpacity={0.7}
                        style={{
                            borderColor: content === 'P' ? 'orange' : '#eee',
                            borderBottomWidth: 3,
                            paddingVertical: 5,
                            paddingHorizontal: 8,
                            paddingBottom: 12,
                            width: '24%',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Text style={{ fontWeight: 'bold' }}>
                            Posters
                        </Text>
                    </TouchableOpacity>
                </View>
                {content === 'T' && <UserTalentSection navigation={props.navigation} />}
                {content === 'M' && <UserMediaSection navigation={props.navigation} />}
                {content === 'P' && <UserPosterSection navigation={props.navigation} />}
            </View>

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white'
    },
    requestBtn: {
        backgroundColor: theme.$primaryColor,
        borderRadius: 100,
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        alignSelf: 'flex-end',
        marginTop: -25,
        marginRight: 15
    },
    personName: {
        fontWeight: 'bold',
        fontSize: 18,
        color: theme.$primaryColorText,
        marginLeft: 15,
        marginBottom: 8
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        backgroundColor: '#eee',
        paddingVertical: 5,
        paddingHorizontal: 8
    },
    subtitle: {
        fontWeight: 'bold',
        color: theme.$primaryColorText
    },
    otherText: {
        marginHorizontal: 15,
        marginVertical: 1,
        fontSize: 14,
        color: theme.$primaryColorText
    },
    wrapper: { height: 300 },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    }
})

export default UserDetailsScreen;