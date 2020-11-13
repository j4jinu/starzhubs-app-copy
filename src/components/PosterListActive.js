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
            {/* {props.posters.length===0 && (<Text style={{fontSize:25,fontWeight:"bold",color:"orange",alignItems:"center"}}>No Posters</Text>)}
            {props.posters.length>0 && ( */}
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
            {/* )} */}
        </View>
    );
}

export default PosterListActive;