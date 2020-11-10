import React from 'react'
import {
    View,
    Text,
    ScrollView,
    TextInput,
    Button,
    StyleSheet
} from 'react-native'
import theme from '../config/theme'

const EditTalentScreen = (props) => {
    return (
        <ScrollView style={styles.container}>
            <View>
                <Text
                    style={{
                        position: 'absolute',
                        top: '50%',
                        bottom: 0,
                        left: 0,
                        right: 0
                    }}
                >
                    Hi
                </Text>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    card: {
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginHorizontal: 20,
        padding: 8,
        marginTop: 10,
        flexDirection: 'row',
        borderRadius: theme.$borderRadius
    }
})

export default EditTalentScreen