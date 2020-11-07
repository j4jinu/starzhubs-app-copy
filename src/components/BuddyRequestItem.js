import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import theme from '../config/theme';

const BuddyRequestItem = (props) => {
    return (
        <View
            style={styles.container}
        >
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                <Image
                    style={{
                        width: 75,
                        height: 75,
                        borderRadius: 100
                    }}
                    source={{
                        uri: props.image
                    }}
                />
                <View style={styles.details}>
                    <Text style={{ fontSize: 17, marginBottom: 5, color: theme.$primaryColorText }}>{'Test User'}</Text>
                    <Text style={{ fontSize: 13, color: 'gray', marginTop: 10 }}>{'Talent(s) Requested'}</Text>
                    <Text style={{ fontSize: 15, color: theme.$primaryColorText }}>{'Actor, Singer, Model'}</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 15 }}>
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={{
                        alignItems: 'center',
                        backgroundColor: 'white',
                        borderColor: theme.$primaryColor,
                        borderWidth: 1,
                        paddingVertical: 5,
                        paddingHorizontal: 20,
                        marginRight: 8,
                        borderRadius: theme.$borderRadius
                    }}
                >
                    <Text style={{ color: theme.$primaryColorText }}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={{
                        alignItems: 'center',
                        backgroundColor: theme.$primaryColor,
                        paddingVertical: 5,
                        paddingHorizontal: 20,
                        borderRadius: theme.$borderRadius
                    }}
                >
                    <Text style={{ color: 'white' }}>Accept</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginVertical: 5,
        marginHorizontal: 10,
        borderRadius: theme.$borderRadius,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.26,
        shadowRadius: 3,
        elevation: 5,
    },
    details: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 10
    }
})

export default BuddyRequestItem;