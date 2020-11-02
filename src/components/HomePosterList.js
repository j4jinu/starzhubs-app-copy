import React from 'react';
import { View, FlatList, Image, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import PosterGridItem from './PosterGridItem';

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
    return <PosterGridItem
        poster={poster.item.name}
        onSelect={() => props.navigation.navigate('UserDetails')}
    />
}

const HomePosterList = (props) => {
    return (
        <>
            <FlatList
                keyExtractor={(item, index) => item.id}
                data={posters}
                renderItem={({ item }) => (
                    <PosterGridItem
                        poster={item.name}
                        navigation={props.navigation}
                    />
                )}
                ListHeaderComponent={<Text style={styles.title}>Trending Posters</Text>}
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

export default HomePosterList;