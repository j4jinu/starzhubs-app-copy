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
  ToastAndroid
} from 'react-native';
import theme from '../config/theme';
import DIcon from 'react-native-vector-icons/MaterialIcons';
import EIcon from 'react-native-vector-icons/FontAwesome5';
import { Snackbar } from 'react-native-paper';
import { AuthContext } from '../context/authContext';
import { TouchableOpacity } from 'react-native-gesture-handler';
import GIcon from 'react-native-vector-icons/FontAwesome';

const TalentListScreen = (props) => {
  const auth = useContext(AuthContext);
  const [talents, setTalents] = useState([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    getUserTalents();
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
      'Are you sure to delete this media?',
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
            showToastWithGravityAndOffset()
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
      "Deleted Successfully",
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      50,
      100
    );
  };

  // const onDismissSnackBar = () => {
  //   setVisible(false);
  // };
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
              marginBottom: 10
            }}>
            No talents added yet
              </Text>
        </View>


        <TouchableOpacity

          onPress={() => props.navigation.navigate('AddTalents')}>
          <Image
            source={require('../assets/add.png')}
            style={{ width: "41%", height: 160, marginHorizontal: 100 }}
          />
        </TouchableOpacity>

      </>
    )
  }
  if (talents.length > 0) {


    return (
      <>
        <ScrollView style={styles.container}>
          {/* <Snackbar
            visible={visible}
            duration={5000}
            onDismiss={onDismissSnackBar}>
            Deleted Successfully
        </Snackbar> */}
          <View>
            {talents.map((t, key) => (
              <View style={styles.card}>
                <View style={styles.subHeadDiv2}>
                  <View style={{ width: '70%' }}>
                    <Text style={styles.subHead}>{t.category.title}</Text>
                  </View>
                  <View style={{ width: '20%', flexDirection: 'row' }}>
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
                      }>
                      <EIcon
                        name="user-edit"
                        size={15}
                        color="orange"
                        style={{ marginLeft: '35%', alignSelf: 'flex-end' }}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => confirmDelete(t._id)}>
                      <DIcon
                        name="delete"
                        size={18}
                        color="orange"
                        style={{ marginLeft: 20, alignSelf: 'flex-end' }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.infoDiv}>
                  <View style={{ marginTop: 10 }}>
                    <View style={styles.fieldDiv}>
                      <Text style={styles.fieldTitle}>Type</Text>
                      <Text style={styles.fieldText}>{t.chars.type}</Text>
                    </View>
                    <View style={styles.fieldDiv}>
                      <Text style={styles.fieldTitle}>Industries</Text>
                      <Text style={styles.fieldText}>
                        {t.chars.industry.toString()}
                      </Text>
                    </View>
                    <View style={styles.fieldDiv}>
                      <Text style={styles.fieldTitle}>Projects</Text>
                      <Text style={styles.fieldText}>{t.chars.films}</Text>
                    </View>
                    <View style={styles.fieldDiv}>
                      <Text style={styles.fieldTitle}>Experience</Text>
                      <Text style={styles.fieldText}>{t.chars.years} Years</Text>
                    </View>
                    <View style={styles.fieldDiv}>
                      <Text style={styles.fieldTitle}>Level</Text>
                      <Text style={styles.fieldText}>
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
                  </View>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
        <View
          style={{
            borderWidth: 0,
            bottom: 10,
            right: 10,
            alignSelf: 'flex-end',
          }}>
          <TouchableOpacity
            style={styles.createBtn}
            onPress={() => props.navigation.navigate('AddTalents')}>
            <GIcon name="plus" size={25} color="white" />
          </TouchableOpacity>
        </View>
      </>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    elevation: 5,
    marginHorizontal: 20,
    padding: 8,
    marginTop: 10,
    flexDirection: 'column',
    borderRadius: theme.$borderRadius,
    paddingBottom: '5%',
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
    width: '100%',
    elevation: 5,
    borderRadius: 50,
    paddingVertical: 12,
    paddingHorizontal: 5,
    backgroundColor: 'orange',
    marginRight: 20,
    alignItems: 'center',
  },
});

export default TalentListScreen;
