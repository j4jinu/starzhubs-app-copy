import React from 'react'
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo'
import theme from '../config/theme';
import MediaGrid from './MediaGrid';
import PosterGrid from './PosterGrid';
import PosterGridItem from './PosterGridItem';

const UserPosterSection = (props) => {
    const { posters } = props
    console.log("posters", posters);

    if (posters.length === 0 || posters === undefined) {
        return (
            <View
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingVertical: '5%',
                }}>
                <Image
                    source={require('../assets/noresult1.png')}
                    style={{ height: 50, width: 50, }}
                ></Image>
                <Text style={{ fontSize: 18, color: 'tomato', marginTop: 10 }}>
                    No Posters
          </Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <FlatList
                keyExtractor={item => item.id}
                data={posters}
                renderItem={({ item }) => (
                    <PosterGrid
                        id={item._id}
                        title={item.title}
                        image={item.image}
                        description={item.description}
                        startDate={item.startDate}
                        endDate={item.endDate}
                        user={props.user}
                        navigation={props.navigation}
                    />
                )}
                numColumns={3}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 17,
        color: "#555",
        marginLeft: 15,
        marginBottom: 5
    }
})

export default UserPosterSection;