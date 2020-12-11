import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Image,
  ToastAndroid,
  ActivityIndicator
} from 'react-native';
import theme from '../config/theme';
import DIcon from 'react-native-vector-icons/MaterialIcons';
import EIcon from 'react-native-vector-icons/FontAwesome5';
import { Snackbar } from 'react-native-paper';
import { AuthContext } from '../context/authContext';
import { TouchableOpacity } from 'react-native-gesture-handler';
import GIcon from 'react-native-vector-icons/FontAwesome';
import { Rating, AirbnbRating } from 'react-native-elements';

const TalentListScreen = (props) => {
  const auth = useContext(AuthContext);
  const [talents, setTalents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const unsubscribe = props.navigation.addListener('didFocus', () => {
    console.log('focussed');
    getUserTalents();
  });

  useEffect(() => {
    getUserTalents();
    unsubscribe;
  }, []);

  useEffect(() => {
    getUserTalents();
    unsubscribe;
  }, []);


  const getUserTalents = () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + auth.token,
      },
    };
    fetch(`http://13.232.190.226/api/user/talent`, requestOptions)
      .then((response) => response.json())
      .then(
        (response) => {
          if (response.success === true) {
            setTalents(response.data.talents);
            console.log('talents', talents);
            setLoading(false)
          } else {
            console.log('gggg', response.message);
          }
        },
        (error) => {
          console.warn('Talents fetch failed: ' + error);
        },
      );
  };

  const confirmDelete = (tid) => {
    Alert.alert(
      '',
      'Are you sure to delete this talent?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => onDelteMedia(tid),
        },
      ],
      { cancelable: false },
    );
  };

  const onDelteMedia = (talentId) => {
    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + auth.token,
      },
      body: JSON.stringify({
        talentId: talentId,
      }),
    };
    fetch(
      `http://13.232.190.226/api/user/remove/talent/${talentId}`,
      requestOptions,
    )
      .then((response) => response.json())
      .then(
        (response) => {
          if (response.success === true) {
            getUserTalents();
            // setVisible(!visible);
            showToastWithGravityAndOffset();
          } else {
            alert(response.message);
          }
        },
        (error) => {
          alert('Something went wrong. Try again later.');
        },
      );
  };
  const showToastWithGravityAndOffset = () => {
    ToastAndroid.showWithGravityAndOffset(
      'Deleted Successfully',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      50,
      100,
    );
  };
  if (loading) {
    return (
      <ActivityIndicator
        style={{ marginTop: 20 }}
        color={theme.$primaryColor}
        size={'large'}
      />
    );
  }
  if (talents.length === 0) {
    return (
      <>
        <View style={{ alignItems: 'center', marginTop: '50%' }}>
          <Text
            style={{
              color: theme.$primaryColor,
              fontWeight: 'bold',
              fontSize: 18,
              textAlign: 'center',
              marginBottom: 10,
            }}>
            No talents added yet
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => props.navigation.navigate('AddTalents')}>
          <Image
            source={require('../assets/add.png')}
            style={{ width: '41%', height: 160, marginHorizontal: 100 }}
          />
        </TouchableOpacity>
      </>
    );
  }
  if (talents.length > 0) {
    return (
      <>
        <View style={styles.container}>
          <ScrollView>
            {talents.map((t, key) => (
              <View style={styles.card}>
                <View style={{ paddingHorizontal: '5%' }}>
                  <Text style={styles.title}>{t.category.title}</Text>
                  <View
                    style={{
                      alignItems: 'flex-start',
                      flexDirection: 'row',
                      marginBottom: 10,
                    }}>
                    <Rating
                      type="custom"
                      readonly
                      ratingColor={theme.$primaryColor}
                      ratingBackgroundColor="#c8c7c8"
                      ratingCount={5}
                      imageSize={15}
                      style={{ paddingVertical: 5 }}
                      startingValue={t.level}

                    />
                    <Text style={{ marginLeft: '5%', marginTop: 4 }}>
                      {t.level == '1'
                        ? 'Beginner'
                        : t.level == '2'
                          ? 'Average'
                          : t.level == '3'
                            ? 'Good'
                            : t.level == '4'
                              ? 'Excellent'
                              : 'Experienced'}
                    </Text>
                  </View>
                  <View style={styles.subrow}>
                    <View
                      style={{
                        padding: 5,
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                        width: '50%',
                      }}>
                      <Text style={{ fontWeight: 'bold', color: 'black' }}>
                        Type
                      </Text>
                      <Text style={{ color: 'darkgrey' }}>{t.chars.type}</Text>
                    </View>
                    <View
                      style={{
                        padding: 5,
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                        width: '50%',
                      }}>
                      <Text style={{ fontWeight: 'bold', color: 'black' }}>
                        Industries
                      </Text>
                      <Text style={{ color: 'darkgrey' }}>
                        {t.chars.industry.toString()}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.subrow}>
                    <View
                      style={{
                        padding: 5,
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                        width: '50%',
                      }}>
                      <Text style={{ fontWeight: 'bold', color: 'black' }}>
                        Experience
                      </Text>
                      <Text style={{ color: 'darkgrey' }}>
                        {t.chars.years} Year Experienced
                      </Text>
                    </View>
                    <View
                      style={{
                        padding: 5,
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                        width: '50%',
                      }}>
                      <Text style={{ color: 'black', fontWeight: 'bold' }}>
                        Works
                      </Text>
                      <Text style={{ color: 'darkgrey' }}>
                        {t.chars.films} work(s) completed
                      </Text>
                    </View>
                  </View>
                  <View style={{ paddingHorizontal: 5 }}>
                    <Text
                      style={{
                        marginTop: 10,
                        color: 'black',
                        fontWeight: 'bold',
                      }}>
                      Description
                    </Text>
                    <Text
                      style={{
                        color: 'darkgrey',
                        marginBottom: 15,
                      }}>
                      {t.description}
                    </Text>
                  </View>
                </View>
                <View style={{ flexDirection: "row", bottom: 0 }}>
                  <TouchableOpacity
                    onPress={() =>
                      props.navigation.navigate('EditTalents', {
                        talentId: t._id,
                        category: t.category.title,
                        type: t.chars.type,
                        industry: t.chars.industry,
                        films: t.chars.films,
                        years: t.chars.years,
                        description: t.description,
                        levels: t.level,
                      })
                    }
                    style={styles.EditBtn}>
                    <Text style={{ color: 'white', textAlign: 'center', fontWeight: '700' }}>
                      EDIT
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => confirmDelete(t._id)}
                    style={styles.DeleteBtn}>
                    <Text style={{ color: 'white', textAlign: 'center', fontWeight: '700' }}>
                      DELETE
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
          <View
            style={{
              borderWidth: 0,
              bottom: '10%',
              right: 10,
              alignSelf: 'flex-end',
            }}>
            <TouchableOpacity
              style={styles.createBtn}
              onPress={() => props.navigation.navigate('AddTalents')}>
              <GIcon name="plus" size={15} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    marginBottom: '-12%'
  },
  EditBtn: {
    width: "150%",
    backgroundColor: '#0086b3',
    height: 40,

    // width: '150%',
    // backgroundColor: '#00ba28',
    // height: 50,
    marginRight: '25%',
    justifyContent: 'center',
    marginTop: 2,
  },
  DeleteBtn: {
    width: "69%",
    backgroundColor: "#ff6633",
    marginLeft: "25%",
    marginRight: "32%",
    height: 40,
    // width: '70%',
    // backgroundColor: '#db3000',
    // marginLeft: '25%',
    // marginRight: '32%',
    // height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: '1%',
  },
  subrow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    //marginVertical:'1%'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#555',
    textTransform: 'uppercase',
  },
  card: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginHorizontal: 10,
    // padding: 8,
    marginBottom: '3%',
    marginTop: 10,
    // paddingHorizontal: 5,
    // paddingVertical: 10,
    flexDirection: 'column',
    borderRadius: theme.$borderRadius,
    elevation: 2,
    paddingTop: 10

  },
  subHeadDiv: {
    marginTop: 8,
    marginLeft: '10%',
  },
  subHead: {
    color: '#707070',
    fontSize: 15,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  subHeadDiv2: {
    marginTop: 10,
    marginLeft: '5%',
    flexDirection: 'row',
    width: '100%',
  },
  line: {
    top: -3,
    left: 37,
    width: 0,
    height: 150,
    borderLeftWidth: 1,
    borderColor: 'orange',
    opacity: 1,
  },
  infoDiv: {
    flexDirection: 'row',
    marginLeft: 0,
  },
  fieldTitle: {
    color: '#707070',
    fontSize: 13,
    fontWeight: '600',
    width: '30%',
  },
  fieldText: {
    color: '#707070',
    fontSize: 13,
    width: '70%',
    paddingRight: 20,
    textAlign: 'justify',
  },
  fieldDiv: {
    flexDirection: 'row',
    marginLeft: 20,
    marginTop: 5,
  },
  createBtn: {
    width: 50,
    height: 50,
    elevation: 5,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    backgroundColor: theme.$primaryColor,
    marginRight: 10,
    alignItems: 'center',
  },
});

export default TalentListScreen;
