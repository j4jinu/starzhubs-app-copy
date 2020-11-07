import React from 'react';
import { FlatList, Text, View } from 'react-native';
import BuddyItem from '../components/BuddyItem';

const buddies = [
    { id: '1', name: 'User A' },
    { id: '2', name: 'User B' },
    { id: '3', name: 'User C' },
    { id: '4', name: 'User D' },
    { id: '5', name: 'User E' },
    { id: '7', name: 'User F' },
    { id: '8', name: 'User G' },
    { id: '9', name: 'User H' },
]

const MyConnectionScreen = (props) => {
    return (
        <FlatList
            style={{ backgroundColor: '#efefef' }}
            keyExtractor={item => item.id}
            data={buddies}
            renderItem={({ item }) => (
                <BuddyItem
                    id={item.id}
                    name={item.name}
                    image={'https://upload.wikimedia.org/wikipedia/commons/7/79/Johnny_Depp_Deauville_2019.jpg'}
                    onSelect={() => props.navigation.navigate('UserDetails')}
                />
            )}
        />
    );
};

export default MyConnectionScreen;