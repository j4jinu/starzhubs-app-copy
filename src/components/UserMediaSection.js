import React, {useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import theme from '../config/theme';
import MediaGrid from './MediaGrid';
import PosterGridItem from './PosterGridItem';

// const posters = [
//     { id: 'h', name: 'Poster A', image: 'https://deadline.com/wp-content/uploads/2030/10/AP_20210337197617-e1603795015914.jpg?w=681&h=383&crop=1' },
//     { id: 'f', name: 'Poster B', image: 'https://upload.wikimedia.org/wikipedia/commons/7/79/Johnny_Depp_Deauville_2019.jpg' },
//     { id: 'l', name: 'Poster C', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQAs-E4jTq8f50vjVirikRNtW3ggDySwb2A5g&usqp=CAU' },
//     { id: 'r', name: 'Poster D', image: 'https://ca-times.brightspotcdn.com/dims4/default/60d39e3/2147483647/strip/true/crop/2047x1151+0+0/resize/840x472!/quality/90/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F63%2F26%2Fb97131a2a20b0a8b805c0defa552%2Fla-1533757303-22e1u7m67i-snap-image' },
//     { id: 'a', name: 'Poster E', image: 'https://img.theweek.in/content/dam/week/news/entertainment/images/2019/4/25/Johnny-Depp-dating.jpg' }
// ]

const UserMediaSection = async (props) => {
  const [flag, setflag] = useState(0);
  console.warn('talents', props.talents);
  const {talents} = props;
  if (talents === undefined || talents.length === 0) {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: '5%',
        }}>
        <Image
          source={require('../assets/noresult1.png')}
          style={{height: 50, width: 50}}></Image>
        <Text style={{fontSize: 18, color: 'tomato', marginTop: 10}}>
          No Media Files
        </Text>
      </View>
    );
  }
  await talents.forEach((t) => {
    if (t.media.length === 0) setflag(1);
    else setflag(0);
  });
  if (flag === 1) {
    return <Text>No media</Text>;
  } else {
    return (
      <FlatList
        keyExtractor={(item) => item._id}
        data={talents}
        renderItem={({item}) => (
          <MediaGrid media={item.media} navigation={props.navigation} />
        )}
        numColumns={3}
        // ListHeaderComponent={(item) => <Text style={styles.title}> {console.log(item)}</Text>}
      />
    );
  }
};

const RenderMedia = (props) => {
  const [flag, setFlag] = useState(0);
  const {media} = props;
  if (media.length === 0) {
    setFlag(1);
    return;
  }
  return flag === 1 ? (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: '5%',
      }}>
      <Image
        source={require('../assets/noresult1.png')}
        style={{height: 50, width: 50}}></Image>
      <Text style={{fontSize: 18, color: 'tomato', marginTop: 10}}>
        No Media Files
      </Text>
    </View>
  ) : (
    <View style={styles.container}>
      <FlatList
        keyExtractor={(item) => item._id}
        data={media}
        renderItem={({item}) => (
          <MediaGrid media={media} navigation={props.navigation} />
        )}
        numColumns={3}
        // ListHeaderComponent={(item) => <Text style={styles.title}> {console.log(item)}</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    marginBottom: '5%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 17,
    color: '#555',
    marginBottom: 8,
    marginLeft: 10,
  },
});

export default UserMediaSection;
