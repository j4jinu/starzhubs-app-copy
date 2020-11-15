import React from 'react';
import { Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import MyPosterGridItem from './MyPosterGridItem';
const PosterListPending = (props) => {
    const { posters } = props
    const { getPosters } = props
    if (posters.length === 0) {
        return (
            <Text
                style={{
                    fontSize: 16,
                    marginTop: 20,
                    fontWeight: "bold",
                    color: "tomato",
                    textAlign: 'center',
                }}
            >
                No Pending Posters
            </Text>
        )
    }

    return (
        <View>
            <FlatList
                keyExtractor={item => item.id}
                data={posters}
                renderItem={({ item }) => (

                    <MyPosterGridItem
                        id={item._id}
                        poster={item.title}
                        image={item.image}
                        endDate={item.endDate}
                        startDate={item.startDate}
                        description={item.description}
                        userId={item.userId}
                        getPosters={getPosters}
                        navigation={props.navigation}

                    />
                )}
            />
        </View>
    );
}

export default PosterListPending;