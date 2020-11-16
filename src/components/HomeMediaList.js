import React from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MediaItem from './MediaItem'

const HomeMediaList = (props) => {
    const { talents } = props

    if (talents === undefined || talents.length === 0) {
        return <Text>No media files</Text>
    }

    return (
        <View style={styles.container}>
            <FlatList
                keyExtractor={item => item._id}
                data={talents}
                renderItem={({ item }) => (
                    <MediaItem
                        media={item.media}
                        user={item.user}
                        navigation={props.navigation}
                    />
                )}
                ListHeaderComponent={
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingHorizontal: 10,
                        paddingVertical: 15
                    }}>
                        <Text style={styles.title}>Trending Profiles</Text>
                        <TouchableOpacity
                            style={styles.btn}
                            onPress={() => props.navigation.navigate('UsersList')}
                        >
                            <Text style={{ color: 'white', }}>View More</Text>
                        </TouchableOpacity>
                    </View>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 17,
        color: "#555",
        marginBottom: 8,
        marginLeft: 10
    }
})

export default HomeMediaList;