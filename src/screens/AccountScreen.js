import React, { useContext, useEffect, useState } from 'react';
import {
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
    Text,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import theme from '../config/theme';
import { AuthContext } from '../context/authContext';


const Divider = <View style={{ width: '100%', height: 1, backgroundColor: '#e6e6e6' }} />

const AccountScreen = (props) => {

    const auth = useContext(AuthContext)
    const [user, setUser] = useState({})

    useEffect(() => {
        const getUserDetails = async () => {
            try {
                let response = await fetch(`http://13.232.190.226/api/user/profile`, {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + auth.token
                    }
                })
                let userData = await response.json()
                setUser(userData.data.user)
                console.log("user data", userData.data.user);
            } catch (error) {
            }
        }
        getUserDetails()
    }, [])

    return (
        <ScrollView style={styles.container}>
            <View style={styles.container}>
                <View>
                    {user.image && user.image.avatar !== undefined && (
                        <Image
                            style={{ width: '100%', height: 250, resizeMode: 'stretch' }}
                            source={{
                                uri: `http://13.232.190.226/api/user/avatar/${user.image.avatar}`
                            }}
                        />
                    )}
                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={{
                            alignSelf: 'flex-end',
                            position: 'absolute',
                            top: '5%', left: '90%', right: 0, bottom: 0,
                            marginRight: 10
                        }}
                    >
                        <Icon
                            color={'white'}
                            name='camera'
                            size={30}
                        />
                    </TouchableOpacity>
                    <View style={styles.profileContainer}>
                        <View>
                            <Text style={styles.profileTitle}>{user.name}</Text>
                            <Text style={{ fontSize: 12, marginLeft: 10, color: 'gray' }}>{user.email}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.sectionContainer}>
                    <TouchableOpacity
                        style={styles.section}
                        activeOpacity={0.7}
                        onPress={() => props.navigation.navigate('Talents')}
                    >
                        <View style={{ flexDirection: 'row' }}>
                            <Icon name="filmstrip" size={24} color={'gray'} />
                            <View style={styles.sectionDetails}>
                                <Text style={styles.sectionDetailsTitle}>Talents</Text>
                                <Text style={styles.sectionDetailsSubtitle}>Your talent details</Text>
                            </View>
                        </View>
                        <Icon name="chevron-right" size={24} color={'gray'} />
                    </TouchableOpacity>
                    {Divider}
                    <TouchableOpacity
                        style={styles.section}
                        activeOpacity={0.7}
                        onPress={() => props.navigation.navigate('MyMedia')}
                    >
                        <View style={{ flexDirection: 'row' }}>
                            <Icon name="checkbox-intermediate" size={24} color={'gray'} />
                            <View style={styles.sectionDetails}>
                                <Text style={styles.sectionDetailsTitle}>Media</Text>
                                <Text style={styles.sectionDetailsSubtitle}>Your media gallery</Text>
                            </View>
                        </View>
                        <Icon name="chevron-right" size={24} color={'gray'} />
                    </TouchableOpacity>
                    {Divider}
                    <TouchableOpacity
                        style={styles.section}
                        activeOpacity={0.7}
                        onPress={() => props.navigation.navigate('MyPosters')}
                    >
                        <View style={{ flexDirection: 'row' }}>
                            <Icon name="post-outline" size={24} color={'gray'} />
                            <View style={styles.sectionDetails}>
                                <Text style={styles.sectionDetailsTitle}>Poster</Text>
                                <Text style={styles.sectionDetailsSubtitle}>Manage your posters</Text>
                            </View>
                        </View>
                        <Icon name="chevron-right" size={24} color={'gray'} />
                    </TouchableOpacity>
                </View>
                <View style={styles.sectionContainer}>
                    <TouchableOpacity
                        style={styles.section}
                        activeOpacity={0.7}
                        onPress={() => props.navigation.navigate('Edit')}
                    >
                        <View style={{ flexDirection: 'row' }}>
                            <Icon name="shield-account" size={24} color={'gray'} />
                            <View style={styles.sectionDetails}>
                                <Text style={styles.sectionDetailsTitle}>Profile Details</Text>
                                <Text style={styles.sectionDetailsSubtitle}>Manage your profile</Text>
                            </View>
                        </View>
                        <Icon name="chevron-right" size={24} color={'gray'} />
                    </TouchableOpacity>
                    {Divider}
                    <TouchableOpacity
                        style={styles.section}
                        activeOpacity={0.7}
                        onPress={() => props.navigation.navigate('MyBuddy')}
                    >
                        <View style={{ flexDirection: 'row' }}>
                            <Icon name="account-group" size={24} color={'gray'} />
                            <View style={styles.sectionDetails}>
                                <Text style={styles.sectionDetailsTitle}>Connections</Text>
                                <Text style={styles.sectionDetailsSubtitle}>Manage your connections</Text>
                            </View>
                        </View>
                        <Icon name="chevron-right" size={24} color={'gray'} />
                    </TouchableOpacity>
                </View>
                <View style={styles.sectionContainer}>
                    <TouchableOpacity
                        style={styles.section}
                        activeOpacity={0.7}
                        onPress={() => props.navigation.navigate('Help')}
                    >
                        <View style={{ flexDirection: 'row' }}>
                            <Icon name="help-rhombus" size={24} color={'gray'} />
                            <View style={styles.sectionDetails}>
                                <Text style={styles.sectionDetailsTitle}>Help Center</Text>
                                <Text style={styles.sectionDetailsSubtitle}>Frequently asked question</Text>
                            </View>
                        </View>
                        <Icon name="chevron-right" size={24} color={'gray'} />
                    </TouchableOpacity>
                    {Divider}
                    <TouchableOpacity
                        style={styles.section}
                        activeOpacity={0.7}
                        onPress={() => props.navigation.navigate('Policy')}
                    >
                        <View style={{ flexDirection: 'row' }}>
                            <Icon name="format-list-text" size={24} color={'gray'} />
                            <View style={styles.sectionDetails}>
                                <Text style={styles.sectionDetailsTitle}>Terms and Policies</Text>
                                <Text style={styles.sectionDetailsSubtitle}>Our Terms and Policies</Text>
                            </View>
                        </View>
                        <Icon name="chevron-right" size={24} color={'gray'} />
                    </TouchableOpacity>
                    {Divider}
                    <TouchableOpacity
                        style={styles.section}
                        activeOpacity={0.7}
                        onPress={() => props.navigation.navigate('Feedback')}
                    >
                        <View style={{ flexDirection: 'row' }}>
                            <Icon name="comment-text" size={24} color={'gray'} />
                            <View style={styles.sectionDetails}>
                                <Text style={styles.sectionDetailsTitle}>Feedback</Text>
                                <Text style={styles.sectionDetailsSubtitle}>Send your feedback to us</Text>
                            </View>
                        </View>
                        <Icon name="chevron-right" size={24} color={'gray'} />
                    </TouchableOpacity>
                </View>
                <View style={styles.sectionContainer}>
                    <TouchableOpacity
                        style={styles.section}
                        activeOpacity={0.7}
                        onPress={() => {
                            auth.logout();
                            props.navigation.navigate('Auth')
                        }}
                    >
                        <View style={{ flexDirection: 'row' }}>
                            <Icon name="logout" size={24} color={'gray'} />
                            <View style={styles.sectionDetails}>
                                <Text style={styles.sectionDetailsTitle}>
                                    Logout
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.appInfo}>
                    <Text style={{ color: 'black' }}>APP VERSION: 1.0.00</Text>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e6e6e6',
    },
    appInfo: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 30,
    },
    avatar: {
        width: 80,
        height: 80,
        marginLeft: 15,
        marginTop: -40,
        borderRadius: 100,
        padding: 5,
        borderWidth: 3,
        borderColor: theme.$primaryColor,
        backgroundColor: 'white'
    },
    logoutBtn: {
        borderColor: theme.$primaryColor,
        borderWidth: 1,
        marginHorizontal: 20,
        padding: 8,
        marginTop: 30,
        backgroundColor: '#e6e6e6',
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoutBtnText: {
        fontSize: 18,
        textTransform: 'uppercase',
        color: theme.$primaryColor
    },
    profileContainer: {
        flex: 1,
        backgroundColor: 'white',
        paddingBottom: 15
    },
    profileTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 5,
        marginLeft: 10
    },
    sectionContainer: {
        width: '100%',
        marginTop: 10,
    },
    section: {
        flex: 1,
        width: '100%',
        backgroundColor: 'white',
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 15,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    sectionDetails: {
        flexDirection: 'column',
        marginLeft: 10,
    },
    sectionDetailsTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: theme.$primaryColorText
    },
    sectionDetailsSubtitle: {
        fontSize: 12,
        fontWeight: '100',
        color: 'gray'
    }
})

export default AccountScreen;