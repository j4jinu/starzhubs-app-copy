import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import PosterListActive from '../components/PosterListActive';
import PosterListExpired from '../components/PosterListExpired';
import PosterListPending from '../components/PosterListPending';
import PosterListRejected from '../components/PosterListRejected';
import PIcon from 'react-native-vector-icons/FontAwesome';
import theme from '../config/theme';

const MyPostersScreen = (props) => {
  const [content, setContent] = useState('me');
  const [loading, setLoading] = useState(false);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => {
              setContent('me');
            }}
            activeOpacity={0.7}
            style={{
              borderColor: content === 'me' ? 'orange' : '#f6f6f6',
              borderBottomWidth: 3,
              paddingVertical: 5,
              paddingHorizontal: 8,
              paddingBottom: 12,
              width: '24%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                color: content === 'me' ? 'orange' : '#000',
              }}>
              Active
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setContent('pending');
            }}
            activeOpacity={0.7}
            style={{
              borderColor: content === 'pending' ? 'orange' : '#f6f6f6',
              borderBottomWidth: 3,
              paddingVertical: 5,
              paddingHorizontal: 8,
              paddingBottom: 12,
              width: '24%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                color: content === 'pending' ? 'orange' : '#000',
              }}>
              Pending
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setContent('expired');
            }}
            activeOpacity={0.7}
            style={{
              borderColor: content === 'expired' ? 'orange' : '#f6f6f6',
              borderBottomWidth: 3,
              paddingVertical: 5,
              paddingHorizontal: 8,
              paddingBottom: 12,
              width: '24%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                color: content === 'expired' ? 'orange' : '#000',
              }}>
              Expired
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setContent('denied');
            }}
            activeOpacity={0.7}
            style={{
              borderColor: content === 'denied' ? 'orange' : '#f6f6f6',
              borderBottomWidth: 3,
              paddingVertical: 5,
              paddingHorizontal: 8,
              paddingBottom: 12,
              width: '24%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                color: content === 'denied' ? 'orange' : '#000',
              }}>
              Rejected
            </Text>
          </TouchableOpacity>
        </View>
        {loading && (
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="small" color={theme.$primaryColor} />
          </View>
        )}
        {content === 'me' && !loading && (
          <PosterListActive
            navigation={props.navigation}
          />
        )}
        {content === 'pending' && !loading && (
          <PosterListPending
            navigation={props.navigation}
          />
        )}
        {content === 'expired' && !loading && (
          <PosterListExpired
            navigation={props.navigation}
          />
        )}
        {content === 'denied' && !loading && (
          <PosterListRejected
            navigation={props.navigation}
          />
        )}
      </ScrollView>
      <View
        style={{
          borderWidth: 0,
          position: 'absolute',
          bottom: 10,
          right: 10,
          alignSelf: 'flex-end',
        }}>
        <TouchableOpacity
          style={styles.sendBtn}
          onPress={() => props.navigation.navigate('CreatePosters')}>
          <PIcon name="plus" size={25} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f6f6f6',
    paddingVertical: 5,
    paddingHorizontal: 8,
  },
  sendBtn: {
    width: '100%',
    elevation: 5,
    borderRadius: 50,
    paddingVertical: 12,
    paddingHorizontal: 5,
    backgroundColor: 'tomato',
    marginRight: 20,
    alignItems: 'center',
  },
});

export default MyPostersScreen;
