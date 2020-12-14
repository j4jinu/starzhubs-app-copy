import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import Swiper from 'react-native-swiper';
import HomeMediaList from '../components/HomeMediaList';
import HomePortfolioList from '../components/HomePortfolioList';
import theme from '../config/theme';
const HomeScreenSingle = (props) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [poster, setPoster] = React.useState([]);
  const [users, setUsers] = React.useState([]);
  const [media, setMedia] = React.useState([]);
  const [talent, setTalent] = React.useState([]);
  const deviceWidth = Dimensions.get('window').width;
  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        let response = await fetch(`http://13.232.190.226/api/poster/random`);
        let usersResponse = await fetch(
          `http://13.232.190.226/api/talent/filter/5f5b2b8e96b2173a30948ac6`,
          {
            method: 'PATCH',
          },
        );
        let mediaResponse = await fetch(
          `http://13.232.190.226/api/talent/random`,
        );
        let userData = await usersResponse.json();
        userData.success ? setUsers(userData.data.users) : setUsers([]);
        let mediaData = await mediaResponse.json();
        mediaData.success ? setTalent(mediaData.talents) : setTalent([]);
        let resData = await response.json();
        resData.success ? setPoster(resData.data.posters) : setPoster([]);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };
    fetchHomeData();
  }, []);
  const renderMedia = (data) => {
    if (data.length === 0) {
      setMedia([]);
      return;
    }
    data.map((t) => {
      if (t.media !== []) {
        media.push(t.media);
      }
    });
  };
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator color={theme.$primarycolor} size={'large'} />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <ScrollView>
        <Swiper height={200}
          loop={false} showsPagination={true}>
          {poster.map((p) => (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() =>
                props.navigation.navigate('PosterDetails', {
                  posterId: p._id,
                  title: p.title,
                  image: p.image,
                  description: p.description,
                  endDate: p.endDate,
                  startDate: p.startDate,
                  user: p.userId,
                })
              }>
              <Image
                resizeMode={'cover'}
                style={{
                  width: deviceWidth,
                  height: deviceWidth / 2,
                }}
                source={{
                  uri: `http://13.232.190.226/api/poster/view/${p.image}`,
                }}
              />
            </TouchableOpacity>
          ))}
        </Swiper>
        <HomePortfolioList users={users} navigation={props.navigation} />
        <HomeMediaList talents={talent} navigation={props.navigation} />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  wrapper: {
    height: 300,
  },
});
export default HomeScreenSingle;
