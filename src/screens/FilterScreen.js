import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Icon from 'react-native-vector-icons/Ionicons'
import theme from '../config/theme';


const FilterScreen = () => {
    
    return (
        <View style={styles.container}>
            <ScrollView>
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
                

            </ScrollView>
        </View>
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