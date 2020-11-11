import React, { useContext, useEffect, useState } from 'react'
import { FlatList, Text, View } from 'react-native';
import BuddyItem from '../components/BuddyItem';
import { AuthContext } from '../context/authContext';
const MyConnectionScreen = (props) => {
    const auth = useContext(AuthContext)
    const [isFriends, setIsFriends] = useState([]);
    useEffect(() => {
    getConnectionRequests()
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
				//console.warn('Request Response:', response.data.connections);
				setIsFriends(response.data.connections);
			})
			.catch((error) => {
				alert(error);
			});
    };

    return (
    
        <FlatList
            style={{ backgroundColor: '#efefef' }}
            keyExtractor={item => item.id}
            data={isFriends}
            renderItem={({ item }) => (
                <BuddyItem
                    id={item._id}
                    name={item.fromUser._id ===auth.userId ?item.toUser.name:item.toUser.name}
                    image={item.fromUser._id ===auth.userId ?item.toUser.image.avatar:item.fromUser.image.avatar}
                    talent={item.talent}
                    onSelect={() => props.navigation.navigate('UserDetails',item.fromUser._id===auth.userId ?item.toUser._id:item.toUser._id)}
                />
            )}
        />
    );
};

export default MyConnectionScreen;