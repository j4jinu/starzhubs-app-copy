import React from 'react'
import { StyleSheet, View, Text } from "react-native";
import theme from '../config/theme';

const UserTalentSection = () => {
    return (
        <View style={styles.container}>
            <Text
                style={styles.title}
            >
                Actor
            </Text>
            <View
                style={styles.row}
            >
                <View
                    style={{
                        padding: 5,
                        alignItems: 'flex-start',
                        justifyContent: 'center'
                    }}
                >
                    <Text>Level</Text>
                    <Text>0</Text>
                </View>
                <View
                    style={{
                        padding: 5,
                        alignItems: 'flex-start',
                        justifyContent: 'center'
                    }}
                >
                    <Text>Experience</Text>
                    <Text>0</Text>
                </View>
                <View
                    style={{
                        padding: 5,
                        alignItems: 'flex-start',
                        justifyContent: 'center'
                    }}
                >
                    <Text>Works</Text>
                    <Text>0</Text>
                </View>
            </View>
            <Text
                style={{
                    marginTop: 10,
                    fontWeight: 'bold'
                }}
            >
                Description
                </Text>
            <Text
                style={{
                    color: theme.$primaryColorText
                }}
            >
                {'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 8
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 17,
        color: "#555",
    }
})

export default UserTalentSection;