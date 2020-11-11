import React from 'react';
import { FlatList, Text, View } from 'react-native';
import MyPosterGridItem from './MyPosterGridItem';
const PosterListActive = (props) => {
    console.log(props)
    const {posters} = props
   
    if (posters.length === 0) {
        return <Text style={{fontSize:25,fontWeight:"bold",color:"orange", textAlign: 'center',}}>No Active Posters</Text>
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
                        navigation={props.navigation}
                      
                    />
                )}
            />
            {/* )} */}
        </View>
    );
}

export default PosterListActive;