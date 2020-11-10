import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View, FlatList, ScrollView } from "react-native";
import Icon from 'react-native-vector-icons/Entypo'
import MediaGrid from '../components/MediaGrid';
import theme from '../config/theme';

const posters = [
    { id: 'h', name: 'Poster A', image: 'https://deadline.com/wp-content/uploads/2030/10/AP_20210337197617-e1603795015914.jpg?w=681&h=383&crop=1' },
    { id: 'f', name: 'Poster B', image: 'https://upload.wikimedia.org/wikipedia/commons/7/79/Johnny_Depp_Deauville_2019.jpg' },
    { id: 'l', name: 'Poster C', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQAs-E4jTq8f50vjVirikRNtW3ggDySwb2A5g&usqp=CAU' },
    { id: 'r', name: 'Poster D', image: 'https://ca-times.brightspotcdn.com/dims4/default/60d39e3/2147483647/strip/true/crop/2047x1151+0+0/resize/840x472!/quality/90/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F63%2F26%2Fb97131a2a20b0a8b805c0defa552%2Fla-1533757303-22e1u7m67i-snap-image' },
    { id: 'a', name: 'Poster E', image: 'https://img.theweek.in/content/dam/week/news/entertainment/images/2019/4/25/Johnny-Depp-dating.jpg' }
]

const MyMediaScreen = (props) => {
    return (
        <ScrollView style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, paddingVertical: 8 }}>
                <Text>Actor</Text>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                        style={{
                            backgroundColor: 'white',
                            borderRadius: theme.$borderRadius,
                            borderWidth: 1,
                            borderColor: '#e6e6e6',
                            paddingHorizontal: 8,
                            paddingVertical: 3,
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginRight: 10
                        }}>
                        <Icon
                            style={{ marginRight: 10 }}
                            name='camera'
                            size={15}
                            color={theme.$primaryColor}
                        />
                        <Text style={{ fontSize: 14 }}>Photo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            backgroundColor: 'white',
                            borderRadius: theme.$borderRadius,
                            borderWidth: 1,
                            borderColor: '#e6e6e6',
                            paddingHorizontal: 8,
                            paddingVertical: 3,
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                        <Icon
                            style={{ marginRight: 10 }}
                            name='video-camera'
                            size={15}
                            color={theme.$primaryColor}
                        />
                        <Text style={{ fontSize: 14 }}>Video</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <FlatList
                keyExtractor={item => item.id}
                data={posters}
                renderItem={({ item }) => (
                    <MediaGrid
                        id={item.id}
                        poster={item.name}
                        image={item.image}
                        navigation={props.navigation}
                    />
                )}
                numColumns={3}
            />
            <FlatList
                keyExtractor={item => item.id}
                data={posters}
                renderItem={({ item }) => (
                    <MediaGrid
                        id={item.id}
                        poster={item.name}
                        image={item.image}
                        navigation={props.navigation}
                    />
                )}
                numColumns={3}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
})

export default MyMediaScreen;