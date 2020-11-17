import React from 'react';
import { View, FlatList, Image, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import PosterGridItem from '../components/PosterGridItem';
import { AuthContext } from '../context/authContext';



const renderGridItem = (poster) => {
    return <PosterGridItem
        poster={poster.item.name}
        onSelect={() => props.navigation.navigate('UserDetails')}
    />
}

const PosterListScreen = (props) => {
    const auth = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const [posters, setPosters] = useState([])
    useEffect(() => {
        getPosters();
    }, [])
    const getPosters = async (status) => {
        setLoading(true)
        setPosters([])
        try {
            const response = await fetch(` http://13.232.190.226/api/poster`, {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + auth.token,
                },
            })
            const posterData = await response.json()
            posterData.success ? setPosters(posterData.data.posters) : null
            setLoading(false)
        } catch (error) {
            setLoading(false)
            alert('Something went wrong.')
        }
    }

    return (
        <>
            <FlatList
                keyExtractor={item => item.id}
                data={posters}
                renderItem={({ item }) => (
                    <PosterGridItem
                        id={item._id}
                        poster={item.name}
                        image={item.image}
                        endDate={item.endDate}
                        startDate={item.startDate}
                        userId={item.userId}
                        description={item.description}
                        navigation={props.navigation}
                    />
                )}
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

export default PosterListScreen;