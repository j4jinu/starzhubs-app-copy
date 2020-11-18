import React, {useContext} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import theme from '../config/theme';
import Moment from 'moment';
import {AuthContext} from '../context/authContext';

const PosterGridItem = (props) => {
  const {userId} = props;
  const auth = useContext(AuthContext);
  return (
    <>
      {
        <TouchableOpacity
          style={styles.gridItem}
          onPress={() =>
            props.navigation.navigate('PosterDetails', {
              posterId: props.id,
              title: props.poster,
              image: props.image,
              description: props.description,
              endDate: props.endDate,
              startDate: props.startDate,
              user: userId,
            })
          }
          activeOpacity={0.7}>
          <View style={styles.container}>
            <Image
              style={{
                width: '100%',
                height: 200,
                borderRadius: 10,
              }}
              resizeMode={'cover'}
              source={{
                uri: `http://13.232.190.226/api/poster/view/${props.image}`,
              }}
            />
            <View style={styles.owner}>
              <Image
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 100,
                }}
                source={{
                  uri:
                    userId.image === undefined
                      ? `https://img.dtnext.in/Articles/2020/Jun/202006031350583978_Prithviraj-Sukumaran-tests-negative-for-COVI
                                    D19_SECVPF.gif`
                      : `http://13.232.190.226/api/user/avatar/${userId.image.avatar}`,
                }}
              />

              <View style={styles.ownerDetails}>
                <Text style={{fontSize: 13}}>{'Test User'}</Text>
                <Text style={{fontSize: 10, color: 'gray'}}>
                  {Moment(props.endDate).format('DD/MM/YYYY')}
                </Text>
              </View>
            </View>
            <Text style={styles.title}>{props.poster}</Text>
            <Text
              numberOfLines={4}
              style={{
                marginHorizontal: 15,
                color: theme.$primaryColorText,
                marginTop: 5,
                lineHeight: 20,
              }}>
              {props.description}
            </Text>
          </View>
        </TouchableOpacity>
      }
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 8,
  },
  gridItem: {
    flex: 1,
    width: '95%',
    alignSelf: 'center',
    borderRadius: 8,
    marginVertical: 10,
    paddingBottom: 20,
    borderWidth: 1,
    borderColor: 'gray',
  },
  gridItemText: {
    fontFamily: 'montserrat-medium',
    fontSize: 16,
  },
  owner: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginTop: 10,
    marginLeft: 15,
  },
  ownerDetails: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 15,
  },
  title: {
    alignSelf: 'flex-start',
    marginLeft: 15,
    marginTop: 10,
    fontSize: 17,
    fontWeight: 'bold',
    color: theme.$primaryColorText,
  },
});

export default PosterGridItem;
