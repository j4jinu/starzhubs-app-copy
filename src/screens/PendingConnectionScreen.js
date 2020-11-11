import React from 'react';
import { FlatList, Text, View } from 'react-native';
import BuddyRequestItem from '../components/BuddyRequestItem';
const PendingConnectionScreen = () => {
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
                    id={item._id}
                    name={item.fromUser._id ===auth.userId ?item.toUser.name:item.toUser.name}
                    image={item.fromUser._id ===auth.userId ?item.toUser.image.avatar:item.fromUser.image.avatar}
                    talent={item.talent}
                    //onSelect={() => props.navigation.navigate('UserDetails')}
                />
            )}
        />
    );
};

export default PendingConnectionScreen;