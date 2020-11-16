import React from 'react';
import { FlatList, Text, View } from 'react-native';
import MyPosterGridItem from './MyPosterGridItem';
const PosterListActive = (props) => {
    const { getPosters, posters } = props
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
                No Active Posters
            </Text>
        )
    }
    return (
        <View>
            <FlatList
                keyExtractor={item => item.id}
                data={posters}
                extraData={posters}
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
            {/* )} */}
        </View>
    );
}

export default PosterListActive;