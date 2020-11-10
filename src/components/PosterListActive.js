import React from 'react';
import { FlatList, Text, View } from 'react-native';
import MyPosterGridItem from './MyPosterGridItem';
const PosterListActive = (props) => {
    const {posters} = props.posters
    // const {getPosters} = props.getPosters
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
                        navigation={props.navigation}
                        // getPosters = {getPosters}
                    />
                )}
            />
        </View>
    );
}

export default PosterListActive;