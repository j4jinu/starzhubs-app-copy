import React from 'react';
import { ScrollView, Text, View } from 'react-native';

const category = [
    { id: '1', title: 'Actore' },
    { id: '2', title: 'Singer' },
    { id: '3', title: 'Director' },
    { id: '4', title: 'Dancer' }
]

const FilterScreen = () => {
    return (
        <ScrollView>
            <View>
                <Text>Filter profiles</Text>
            </View>
        </ScrollView>
    );
}
export default FilterScreen