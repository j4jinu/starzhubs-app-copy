import React, { useContext, useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import BuddyRequestItem from '../components/BuddyRequestItem';
import { AuthContext } from '../context/authContext';
const PendingConnectionScreen = (props) => {
    const auth = useContext(AuthContext)
    const [requests, setRequests] = useState([]);
    useEffect(() => {
		getRequests();
	}, []);

	const getRequests = () => {
		fetch('http://13.232.190.226/api/talent/req/received', {
			method: 'GET',
			headers: {
				Authorization: 'Bearer ' + auth.token,
			},
		})
			.then((response) => response.json())
			.then((response) => {
                setRequests(response.data.requests);
                setUserImages(response.data.requests.fromUser.image);
            })
			.catch((error) => {
				alert(response.message);
			});
	};
    return (
        <FlatList
            style={{ backgroundColor: '#efefef' }}
            keyExtractor={item => item.id}
            data={requests}
            renderItem={({ item }) => (
                <BuddyRequestItem
                    reqId={item._id}
                    name={item.fromUser.name}
                    image={item.fromUser.image}
                    talent={item.talent}
                    userId={item.fromUser._id}
                    reqType="received"
                    navigation={props.navigation}
                />
            )}
        />
    );
};

export default PendingConnectionScreen;