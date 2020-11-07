import React from 'react';
import {
    Text,
    TouchableOpacity,
    ScrollView,
    View,
    Button,
    FlatList,
    StyleSheet,
} from 'react-native';
import UserGridItem from '../components/UserGridItem';
import PosterDetailsScreen from './PosterDetailsScreen';

const category = [
    { id: '1', title: 'Actor' },
    { id: '2', title: 'Singer' },
    { id: '3', title: 'Director' },
    { id: '4', title: 'Anchor' }
]

const users = [
    { id: '1', name: 'Prithviraj' },
    { id: '2', name: 'Nivin Pauly' },
    { id: '3', name: 'Mohanlal' },
    { id: '4', name: 'Mammootty' },
    { id: '5', name: 'Kunchakko' },
    { id: '6', name: 'Vineeth' },
    { id: '7', name: 'Shaji' },
    { id: '8', name: 'Asif Ali' },
    { id: '9', name: 'Manju' },
    { id: '10', name: 'MG Sreekumar' }
]

const renderGridItem = (user) => {
    return <UserGridItem
        name={user.item.name}
        onSelect={() => props.navigation.navigate('UserDetails')}
    />
}

const PortfolioListScreen = (props) => {

    return (
        <View style={styles.container}>
            <FlatList
                keyExtractor={(item, index) => item.id}
                data={users}
                renderItem={({ item }) => (
                    <UserGridItem
                        name={item.name}
                        navigation={props.navigation}
                    />
                )}
                numColumns={2}
                ListHeaderComponent={
                    <ScrollView
                        horizontal
                        style={{
                            backgroundColor: 'white',
                            marginVertical: 5
                        }}
                    >
                        {category.map(cat => (
                            <TouchableOpacity key={cat.id} style={styles.categoryItem}>
                                <Text>{cat.title}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    categoryItem: {
        backgroundColor: 'white',
        borderRadius: 50,
        borderColor: 'gray',
        borderWidth: 1,
        marginHorizontal: 5,
        marginVertical: 5,
        padding: 8,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default PortfolioListScreen;