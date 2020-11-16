import React, { useContext, useEffect, useState} from 'react';
import { FlatList, Text, View } from 'react-native';
import BuddyItem from '../components/BuddyItem';
import { AuthContext } from '../context/authContext';

const MyConnectionScreen = (props) => {
    const auth = useContext(AuthContext)
    const [isFriends, setIsFriends] = useState([])
    useEffect(() => {
        getConnectionRequests();
    })
    const getConnectionRequests = () => {
        fetch(`http://13.232.190.226/api/talent/req/approved`, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + auth.token,
            },
        })
        .then((response) => response.json())
        .then((response) => {
            setIsFriends(response.data.connections);
        })
        .catch((error) => {
            alert(error);
        });
    };

    if (!isFriends === undefined || isFriends.length !== 0) {
        return (
            <FlatList
                style={{ backgroundColor: '#efefef' }}
                keyExtractor={item => item.id}
                data={isFriends}
                renderItem={({ item }) => (
                    <BuddyItem
                        id={item._id}
                        name={item.fromUser._id ===auth.userId ?item.toUser.name:item.toUser.name}
                        image={item.fromUser._id ===auth.userId ?item.toUser.image:item.fromUser.image}
                        location={item.fromUser._id ===auth.userId ?item.toUser.location:item.fromUser.location}
                        onSelect={() => props.navigation.navigate('UserDetails',{
                            userId: item.fromUser._id===auth.userId ?item.toUser._id:item.fromUser._id,
                        })}
                    />
                )}
            />
        );
    }
    else{
        return (
            <View>
                <Text>No Connections</Text>
            </View>
        )
    }
};

export default MyConnectionScreen;