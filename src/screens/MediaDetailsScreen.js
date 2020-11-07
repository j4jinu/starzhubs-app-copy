import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native';
const MediaDetailsScreen = (props) => {
    const media = props.navigation.getParam('media')
    return (
        <View>
            <Image
                style={styles.media}
                source={{
                    uri: media
                }}
            />
            <Text style={styles.title}>{'Title'}</Text>
            <Text style={styles.content}>{'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        marginHorizontal: 15,
        marginVertical: 8,
        lineHeight: 17
    },
    media: {
        width: '100%',
        height: 400
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 10,
        marginHorizontal: 15,
    }
})

export default MediaDetailsScreen;