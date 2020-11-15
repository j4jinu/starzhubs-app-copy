import React, { useContext } from 'react';
import { Image, ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import theme from '../config/theme';
import Moment from 'moment';
import { AuthContext } from '../context/authContext';
const PosterDetailsScreen = (props) => {
    const auth = useContext(AuthContext)
    const posterId = props.navigation.getParam('posterId')
    const title = props.navigation.getParam('title')
    const image = props.navigation.getParam('image')
    const description = props.navigation.getParam('description')
    const endDate = props.navigation.getParam('endDate')
    const startDate = props.navigation.getParam('startDate')
    const user = props.navigation.getParam('user')

    return (
        <ScrollView>
            <View style={styles.container}>
                <Image
                    style={{
                        width: '100%',
                        height: 300,
                        backgroundColor: '#e6e6e6'
                    }}
                    resizeMode='cover'
                    source={{
                        uri: `http://13.232.190.226/api/poster/view/${image}`,
                    }}
                />
                <View style={styles.posterInfo}>
                    <Text
                        style={styles.title}
                        numberOfLines={2}
                    >
                        {title}
                    </Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 5, marginVertical: 15 }}>
                        <View>
                            <Text style={{ fontSize: 12 }}>Starts : {Moment(startDate).format('DD/MM/YYYY')}</Text>
                        </View>
                        <View>
                            <Text style={{ fontSize: 12 }}>Ends: {Moment(endDate).format('DD/MM/YYYY')}</Text>
                        </View>
                    </View>
                    <Text style={{ fontWeight: 'bold', marginHorizontal: 5 }}>{'Description'}</Text>
                    <Text style={styles.description}>
                        {description}
                    </Text>
                </View>
                <View style={styles.authorInfo}>
                    <Image
                        style={{
                            width: 50,
                            height: 50,
                            borderRadius: 100
                        }}
                        source={{
                            uri: `http://13.232.190.226/api/user/avatar/${user.image.avatar}`,
                        }}
                    /><TouchableOpacity onPress={() => props.navigation.navigate('UserDetails', {
                        userId: user._id
                    })}>
                        <View
                            style={{
                                flex: 1,
                                flexDirection: 'column',
                                justifyContent: 'center',
                                marginLeft: 10
                            }}
                        >
                            <Text style={{ fontSize: 13 }}>{'Posted By'}</Text>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{user.name}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                {user._id === auth.userId ? null : (
                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={styles.requestBtn}
                    >
                        <Text style={{ fontSize: 17, color: 'white' }}>{'Show Interest'}</Text>
                    </TouchableOpacity>
                )}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 20
    },
    description: {
        marginHorizontal: 5,
        marginVertical: 5,
        lineHeight: 20
    },
    posterInfo: {
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginHorizontal: 10,
        padding: 8,
        marginTop: -10,
        borderRadius: theme.$borderRadius
    },
    authorInfo: {
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginHorizontal: 10,
        padding: 8,
        marginTop: 10,
        flexDirection: 'row',
        borderRadius: theme.$borderRadius
    },
    requestBtn: {
        backgroundColor: theme.$primaryColor,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginHorizontal: 10,
        padding: 12,
        marginTop: 15,
        justifyContent: 'center',
        flexDirection: 'row',
        borderRadius: theme.$borderRadius
    },
    title: {
        fontSize: 22,
        textTransform: 'capitalize',
        color: theme.$primaryColor,
        alignSelf: 'center',
        fontWeight: 'bold'
    }
})

export default PosterDetailsScreen;