import React from 'react';
import { Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import MyPosterGridItem from './MyPosterGridItem';

const PosterListExpired = (props) => {
    const {posters} = props
    if (posters.length === 0) {
        return <Text style={{fontSize:25,fontWeight:"bold",color:"orange",textAlign: 'center'}}>No Expired Posters</Text>
    }
    return (
        <View>
           <FlatList
                keyExtractor={item => item.id}
                data={posters}
                renderItem={({ item }) => (
                    <MyPosterGridItem
                        id={item.id}
                        poster={item.name}
                        image={item.image}
                        endDate={item.endDate}
                        startDate={item.startDate}
                        description={item.description}
                        userId={item.userId}
                        navigation={props.navigation}
                        
                    />
                )}
            />
        </View>
    );
}
export default PosterListExpired;