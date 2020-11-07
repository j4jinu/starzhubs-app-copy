import React from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import theme from '../config/theme';

const category = [
    { id: '1', title: 'Actor' },
    { id: '2', title: 'Singer' },
    { id: '3', title: 'Director' },
    { id: '4', title: 'Musician' },
    { id: '5', title: 'Cinematographer' },
]

const gender = [
    { id: '1', title: 'Female' },
    { id: '2', title: 'Male' },
    { id: '3', title: 'Transgender' },
]

const complexion = [
    { id: '1', title: 'Average' },
    { id: '2', title: 'Fair' },
    { id: '3', title: 'Dark' },
]

const bodyType = [
    { id: '1', title: 'Slim' },
    { id: '2', title: 'Hourglass' },
    { id: '3', title: 'Fit' },
    { id: '4', title: 'Fat' },
]

const FilterScreen = () => {
    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.searchBackground}>
                    <Icon
                        name='search'
                        color='gray'
                        size={24}
                    />
                    <TextInput
                        style={{
                            backgroundColor: 'white',
                            width: '95%', marginLeft: 5,
                            borderRadius: 10,
                            paddingHorizontal: 15
                        }}
                        placeholder='Type here...'
                    />
                </View>
                <Text style={{
                    fontSize: 15,
                    fontWeight: 'bold',
                    marginHorizontal: 10,
                    marginBottom: 10,
                    marginTop: 20
                }}
                >
                    Category
                </Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: 10 }}>
                    {category.map(c => (
                        <TouchableOpacity
                            activeOpacity={0.7}
                            key={c.id}
                            style={{
                                borderColor: 'gray',
                                borderWidth: 1,
                                margin: 5,
                                paddingVertical: 5,
                                paddingHorizontal: 8
                            }}
                        >
                            <Text style={{ color: theme.$primaryColorText }}>{c.title}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <Text style={{
                    fontSize: 15,
                    fontWeight: 'bold',
                    marginHorizontal: 10,
                    marginBottom: 10,
                    marginTop: 20
                }}
                >
                    Gender
                </Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: 10 }}>
                    {gender.map(g => (
                        <TouchableOpacity
                            activeOpacity={0.7}
                            key={g.id}
                            style={{
                                borderColor: 'gray',
                                borderWidth: 1,
                                margin: 5,
                                paddingVertical: 5,
                                paddingHorizontal: 8
                            }}
                        >
                            <Text style={{ color: theme.$primaryColorText }}>{g.title}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <Text style={{
                    fontSize: 15,
                    fontWeight: 'bold',
                    marginHorizontal: 10,
                    marginBottom: 10,
                    marginTop: 20
                }}
                >
                    Complexion
                </Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: 10 }}>
                    {complexion.map(c => (
                        <TouchableOpacity
                            activeOpacity={0.7}
                            key={c.id}
                            style={{
                                borderColor: 'gray',
                                borderWidth: 1,
                                margin: 5,
                                paddingVertical: 5,
                                paddingHorizontal: 8
                            }}
                        >
                            <Text style={{ color: theme.$primaryColorText }}>{c.title}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <Text style={{
                    fontSize: 15,
                    fontWeight: 'bold',
                    marginHorizontal: 10,
                    marginBottom: 10,
                    marginTop: 20
                }}
                >
                    Body Type
                </Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: 10 }}>
                    {bodyType.map(b => (
                        <TouchableOpacity
                            activeOpacity={0.7}
                            key={b.id}
                            style={{
                                borderColor: 'gray',
                                borderWidth: 1,
                                margin: 5,
                                paddingVertical: 5,
                                paddingHorizontal: 8
                            }}
                        >
                            <Text style={{ color: theme.$primaryColorText }}>{b.title}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    searchBackground: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: theme.$borderRadius,
        backgroundColor: 'white',
        marginHorizontal: 10,
        marginVertical: 10,
        paddingHorizontal: 10,
    }
})
export default FilterScreen