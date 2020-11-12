import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';

const UserGridItem = (props) => {
    const {image, location, talents, userId} = props
    console.warn("talents",talents);
    return (
        <>
            {
                <TouchableOpacity
                    style={styles.gridItem}
                    onPress={() => props.navigation.navigate('UserDetails',{
                        userId: props.userId,
                    })}
                    activeOpacity={0.7}
                >
                    <View style={styles.container}>
                        <Image
                            style={{ width: '100%', height: '75%', resizeMode: 'cover' }}
                            source={{
                                uri: `http://13.232.190.226/api/user/avatar/${image.avatar}`
                            }}
                        />
                        <Text style={styles.gridItemText}>{props.name}</Text>
                        <Text style={{ marginLeft: 10, marginTop: 1 }}>{location.place}, {location.state}</Text>
                        <Text style={{ marginLeft: 10, marginTop: 1 }}>{'Actor, Singer'}</Text>
                    </View>
                </TouchableOpacity>
            }
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e9e9e9',
        paddingBottom: 10
    },
    gridItem: {
        flex: 1,
        width: 200,
        height: 250,
        backgroundColor: '#f1f1f1',
        marginHorizontal: 1,
        marginVertical: 1
    },
    gridItemText: {
        fontFamily: 'montserrat-medium',
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 5,
        marginLeft: 10
    },

})

export default UserGridItem;