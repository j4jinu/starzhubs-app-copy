import {
    View,
    Text,
    ScrollView,
    TextInput,
    Button,
    StyleSheet
} from 'react-native'

const EditTalentScreen = () => {
    return (
        <ScrollView>
            <View>
                <Text></Text>
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