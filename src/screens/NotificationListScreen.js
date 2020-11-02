import React from 'react';
import { View, FlatList, Image, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import NotificationItem from '../components/NotificationItem';

const posters = [
    { name: 'A', id: '1' },
    { name: 'B', id: '2' },
    { name: 'C', id: '3' },
    { name: 'D', id: '4' },
    { name: 'E', id: '5' },
    { name: 'F', id: '6' },
    { name: 'G', id: '7' },
    { name: 'H', id: '8' },
]

const renderGridItem = (poster) => {
    return <NotificationItem
        poster={poster.item.name}
        onSelect={() => props.navigation.navigate('UserDetails')}
    />
}

const NotificationListScreen = () => {
    return (
        <>
            <FlatList
                keyExtractor={(item, index) => item.id}
                data={posters}
                renderItem={renderGridItem}
            />
        </>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginHorizontal: 10,
        marginVertical: 10
    }
})

export default NotificationListScreen;