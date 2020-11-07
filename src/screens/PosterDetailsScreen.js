import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import theme from '../config/theme';

const PosterDetailsScreen = (props) => {
    const posterId = props.navigation.getParam('posterId')
    const title = props.navigation.getParam('title')
    const image = props.navigation.getParam('image')
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
                        uri: image
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
                            <Text style={{ fontSize: 12 }}>Starts : 22/07/2020</Text>
                        </View>
                        <View>
                            <Text style={{ fontSize: 12 }}>Ends: 22/07/2020</Text>
                        </View>
                    </View>
                    <Text style={{ fontWeight: 'bold', marginHorizontal: 5 }}>{'Description'}</Text>
                    <Text style={styles.description}>
                        {'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. '}
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
                            uri: 'https://upload.wikimedia.org/wikipedia/commons/7/79/Johnny_Depp_Deauville_2019.jpg'
                        }}
                    />
                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'column',
                            justifyContent: 'center',
                            marginLeft: 10
                        }}
                    >
                        <Text style={{ fontSize: 13 }}>{'Posted By'}</Text>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{'Test User'}</Text>
                    </View>
                </View>
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.requestBtn}
                >
                    <Text style={{ fontSize: 17, color: 'white' }}>{'Show Interest'}</Text>
                </TouchableOpacity>
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