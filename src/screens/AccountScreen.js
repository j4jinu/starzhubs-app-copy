import React from 'react';
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


const Divider = <View style={{ width: '100%', height: 1, backgroundColor: '#e6e6e6' }} />

const AccountScreen = (props) => {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.container}>
                <View>
                    <Image
                        style={{ width: '100%', height: 200, resizeMode: 'stretch' }}
                        source={{
                            uri: 'https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fblogs-images.forbes.com%2Fscottmendelson%2Ffiles%2F2017%2F05%2Fpirates_of_the_caribbean_dead_men_tell_no_tales_by_mintmovi3-db23j4w.jpg'
                        }}
                    />
                    <View style={styles.profileContainer}>
                        <Image
                            style={styles.avatar}
                            source={{
                                uri: 'https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fblogs-images.forbes.com%2Fscottmendelson%2Ffiles%2F2017%2F05%2Fpirates_of_the_caribbean_dead_men_tell_no_tales_by_mintmovi3-db23j4w.jpg'
                            }}
                        />
                        <Text style={styles.profileTitle}>Test User</Text>
                    </View>
                </View>
                <View style={styles.sectionContainer}>
                    <View style={styles.section}>
                        <View style={{ flexDirection: 'row' }}>
                            <Icon name="filmstrip" size={24} color={'gray'} />
                            <View style={styles.sectionDetails}>
                                <Text style={styles.sectionDetailsTitle}>Talents</Text>
                                <Text style={styles.sectionDetailsSubtitle}>Your talent details</Text>
                            </View>
                        </View>
                        <Icon name="chevron-right" size={24} color={'gray'} />
                    </View>
                    {Divider}
                    <View style={styles.section}>
                        <View style={{ flexDirection: 'row' }}>
                            <Icon name="checkbox-intermediate" size={24} color={'gray'} />
                            <View style={styles.sectionDetails}>
                                <Text style={styles.sectionDetailsTitle}>Media</Text>
                                <Text style={styles.sectionDetailsSubtitle}>Your media gallery</Text>
                            </View>
                        </View>
                        <Icon name="chevron-right" size={24} color={'gray'} />

                    </View>
                    {Divider}
                    <View style={styles.section}>
                        <View style={{ flexDirection: 'row' }}>
                            <Icon name="post-outline" size={24} color={'gray'} />
                            <View style={styles.sectionDetails}>
                                <Text style={styles.sectionDetailsTitle}>Poster</Text>
                                <Text style={styles.sectionDetailsSubtitle}>Manage your posters</Text>
                            </View>
                        </View>
                        <Icon name="chevron-right" size={24} color={'gray'} />
                    </View>
                </View>
                <View style={styles.sectionContainer}>
                    <View style={styles.section}>
                        <View style={{ flexDirection: 'row' }}>
                            <Icon name="shield-account" size={24} color={'gray'} />
                            <TouchableOpacity
                                style={styles.sectionDetails}
                                onPress={() => props.navigation.navigate('Edit')}
                            >
                                <Text style={styles.sectionDetailsTitle}>Profile Details</Text>
                                <Text style={styles.sectionDetailsSubtitle}>Manage your profile</Text>
                            </TouchableOpacity>
                        </View>
                        <Icon name="chevron-right" size={24} color={'gray'} />
                    </View>
                    {Divider}
                    <View style={styles.section}>
                        <View style={{ flexDirection: 'row' }}>
                            <Icon name="account-group" size={24} color={'gray'} />
                            <View style={styles.sectionDetails}>
                                <Text style={styles.sectionDetailsTitle}>Connections</Text>
                                <Text style={styles.sectionDetailsSubtitle}>Manage your connections</Text>
                            </View>
                        </View>
                        <Icon name="chevron-right" size={24} color={'gray'} />
                    </View>
                </View>
                <View style={styles.sectionContainer}>
                    <View style={styles.section}>
                        <View style={{ flexDirection: 'row' }}>
                            <Icon name="help-rhombus" size={24} color={'gray'} />
                            <View style={styles.sectionDetails}>
                                <Text style={styles.sectionDetailsTitle}>Help Center</Text>
                                <Text style={styles.sectionDetailsSubtitle}>Frequently asked question</Text>
                            </View>
                        </View>
                        <Icon name="chevron-right" size={24} color={'gray'} />
                    </View>
                    {Divider}
                    <View style={styles.section}>
                        <View style={{ flexDirection: 'row' }}>
                            <Icon name="format-list-text" size={24} color={'gray'} />
                            <View style={styles.sectionDetails}>
                                <Text style={styles.sectionDetailsTitle}>Terms and Policies</Text>
                                <Text style={styles.sectionDetailsSubtitle}>Our Terms and Policies</Text>
                            </View>
                        </View>
                        <Icon name="chevron-right" size={24} color={'gray'} />
                    </View>
                    {Divider}
                    <View style={styles.section}>
                        <View style={{ flexDirection: 'row' }}>
                            <Icon name="comment-text" size={24} color={'gray'} />
                            <View style={styles.sectionDetails}>
                                <Text style={styles.sectionDetailsTitle}>Feedback</Text>
                                <Text style={styles.sectionDetailsSubtitle}>Send your feedback to us</Text>
                            </View>
                        </View>
                        <Icon name="chevron-right" size={24} color={'gray'} />
                    </View>
                </View>
                <TouchableOpacity activeOpacity={0.5} style={styles.logoutBtn}>
                    <Text style={styles.logoutBtnText}>LOG OUT</Text>
                </TouchableOpacity>
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
        flexDirection: 'row',
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
        fontWeight: 'bold'
    },
    sectionDetailsSubtitle: {
        fontSize: 12,
        fontWeight: '100'
    }
})

export default AccountScreen;