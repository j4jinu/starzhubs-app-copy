import React from 'react';
import { Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import MyPosterGridItem from './MyPosterGridItem';
const PosterListRejected = (props) => {
    const {posters} = props
    if (posters.length === 0) {
        return <Text style={{fontSize:25,fontWeight:"bold",color:"orange",textAlign: 'center'}}>No Rejected Posters</Text>
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
                        navigation={props.navigation}
                        // getPosters = {props.getPosters}
                    />
                )}
            />
        </View>
    );
}

export default PosterListRejected;