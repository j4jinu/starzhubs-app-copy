import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';

const PosterGrid = (props) => {
    return (
        <>
            {
                <TouchableOpacity
                    onPress={() => props.navigation.navigate('PosterDetails', {
                        posterId: props.id,
                        title: props.poster,
                        image: props.image
                    })}
                    style={styles.gridItem}
                    activeOpacity={0.7}
                >
                    <View style={styles.container}>
                        <Image
                            style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
                            source={{
                                uri: props.image
                            }}
                        />
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
    },
    gridItem: {
        flex: 1,
        width: 200,
        height: 150,
        backgroundColor: '#f1f1f1',
        marginHorizontal: 3,
        marginVertical: 3
    },
    gridItemText: {
        fontFamily: 'montserrat-medium',
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 5,
        marginLeft: 10
    },

})

export default PosterGrid;