import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';

const UserGridItem = (props) => {
    return (
        <>
            {
                <TouchableOpacity
                    style={styles.gridItem}
                    onPress={() => props.navigation.navigate('UserDetails')}
                    activeOpacity={0.7}
                >
                    <View style={styles.container}>
                        <Image
                            style={{ width: '100%', height: '75%', resizeMode: 'cover' }}
                            source={{
                                uri: 'https://upload.wikimedia.org/wikipedia/commons/7/79/Johnny_Depp_Deauville_2019.jpg'
                            }}
                        />
                        <Text style={styles.gridItemText}>{props.name}</Text>
                        <Text style={{ marginLeft: 10, marginTop: 1 }}>{'France'}</Text>
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
        backgroundColor: '#e9e9e9'
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