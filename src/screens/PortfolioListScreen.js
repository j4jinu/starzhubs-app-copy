import React, { useEffect, useState } from 'react';
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

// const category = [
//     { id: '1', title: 'Actor' },
//     { id: '2', title: 'Singer' },
//     { id: '3', title: 'Director' },
//     { id: '4', title: 'Anchor' }
// ]

// const users = [
//     { id: '1', name: 'Prithviraj' },
//     { id: '2', name: 'Nivin Pauly' },
//     { id: '3', name: 'Mohanlal' },
//     { id: '4', name: 'Mammootty' },
//     { id: '5', name: 'Kunchakko' },
//     { id: '6', name: 'Vineeth' },
//     { id: '7', name: 'Shaji' },
//     { id: '8', name: 'Asif Ali' },
//     { id: '9', name: 'Manju' },
//     { id: '10', name: 'MG Sreekumar' }
// ]

const renderGridItem = (user) => {
    return <UserGridItem
        name={user.item.name}
        onSelect={() => props.navigation.navigate('UserDetails')}
    />
}

const PortfolioListScreen = (props) => {

    const [category, setCategory] = useState([])
    const [isLoading, setIsLoading] = React.useState(true)
    const [poster, setPoster] = React.useState([])
    const [users, setUsers] = React.useState([])
    const [media, setMedia] = React.useState([])

    useEffect(() => {
        const getCategory = () => {
            fetch("http://13.232.190.226/api/category", {
                method: 'GET'
            })
            .then(response => response.json())
            .then(response => {
                setCategory(response.categories)
            })
            .catch(error => {
            });
        }
        getCategory()
    }, [])

    useEffect(() => {
        const fetchHomeData = async () => {
            try {
                let response = await fetch(`http://13.232.190.226/api/poster/random`)
                let usersResponse = await fetch(`http://13.232.190.226/api/talent/filter/5f5b2b8e96b2173a30948ac6`, {
                    method: 'PATCH'
                })
                let mediaResponse = await fetch(`http://13.232.190.226/api/talent/random`)
                let userData = await usersResponse.json()
                userData.success ? setUsers(userData.data.users) : setUsers([])
                let mediaData = await mediaResponse.json()
                mediaData.success ? setMedia(mediaData.talents) : setMedia([])
                let resData = await response.json()
                resData.success ? setPoster(resData.data.posters) : setPoster([])
                console.warn("users",users);
                setIsLoading(false)
            } catch (error) {
                console.error(error);
                setIsLoading(false)
            }
        }
        fetchHomeData()
    }, [])
        
    return (
        <View style={styles.container}>
            <FlatList
                keyExtractor={(item, index) => item._id}
                data={users}
                renderItem={({ item }) => (
                    <UserGridItem
                        userId={item._id}
                        name={item.name}
                        image={item.image}
                        location={item.location}
                        talents={item.talents}
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