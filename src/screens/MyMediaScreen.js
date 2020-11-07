import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/Entypo'
const MyMediaScreen = () => {
    return (
        <View>
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
                    <Text style={{ fontSize: 14 }}>Photos</Text>
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
    );
}

const styles = StyleSheet.create({

})

export default MyMediaScreen;