import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import theme from '../config/theme';
const PortfolioListScreen = () => {
    const [category, setCategory] = useState([])
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getCategoiries = async () => {
            try {
                const response = await fetch('http://13.232.190.226/api/category')
                const categoryData = await response.json()
                if (categoryData.success) {
                    setCategory(categoryData.categories)
                    setLoading(false)
                    return
                }
                alert(categoryData.message)
            } catch (error) {
                setLoading(false)
                alert("Something went wrong. Try again later.")
            }
        }
        getCategoiries()
    })

    if (loading) {
        return (
            <ActivityIndicator style={{ marginTop: 20 }} color={theme.$primaryColor} size={'large'} />
        )
    }
    return (
        <View>
            <ScrollView horizontal>
                {category.map(c => (
                    <TouchableOpacity>
                        <Text>{category.title}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
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
        </View>
    );
}

export default PortfolioListScreen;