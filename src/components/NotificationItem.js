import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';

const NotificationItem = (props) => {
    const divider = <View style={{ width: '100%', height: 1, backgroundColor: '#e6e6e6' }} />
    return (
        <>
            {
                <>
                    <TouchableOpacity
                        style={styles.gridItem}
                        onPress={props.onSelect}
                        activeOpacity={0.7}
                    >
                        <Text>{'Notification'}</Text>
                    </TouchableOpacity>
                    {divider}
                </>
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
        padding: 10,
    },
    gridItemText: {
        fontFamily: 'montserrat-medium',
        fontSize: 16
    }
})

export default NotificationItem;