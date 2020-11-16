import React from 'react';
import { View, FlatList, Image, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import UserGridItem from '../components/UserGridItem';
import theme from '../config/theme';

const users = [
    { name: 'A', id: '1' },
    { name: 'B', id: '2' },
    { name: 'C', id: '3' },
    { name: 'D', id: '4' },
    { name: 'E', id: '5' },
    { name: 'F', id: '6' },
    { name: 'G', id: '7' },
    { name: 'H', id: '8' },
]

const renderGridItem = (user) => {
    return <UserGridItem
        name={user.item.name}
        onSelect={() => props.navigation.navigate('UserDetails')}
    />
}

const HomePortfolioList = (props) => {
    return (
        <FlatList
            style={{ backgroundColor: '#fafafa', marginTop: 20 }}
            keyExtractor={(item, index) => item.id}
            data={props.users}
            renderItem={({ item }) => (
                <UserGridItem
                    userId={item._id}
                    name={item.name}
                    locaton={item.locaton}
                    image={item.image}
                    navigation={props.navigation}
                />
            )}
            numColumns={2}
            ListHeaderComponent={
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 15 }}>
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
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: theme.$primaryColorText
    },
    btn: {
        backgroundColor: theme.$primaryColor,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: theme.$borderRadius
    }
})

export default HomePortfolioList;