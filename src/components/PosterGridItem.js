import React from 'react';
import { ActivityIndicator, StyleSheet, Image, Text, TouchableOpacity, View } from 'react-native';
import theme from '../config/theme'

const PosterGridItem = (props) => {
    return (
        <>
            {
                <TouchableOpacity
                    style={styles.gridItem}
                    onPress={() => props.navigation.navigate('PosterDetails', {
                        posterId: props.id,
                        title: props.poster,
                        image: props.image
                    })}
                    activeOpacity={0.7}
                >
                    <View style={styles.container}>
                        <Image
                            style={{
                                width: '100%',
                                height: 200,
                                borderRadius: 10
                            }}
                            resizeMode={'cover'}
                            source={{
                                uri: props.image
                            }}
                        />
                        <View style={styles.owner}>
                            <Image
                                style={{
                                    width: 30,
                                    height: 30,
                                    borderRadius: 100
                                }}
                                source={{
                                    uri: 'https://upload.wikimedia.org/wikipedia/commons/7/79/Johnny_Depp_Deauville_2019.jpg'
                                }}
                            />
                            <View style={styles.ownerDetails}>
                                <Text style={{ fontSize: 13 }}>{'Test User'}</Text>
                                <Text style={{ fontSize: 10, color: 'gray' }}>{'25 Oct 2020'}</Text>
                            </View>
                        </View>
                        <Text style={styles.title}>{props.poster}</Text>
                        <Text
                            numberOfLines={4}
                            style={{
                                marginHorizontal: 15,
                                color: theme.$primaryColorText,
                                marginTop: 5,
                                lineHeight: 20
                            }}
                        >
                            {'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. '}
                        </Text>
                    </View>
                </TouchableOpacity>
            }
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8
    },
    gridItem: {
        flex: 1,
        width: '95%',
        borderRadius: 10,
        alignSelf: 'center',
        borderRadius: 10,
        marginVertical: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        paddingBottom: 20
    },
    gridItemText: {
        fontFamily: 'montserrat-medium',
        fontSize: 16
    },
    owner: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        marginTop: 10,
        marginLeft: 15
    },
    ownerDetails: {
        flexDirection: 'column',
        justifyContent: 'center',
        marginLeft: 15
    },
    title: {
        alignSelf: 'flex-start',
        marginLeft: 15,
        marginTop: 10,
        fontSize: 17,
        fontWeight: 'bold',
        color: theme.$primaryColorText
    }
})

export default PosterGridItem;