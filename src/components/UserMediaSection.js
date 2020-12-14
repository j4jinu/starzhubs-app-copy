import React from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MediaGrid from './MediaGrid';

const UserMediaSection = (props) => {
    const { talents } = props
    if (talents === undefined || talents.length === 0) {
        return (
            <View
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingVertical: '5%',
                }}>
                <Image
                    source={require('../assets/noresult1.png')}
                    style={{ height: 50, width: 50, }}
                ></Image>
                <Text style={{ fontSize: 18, color: 'tomato', marginTop: 10 }}>
                    No Media Files
                </Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <FlatList
                keyExtractor={item => item._id}
                data={talents}
                renderItem={({ item }) => (
                    <MediaGrid
                        media={item.media}
                        navigation={props.navigation}
                    />
                )}
                numColumns={3}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: "5%"
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

export default UserMediaSection;